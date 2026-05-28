import { SubscriberDetailsWrapper } from "@/components/subscribers/details-wrapper"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/dictionary"
import { getApi } from "@/utils/server-api"
import type { ISubscriber } from "@/types/subscriber-t"

interface IProps {
  params: Promise<{ lang: Locale }>
  searchParams: Promise<{ id?: string }>
}

export default async function SubscriberDetailsPage(props: IProps) {
  const { lang } = await props.params
  const { id } = await props.searchParams

  if (!id)
    return (
      <div className="p-6 text-muted-foreground">No subscriber selected.</div>
    )

  const subscriber = await getApi<ISubscriber>(`/api/subscribers/${id}`)

  if (!subscriber)
    return (
      <div className="p-6 text-muted-foreground">Subscriber not found.</div>
    )

  const dict = await getDictionary(lang)
  return <SubscriberDetailsWrapper subscriber={subscriber} dict={dict.subscribers} />
}
