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
import type { IBook } from "@/types/book-t";
import type { IAuthor } from "@/types/author-t";
import type { IPublisher } from "@/types/publisher-t";
import type { ICode } from "@/types/code-t";
import type { IDict } from "@/lib/dictionary";

interface IProps {
  books: IBook[];
  authors: IAuthor[];
  publishers: IPublisher[];
  codes: ICode[];
  isAdmin: boolean;
  dict: IDict["books"];
}

export function BookWrapper(props: IProps) {
  const { books: initialBooks, authors, publishers, codes, isAdmin, dict } = props;
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
            <h1 className="text-3xl font-bold text-primary">{dict.title}</h1>
            <p className="text-muted-foreground mt-1">
              {dict.subtitle}
            </p>
            <div className="flex items-center gap-x-2 mt-3">
              <Badge
                variant="outline"
                className="text-primary border-primary/40"
              >
                {`${books.length} ${books.length === 1 ? dict.bookSingular : dict.bookPlural} ${dict.total}`}
              </Badge>
            </div>
          </div>
          {isAdmin && (
            <Dialog open={open} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button onClick={handleAdd} size="lg">
                  {dict.addBook}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-primary">
                    {selected ? dict.editBook : dict.addNewBook}
                  </DialogTitle>
                </DialogHeader>
                <BookForm
                  key={selected?.id ?? "new"}
                  selected={selected}
                  authors={authors}
                  publishers={publishers}
                  codes={codes}
                  onSaved={handleSaved}
                  dict={dict}
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
          dict={dict}
        />
      </div>
    </div>
  );
}
