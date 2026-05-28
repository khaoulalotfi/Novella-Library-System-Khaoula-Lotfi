import { ProfileForm } from "@/components/profile/profile-form"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/dictionary"
import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import { getApi } from "@/utils/server-api"
import { redirect } from "next/navigation"
import type { ISubscriber } from "@/types/subscriber-t"

interface IProps {
  params: Promise<{ lang: Locale }>
}

export default async function ProfilePage(props: IProps) {
  const { lang } = await props.params

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) redirect(`/${lang}/signin`)

  const subscribers = (await getApi<ISubscriber[]>("/api/subscribers")) ?? []
  const existing = subscribers.find((s) => s.email === session.user.email)

  if (existing) redirect(`/${lang}`)

  const dict = await getDictionary(lang)
  return <ProfileForm dict={dict.profile} />
}
