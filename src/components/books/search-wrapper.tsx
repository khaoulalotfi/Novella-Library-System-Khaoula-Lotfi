"use client";

import { useState } from "react";
import { BookSearchForm } from "./search-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBook } from "@/types/book-t";
import type { IDict } from "@/lib/dictionary";

interface IProps {
  books: IBook[];
  dict: IDict["books"];
}

export function BookSearchWrapper(props: IProps) {
  const { books, dict } = props;
  const [results, setResults] = useState<IBook[]>([]);
  const [searched, setSearched] = useState(false);

  function handleSearch(found: IBook[]) {
    setResults(found);
    setSearched(true);
  }

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <h1 className="text-3xl font-bold text-primary">{dict.searchTitle}</h1>
      </div>
      <div className="mb-8">
        <BookSearchForm books={books} onSearch={handleSearch} dict={dict} />
      </div>
      {searched && (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <p className="text-sm text-muted-foreground">
              {results.length} {dict.resultsFound}
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{dict.colInvNo}</TableHead>
                <TableHead>{dict.colCode}</TableHead>
                <TableHead>{dict.colAuthors}</TableHead>
                <TableHead>{dict.colTitle}</TableHead>
                <TableHead>{dict.colPrice}</TableHead>
                <TableHead>{dict.colPublisher}</TableHead>
                <TableHead>{dict.colYear}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground"
                  >
                    {dict.noBooksFound}
                  </TableCell>
                </TableRow>
              ) : (
                results.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.inventoryNumber}</TableCell>
                    <TableCell>{book.codeValue ?? book.code ?? "—"}</TableCell>
                    <TableCell>
                      {(book.authorNames ?? book.authors).join(", ") || "—"}
                    </TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.price}</TableCell>
                    <TableCell>
                      {book.publisherName ?? book.publisher}
                    </TableCell>
                    <TableCell>{book.year}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
