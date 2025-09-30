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
            confidence=ai_result.get("confidence"), # .get() para segurança
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
            "confidence": ai_result.get("confidence"),
            "processed_at": email_record.processed_at.isoformat()
        }

    def extract_text_from_file(self, file_content: bytes, filename: str) -> str:
        """ Extrai o texto de um arquivo (PDF, DOCX, TXT) """
        file_extension = filename.lower().split('.')[-1]

        if file_extension == "pdf":
            return self._extract_from_pdf(file_content)
        elif file_extension == "txt":
            # ## CORREÇÃO: Adicionado errors="ignore" para lidar com diferentes codificações de texto.
            return file_content.decode("utf-8", errors="ignore")
        elif file_extension in ["doc", "docx"]:
            return self._extract_from_docx(file_content)
        else:
            raise ValueError(f"Formato de arquivo não suportado: {file_extension}")

    def _extract_from_pdf(self, file_content: bytes) -> str:
        """ Extrai texto de um arquivo PDF """
        text = ""
        try:
            pdf_file = io.BytesIO(file_content)
            reader = PyPDF2.PdfReader(pdf_file)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text
        except Exception as e:
            print(f"Erro ao ler PDF: {e}")
            # Tenta uma decodificação forçada como último recurso
            return file_content.decode('latin-1', errors='ignore')
        return text

    def _extract_from_docx(self, file_content: bytes) -> str:
        """Extrai texto de um arquivo DOCX"""
        text = ""
        try:
            doc_file = io.BytesIO(file_content)
            doc = docx.Document(doc_file)
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
        except Exception as e:
            print(f"Erro ao ler DOCX: {e}")
            return ""
        return text

