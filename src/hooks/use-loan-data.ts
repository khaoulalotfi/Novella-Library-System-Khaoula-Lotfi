"use client";

import { useState } from "react";
import type { ILoan } from "@/types/subscriber-t";
import type { ISubscriber } from "@/types/subscriber-t";
import type { IBook } from "@/types/book-t";

export function useLoanData(
  initialLoans: ILoan[],
  subscribers: ISubscriber[],
  books: IBook[],
) {
  const [search, setSearch] = useState<string>("");

  function getSubscriber(subscriberId: string): ISubscriber | undefined {
    return subscribers.find((s) => s.id === subscriberId);
  }

  function getBook(bookId: string): IBook | undefined {
    return books.find((b) => b.id === bookId);
  }

  const filtered = initialLoans.filter((loan) => {
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

  return {
    search,
    setSearch,
    filtered,
    getSubscriber,
    getBook,
  };
}
