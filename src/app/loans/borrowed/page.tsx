import { LoansBorrowedWrapper } from "@/components/loans/borrowed-wrapper";
import { getApi } from "@/utils/server-api";
import type { ILoan } from "@/types/subscriber-t";
import type { ISubscriber } from "@/types/subscriber-t";
import type { IBook } from "@/types/book-t";

export default async function LoansBorrowedPage() {
  const [loans, subscribers, books] = await Promise.all([
    getApi<ILoan[]>({ url: "/api/loans?filter=borrowed" }).then((r) => r ?? []),
    getApi<ISubscriber[]>({ url: "/api/subscribers" }).then((r) => r ?? []),
    getApi<IBook[]>({ url: "/api/books" }).then((r) => r ?? []),
  ]);

  return (
    <LoansBorrowedWrapper
      loans={loans}
      subscribers={subscribers}
      books={books}
    />
  );
}
