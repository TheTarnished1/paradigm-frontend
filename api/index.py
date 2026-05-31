from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
import os
import io
import PyPDF2
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

app = FastAPI()

# THE AI'S STRUCTURED BRAIN
class ActionPayload(BaseModel):
    type: str = Field(description="Action to perform: 'ADD_COURSE' or 'REMOVE_COURSE'")
    payload: Dict[str, Any] = Field(description="Data for action, e.g., {'name': 'Mandarin 101'}")

class ParadigmResponse(BaseModel):
    reply: str = Field(description="Your conversational response to Pascal.")
    action: Optional[ActionPayload] = Field(default=None, description="Include ONLY if user explicitly asks to add/remove a course.")

class ChatMessage(BaseModel):
    role: str
    text: str

class ChatRequest(BaseModel):
    message: str
    history: List[ChatMessage]
    context: str = ""

api_key = os.environ.get("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is not set in environment variables")

synapse = ChatGroq(
    temperature=0.1,
    model_name="llama3-8b-8192",
    api_key=api_key
)
structured_synapse = synapse.with_structured_output(ParadigmResponse)

# ENDPOINT 1: THE CHAT & ACTION BRAIN
@app.post("/api/chat")
async def chat_with_paradigm(req: ChatRequest):
    system_instruction = f"""
    You are Paradigm, the proprietary Assistant to Pascal.
    Current App Context: {req.context}
    
    STRICT RULES:
    1. Be concise, use my preference mothod of speech, be direct, and use emojis.
    2. USER PROFILE: Pascal, 17, CS & Physics student at Nile University.
    3. COGNITIVE STYLE: Has inattentive ADHD. Use headers, bullet points, and 'Focus & Flow' formatting.
       
    COURSE MANAGEMENT SUPERPOWERS:
    If Pascal asks to add, create, or remove a course, module, or topic, you MUST populate the 'action' field in your response.
    - To add: action.type = "ADD_COURSE", action.payload = {{"name": "<Course Name>"}}
    - To remove: action.type = "REMOVE_COURSE", action.payload = {{"name": "<Course Name>"}}
    - If answering a question based on uploaded docs, leave 'action' null and just explain the concept.
    """
    
    full_history = [SystemMessage(content=system_instruction)]
    
    for msg in req.history:
        if msg.text and msg.text.strip():
            if msg.role == "user":
                full_history.append(HumanMessage(content=msg.text))
            elif msg.role == "ai":
                full_history.append(AIMessage(content=msg.text))
            
    full_history.append(HumanMessage(content=req.message))
            
    response: ParadigmResponse = structured_synapse.invoke(full_history)
    
    return {
        "reply": response.reply,
        "action": response.action.dict() if response.action else None
    }

# ENDPOINT 2: THE PDF & DOCUMENT READER
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