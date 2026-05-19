"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/parts/text-field";
import { SubmitButton } from "@/components/parts/submit-button";
import type { IBook } from "@/types/book-t";

const bookSchema = z.object({
  inventoryNumber: z.string().min(1, "Inventory number is required"),
  code: z.string().min(1, "Code is required"),
  authors: z.string().min(1, "Author(s) is required"),
  title: z.string().min(1, "Title is required"),
  price: z.string().min(1, "Price is required"),
  publisher: z.string().min(1, "Publisher is required"),
  year: z.string().min(4, "Year must be at least 4 characters"),
  annotation: z.string().min(1, "Annotation is required"),
});

type BookFormValues = z.infer<typeof bookSchema>;

interface IProps {
  selected: IBook | undefined;
  onSaved: (book: IBook) => void;
}

export function BookForm({ selected, onSaved }: IProps) {
  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      inventoryNumber: selected?.inventoryNumber ?? "",
      code: selected?.code ?? "",
      authors: selected?.authors ?? "",
      title: selected?.title ?? "",
      price: selected?.price ?? "",
      publisher: selected?.publisher ?? "",
      year: selected?.year ?? "",
      annotation: selected?.annotation ?? "",
    },
  });

  function onSubmit(values: BookFormValues) {
    onSaved({ ...values, id: selected?.id });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          control={form.control}
          name="inventoryNumber"
          label="Inventory Number"
        />
        <TextField
          control={form.control}
          name="code"
          label="Code (UDC or ISBN)"
        />
        <TextField control={form.control} name="authors" label="Author(s)" />
        <TextField control={form.control} name="title" label="Title" />
        <TextField control={form.control} name="price" label="Price" />
        <TextField control={form.control} name="publisher" label="Publisher" />
        <TextField control={form.control} name="year" label="Year" />
        <TextField
          control={form.control}
          name="annotation"
          label="Annotation"
        />
        <SubmitButton label="Save Book" />
      </form>
    </Form>
  );
}
