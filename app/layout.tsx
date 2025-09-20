import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Sidebar } from "@/components/sidebar"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Legal Document Simplification Platform",
  description: "AI-powered legal document analysis and simplification",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex h-screen bg-background">
            <Sidebar />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
