import { Register } from "@/components/auth/register"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/dictionary"

interface IProps {
  params: Promise<{ lang: Locale }>
}

export default async function SignUpPage(props: IProps) {
  const { lang } = await props.params
  const dict = await getDictionary(lang)
  return <Register lang={lang} dict={dict.auth} />
}
