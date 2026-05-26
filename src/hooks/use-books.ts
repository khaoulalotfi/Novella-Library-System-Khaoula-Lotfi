"use client";

import { useState } from "react";
import { createBook, updateBook, deleteBook } from "@/actions/books";
import { getApi } from "@/utils/server-api";
import type { IBook } from "@/types/book-t";

export function useBooks(initialBooks: IBook[]) {
  const [books, setBooks] = useState<IBook[]>(initialBooks);
  const [selected, setSelected] = useState<IBook | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  function handleEdit(book: IBook) {
    const rawInv = String(book.inventoryNumber).replace(/^INV-0*/i, "");
    setSelected({
      ...book,
      inventoryNumber: Number(rawInv) || Number(book.inventoryNumber),
      price: Number(book.price),
      year: Number(book.year),
      authors: Array.isArray(book.authors) ? book.authors : [book.authors],
    });
    setError(undefined);
    setOpen(true);
  }

  function handleAdd() {
    setSelected(undefined);
    setError(undefined);
    setOpen(true);
  }

  async function handleSaved(book: IBook) {
    try {
      const isDuplicateTitle = books.some(
        (b) =>
          b.title.toLowerCase() === book.title.toLowerCase() &&
          JSON.stringify([...b.authors].sort()) ===
            JSON.stringify([...book.authors].sort()) &&
          b.id !== selected?.id,
      );
      if (isDuplicateTitle) {
        setError("A book with this title and authors already exists!");
        return;
      }

      const isDuplicateInvNo = books.some(
        (b) =>
          b.inventoryNumber === book.inventoryNumber && b.id !== selected?.id,
      );
      if (isDuplicateInvNo) {
        setError("A book with this inventory number already exists!");
        return;
      }

      if (selected?.id) {
        const result = await updateBook(selected.id, book);
        if ("error" in result) {
          setError(result.error);
          return;
        }
      } else {
        const result = await createBook(book);
        if ("error" in result) {
          setError(result.error);
          return;
        }
      }

      const refreshed = await getApi<IBook[]>({ url: "/api/books" });
      if (Array.isArray(refreshed)) setBooks(refreshed);
      setOpen(false);
      setSelected(undefined);
      setError(undefined);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.",
      );
    }
  }

  async function handleDelete(id: string): Promise<void> {
    await deleteBook(id);
    setBooks(books.filter((b) => b.id !== id));
  }

  function handleOpenChange(v: boolean) {
    setOpen(v);
    if (!v) {
      setSelected(undefined);
      setError(undefined);
    }
  }

  return {
    books,
    selected,
    open,
    error,
    handleEdit,
    handleAdd,
    handleSaved,
    handleDelete,
    handleOpenChange,
  };
}
