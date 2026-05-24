import { BookWrapper } from "@/components/books/wrapper";
import { getApi } from "@/utils/server-api";
import type { IBook, IAuthor, IPublisher, ICode } from "@/types/book-t";

export default async function BookListPage() {
  const [books, authors, publishers, codes] = await Promise.all([
    getApi<IBook[]>({ url: "/api/books" }).then((r) => r ?? []),
    getApi<IAuthor[]>({ url: "/api/authors" }).then((r) => r ?? []),
    getApi<IPublisher[]>({ url: "/api/publishers" }).then((r) => r ?? []),
    getApi<ICode[]>({ url: "/api/codes" }).then((r) => r ?? []),
  ]);

  return (
    <BookWrapper
      books={books}
      authors={authors}
      publishers={publishers}
      codes={codes}
    />
  );
}
