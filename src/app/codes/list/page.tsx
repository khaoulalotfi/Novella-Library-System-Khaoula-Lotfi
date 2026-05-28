import { CodesWrapper } from "@/components/codes/wrapper"
import { getApi } from "@/utils/server-api"
import { dict } from "@/dictionaries/en"
import type { ICode } from "@/types/code-t"

export default async function CodesListPage() {
  const codes = (await getApi<ICode[]>("/api/codes")) ?? []
  return <CodesWrapper codes={codes} dict={dict.codes} />
}
