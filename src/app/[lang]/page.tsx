import { HomeWrapper } from "@/components/home/home-wrapper"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/dictionary"
//throw new Error("kha")
interface IProps {
  params: Promise<{ lang: Locale }>
}

export default async function Home(props: IProps) {
  const { lang } = await props.params
  const dict = await getDictionary(lang)
  return <HomeWrapper dict={dict.home} />
}
