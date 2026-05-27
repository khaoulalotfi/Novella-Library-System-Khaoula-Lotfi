"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { IBook } from "@/types/book-t"

interface IProps {
  books: IBook[]
}

export function BooksByYearWrapper(props: IProps) {
  const { books } = props

  const grouped = books.reduce<Record<number, IBook[]>>((acc, book) => {
    const year = book.year
    if (!acc[year]) acc[year] = []
    acc[year].push(book)
    return acc
  }, {})

  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6">
        <h1 className="text-3xl font-bold text-primary">Books by Year</h1>
        <p className="text-muted-foreground mt-1">
          Library collection grouped by publication year
        </p>
        <Badge variant="outline" className="text-primary border-primary/40 mt-3">
          {`${books.length} ${books.length === 1 ? "Book" : "Books"} Total`}
        </Badge>
      </div>

      {years.length === 0 ? (
        <p className="text-sm text-muted-foreground">No books in the library yet.</p>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Inv #</TableHead>
                <TableHead className="w-[35%]">Title</TableHead>
                <TableHead className="w-[25%]">Authors</TableHead>
                <TableHead className="w-[20%]">Publisher</TableHead>
                <TableHead className="w-24 text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {years.map((year) => {
                const yearBooks = grouped[year] ?? []
                return [
                  <TableRow key={`year-${year}`} className="bg-muted/30 hover:bg-muted/30">
                    <TableCell colSpan={5} className="py-2 px-4">
                      <div className="flex items-center gap-x-3">
                        <span className="font-semibold text-primary">{year}</span>
                        <Badge variant="secondary">{yearBooks.length}</Badge>
                      </div>
                    </TableCell>
                  </TableRow>,
                  ...yearBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="w-24">{book.inventoryNumber}</TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>
                        {(book.authorNames ?? book.authors).join(", ")}
                      </TableCell>
                      <TableCell>{book.publisherName ?? book.publisher}</TableCell>
                      <TableCell className="text-right">{book.price}</TableCell>
                    </TableRow>
                  )),
                ]
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
