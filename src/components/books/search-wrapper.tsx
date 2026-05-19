"use client";

import { useState } from "react";
import { BookSearchForm } from "./search-form";
import { BookList } from "./list";
import {
  useBoundStore,
  useShallow,
} from "@/components/providers/store-provider";
import type { IBook } from "@/types/book-t";

export function BookSearchWrapper() {
  const { books } = useBoundStore(useShallow((s) => ({ books: s.books })));
  const [results, setResults] = useState<IBook[]>([]);
  const [searched, setSearched] = useState(false);

  function handleSearch(found: IBook[]) {
    setResults(found);
    setSearched(true);
  }

  function handleEdit(book: IBook) {
    console.log("edit", book);
  }

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <h1 className="text-3xl font-bold text-primary">Book Search</h1>
      </div>
      <div className="mb-8">
        <BookSearchForm books={books} onSearch={handleSearch} />
      </div>
      {searched && (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <p className="text-sm text-muted-foreground">
              {results.length} result(s) found
            </p>
          </div>
          <BookList books={results} onEdit={handleEdit} />
        </div>
      )}
    </div>
  );
}
