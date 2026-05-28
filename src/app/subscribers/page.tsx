import { SubscriberWrapper } from "@/components/subscribers/wrapper"
import { getApi } from "@/utils/server-api"
import { dict } from "@/dictionaries/en"
import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import { Role } from "@/constants/role"
import type { ISubscriber } from "@/types/subscriber-t"

export default async function SubscribersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isAdmin = session?.user.role === Role.Administrator

  const subscribers = (await getApi<ISubscriber[]>("/api/subscribers")) ?? []

  return (
    <SubscriberWrapper
      subscribers={subscribers}
      isAdmin={isAdmin}
      dict={dict.subscribers}
    />
  )
}
