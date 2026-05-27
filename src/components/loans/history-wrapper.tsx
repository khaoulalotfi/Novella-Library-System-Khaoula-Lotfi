"use client";

import { useLoanData } from "@/hooks/use-loan-data";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ILoan } from "@/types/subscriber-t";
import type { ISubscriber } from "@/types/subscriber-t";
import type { IBook } from "@/types/book-t";

interface IProps {
  loans: ILoan[];
  subscribers: ISubscriber[];
  books: IBook[];
}

export function HistoryWrapper(props: IProps) {
  const { loans, subscribers, books } = props;
  const { search, setSearch, filtered, getSubscriber, getBook } = useLoanData(
    loans,
    subscribers,
    books,
  );

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <h1 className="text-3xl font-bold text-primary">Loan History</h1>
        <p className="text-muted-foreground mt-1">All loans ever recorded</p>
        <div className="flex items-center gap-x-2 mt-3">
          <Badge variant="outline" className="text-primary border-primary/40">
            {`${filtered.length} ${filtered.length === 1 ? "Record" : "Records"} Found`}
          </Badge>
        </div>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search by name, surname, phone or book title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Surname</TableHead>
              <TableHead>Book Title</TableHead>
              <TableHead>Borrow Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead>Status</TableHead>
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
                    : "No loans found."}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((loan) => {
                const subscriber = getSubscriber(loan.subscriberId);
                const book = getBook(loan.bookId);
                const today = new Date().toISOString().split("T")[0] ?? "";
                const isOverdue = loan.returnDate < today;
                return (
                  <TableRow key={loan.id}>
                    <TableCell>
                      {subscriber?.name ?? loan.subscriberId}
                    </TableCell>
                    <TableCell>{subscriber?.surname ?? "—"}</TableCell>
                    <TableCell>{book?.title ?? loan.bookId}</TableCell>
                    <TableCell>{loan.borrowDate}</TableCell>
                    <TableCell>{loan.returnDate}</TableCell>
                    <TableCell>
                      <Badge variant={isOverdue ? "destructive" : "outline"}>
                        {isOverdue ? "Overdue" : "Active"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
