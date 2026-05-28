import { BorrowersWrapper } from "@/components/loans/borrowers-wrapper"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/dictionary"
import { getApi } from "@/utils/server-api"
import { LoanFilter } from "@/constants/loan-filter"
import type { ILoan, ISubscriber } from "@/types/subscriber-t"
import type { IBook } from "@/types/book-t"

interface IProps {
  params: Promise<{ lang: Locale }>
}

export default async function LoanBorrowersPage(props: IProps) {
  const { lang } = await props.params
  const [loansRes, subscribersRes, booksRes] = await Promise.all([
    getApi<ILoan[]>(`/api/loans?filter=${LoanFilter.Borrowed}`),
    getApi<ISubscriber[]>("/api/subscribers"),
    getApi<IBook[]>("/api/books"),
  ])

  const loans = loansRes ?? []
  const subscribers = subscribersRes ?? []
  const books = booksRes ?? []

  const dict = await getDictionary(lang)
  return (
    <BorrowersWrapper loans={loans} subscribers={subscribers} books={books} dict={dict.loans} />
  )
}
