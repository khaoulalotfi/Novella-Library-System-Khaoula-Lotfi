import { BookDetailsWrapper } from "@/components/books/details-wrapper"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/dictionary"
import { getApi } from "@/utils/server-api"
import type { IBook } from "@/types/book-t"

interface IProps {
  params: Promise<{ lang: Locale }>
}

export default async function BookDetailsPage(props: IProps) {
  const { lang } = await props.params
  const books = (await getApi<IBook[]>("/api/books")) ?? []
  const dict = await getDictionary(lang)
  return <BookDetailsWrapper books={books} dict={dict.books} />
}
