import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationWrapper from './components/NavigationWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Grupo Metal',
  description: 'Official website of Grupo Metal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Metal+Mania&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} relative min-h-screen bg-black text-white antialiased selection:bg-rose selection:text-white`}>
        <div className="flex flex-col min-h-screen">
          <NavigationWrapper />
          <main className="flex-grow relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}