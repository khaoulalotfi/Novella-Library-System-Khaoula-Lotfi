"use client"

import { useState, useEffect } from "react"
import { BookForm } from "./form"
import { BookList } from "./list"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useBoundStore, useShallow } from "@/components/providers/store-provider"
import { createBook, updateBook, deleteBook } from "@/actions/books"
import { getApi } from "@/utils/server-api"
import type { IBook, IAuthor, IPublisher, ICode } from "@/types/book-t"

export function BookWrapper() {
  const { books, setBooks } = useBoundStore(
    useShallow((s) => ({ books: s.books, setBooks: s.setBooks }))
  )
  const [selected, setSelected] = useState<IBook | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [authors, setAuthors] = useState<IAuthor[]>([])
  const [publishers, setPublishers] = useState<IPublisher[]>([])
  const [codes, setCodes] = useState<ICode[]>([])
  const [error, setError] = useState<string | undefined>(undefined)
  const [loadError, setLoadError] = useState<string | undefined>(undefined)

  useEffect(() => {
    setLoadError(undefined)
    getApi<IBook[]>({ url: "/api/books" }).then((r) => {
      if (Array.isArray(r)) setBooks(r)
      else setLoadError("Could not load books — check the browser console and /api/books for errors.")
    })
    getApi<IAuthor[]>({ url: "/api/authors" }).then((r) => { if (Array.isArray(r)) setAuthors(r) })
    getApi<IPublisher[]>({ url: "/api/publishers" }).then((r) => { if (Array.isArray(r)) setPublishers(r) })
    getApi<ICode[]>({ url: "/api/codes" }).then((r) => { if (Array.isArray(r)) setCodes(r) })
  }, [])

  function handleEdit(book: IBook) {
    const rawInv = String(book.inventoryNumber).replace(/^INV-0*/i, "")
    setSelected({
      ...book,
      inventoryNumber: Number(rawInv) || Number(book.inventoryNumber),
      price: Number(book.price),
      year: Number(book.year),
      authors: Array.isArray(book.authors) ? book.authors : [book.authors],
    })
    setError(undefined)
    setOpen(true)
  }

  function handleAdd() {
    setSelected(undefined)
    setError(undefined)
    setOpen(true)
  }

  async function handleSaved(book: IBook) {
    try {
      const isDuplicateTitle = books.some(
        (b) =>
          b.title.toLowerCase() === book.title.toLowerCase() &&
          JSON.stringify([...b.authors].sort()) === JSON.stringify([...book.authors].sort()) &&
          b.id !== selected?.id
      )
      if (isDuplicateTitle) {
        setError("A book with this title and authors already exists!")
        return
      }

      const isDuplicateInvNo = books.some(
        (b) => b.inventoryNumber === book.inventoryNumber && b.id !== selected?.id
      )
      if (isDuplicateInvNo) {
        setError("A book with this inventory number already exists!")
        return
      }

      if (selected?.id) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await updateBook(selected.id, book) as any
        if (result?.error) {
          setError(result.error)
          return
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await createBook(book) as any
        if (result?.error) {
          setError(result.error)
          return
        }
      }

      const refreshed = await getApi<IBook[]>({ url: "/api/books" })
      if (Array.isArray(refreshed)) setBooks(refreshed)
      setOpen(false)
      setSelected(undefined)
      setError(undefined)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.")
    }
  }

  async function handleDelete(id: string) {
    await deleteBook(id)
    setBooks(books.filter((b) => b.id !== id))
  }

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Book List</h1>
            <p className="text-muted-foreground mt-1">Manage your library collection</p>
            <div className="flex items-center gap-x-2 mt-3">
              <Badge variant="outline" className="text-primary border-primary/40">
                {books.length} {books.length === 1 ? "Book" : "Books"} Total
              </Badge>
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} size="lg">
                + Add Book
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-primary">
                  {selected ? "Edit Book" : "Add New Book"}
                </DialogTitle>
              </DialogHeader>
              {error && (
                <p className="text-destructive text-sm font-medium">{error}</p>
              )}
              <BookForm
                key={selected?.id ?? "new"}
                selected={selected}
                authors={authors}
                publishers={publishers}
                codes={codes}
                onSaved={handleSaved}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {loadError && (
        <p className="text-destructive text-sm font-medium mb-4">{loadError}</p>
      )}
      <div className="rounded-xl border border-border overflow-hidden">
        <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  )
}
