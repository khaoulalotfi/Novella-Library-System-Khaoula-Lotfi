import { SignIn } from "@/components/auth/signin"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/dictionary"

interface IProps {
  params: Promise<{ lang: Locale }>
}

export default async function SignInPage(props: IProps) {
  const { lang } = await props.params
  const dict = await getDictionary(lang)
  return <SignIn lang={lang} dict={dict.auth} />
}
