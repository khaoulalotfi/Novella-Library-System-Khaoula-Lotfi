import { BookDetailsWrapper } from "@/components/books/details-wrapper"
import { getApi } from "@/utils/server-api"
import { dict } from "@/dictionaries/en"
import type { IBook } from "@/types/book-t"

export default async function BookDetailsPage() {
  const books = (await getApi<IBook[]>("/api/books")) ?? []
  return <BookDetailsWrapper books={books} dict={dict.books} />
}
