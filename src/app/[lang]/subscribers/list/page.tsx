import { SubscriberWrapper } from "@/components/subscribers/wrapper"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/dictionary"
import { getApi } from "@/utils/server-api"
import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import { Role } from "@/constants/role"
import type { ISubscriber } from "@/types/subscriber-t"

interface IProps {
  params: Promise<{ lang: Locale }>
}

export default async function SubscriberListPage(props: IProps) {
  const { lang } = await props.params

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isAdmin = session?.user.role === Role.Administrator

  const subscribers = (await getApi<ISubscriber[]>("/api/subscribers")) ?? []

  const dict = await getDictionary(lang)

  return (
    <SubscriberWrapper
      subscribers={subscribers}
      isAdmin={isAdmin}
      dict={dict.subscribers}
    />
  )
}
