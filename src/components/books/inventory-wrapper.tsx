"use client";

import {
  useBoundStore,
  useShallow,
} from "@/components/providers/store-provider";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function BookInventoryWrapper() {
  const { books } = useBoundStore(useShallow((s) => ({ books: s.books })));

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <h1 className="text-3xl font-bold text-primary">Library Inventory</h1>
        <p className="text-muted-foreground mt-1">
          Overview of all books and their status
        </p>
        <div className="flex items-center gap-x-2 mt-3">
          <Badge variant="outline" className="text-primary border-primary/40">
            {books.length} {books.length === 1 ? "Book" : "Books"} Total
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
              <TableHead>Status</TableHead>
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
              books.map((book, index) => (
                <TableRow key={index}>
                  <TableCell>{book.inventoryNumber}</TableCell>
                  <TableCell>{book.code}</TableCell>
                  <TableCell>{book.authors}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                  <TableCell>{book.year}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/20">
                      Available
                    </Badge>
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
