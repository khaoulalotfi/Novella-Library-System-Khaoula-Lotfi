import { OverdueWrapper } from "@/components/subscribers/overdue-wrapper";
import { getApi } from "@/utils/server-api";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { Role } from "@/constants/role";
import type { ILoan } from "@/types/subscriber-t";
import type { ISubscriber } from "@/types/subscriber-t";
import type { IBook } from "@/types/book-t";

export default async function OverduePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAdmin = session?.user.role === Role.Administrator;

  const [loans, subscribers, books] = await Promise.all([
    getApi<ILoan[]>({ url: "/api/loans?filter=overdue" }).then((r) => r ?? []),
    getApi<ISubscriber[]>({ url: "/api/subscribers" }).then((r) => r ?? []),
    getApi<IBook[]>({ url: "/api/books" }).then((r) => r ?? []),
  ]);

  const userEmail = session?.user.email ?? "";
  const currentSubscriber = subscribers.find((s) => s.email === userEmail);

  const filteredLoans = isAdmin
    ? loans
    : loans.filter((l) => l.subscriberId === currentSubscriber?.id);

  return (
    <OverdueWrapper
      loans={filteredLoans}
      subscribers={subscribers}
      books={books}
    />
  );
}
