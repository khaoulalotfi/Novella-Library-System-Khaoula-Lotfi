import { CodesWrapper } from "@/components/codes/wrapper"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/dictionary"
import { getApi } from "@/utils/server-api"
import type { ICode } from "@/types/code-t"

interface IProps {
  params: Promise<{ lang: Locale }>
}

export default async function CodesListPage(props: IProps) {
  const { lang } = await props.params
  const codes = (await getApi<ICode[]>("/api/codes")) ?? []
  const dict = await getDictionary(lang)
  return <CodesWrapper codes={codes} dict={dict.codes} />
}
