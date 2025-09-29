# AutoU Email Classifier

Sistema inteligente de classificação automática de emails usando IA.

## 🚀 Demo

[Link da aplicação deployada]

## 🛠️ Tecnologias

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Python FastAPI, SQLAlchemy
- **Banco:** PostgreSQL
- **IA:** OpenAI GPT-5 + regras de fallback
- **Deploy:** Docker + AWS ECS/GCP Cloud Run

## 🏃‍♂️ Execução Local

\`\`\`bash
# Clonar repositório
git clone <your-repo-url>
cd email-classifier

# Configurar as variáveis de ambiente 

# .env.example
# OpenAI API Key (opcional - usa regras se não fornecida)
OPENAI_API_KEY=your_openai_api_key_here

# Database
DATABASE_URL=postgresql://autou_user:autou_pass@localhost:5432/autou_emails

# AWS (para deploy)
AWS_ACCOUNT_ID=123456789012
AWS_REGION=us-east-1

# BackEnd Com Localhost
pip install -r requirements.txt
uvicorn main:app --reload

# Acessar Backend com Swagger
http://localhost:8000/docs 

# Com Docker Compose (recomendado)
docker-compose up -d

# FrontEnd
cd frontend
npm install
npm run dev
# Acessar em http://localhost:3000
\`\`\`

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

## 🎥 Vídeo Demonstrativo

[Link do YouTube]