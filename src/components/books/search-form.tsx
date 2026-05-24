"use client";

import { useForm } from "react-hook-form";
import type { ResolverResult } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/parts/text-field";
import { SubmitButton } from "@/components/parts/submit-button";
import type { IBook } from "@/types/book-t";

const searchSchema = z
  .object({
    title: z.string().optional(),
    author: z.string().optional(),
    year: z.string().optional(),
  })
  .refine((data) => data.title || data.author || data.year, {
    message: "Please enter at least one search term",
    path: ["title"],
  });

interface SearchFormValues {
  title?: string;
  author?: string;
  year?: string;
}

async function searchResolver(
  values: SearchFormValues,
): Promise<ResolverResult<SearchFormValues>> {
  const result = await searchSchema.safeParseAsync(values);
  if (result.success) {
    return { values: result.data as SearchFormValues, errors: {} };
  }
  const errors: Record<string, { type: string; message: string }> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !errors[key]) {
      errors[key] = { type: String(issue.code), message: issue.message };
    }
  }
  return { values: {}, errors };
}

interface IProps {
  books: IBook[];
  onSearch: (results: IBook[]) => void;
}

export function BookSearchForm({ books, onSearch }: IProps) {
  const form = useForm<SearchFormValues>({
    resolver: searchResolver,
    defaultValues: {
      title: "",
      author: "",
      year: "",
    },
  });

  function onSubmit(values: SearchFormValues) {
    const results = books.filter((b) => {
      const matchTitle = values.title
        ? b.title.toLowerCase().includes(values.title.toLowerCase())
        : true;
      const authorDisplay = (b.authorNames ?? b.authors).join(", ");
      const matchAuthor = values.author
        ? authorDisplay.toLowerCase().includes(values.author.toLowerCase())
        : true;
      const matchYear = values.year
        ? b.year.toString() === values.year.trim()
        : true;
      return matchTitle && matchAuthor && matchYear;
    });
    onSearch(results);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <div className="grid grid-cols-3 gap-4">
          <TextField
            control={form.control}
            name="title"
            label="Title"
            placeholder="Search by title"
          />
          <TextField
            control={form.control}
            name="author"
            label="Author"
            placeholder="Search by author"
          />
          <TextField
            control={form.control}
            name="year"
            label="Year"
            placeholder="Search by year"
          />
        </div>
        <SubmitButton label="Search" />
      </form>
    </Form>
  );
}
