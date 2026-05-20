"use client"

import { useState, useEffect } from "react"
import { BookSearchForm } from "./search-form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useBoundStore, useShallow } from "@/components/providers/store-provider"
import { getApi } from "@/utils/server-api"
import type { IBook } from "@/types/book-t"

export function BookSearchWrapper() {
  const { books, setBooks } = useBoundStore(useShallow((s) => ({ books: s.books, setBooks: s.setBooks })))
  const [results, setResults] = useState<IBook[]>([])
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (books.length === 0) {
      getApi<IBook[]>({ url: "/api/books" }).then((r) => { if (Array.isArray(r)) setBooks(r) })
    }
  }, [])

  function handleSearch(found: IBook[]) {
    setResults(found)
    setSearched(true)
  }

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <h1 className="text-3xl font-bold text-primary">Book Search</h1>
      </div>
      <div className="mb-8">
        <BookSearchForm books={books} onSearch={handleSearch} />
      </div>
      {searched && (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <p className="text-sm text-muted-foreground">
              {results.length} result(s) found
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Inv. No</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Author(s)</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Publisher</TableHead>
                <TableHead>Year</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No books found.
                  </TableCell>
                </TableRow>
              ) : (
                results.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.inventoryNumber}</TableCell>
                    <TableCell>{book.codeValue ?? book.code ?? "—"}</TableCell>
                    <TableCell>
                      {(book.authorNames ?? book.authors).join(", ") || "—"}
                    </TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.price}</TableCell>
                    <TableCell>{book.publisherName ?? book.publisher}</TableCell>
                    <TableCell>{book.year}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
