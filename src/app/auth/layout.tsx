import React from "react"
import '@resources/styles/pages/auth.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="auth-container">
      {children}
    </main>
  )
}
