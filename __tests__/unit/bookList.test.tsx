/**
 * Jest — Unit test 1
 * Verifies that BookList renders book data (title, authors, year) in the table.
 */

import { render, screen } from "@testing-library/react"
import { BookList } from "@/components/books/list"
import { dict } from "@/dictionaries/en"
import type { IBook } from "@/types/book-t"

const sampleBook: IBook = {
  id: "1",
  inventoryNumber: 42,
  authors: ["author-id-1"],
  authorNames: ["Jane Austen"],
  title: "Pride and Prejudice",
  price: 19.99,
  publisherName: "Penguin",
  year: 1813,
  annotation: "A classic novel.",
}

describe("BookList", () => {
  it("renders book title, author names, and year in the table row", () => {
    render(
      <BookList
        books={[sampleBook]}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        isAdmin={false}
        dict={dict.books}
      />,
    )

    expect(screen.getByText("Pride and Prejudice")).toBeInTheDocument()
    expect(screen.getByText("Jane Austen")).toBeInTheDocument()
    expect(screen.getByText("1813")).toBeInTheDocument()
  })
})
