import type { IBook } from "@/types/book-t"

export interface IBookSearchValues {
  title?: string
  author?: string
  year?: string
}

/**
 * Pure function — filters a list of books against optional title / author / year criteria.
 * All comparisons are case-insensitive. An empty or omitted field is treated as "match all".
 */
export function filterBooks(books: IBook[], values: IBookSearchValues): IBook[] {
  return books.filter((b) => {
    const matchTitle = values.title
      ? b.title.toLowerCase().includes(values.title.toLowerCase())
      : true

    const authorDisplay = (b.authorNames ?? b.authors).join(", ")
    const matchAuthor = values.author
      ? authorDisplay.toLowerCase().includes(values.author.toLowerCase())
      : true

    const matchYear = values.year
      ? b.year.toString() === values.year.trim()
      : true

    return matchTitle && matchAuthor && matchYear
  })
}
