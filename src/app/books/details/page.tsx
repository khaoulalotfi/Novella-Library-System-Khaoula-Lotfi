import { BookDetailsWrapper } from "@/components/books/details-wrapper"
import { getApi } from "@/utils/server-api"
import type { IBook } from "@/types/book-t"

export default async function BookDetailsPage() {
  const books = (await getApi<IBook[]>("/api/books")) ?? []
  return <BookDetailsWrapper books={books} />
}
