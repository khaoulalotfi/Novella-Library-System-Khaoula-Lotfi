"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { ILoan } from "@/types/subscriber-t";
import type { ISubscriber } from "@/types/subscriber-t";
import type { IBook } from "@/types/book-t";
import type { IDict } from "@/lib/dictionary";

interface IProps {
  loans: ILoan[];
  subscribers: ISubscriber[];
  books: IBook[];
  dict: IDict["subscribers"];
}

export function OverdueWrapper(props: IProps) {
  const { loans, subscribers, books, dict } = props;
  const [search, setSearch] = useState<string>("");

  function getSubscriber(subscriberId: string): ISubscriber | undefined {
    return subscribers.find((s) => s.id === subscriberId);
  }

  function getBook(bookId: string): IBook | undefined {
    return books.find((b) => b.id === bookId);
  }

  const filtered = loans.filter((loan) => {
    if (!search.trim()) return true;
    const subscriber = getSubscriber(loan.subscriberId);
    const book = getBook(loan.bookId);
    const q = search.toLowerCase();
    return (
      subscriber?.name.toLowerCase().includes(q) === true ||
      subscriber?.surname.toLowerCase().includes(q) === true ||
      subscriber?.phone.toLowerCase().includes(q) === true ||
      book?.title.toLowerCase().includes(q) === true
    );
  });

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              {dict.overdueTitle}
            </h1>
            <p className="text-muted-foreground mt-1">
              {dict.overdueSubtitle}
            </p>
            <div className="flex items-center gap-x-2 mt-3">
              <Badge
                variant="outline"
                className="text-primary border-primary/40"
              >
                {`${filtered.length} ${filtered.length === 1 ? dict.recordSingular : dict.recordPlural} ${dict.found}`}
              </Badge>
            </div>
          </div>
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
              <TableHead>{dict.colPhone}</TableHead>
              <TableHead>{dict.colBookTitle}</TableHead>
              <TableHead>{dict.colBorrowDate}</TableHead>
              <TableHead>{dict.colReturnDate}</TableHead>
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
                    : dict.noOverdueLoans}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((loan) => {
                const subscriber = getSubscriber(loan.subscriberId);
                const book = getBook(loan.bookId);
                return (
                  <TableRow key={loan.id}>
                    <TableCell>
                      {subscriber?.name ?? loan.subscriberId}
                    </TableCell>
                    <TableCell>{subscriber?.surname ?? "—"}</TableCell>
                    <TableCell>{subscriber?.phone ?? "—"}</TableCell>
                    <TableCell>{book?.title ?? loan.bookId}</TableCell>
                    <TableCell>{loan.borrowDate}</TableCell>
                    <TableCell className="text-destructive font-medium">
                      {loan.returnDate}
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
