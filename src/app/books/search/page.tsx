import { BookSearchWrapper } from "@/components/books/search-wrapper"
import { getApi } from "@/utils/server-api"
import { dict } from "@/dictionaries/en"
import type { IBook } from "@/types/book-t"

export default async function BookSearchPage() {
  const books = (await getApi<IBook[]>("/api/books")) ?? []
  return <BookSearchWrapper books={books} dict={dict.books} />
}
