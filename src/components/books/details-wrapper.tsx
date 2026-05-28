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
import type { IDict } from "@/lib/dictionary";
import { Row } from "@/components/books/details-row";

interface IProps {
  books: IBook[];
  dict: IDict["books"];
}

export function BookDetailsWrapper(props: IProps) {
  const { books, dict } = props;
  const [selected, setSelected] = useState<IBook | undefined>(undefined);
  const [open, setOpen] = useState(false);

  function handleView(book: IBook) {
    setSelected(book);
    setOpen(true);
  }

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <h1 className="text-3xl font-bold text-primary">{dict.detailsTitle}</h1>
        <p className="text-muted-foreground mt-1">
          {dict.detailsSubtitle}
        </p>
        <div className="flex items-center gap-x-2 mt-3">
          <Badge variant="outline" className="text-primary border-primary/40">
            {`${books.length} ${books.length === 1 ? dict.bookSingular : dict.bookPlural} ${dict.total}`}
          </Badge>
        </div>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{dict.colInvNo}</TableHead>
              <TableHead>{dict.colTitle}</TableHead>
              <TableHead>{dict.colAuthors}</TableHead>
              <TableHead>{dict.colYear}</TableHead>
              <TableHead>{dict.colActions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  {dict.noBooks}
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
                      {dict.view}
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
            <DialogTitle className="text-primary">{dict.detailsTitle}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <section className="space-y-2">
                <h3 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                  {dict.bookInfo}
                </h3>
                <Row
                  label={dict.invNumber}
                  value={String(selected.inventoryNumber)}
                />
                <Row
                  label={dict.codeUdc}
                  value={selected.codeValue ?? selected.code ?? "—"}
                />
                <Row
                  label={dict.colAuthors}
                  value={
                    (selected.authorNames ?? selected.authors).join(", ") || "—"
                  }
                />
                <Row label={dict.colTitle} value={selected.title} />
                <Row label={dict.colPrice} value={String(selected.price)} />
                <Row
                  label={dict.colPublisher}
                  value={selected.publisherName ?? selected.publisher ?? "—"}
                />
                <Row label={dict.colYear} value={String(selected.year)} />
                <div className="flex flex-col gap-y-1 border-b border-border pb-2">
                  <span className="text-muted-foreground">{dict.annotation}</span>
                  <span className="font-medium pl-2 text-sm leading-relaxed">
                    {selected.annotation}
                  </span>
                </div>
              </section>
              <section className="space-y-2">
                <h3 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                  {dict.subscriptionHistory}
                </h3>
                <p className="text-muted-foreground italic text-sm py-2">
                  {dict.noSubscriptionRecords}
                </p>
              </section>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

