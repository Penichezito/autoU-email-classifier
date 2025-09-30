import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AutoU Email Classifier - Classificação Inteligente de Emails',
  description: 'Sistema inteligente de classificação automática de emails com IA. Desenvolvido por Tiago Peniche para o Desafio AutoU.',
  keywords: ['email', 'classificação', 'IA', 'AutoU', 'NLP', 'machine learning'],
  authors: [{ name: 'Tiago Peniche' }],
  openGraph: {
    title: 'AutoU Email Classifier',
    description: 'Sistema inteligente de classificação de emails com IA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}