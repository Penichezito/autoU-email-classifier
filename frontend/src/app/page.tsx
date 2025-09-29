'use client'

import { useState } from "react";
import Emailuploader from "./components/EmailUploader";
import ResultDisplay from "./components/ResultDisplay";
import { ClassificationResult } from "../types/email";
import { Mail, Brain, Zap } from "lucide-react";

export default function Home() {
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AutoU Email Classifier</h1>
              <p className="text-sm text-gray-600">Sistema inteligente de classificação de emails</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Features Banner */}
        {!result && (
          <div className="mb-8 grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-800">IA Avançada</span>
              </div>
              <p className="text-sm text-gray-600">
                Classificação inteligente de email usando algortimos de NLP
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-800">Processamento Rápido</span>
              </div>
              <p className="text-sm text-gray-600">
                Análise instantânea de emails e sugestões automáticas
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-800">Múltiplos Formatos</span>
              </div>
              <p className="text-sm text-gray-600">
                Suporte para  TXT, PDF, DOCX E Texto direto
              </p>
            </div>
          </div>
        )}

        {/* Email Uploader */}
        <Emailuploader
          onResult={setResult}
          loading={loading}
          setLoading={setLoading}
        />

        {/* Results Display */}
        {result && <ResultDisplay result={result} />}

        {/* New Analysis Button */}
        {result && !loading && (
          <div>
            <button
              onClick={() => setResult(null)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Nova Análise
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer>
        <div>
          <p>
            Desenvolvido por Tiago Peniche para o <strong>aDesafio AutoU</strong> - 
            Sistema de Classificação Automática de Emails
          </p>
        </div>
      </footer>
    </div>
  );
}