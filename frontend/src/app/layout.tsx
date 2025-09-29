import type { Metadata } from 'next'
import { Inter, Poppins, Bangers } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
// const poppins = Poppins({ subsets: ['latin'], weight: '400' })
// const bangers = Bangers({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'AutoU Email Classifier',
  description: 'Sistema inteligente de classificação de emails com IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}