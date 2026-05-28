import type { IBook } from "@/types/book-t"

export function groupBooksByYear(books: IBook[]): Record<number, IBook[]> {
  return books.reduce<Record<number, IBook[]>>((acc, book) => {
    const year = book.year
    if (!acc[year]) acc[year] = []
    acc[year].push(book)
    return acc
  }, {})
}
