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
import type { IDict } from "@/lib/dictionary";

interface IProps {
  loans: ILoan[];
  subscribers: ISubscriber[];
  books: IBook[];
  dict: IDict["loans"];
}

export function HistoryWrapper(props: IProps) {
  const { loans, subscribers, books, dict } = props;
  const { search, setSearch, filtered, getSubscriber, getBook } = useLoanData(
    loans,
    subscribers,
    books,
  );

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <h1 className="text-3xl font-bold text-primary">{dict.historyTitle}</h1>
        <p className="text-muted-foreground mt-1">{dict.historySubtitle}</p>
        <div className="flex items-center gap-x-2 mt-3">
          <Badge variant="outline" className="text-primary border-primary/40">
            {`${filtered.length} ${filtered.length === 1 ? dict.recordSingular : dict.recordPlural} ${dict.found}`}
          </Badge>
        </div>
      </div>
      <div className="mb-4">
        <Input
          placeholder={dict.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{dict.colName}</TableHead>
              <TableHead>{dict.colSurname}</TableHead>
              <TableHead>{dict.colBookTitle}</TableHead>
              <TableHead>{dict.colBorrowDate}</TableHead>
              <TableHead>{dict.colReturnDate}</TableHead>
              <TableHead>{dict.colStatus}</TableHead>
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
                    ? dict.noResults
                    : dict.noLoans}
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
                        {isOverdue ? dict.statusOverdue : dict.statusActive}
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
