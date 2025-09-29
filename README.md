# AutoU Email Classifier by Tiago Peniche

Sistema inteligente de classificação automática de emails usando IA.

## 🚀 Demo

[Link da aplicação deployada]

## 🛠️ Tecnologias

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Python FastAPI, SQLAlchemy
- **Banco:** PostgreSQL
- **IA:** OpenAI GPT-5 + regras de fallback
- **Deploy:** Docker + AWS ECS/GCP Cloud Run

## 📊 Funcionalidades

- ✅ Classificação automática (Produtivo/Improdutivo)
- ✅ Sugestões de resposta personalizadas
- ✅ Upload de arquivos (PDF, TXT, DOCX)
- ✅ Interface moderna e responsiva
- ✅ Processamento em tempo real

# 🎯 Destaques da Solução

## Arquitetura Profissional

- ✅Padrão MVC bem definido
- ✅Monólito modular com separação clara de responsabilidades
- ✅TypeScript + Next.js 14 com Tailwind CSS
- ✅FastAPI + SQLAlchemy com PostgreSQL
- ✅Docker para orquestração do app

## Funcionalidades Avançadas

- ✅Upload por drag & drop
- ✅Processamento de múltiplos formatos (PDF, TXT, DOCX)
- ✅IA com fallback inteligente (OpenAI + regras)
- ✅Interface moderna e responsiva
- ✅Sistema de confiança na classificação

## Deploy e DevOps

- ✅Docker containers otimizados
- ✅Scripts de deploy para AWS/GCP
- ✅Configuração de ambiente flexível
- ✅Pronto para produção

## 🏃‍♂️ Intruções para Execução da Aplicação

\`\`\`bash
## Clonar repositório
git clone <your-repo-url>
cd email-classifier

## Configurar as variáveis de ambiente 

### .env.example
### OpenAI API Key (opcional - usa regras se não fornecida)
``
OPENAI_API_KEY=your_openai_api_key_here
``
### Database
DATABASE_URL=postgresql://autou_user:autou_pass@localhost:5432/autou_emails

### AWS (para deploy)

- AWS_ACCOUNT_ID=123456789012
- AWS_REGION=us-east-1
  
### Criar ambiente virtual (altamente recomendado)
``
python -m venv venv
``
### Ativar Virtual Env
- Windows
``
venv/Scripts/activate
``
- Linux
``
source venv/bin/activate
``

### Comando para instalar as dependecias
``
pip install -r requirements.txt
``

### Comando para rodar a aplicação FastAPI localmente
uvicorn main:app --reload
``

### AcessarDocumentação API com Swagger ou Redocs
http://localhost:8000/docs 
http://localhost:8000/redocs

### Comando para rodar a aplicação com Docker Compose (recomendado)
``
docker-compose up --d
``
### FrontEnd
``
cd frontend
``

-----------
### Instalar dependencias do projeto
``
npm install
``

-----------

### Comando para Rodar projeto
``
npm run dev
``

-----------
- Acessar em http://localhost:3000
\`\`\`


## 🎥 Vídeo Demonstrativo

[Link do YouTube]
