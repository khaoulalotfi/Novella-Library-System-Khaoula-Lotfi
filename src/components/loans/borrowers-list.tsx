import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ILoan, ISubscriber } from "@/types/subscriber-t";
import type { IBook } from "@/types/book-t";

interface IProps {
  filtered: ILoan[];
  search: string;
  getSubscriber: (id: string) => ISubscriber | undefined;
  getBook: (id: string) => IBook | undefined;
}

export function BorrowersList(props: IProps) {
  const { filtered, search, getSubscriber, getBook } = props;
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Surname</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Book Title</TableHead>
            <TableHead>Borrow Date</TableHead>
            <TableHead>Return Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground"
              >
                {search.trim()
                  ? "No results match your search."
                  : "No active borrowers found."}
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((loan) => {
              const subscriber = getSubscriber(loan.subscriberId);
              const book = getBook(loan.bookId);
              return (
                <TableRow key={loan.id}>
                  <TableCell>{subscriber?.name ?? loan.subscriberId}</TableCell>
                  <TableCell>{subscriber?.surname ?? "—"}</TableCell>
                  <TableCell>{subscriber?.phone ?? "—"}</TableCell>
                  <TableCell>{book?.title ?? loan.bookId}</TableCell>
                  <TableCell>{loan.borrowDate}</TableCell>
                  <TableCell>{loan.returnDate}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
