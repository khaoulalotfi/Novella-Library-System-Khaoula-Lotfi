import { CodesWrapper } from "@/components/codes/wrapper"
import { getApi } from "@/utils/server-api"
import type { ICode } from "@/types/code-t"

export default async function CodesListPage() {
  const codes = (await getApi<ICode[]>("/api/codes")) ?? []
  return <CodesWrapper codes={codes} />
}
