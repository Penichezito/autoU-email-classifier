from sqlalchemy.orm import Session
from app.models.email import EmailClassification
from app.services.ai_service import AIService
from typing import Dict, Optional
import PyPDF2
import docx
import io

class EmailService:
    def __init__(self):
        self.ai_service = AIService()

    async def process_email(
            self,
            content: str,
            db: Session,
            file_name: Optional[str] = None,
            is_from_file: bool = False
    ) -> Dict:
        """ Processa o conteúdo do email, classifica e salva no banco de dados"""

        # Classificação usando IA
        ai_result = await self.ai_service.classify_email(content)

       # Salvar no banco de dados
        email_record = EmailClassification(
            original_text=content,
            classification=ai_result["classification"],
            suggested_response=ai_result["suggested_response"], 
            confidence_score=ai_result["confidence"], 
            file_name=file_name,
            is_from_file=is_from_file
        )

        db.add(email_record)
        db.commit()
        db.refresh(email_record)

        return {
            "id": email_record.id,
            "classification": ai_result["classification"],
            "suggested_response": ai_result["suggested_response"],
            "confidence": ai_result["confidence"],
            "processed_at": email_record.processed_at.isoformat() 
        }
    
    def extract_text_from_file(self, file_content: bytes, filename: str) -> str:
        """ Extrai o texto de um arquivo PDF ou TXT """
        file_extension = filename.lower().split('.')[-1]

        if file_extension == "pdf":
            return self._extract_from_pdf(file_content)
        elif file_extension == "txt":
            return file_content.decode("utf-8")
        elif file_extension in ["doc","docx"]:
            return self._extract_from_docx(file_content)
        else:
            raise ValueError("Formato de arquivo não suportado: {file_extension}")
        
    def _extract_from_pdf(self, file_content: bytes) -> str:
        """ Extrai texto de um arquivo PDF """
        pdf_file = io.BytesIO(file_content)
        reader = PyPDF2.PdfReader(pdf_file)

        text = ""
        for page in reader.pages:
            text += page.extract_text()

        return text
    
    def _extract_from_docx(self, file_content: bytes) -> str:
        """Extrai texto de um arquivo DOCX"""
        doc_file = io.BytesIO(file_content)
        doc = docx.Document(doc_file)

        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"

        return text