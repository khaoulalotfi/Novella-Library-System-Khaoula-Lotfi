import { ProfileForm } from "@/components/profile/profile-form";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { getApi } from "@/utils/server-api";
import { redirect } from "next/navigation";
import type { ISubscriber } from "@/types/subscriber-t";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/signin");

  const subscribers =
    (await getApi<ISubscriber[]>({ url: "/api/subscribers" })) ?? [];
  const existing = subscribers.find((s) => s.email === session.user.email);

  if (existing) redirect("/");

  return <ProfileForm />;
}
