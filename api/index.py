from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import io
import PyPDF2
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

app = FastAPI()

# ── CORS — allows Vercel frontend to call this Render backend ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: str
    text: str

class ChatRequest(BaseModel):
    message: str
    history: List[ChatMessage] = []
    context: str = ""

api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY is missing!")

synapse = ChatGroq(temperature=0.7, model_name="llama-3.3-70b-versatile", api_key=api_key)

@app.post("/api/chat")
async def chat_with_paradigm(req: ChatRequest):
    try:
        print(f"DEBUG: Received message: {req.message}")
        print(f"DEBUG: History length: {len(req.history)}")
        print(f"DEBUG: Context: {req.context}")

        conversation_history = ""
        for msg in req.history[-5:]:
            conversation_history += f"{msg.role.upper()}: {msg.text}\n"

        print(f"DEBUG: Total messages being sent to Groq: {len(req.history) + 2}")

        system_prompt = f"""You are Paradigm, Xavier's study assistant.

Your core job: understand what Xavier needs and deliver it exactly how he wants it.

ADAPTABILITY:
- If Xavier asks for a casual explanation, be casual
- If he wants technical depth, go deep
- If he says "explain like I'm 5", simplify ruthlessly
- If he says "talk like Claude" or gives style instructions, follow them exactly
- Understand his tone preferences from context
- Adjust based on what he's actually asking for

COMMUNICATION:
- Conversational, natural, no fluff
- Plain English, get to the point
- Explain WHY things work, not just WHAT they are
- Use examples that make sense
- Break complex ideas into smaller pieces
- Ask clarifying questions when needed
- Write like a real person, not an AI
- No excessive formatting, headers, or markdown unless he asks for it

CONTEXT AWARENESS:
- Pay attention to what Xavier is studying (physics, math, CS, design, etc.)
- Remember what he's already asked about in this conversation
- Don't repeat explanations unnecessarily
- Connect ideas across topics when relevant
- Know his interests (gaming, anime, art, denim, IEMs, streetwear, soulslike) and use them for analogies
- Consider his ADHD — be concise but thorough, break things into digestible chunks
- If he mentions a course (PHY 102, MTH 102, etc.), tailor explanations to that level

SPECIAL INSTRUCTIONS:
- If Xavier gives explicit instructions on how to talk or explain, follow them exactly
- He prefers brutally honest, no sugarcoating
- He values direct feedback
- Don't be overly cheerful or fake

COURSE MANAGEMENT SUPERPOWERS:
If Xavier asks to add, create, or remove a course, module, or topic, you MUST populate the 'action' field in your response.
- To add: action.type = "ADD_COURSE", action.payload = {{"name": "<Course Name>"}}
- To remove: action.type = "REMOVE_COURSE", action.payload = {{"name": "<Course Name>"}}
- If answering a question based on uploaded docs, leave 'action' null and just explain the concept.

CONVERSATION CONTEXT:
{conversation_history}

STUDY CONTEXT:
{req.context}

Respond naturally. Understand what he needs and deliver it his way.
"""

        messages = [SystemMessage(content=system_prompt)]

        for msg in req.history:
            if msg.role == "user":
                messages.append(HumanMessage(content=msg.text))
            elif msg.role == "ai":
                messages.append(AIMessage(content=msg.text))

        messages.append(HumanMessage(content=req.message))

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
