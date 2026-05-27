import { BookSearchWrapper } from "@/components/books/search-wrapper"
import { getApi } from "@/utils/server-api"
import type { IBook } from "@/types/book-t"

export default async function BookSearchPage() {
  const books = (await getApi<IBook[]>("/api/books")) ?? []
  return <BookSearchWrapper books={books} />
}
