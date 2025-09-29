from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os
from dotenv import load_dotenv

from app.controllers.email_controller import EmailController
from app.database.connection import get_db
from sqlalchemy.orm import Session

load_dotenv()

app = FastAPI(
    title="AutoU Email Classifier",
    description="Sistema de classificação automática de emails com IA",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

email_controller = EmailController()

@app.get("/")
async def root():
    return {"message": "AutoU Email Classifier API", "status": "active"}

@app.post('/classify-email')
async def classifiy_email(
    file: UploadFile = File(None),
    text: str = Form(None), 
    db: Session = Depends(get_db)
):
    try: 
        result = await email_controller.classify_email(file, text, db)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
