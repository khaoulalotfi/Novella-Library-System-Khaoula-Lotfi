import { BooksByYearWrapper } from "@/components/books-by-year/wrapper"
import { getApi } from "@/utils/server-api"
import type { IBook } from "@/types/book-t"

export default async function BooksByYearPage() {
  const books = (await getApi<IBook[]>("/api/books")) ?? []
  return <BooksByYearWrapper books={books} />
}
