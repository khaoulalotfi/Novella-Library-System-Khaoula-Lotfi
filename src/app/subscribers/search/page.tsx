import { SubscriberSearchWrapper } from "@/components/subscribers/search-wrapper"
import { getApi } from "@/utils/server-api"
import { dict } from "@/dictionaries/en"
import type { ISubscriber } from "@/types/subscriber-t"

export default async function SubscriberSearchPage() {
  const subscribers = (await getApi<ISubscriber[]>("/api/subscribers")) ?? []
  return <SubscriberSearchWrapper subscribers={subscribers} dict={dict.subscribers} />
}
