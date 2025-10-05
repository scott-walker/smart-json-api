import type { Metadata } from "next"
import { Inter, Nunito_Sans, Geist_Mono } from "next/font/google"
import { Layout } from "@widgets/layout"
import { Header } from "@widgets/header"
import "@shared/assets/global.css"

const fontDisplaySans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["cyrillic"],
})
const fontSans = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic"],
})
const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["cyrillic"],
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
    <html lang="ru">
      <body className={`${fontDisplaySans.variable} ${fontSans.variable} ${fontMono.variable} antialiased`}>
        <Layout header={<Header />}>{children}</Layout>
      </body>
    </html>
  )
}
