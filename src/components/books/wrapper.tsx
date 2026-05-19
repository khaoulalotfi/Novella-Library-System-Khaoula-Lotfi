"use client";

import { useState } from "react";
import { BookForm } from "./form";
import { BookList } from "./list";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useBoundStore,
  useShallow,
} from "@/components/providers/store-provider";
import type { IBook } from "@/types/book-t";

export function BookWrapper() {
  const { books, setBooks } = useBoundStore(
    useShallow((s) => ({ books: s.books, setBooks: s.setBooks })),
  );
  const [selected, setSelected] = useState<IBook | undefined>(undefined);
  const [open, setOpen] = useState(false);

  function handleEdit(book: IBook) {
    setSelected(book);
    setOpen(true);
  }

  function handleAdd() {
    setSelected(undefined);
    setOpen(true);
  }

  function handleSaved(book: IBook) {
    if (selected) {
      setBooks(books.map((b) => (b === selected ? book : b)));
    } else {
      setBooks([...books, book]);
    }
    setOpen(false);
    setSelected(undefined);
  }

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Book List</h1>
            <p className="text-muted-foreground mt-1">
              Manage your library collection
            </p>
            <div className="flex items-center gap-x-2 mt-3">
              <Badge
                variant="outline"
                className="text-primary border-primary/40"
              >
                {books.length} {books.length === 1 ? "Book" : "Books"} Total
              </Badge>
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} size="lg" className="gap-x-2">
                + Add Book
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-primary">
                  {selected ? "Edit Book" : "Add New Book"}
                </DialogTitle>
              </DialogHeader>
              <BookForm selected={selected} onSaved={handleSaved} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <BookList books={books} onEdit={handleEdit} />
      </div>
    </div>
  );
}
