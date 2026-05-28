import { LoansBorrowedWrapper } from "@/components/loans/borrowed-wrapper"
import { getApi } from "@/utils/server-api"
import { dict } from "@/dictionaries/en"
import { LoanFilter } from "@/constants/loan-filter"
import type { ILoan, ISubscriber } from "@/types/subscriber-t"
import type { IBook } from "@/types/book-t"

export default async function LoansBorrowedPage() {
  const [loansRes, subscribersRes, booksRes] = await Promise.all([
    getApi<ILoan[]>(`/api/loans?filter=${LoanFilter.Borrowed}`),
    getApi<ISubscriber[]>("/api/subscribers"),
    getApi<IBook[]>("/api/books"),
  ])

  const loans = loansRes ?? []
  const subscribers = subscribersRes ?? []
  const books = booksRes ?? []

  return (
    <LoansBorrowedWrapper
      loans={loans}
      subscribers={subscribers}
      books={books}
      dict={dict.loans}
    />
  )
}
