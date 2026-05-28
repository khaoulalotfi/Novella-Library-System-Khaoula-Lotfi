"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/parts/text-field";
import { SubmitButton } from "@/components/parts/submit-button";
import type { IBook } from "@/types/book-t";
import type { IDict } from "@/lib/dictionary";

interface ISearchFormValues {
  title?: string;
  author?: string;
  year?: string;
}

interface IProps {
  books: IBook[];
  onSearch: (results: IBook[]) => void;
  dict: IDict["books"];
}

export function BookSearchForm(props: IProps) {
  const { books, onSearch, dict } = props;

  const searchSchema = z
    .object({
      title: z.string().optional(),
      author: z.string().optional(),
      year: z.string().optional(),
    })
    .refine((data) => data.title || data.author || data.year, {
      message: dict.errSearchRequired,
      path: ["title"],
    });

  const form = useForm<ISearchFormValues>({
    resolver: zodResolver(searchSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      author: "",
      year: "",
    },
  });

  function onSubmit(values: ISearchFormValues) {
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
            label={dict.colTitle}
            placeholder={dict.searchByTitle}
          />
          <TextField
            control={form.control}
            name="author"
            label={dict.colAuthor}
            placeholder={dict.searchByAuthor}
          />
          <TextField
            control={form.control}
            name="year"
            label={dict.colYear}
            placeholder={dict.searchByYear}
          />
        </div>
        <SubmitButton label={dict.search} />
      </form>
    </Form>
  );
}
