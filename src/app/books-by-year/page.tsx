import { BooksByYearWrapper } from "@/components/books-by-year/wrapper"
import { getApi } from "@/utils/server-api"
import { dict } from "@/dictionaries/en"
import type { IBook } from "@/types/book-t"

export default async function BooksByYearPage() {
  const books = (await getApi<IBook[]>("/api/books")) ?? []
  return <BooksByYearWrapper books={books} dict={dict.booksByYear} />
}
