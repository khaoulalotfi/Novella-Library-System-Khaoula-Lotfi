"use client";

import { useBooks } from "@/hooks/use-books";
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
import type { IBook, IAuthor, IPublisher, ICode } from "@/types/book-t";

interface IProps {
  books: IBook[];
  authors: IAuthor[];
  publishers: IPublisher[];
  codes: ICode[];
  isAdmin: boolean;
}

export function BookWrapper({
  books: initialBooks,
  authors,
  publishers,
  codes,
  isAdmin,
}: IProps) {
  const {
    books,
    selected,
    open,
    error,
    handleEdit,
    handleAdd,
    handleSaved,
    handleDelete,
    handleOpenChange,
  } = useBooks(initialBooks);

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
                {`${books.length} ${books.length === 1 ? "Book" : "Books"} Total`}
              </Badge>
            </div>
          </div>
          {isAdmin && (
            <Dialog open={open} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button onClick={handleAdd} size="lg">
                  + Add Book
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-primary">
                    {selected ? "Edit Book" : "Add New Book"}
                  </DialogTitle>
                </DialogHeader>
                <BookForm
                  key={selected?.id ?? "new"}
                  selected={selected}
                  authors={authors}
                  publishers={publishers}
                  codes={codes}
                  onSaved={handleSaved}
                />
                {error && (
                  <p className="text-destructive text-xs font-medium">
                    {error}
                  </p>
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <BookList
          books={books}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
}
