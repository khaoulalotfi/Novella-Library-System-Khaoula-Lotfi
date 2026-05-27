import { BookWrapper } from "@/components/books/wrapper"
import { getApi } from "@/utils/server-api"
import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import { Role } from "@/constants/role"
import type { IBook } from "@/types/book-t"
import type { IAuthor } from "@/types/author-t"
import type { IPublisher } from "@/types/publisher-t"
import type { ICode } from "@/types/code-t"

export default async function BookListPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isAdmin = session?.user.role === Role.Administrator

  const [booksRes, authorsRes, publishersRes, codesRes] = await Promise.all([
    getApi<IBook[]>("/api/books"),
    getApi<IAuthor[]>("/api/authors"),
    getApi<IPublisher[]>("/api/publishers"),
    getApi<ICode[]>("/api/codes"),
  ])

  const books = booksRes ?? []
  const authors = authorsRes ?? []
  const publishers = publishersRes ?? []
  const codes = codesRes ?? []

  return (
    <BookWrapper
      books={books}
      authors={authors}
      publishers={publishers}
      codes={codes}
      isAdmin={isAdmin}
    />
  )
}
