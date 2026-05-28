import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/dictionary"
import { StoreProvider } from "@/components/providers/store-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { ReactNode } from "react"

interface IProps {
  children: ReactNode
  params: Promise<{ lang: string }>
}

export default async function LangLayout(props: IProps) {
  const { lang } = await props.params
  const dict = await getDictionary(lang as Locale)

  return (
    <StoreProvider>
      <Header lang={lang as Locale} dict={dict} />
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-6 py-6">
        {props.children}
      </main>
      <Footer dict={dict.footer} />
    </StoreProvider>
  )
}
