"use client";

import { useLoanData } from "@/hooks/use-loan-data";
import { BorrowedList } from "./parts/borrowed-list";
import type { ILoan, ISubscriber } from "@/types/subscriber-t";
import type { IBook } from "@/types/book-t";

interface IProps {
  loans: ILoan[];
  subscribers: ISubscriber[];
  books: IBook[];
}

export function LoansBorrowedWrapper(props: IProps) {
  const { loans, subscribers, books } = props;
  const { search, setSearch, filtered, getSubscriber, getBook } = useLoanData(
    loans,
    subscribers,
    books,
  );

  return (
    <BorrowedList
      filtered={filtered}
      search={search}
      setSearch={setSearch}
      getSubscriber={getSubscriber}
      getBook={getBook}
    />
  );
}
