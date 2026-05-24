"use client";

import { useState } from "react";
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

interface IProps {
  books: IBook[];
}

export function BookDetailsWrapper({ books }: IProps) {
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
            {`${books.length} ${books.length === 1 ? "Book" : "Books"} Total`}
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
              books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.inventoryNumber}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>
                    {book.authorNames?.join(", ") ?? book.authors.join(", ")}
                  </TableCell>
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
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-primary">Book Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <section className="space-y-2">
                <h3 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                  Book Information
                </h3>
                <Row
                  label="Inventory Number"
                  value={String(selected.inventoryNumber)}
                />
                <Row
                  label="Code (UDC/ISBN)"
                  value={selected.codeValue ?? selected.code ?? "—"}
                />
                <Row
                  label="Author(s)"
                  value={
                    (selected.authorNames ?? selected.authors).join(", ") || "—"
                  }
                />
                <Row label="Title" value={selected.title} />
                <Row label="Price" value={String(selected.price)} />
                <Row
                  label="Publisher"
                  value={selected.publisherName ?? selected.publisher ?? "—"}
                />
                <Row label="Year" value={String(selected.year)} />
                <div className="flex flex-col gap-y-1 border-b border-border pb-2">
                  <span className="text-muted-foreground">Annotation</span>
                  <span className="font-medium pl-2 text-sm leading-relaxed">
                    {selected.annotation}
                  </span>
                </div>
              </section>
              <section className="space-y-2">
                <h3 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                  Subscription History
                </h3>
                <p className="text-muted-foreground italic text-sm py-2">
                  No subscription records found for this book.
                </p>
              </section>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right max-w-[60%]">{value}</span>
    </div>
  );
}
