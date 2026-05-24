import { SubscriberWrapper } from "@/components/subscribers/wrapper";
import { getApi } from "@/utils/server-api";
import type { ISubscriber } from "@/types/subscriber-t";

export default async function SubscribersPage() {
  const subscribers =
    (await getApi<ISubscriber[]>({ url: "/api/subscribers" })) ?? [];
  return <SubscriberWrapper subscribers={subscribers} />;
}
