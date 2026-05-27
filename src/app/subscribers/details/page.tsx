import { SubscriberDetailsWrapper } from "@/components/subscribers/details-wrapper";
import { getApi } from "@/utils/server-api";
import type { ISubscriber } from "@/types/subscriber-t";

interface IProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function SubscriberDetailsPage({ searchParams }: IProps) {
  const { id } = await searchParams;

  if (!id)
    return (
      <div className="p-6 text-muted-foreground">No subscriber selected.</div>
    );

  const subscriber = await getApi<ISubscriber>(`/api/subscribers/${id}`);

  if (!subscriber)
    return (
      <div className="p-6 text-muted-foreground">Subscriber not found.</div>
    );

  return <SubscriberDetailsWrapper subscriber={subscriber} />;
}
