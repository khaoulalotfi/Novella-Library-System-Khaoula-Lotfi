/**
 * Jest — Unit test 2
 * Verifies that filterBooks correctly filters a book list by title.
 */

import { filterBooks } from "@/utils/book-utils"
import type { IBook } from "@/types/book-t"

const books: IBook[] = [
  {
    id: "1",
    inventoryNumber: 1,
    authors: [],
    authorNames: ["F. Scott Fitzgerald"],
    title: "The Great Gatsby",
    price: 12.99,
    year: 1925,
    annotation: "",
  },
  {
    id: "2",
    inventoryNumber: 2,
    authors: [],
    authorNames: ["George Orwell"],
    title: "1984",
    price: 9.99,
    year: 1949,
    annotation: "",
  },
  {
    id: "3",
    inventoryNumber: 3,
    authors: [],
    authorNames: ["Jane Austen"],
    title: "Pride and Prejudice",
    price: 8.99,
    year: 1813,
    annotation: "",
  },
]

describe("filterBooks", () => {
  it("filters by title case-insensitively and returns only matching books", () => {
    const result = filterBooks(books, { title: "gatsby" })

    expect(result).toHaveLength(1)
    expect(result[0]!.title).toBe("The Great Gatsby")
  })
})
