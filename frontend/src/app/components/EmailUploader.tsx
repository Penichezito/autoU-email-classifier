'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Send, Trash2 } from 'lucide-react';
import { ClassificationResult } from '@/types/email';

interface EmailUploaderProps {
  onResult: (result: ClassificationResult) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function EmailUploader({ onResult, loading, setLoading }: EmailUploaderProps) {
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      setTextInput(''); // Clear text input when file is selected
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    maxSize: 5242880 // 5MB
  });

  const handleSubmit = async () => {
    if (!textInput.trim() && !selectedFile) {
      alert('Por favor, insira um texto ou selecione um arquivo.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      
      if (textInput.trim()) {
        formData.append('text', textInput);
      }

      // Usar /api prefix que é reescrito pelo Next.js
      const apiUrl = '/api/classify-email';

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || 'Erro na classificação');
      }

      const result: ClassificationResult = await response.json();
      onResult(result);

    } catch (error) {
      console.error('Erro:', error);
      alert(`Erro ao processar email: ${error instanceof Error ? error.message : 'Tente novamente.'}`);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setTextInput('');
    setSelectedFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Classificador de Emails
        </h2>
        <p className="text-gray-600">
          Faça upload de um arquivo ou cole o texto do email para análise automática
        </p>
      </div>

      {/* File Upload Area */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        
        {selectedFile ? (
          <div className="text-sm">
            <p className="font-medium text-gray-700">Arquivo selecionado:</p>
            <p className="text-gray-500">{selectedFile.name}</p>
            <p className="text-xs text-gray-400 mt-1">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        ) : (
          <div className="text-sm text-gray-600">
            <p>Arraste e solte um arquivo aqui, ou clique para selecionar</p>
            <p className="text-xs text-gray-400 mt-1">
              Suporta: .txt, .pdf, .docx (máx. 5MB)
            </p>
          </div>
        )}
      </div>

      {/* Text Input Area */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ou cole o texto do email diretamente:
        </label>
        <textarea
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value);
            if (e.target.value.trim()) {
              setSelectedFile(null); // Clear file when text is entered
            }
          }}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Cole aqui o conteúdo do email..."
        />
        <p className="text-xs text-gray-500 mt-1">
          {textInput.length} / 10000 caracteres
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading || (!textInput.trim() && !selectedFile)}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processando...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Classificar Email
            </>
          )}
        </button>
        
        <button
          onClick={clearAll}
          disabled={loading}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="h-4 w-4" />
          Limpar
        </button>
      </div>
    </div>
  );
}