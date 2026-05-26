import { BorrowedWrapper } from "@/components/subscribers/borrowed-wrapper";
import { getApi } from "@/utils/server-api";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { Role } from "@/constants/role";
import type { ILoan, ISubscriber } from "@/types/subscriber-t";
import type { IBook } from "@/types/book-t";

export default async function BorrowedPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAdmin = session?.user.role === Role.Administrator;

  const [loans, subscribers, books] = await Promise.all([
    getApi<ILoan[]>({ url: "/api/loans?filter=borrowed" }).then((r) => r ?? []),
    getApi<ISubscriber[]>({ url: "/api/subscribers" }).then((r) => r ?? []),
    getApi<IBook[]>({ url: "/api/books" }).then((r) => r ?? []),
  ]);

  const userEmail = session?.user.email ?? "";
  const currentSubscriber = subscribers.find((s) => s.email === userEmail);

  const filteredLoans = isAdmin
    ? loans
    : loans.filter((l) => l.subscriberId === currentSubscriber?.id);

  return (
    <BorrowedWrapper
      loans={filteredLoans}
      subscribers={subscribers}
      books={books}
      isAdmin={isAdmin}
      currentSubscriber={currentSubscriber}
    />
  );
}
