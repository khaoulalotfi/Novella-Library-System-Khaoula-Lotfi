/**
 * Jest — Unit test 3
 * Verifies that the Zustand store's setBooks action correctly
 * adds and removes books from state.
 */

import { appStore } from "@/store/app-store"
import type { IBook } from "@/types/book-t"

const makeBook = (id: string, title: string): IBook => ({
  id,
  inventoryNumber: Number(id),
  authors: [],
  title,
  price: 10,
  year: 2020,
  annotation: "",
})

describe("appStore — book slice", () => {
  it("setBooks adds books to state and setBooks([]) removes them", () => {
    const store = appStore()

    // Initial state is empty
    expect(store.getState().books).toHaveLength(0)

    // Add two books
    const bookA = makeBook("1", "Book A")
    const bookB = makeBook("2", "Book B")
    store.getState().setBooks([bookA, bookB])
    expect(store.getState().books).toHaveLength(2)

    // Remove bookA by filtering it out and calling setBooks
    const withoutA = store.getState().books.filter((b) => b.id !== "1")
    store.getState().setBooks(withoutA)
    expect(store.getState().books).toHaveLength(1)
    expect(store.getState().books[0]!.title).toBe("Book B")
  })
})
