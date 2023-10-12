import NextAuthProvider from '@/lib/auth/Provider'
import '@resources/styles/global.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chatterbox',
  description: 'An application to chat with friends',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={[inter.className, ''].join(' ')}>
        {children}
      </body>
    </html>
  )
}