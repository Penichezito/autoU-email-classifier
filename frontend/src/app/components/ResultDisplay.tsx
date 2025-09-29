'use client';

import { ClassificationResult } from '@/types/email';
import { CheckCircle, AlertCircle, Copy, Calendar } from 'lucide-react';

interface ResultDisplayProps {
  result: ClassificationResult;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const isProductive = result.classification === 'Produtivo';
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Resultado da Análise</h3>
      
      {/* Classification Result */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={`
            p-4 rounded-lg border-2 
            ${isProductive 
              ? 'bg-red-50 border-red-200' 
              : 'bg-green-50 border-green-200'
            }
          `}>
            <div className="flex items-center gap-3 mb-2">
              {isProductive ? (
                <AlertCircle className="h-5 w-5 text-red-600" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              <span className={`
                font-semibold text-lg
                ${isProductive ? 'text-red-800' : 'text-green-800'}
              `}>
                {result.classification}
              </span>
            </div>
            
            <p className={`
              text-sm
              ${isProductive ? 'text-red-700' : 'text-green-700'}
            `}>
              {isProductive 
                ? 'Este email requer ação ou resposta específica'
                : 'Este email não necessita ação imediata'
              }
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-600">Confiança:</span>
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${result.confidence === 'Alta' 
                  ? 'bg-green-100 text-green-800'
                  : result.confidence === 'Média'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
                }
              `}>
                {result.confidence}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>Processado em: {formatDate(result.processed_at)}</span>
            </div>
          </div>
        </div>

        {/* Suggested Response */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-blue-800">Resposta Sugerida</h4>
              <button
                onClick={() => copyToClipboard(result.suggested_response)}
                className="p-1 hover:bg-blue-100 rounded transition-colors"
                title="Copiar resposta"
              >
                <Copy className="h-4 w-4 text-blue-600" />
              </button>
            </div>
            
            <p className="text-blue-700 text-sm leading-relaxed">
              {result.suggested_response}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600">
              💡 <strong>Dica:</strong> Esta resposta é uma sugestão baseada na classificação automática. 
              Revise antes de enviar para garantir adequação ao contexto específico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}