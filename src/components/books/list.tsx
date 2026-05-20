import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { IBook } from "@/types/book-t";

interface IProps {
  books: IBook[];
  onEdit: (book: IBook) => void;
  onDelete: (id: string) => void;
}

export function BookList({ books, onEdit, onDelete }: IProps) {
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
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={8}
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
              <TableCell className="flex gap-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(book)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => book.id && onDelete(book.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
