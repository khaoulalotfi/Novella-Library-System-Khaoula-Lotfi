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
import type { IDict } from "@/lib/dictionary";

interface IProps {
  books: IBook[];
  dict: IDict["books"];
}

export function BookInventoryWrapper(props: IProps) {
  const { books, dict } = props;
  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <h1 className="text-3xl font-bold text-primary">{dict.inventoryTitle}</h1>
        <p className="text-muted-foreground mt-1">
          {dict.inventorySubtitle}
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
              <TableHead>{dict.colCode}</TableHead>
              <TableHead>{dict.colAuthors}</TableHead>
              <TableHead>{dict.colTitle}</TableHead>
              <TableHead>{dict.colPublisher}</TableHead>
              <TableHead>{dict.colYear}</TableHead>
              <TableHead>{dict.colPrice}</TableHead>
              <TableHead>{dict.colAnnotation}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-muted-foreground"
                >
                  {dict.noBooksInventory}
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
