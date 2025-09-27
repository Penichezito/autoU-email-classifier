import os 
import openai
from typing import Dict, Tuple
import re
from dotenv import load_dotenv

load_dotenv()

class AIService:
    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        if self.openai_api_key:
            openai.api_key = self.openai_api_key

    async def classify_email(self, email_content: str) -> Dict[str, str]:
        """
        Classifica email e gera uma resposta sugerida
        """
        try:
            if self.openapi_api_key:
                return await self._classify_with_openai(email_content)
            else:
                return self._classify_with_rules(email_content)
        except Exception as e:
            print(f"Erro na classificação do email: {e}")
            return self._classify_with_rules(email_content)
        
    async def _classify_with_openai(self, email_content: str) -> Dict[str, str]:
        """ Classificação usando OpenAI GPT """
        
        prompt = f"""
        Você é um assistente que classifica emails como "Produtivo" ou "Improdutivo" e sugere uma resposta apropriada.

        - Produtivo: Emails que requerem ação ou resposta específica (suporte técnico, atualizações, dúvidas do sistema, clientes, orçamentos)
        - Improdutivo: Emails que não requerem ação (felicitações, agradecimentos, spam, promoções, newsletters, etc.)

        Email: {email_content}

        Responda no formato JSON:
        {{
            "classification": "Produtivo" ou "Improdutivo",
            "confidence": "Alta", "Média" ou "Baixa",
            "suggested_response": "Texto da resposta sugerida"
        }}
        """

        try:
            response = await openai.ChatCompletion.acreate(
                model="gpt-5",
                messages=[
                    {"role": "system", "content": "Você é um assistente especializado em classificação de emails corporativos."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.3
            )

            result_text = response.choices[0].message.content

            # Parsing do resulado JSON
            import json
            result = json.loads(result_text)

            return {
                "classification": result.get("classification", "Improdutivo"),
                "confidence": result.get("confidence", "Média"),
                "suggested_response": result.get("suggested_response", "Obrigado pela sua mensagem.")
            }

        except Exception as e:
            print(f"Erro na API OpenAI: {e}")
            return self._classify_with_rules(email_content)
    
    def __classify_with_rules(self, email_content: str) -> Dict[str, str]:
        """ Classificação baseada em regras (fallback) """

        email_lower = email_content.lower()

        # Palavras-chave para emails produtivos
        productive_keywords = [
            "suporte", "problema", "erro", "bug", "falha", "não funciona", "ajuda", "dúvida", "feedback", 
            "orçamento", "cliente", "projeto", "reunião", "prazo", "entrega", "contrato", "urgente", 
            "importante", "ação necessária", "follow-up", "atualização", "status", "confirmação", "pedido", "solicitação", "aprovação", "análise", "relatório", "deadline"
        ]
        
        # Palavras-chave para emails improdutivos
        unproductive_keywords = [
            "parabéns", "felicitações", "obrigado", "agradecimento", "spam", "promoção", "desconto", 
            "oferta", "newsletter", "convite", "evento", "social", "festa", "aniversário", "boas festas",
            "cumprimentos", "saudações", "feliz natal", "feliz ano novo"
        ]

        productive_score = sum(1 for word in productive_keywords if word in email_lower)
        unproductive_score = sum(1 for word in unproductive_keywords if word in email_lower)

        if productive_score > unproductive_score:
            classification = "Produttivo"
            suggested_response = "Obrigado pelo seu email. Recebemos sua mensagem e entraremmos contato em breve."
            confidence = "Alta" if productive_score >= 3 else "Média"
        else:
            classification = "Improduttivo"
            suggested_response = "Obrigado pelo seu email. Agradecemos o contato."
            confidence = "Baixa"

        return {
            "classification": classification,
            "confidence": confidence,
            "suggested_response": suggested_response
        }
    