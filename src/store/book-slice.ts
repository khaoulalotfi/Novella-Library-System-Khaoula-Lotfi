import type { StateCreator } from "zustand"
import type { IBookSlice } from "@/types/store-t"
import type { IBook } from "@/types/book-t"

const STORAGE_KEY = "novella-books"

const defaultBooks: IBook[] = [
  {
    id: "1",
    inventoryNumber: "INV-001",
    code: "978-0-13-468599-1",
    authors: "Robert C. Martin",
    title: "Clean Code",
    price: "35.99",
    publisher: "Prentice Hall",
    year: "2008",
    annotation: "A guide to writing clean and maintainable code",
  },
  {
    id: "2",
    inventoryNumber: "INV-002",
    code: "978-0-20-161622-4",
    authors: "Andrew Hunt, David Thomas",
    title: "The Pragmatic Programmer",
    price: "49.99",
    publisher: "Addison-Wesley",
    year: "2019",
    annotation: "Tips and practices for software development",
  },
  {
    id: "3",
    inventoryNumber: "INV-003",
    code: "978-0-59-651798-1",
    authors: "David Flanagan",
    title: "JavaScript: The Good Parts",
    price: "29.99",
    publisher: "O'Reilly Media",
    year: "2008",
    annotation: "The good parts of JavaScript explained",
  },
  {
    id: "4",
    inventoryNumber: "INV-004",
    code: "978-1-49-195016-0",
    authors: "Axel Rauschmayer",
    title: "Exploring ES6",
    price: "39.99",
    publisher: "Leanpub",
    year: "2015",
    annotation: "Deep dive into ES6 features",
  },
]

function loadBooks(): IBook[] {
  if (typeof window === "undefined") return defaultBooks
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultBooks
  } catch {
    return defaultBooks
  }
}

function saveBooks(books: IBook[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}

export const createBookSlice: StateCreator<IBookSlice> = (set) => ({
  books: loadBooks(),
  setBooks: (books) => {
    saveBooks(books)
    set(() => ({ books }))
  },
})