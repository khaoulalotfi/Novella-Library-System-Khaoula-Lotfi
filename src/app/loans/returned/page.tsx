import { ReturnedWrapper } from "@/components/loans/returned-wrapper";
import { getApi } from "@/utils/server-api";
import type { ILoan } from "@/types/subscriber-t";
import type { ISubscriber } from "@/types/subscriber-t";
import type { IBook } from "@/types/book-t";

export default async function LoansReturnedPage() {
  const [loans, subscribers, books] = await Promise.all([
    getApi<ILoan[]>({ url: "/api/loans?filter=returned" }).then((r) => r ?? []),
    getApi<ISubscriber[]>({ url: "/api/subscribers" }).then((r) => r ?? []),
    getApi<IBook[]>({ url: "/api/books" }).then((r) => r ?? []),
  ]);

  return (
    <ReturnedWrapper loans={loans} subscribers={subscribers} books={books} />
  );
}
