import { PublishersWrapper } from "@/components/publishers/wrapper"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/dictionary"
import { getApi } from "@/utils/server-api"
import type { IPublisher } from "@/types/publisher-t"

interface IProps {
  params: Promise<{ lang: Locale }>
}

export default async function PublishersListPage(props: IProps) {
  const { lang } = await props.params
  const publishers = (await getApi<IPublisher[]>("/api/publishers")) ?? []
  const dict = await getDictionary(lang)
  return <PublishersWrapper publishers={publishers} dict={dict.publishers} />
}
