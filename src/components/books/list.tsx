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

interface IProps {
  books: IBook[];
  onEdit: (book: IBook) => void;
  onDelete: (id: string) => Promise<void>;
  isAdmin: boolean;
}

export function BookList(props: IProps) {
  const { books, onEdit, onDelete, isAdmin } = props;
  return (
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
          {isAdmin && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={isAdmin ? 8 : 7}
              className="text-center text-muted-foreground"
            >
              No books yet.
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
                    Edit
                  </Button>
                  <DeleteConfirmDialog
                    title={`Delete Book "${book.title}"?`}
                    description={`This will permanently remove "${book.title}" from the library.`}
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
