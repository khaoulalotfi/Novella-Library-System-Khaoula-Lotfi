import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StoreProvider } from "@/components/providers/store-provider"
import type { ReactNode } from "react"
import { Noto_Sans } from "next/font/google"
import { cn } from "@/lib/utils"

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Khaoula Library System",
  description: "Manage books, subscribers, and loans.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className={cn("dark font-sans", notoSans.variable)}>
      <body className="bg-background min-h-screen flex flex-col">
        <StoreProvider>
          <Header />
          <main className="flex-1 w-full max-w-screen-xl mx-auto px-6 py-4">
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}