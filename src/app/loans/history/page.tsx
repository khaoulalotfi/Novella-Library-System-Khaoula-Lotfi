import { HistoryWrapper } from "@/components/loans/history-wrapper"
import { getApi } from "@/utils/server-api"
import { dict } from "@/dictionaries/en"
import type { ILoan, ISubscriber } from "@/types/subscriber-t"
import type { IBook } from "@/types/book-t"

export default async function LoanHistoryPage() {
  const [loansRes, subscribersRes, booksRes] = await Promise.all([
    getApi<ILoan[]>("/api/loans"),
    getApi<ISubscriber[]>("/api/subscribers"),
    getApi<IBook[]>("/api/books"),
  ])

  const loans = loansRes ?? []
  const subscribers = subscribersRes ?? []
  const books = booksRes ?? []

  return (
    <HistoryWrapper
      loans={loans}
      subscribers={subscribers}
      books={books}
      dict={dict.loans}
    />
  )
}
