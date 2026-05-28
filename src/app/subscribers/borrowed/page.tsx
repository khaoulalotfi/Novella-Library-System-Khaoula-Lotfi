import { BorrowedWrapper } from "@/components/subscribers/borrowed-wrapper"
import { getApi } from "@/utils/server-api"
import { dict } from "@/dictionaries/en"
import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import { Role } from "@/constants/role"
import { LoanFilter } from "@/constants/loan-filter"
import type { ILoan, ISubscriber } from "@/types/subscriber-t"
import type { IBook } from "@/types/book-t"

export default async function BorrowedPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isAdmin = session?.user.role === Role.Administrator

  const [loansRes, subscribersRes, booksRes] = await Promise.all([
    getApi<ILoan[]>(`/api/loans?filter=${LoanFilter.Borrowed}`),
    getApi<ISubscriber[]>("/api/subscribers"),
    getApi<IBook[]>("/api/books"),
  ])

  const loans = loansRes ?? []
  const subscribers = subscribersRes ?? []
  const books = booksRes ?? []

  const userEmail = session?.user.email ?? ""
  const currentSubscriber = subscribers.find((s) => s.email === userEmail)

  const filteredLoans = isAdmin
    ? loans
    : loans.filter((l) => l.subscriberId === currentSubscriber?.id)

  return (
    <BorrowedWrapper
      loans={filteredLoans}
      subscribers={subscribers}
      books={books}
      isAdmin={isAdmin}
      currentSubscriber={currentSubscriber}
      dict={dict.subscribers}
    />
  )
}
