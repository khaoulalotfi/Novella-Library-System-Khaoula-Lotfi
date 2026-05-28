import { PublishersWrapper } from "@/components/publishers/wrapper"
import { getApi } from "@/utils/server-api"
import { dict } from "@/dictionaries/en"
import type { IPublisher } from "@/types/publisher-t"

export default async function PublishersListPage() {
  const publishers = (await getApi<IPublisher[]>("/api/publishers")) ?? []
  return <PublishersWrapper publishers={publishers} dict={dict.publishers} />
}
