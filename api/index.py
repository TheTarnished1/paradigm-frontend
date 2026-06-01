from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from typing import List, Optional
import os
import io
import PyPDF2
import json
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

app = FastAPI()

class ChatMessage(BaseModel):
    role: str
    text: str

class ChatRequest(BaseModel):
    message: str
    history: List[ChatMessage]
    context: str = ""

api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY is missing!")

synapse = ChatGroq(temperature=0.7, model_name="llama3-8b-8192", api_key=api_key)

@app.post("/api/chat")
async def chat_with_paradigm(req: ChatRequest):
    try:
        system_prompt = f"""You are Paradigm, the proprietary Assistant to Xavier.
Current App Context: {req.context}

STRICT RULES:
1. Be concise, use Xavier's preference method of speech, be direct, and use emojis.
2. USER PROFILE: Xavier, 17, first-year CS & Physics student at Nile University. Artist, gamer, tech enthusiast. Prefers brutal honesty, no sugarcoating.
3. COGNITIVE STYLE: Has inattentive ADHD. Use headers, bullet points, and 'Focus & Flow' formatting. Explain step-by-step with plain language.

COURSE MANAGEMENT SUPERPOWERS:
If Xavier asks to add, create, or remove a course, module, or topic, you MUST populate the 'action' field in your response.
- To add: action.type = "ADD_COURSE", action.payload = {{"name": "<Course Name>"}}
- To remove: action.type = "REMOVE_COURSE", action.payload = {{"name": "<Course Name>"}}
- If answering a question based on uploaded docs, leave 'action' null and just explain the concept.
"""
        
        messages = [SystemMessage(content=system_prompt)]
        
        # Debug: Log incoming request
        print(f"DEBUG: Received message: {req.message}")
        print(f"DEBUG: History length: {len(req.history)}")
        print(f"DEBUG: Context: {req.context}")
        
        for msg in req.history:
            if msg.role == "user":
                messages.append(HumanMessage(content=msg.text))
            elif msg.role == "ai":
                messages.append(AIMessage(content=msg.text))
        
        current_message = req.message if not req.context else f"Context: {req.context}\n\nUser: {req.message}"
        messages.append(HumanMessage(content=current_message))
        
        print(f"DEBUG: Total messages being sent to Groq: {len(messages)}")
        
        response = synapse.invoke(messages)
        
        return {"reply": response.content, "action": None}
    
    except Exception as e:
        error_msg = str(e)
        print(f"ERROR in /api/chat: {error_msg}")
        print(f"ERROR Type: {type(e).__name__}")
        return {"error": error_msg, "reply": "I'm having trouble connecting to my brain right now."}

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        content = await file.read()
        if file.filename.lower().endswith(".pdf"):
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
            extracted_text = "".join([page.extract_text() for page in pdf_reader.pages])
        else:
            extracted_text = content.decode("utf-8", errors="ignore")
        return {"extracted_text": extracted_text[:10000]}
    except Exception as e:
        return {"error": str(e), "extracted_text": ""}
