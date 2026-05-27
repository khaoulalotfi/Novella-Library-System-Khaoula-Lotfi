"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBook } from "@/types/book-t";

interface IProps {
  books: IBook[];
}

export function BookInventoryWrapper(props: IProps) {
  const { books } = props;
  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <h1 className="text-3xl font-bold text-primary">Library Inventory</h1>
        <p className="text-muted-foreground mt-1">
          Overview of all books and their status
        </p>
        <div className="flex items-center gap-x-2 mt-3">
          <Badge variant="outline" className="text-primary border-primary/40">
            {`${books.length} ${books.length === 1 ? "Book" : "Books"} Total`}
          </Badge>
        </div>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Inv. No</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Author(s)</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Publisher</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Annotation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-muted-foreground"
                >
                  No books in inventory.
                </TableCell>
              </TableRow>
            ) : (
              books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.inventoryNumber}</TableCell>
                  <TableCell>{book.codeValue ?? book.code ?? "—"}</TableCell>
                  <TableCell>
                    {(book.authorNames ?? book.authors).join(", ") || "—"}
                  </TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.publisherName ?? book.publisher}</TableCell>
                  <TableCell>{book.year}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell
                    className="max-w-xs truncate"
                    title={book.annotation}
                  >
                    {book.annotation || "—"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
