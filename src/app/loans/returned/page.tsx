import { ReturnedWrapper } from "@/components/loans/returned-wrapper"
import { getApi } from "@/utils/server-api"
import { LoanFilter } from "@/constants/loan-filter"
import type { ILoan, ISubscriber } from "@/types/subscriber-t"
import type { IBook } from "@/types/book-t"

export default async function LoansReturnedPage() {
  const [loansRes, subscribersRes, booksRes] = await Promise.all([
    getApi<ILoan[]>(`/api/loans?filter=${LoanFilter.Returned}`),
    getApi<ISubscriber[]>("/api/subscribers"),
    getApi<IBook[]>("/api/books"),
  ])

  const loans = loansRes ?? []
  const subscribers = subscribersRes ?? []
  const books = booksRes ?? []

  return <ReturnedWrapper loans={loans} subscribers={subscribers} books={books} />
}
