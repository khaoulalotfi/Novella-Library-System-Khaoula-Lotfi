"use client";

import { useState } from "react";
import { postApi } from "@/utils/server-api";
import type { ILoan, ILoanForm, ILoanFormErrors, ISubscriber } from "@/types/subscriber-t";
import type { IBook } from "@/types/book-t";

export function useLoans(
  initialLoans: ILoan[],
  subscribers: ISubscriber[],
  books: IBook[],
  currentSubscriberId?: string,
) {
  const [loans, setLoans] = useState<ILoan[]>(initialLoans);
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<ILoanFormErrors>({});
  const [form, setForm] = useState<ILoanForm>({
    subscriberId: "",
    bookId: "",
    borrowDate: "",
    returnDate: "",
  });

  function handleOpenChange(v: boolean) {
    setOpen(v);
    if (!v) {
      setFormErrors({});
      setForm({ subscriberId: "", bookId: "", borrowDate: "", returnDate: "" });
    }
  }

  async function handleReturn(id: string): Promise<void> {
    await postApi(`/api/loans/${id}`, {}, "DELETE");
    setLoans(loans.filter((l) => l.id !== id));
  }

  async function handleBorrow(): Promise<void> {
    const resolvedSubscriberId = currentSubscriberId ?? form.subscriberId;
    const errors: ILoanFormErrors = {};
    if (!resolvedSubscriberId)
      errors.subscriberId = "Please select a subscriber.";
    if (!form.bookId) errors.bookId = "Please select a book.";
    if (!form.borrowDate) errors.borrowDate = "Please enter a borrow date.";
    if (!form.returnDate) errors.returnDate = "Please enter a return date.";
    if (
      form.borrowDate &&
      form.returnDate &&
      form.returnDate <= form.borrowDate
    ) {
      errors.returnDate = "Return date must be after borrow date.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const result = await postApi("/api/loans", {
      ...form,
      subscriberId: resolvedSubscriberId,
    });
    if (result && "error" in result) {
      setFormErrors({ subscriberId: result.error as string });
      return;
    }

    const newLoan = result as ILoan;
    setLoans([...loans, newLoan]);
    setOpen(false);
    setForm({ subscriberId: "", bookId: "", borrowDate: "", returnDate: "" });
  }

  function getSubscriber(subscriberId: string): ISubscriber | undefined {
    return subscribers.find((s) => s.id === subscriberId);
  }

  function getBook(bookId: string): IBook | undefined {
    return books.find((b) => b.id === bookId);
  }

  return {
    loans,
    open,
    form,
    formErrors,
    setForm,
    handleOpenChange,
    handleReturn,
    handleBorrow,
    getSubscriber,
    getBook,
  };
}
