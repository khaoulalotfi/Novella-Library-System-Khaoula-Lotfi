import type { Metadata } from "next"
import "./globals.css"
import type { ReactNode } from "react"
import { Noto_Sans } from "next/font/google"
import { cn } from "@/lib/utils"
import { headers } from "next/headers"

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Novella Library System",
  description: "Manage books, subscribers, and loans.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  // Locale is set by middleware via x-lang header
  const lang = (await headers()).get("x-lang") ?? "en"

  return (
    <html lang={lang} className={cn("dark font-sans", notoSans.variable)}>
      <body className="bg-background min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
