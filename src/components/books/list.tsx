"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/parts/delete-confirm-dialog";
import type { IBook } from "@/types/book-t";
import type { IDict } from "@/lib/dictionary";

interface IProps {
  books: IBook[];
  onEdit: (book: IBook) => void;
  onDelete: (id: string) => Promise<void>;
  isAdmin: boolean;
  dict: IDict["books"];
}

export function BookList(props: IProps) {
  const { books, onEdit, onDelete, isAdmin, dict } = props;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{dict.colInvNo}</TableHead>
          <TableHead>{dict.colCode}</TableHead>
          <TableHead>{dict.colAuthors}</TableHead>
          <TableHead>{dict.colTitle}</TableHead>
          <TableHead>{dict.colPrice}</TableHead>
          <TableHead>{dict.colPublisher}</TableHead>
          <TableHead>{dict.colYear}</TableHead>
          {isAdmin && <TableHead>{dict.colActions}</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={isAdmin ? 8 : 7}
              className="text-center text-muted-foreground"
            >
              {dict.noBooks}
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
              <TableCell>{book.price}</TableCell>
              <TableCell>{book.publisherName ?? book.publisher}</TableCell>
              <TableCell>{book.year}</TableCell>
              {isAdmin && (
                <TableCell className="flex gap-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(book)}
                  >
                    {dict.edit}
                  </Button>
                  <DeleteConfirmDialog
                    title={`${dict.delete} "${book.title}"?`}
                    description={dict.deleteDescription.replace("{title}", book.title)}
                    triggerLabel={dict.delete}
                    confirmLabel={dict.delete}
                    cancelLabel={dict.cancel}
                    onConfirm={() =>
                      book.id ? onDelete(book.id) : Promise.resolve()
                    }
                  />
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
