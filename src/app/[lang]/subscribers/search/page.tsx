import { SubscriberSearchWrapper } from "@/components/subscribers/search-wrapper"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/dictionary"
import { getApi } from "@/utils/server-api"
import type { ISubscriber } from "@/types/subscriber-t"

interface IProps {
  params: Promise<{ lang: Locale }>
}

export default async function SubscriberSearchPage(props: IProps) {
  const { lang } = await props.params
  const subscribers = (await getApi<ISubscriber[]>("/api/subscribers")) ?? []
  const dict = await getDictionary(lang)
  return <SubscriberSearchWrapper subscribers={subscribers} dict={dict.subscribers} />
}
