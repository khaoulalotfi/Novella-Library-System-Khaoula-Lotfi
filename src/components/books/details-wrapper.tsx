"use client";

import { useState } from "react";
import {
  useBoundStore,
  useShallow,
} from "@/components/providers/store-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBook } from "@/types/book-t";

export function BookDetailsWrapper() {
  const { books } = useBoundStore(useShallow((s) => ({ books: s.books })));
  const [selected, setSelected] = useState<IBook | undefined>(undefined);
  const [open, setOpen] = useState(false);

  function handleView(book: IBook) {
    setSelected(book);
    setOpen(true);
  }

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <h1 className="text-3xl font-bold text-primary">Book Details</h1>
        <p className="text-muted-foreground mt-1">
          View full details of any book
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
              <TableHead>Title</TableHead>
              <TableHead>Author(s)</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  No books yet.
                </TableCell>
              </TableRow>
            ) : (
              books.map((book, index) => (
                <TableRow key={index}>
                  <TableCell>{book.inventoryNumber}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.authors}</TableCell>
                  <TableCell>{book.year}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(book)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-primary">Book Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Inventory Number</span>
                <span className="font-medium">{selected.inventoryNumber}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Code (UDC/ISBN)</span>
                <span className="font-medium">{selected.code}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Author(s)</span>
                <span className="font-medium">{selected.authors}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Title</span>
                <span className="font-medium">{selected.title}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium">{selected.price}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Publisher</span>
                <span className="font-medium">{selected.publisher}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Year</span>
                <span className="font-medium">{selected.year}</span>
              </div>
              <div className="flex flex-col gap-y-1 border-b border-border pb-2">
                <span className="text-muted-foreground">Annotation</span>
                <span className="font-medium pl-4">{selected.annotation}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
