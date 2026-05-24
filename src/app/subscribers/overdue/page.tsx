import { OverdueWrapper } from "@/components/subscribers/overdue-wrapper";
import { getApi } from "@/utils/server-api";
import type { ILoan } from "@/types/subscriber-t";
import type { ISubscriber } from "@/types/subscriber-t";
import type { IBook } from "@/types/book-t";

export default async function OverduePage() {
  const [loans, subscribers, books] = await Promise.all([
    getApi<ILoan[]>({ url: "/api/loans?filter=overdue" }).then((r) => r ?? []),
    getApi<ISubscriber[]>({ url: "/api/subscribers" }).then((r) => r ?? []),
    getApi<IBook[]>({ url: "/api/books" }).then((r) => r ?? []),
  ]);

  return (
    <OverdueWrapper loans={loans} subscribers={subscribers} books={books} />
  );
}
