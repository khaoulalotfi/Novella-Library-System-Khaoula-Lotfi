"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/parts/text-field";
import { SubmitButton } from "@/components/parts/submit-button";
import type { IBook } from "@/types/book-t";

const searchSchema = z.object({
  query: z.string().min(1, "Please enter a search term"),
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface IProps {
  books: IBook[];
  onSearch: (results: IBook[]) => void;
}

export function BookSearchForm({ books, onSearch }: IProps) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit(values: SearchFormValues) {
    const q = values.query.toLowerCase();
    const results = books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.authors.toLowerCase().includes(q) ||
        b.code.toLowerCase().includes(q) ||
        b.inventoryNumber.toLowerCase().includes(q),
    );
    onSearch(results);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-x-4 items-end w-full"
      >
        <div className="flex-1">
          <TextField
            control={form.control}
            name="query"
            label="Search by Title, Author or ISBN"
          />
        </div>
        <div className="shrink-0">
          <SubmitButton label="Search" />
        </div>
      </form>
    </Form>
  );
}
