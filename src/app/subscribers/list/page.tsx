import { SubscriberWrapper } from "@/components/subscribers/wrapper";
import { getApi } from "@/utils/server-api";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { Role } from "@/constants/role";
import type { ISubscriber } from "@/types/subscriber-t";

export default async function SubscriberListPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAdmin = session?.user.role === Role.Administrator;

  const subscribers =
    (await getApi<ISubscriber[]>({ url: "/api/subscribers" })) ?? [];

  return <SubscriberWrapper subscribers={subscribers} isAdmin={isAdmin} />;
}
