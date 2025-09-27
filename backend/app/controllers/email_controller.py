from fastapi import UploadFile, HTTPException
from sqlalchemy.orm import Session
from app.services.email_service import EmailService
from typing import Dict, Optional

class EmailController:
    def __init__(self):
        self.email_service = EmailService()
    
    async def classify_email(
        self, 
        file: Optional[UploadFile],
        text: Optional[str],
        db: Session
    ) -> Dict:
        """ Endpoint para classificar email a partir de texto ou arquivo """

        if not file and not text:
            raise HTTPException(
                status_code=400, 
                detail="É necessário fornecer um arquivo ou texto para classificação."
            )

        email_content = ""
        file_name = None
        is_from_file = False

        # Processar arquivo se fornecido
        if file:
            if file.size > 5 * 1024 *1024: # Limite de 5MB
                raise HTTPException(
                    status_code=400, 
                    detail=" Arquivo muito grande. Tamanho máximo permitido: 5MB."
                )
            
            try:
                file_content = await file.read()
                email_content = self.email_service.extract_text_from_file(file_content, file.filename)
                file_name = file.filename
                is_from_file = True
            
            except Exception as e:
                raise HTTPException(
                    status_code=500, 
                    detail=f"Erro ao processar o arquivo: {str(e)}"
                )
        
        # Usar texto caso fornecido
        if text:
            email_content = text
        
        if not email_content.strip():
            raise HTTPException(
                status_code=400,
                detail="Conteúdo do email está vazio"
            )
        
        try:
            result = await self.email_service.process_email(
                email_content, db, file_name, is_from_file
            )
            return result
        
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Erro ao classificar o email: {str(e)}"
            )