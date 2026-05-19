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
}

export function BookList({ books, onEdit }: IProps) {
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
          books.map((book, index) => (
            <TableRow key={index}>
              <TableCell>{book.inventoryNumber}</TableCell>
              <TableCell>{book.code}</TableCell>
              <TableCell>{book.authors}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.price}</TableCell>
              <TableCell>{book.publisher}</TableCell>
              <TableCell>{book.year}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(book)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
