import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Layout } from "@widgets/layout"
import { Header } from "@widgets/header"
import "@shared/assets/globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SmartJSON API",
  description: "Frontend service for SmartJSON API",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Layout header={<Header />}>{children}</Layout>
      </body>
    </html>
  )
}
