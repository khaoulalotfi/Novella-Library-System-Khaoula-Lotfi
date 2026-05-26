"use client";

import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormInput } from "@/components/parts/form-input";
import { AuthorSelect } from "./author-select";
import { bookResolver, type BookFormValues } from "./book-schema";
import type { IBook, IAuthor, IPublisher, ICode } from "@/types/book-t";

interface IProps {
  selected: IBook | undefined;
  authors: IAuthor[];
  publishers: IPublisher[];
  codes: ICode[];
  onSaved: (book: IBook) => void;
}

export function BookForm({
  selected,
  authors,
  publishers,
  codes,
  onSaved,
}: IProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormValues>({
    resolver: bookResolver,
    defaultValues: {
      inventoryNumber:
        selected?.inventoryNumber != null
          ? String(selected.inventoryNumber)
          : "",
      code: selected?.code ?? "",
      authors: Array.isArray(selected?.authors) ? selected.authors : [],
      title: selected?.title ?? "",
      price: selected?.price != null ? String(selected.price) : "",
      publisher: selected?.publisher ?? "",
      year: selected?.year != null ? String(selected.year) : "",
      annotation: selected?.annotation ?? "",
    },
  });

  function onSubmit(values: BookFormValues) {
    onSaved({
      id: selected?.id,
      inventoryNumber: Number(values.inventoryNumber),
      code: values.code,
      authors: values.authors,
      title: values.title,
      price: Number(values.price),
      publisher: values.publisher,
      year: Number(values.year),
      annotation: values.annotation,
    });
  }

  const authorOptions = authors.map((a) => ({ id: a.id ?? "", label: a.name }));
  const publisherOptions = publishers.map((p) => ({
    id: p.id ?? "",
    label: p.name,
  }));
  const codeOptions = codes.map((c) => ({ id: c.id ?? "", label: c.value }));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      autoComplete="off"
    >
      <FormInput
        label="Inventory Number"
        placeholder="Enter inventory number"
        error={String(errors.inventoryNumber?.message ?? "")}
        {...register("inventoryNumber")}
      />

      <div className="space-y-1">
        <Label>Code (UDC or ISBN) — optional</Label>
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select code (optional)" />
              </SelectTrigger>
              <SelectContent>
                {codeOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <AuthorSelect
        control={control}
        authorOptions={authorOptions}
        error={String(errors.authors?.message ?? "")}
      />

      <FormInput
        label="Title"
        placeholder="Enter title"
        error={String(errors.title?.message ?? "")}
        {...register("title")}
      />

      <FormInput
        label="Price"
        placeholder="Enter price"
        error={String(errors.price?.message ?? "")}
        {...register("price")}
      />

      <div className="space-y-1">
        <Label>Publisher</Label>
        <Controller
          control={control}
          name="publisher"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select publisher" />
              </SelectTrigger>
              <SelectContent>
                {publisherOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.publisher && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.publisher.message ?? "")}
          </p>
        )}
      </div>

      <FormInput
        label="Year"
        placeholder="Enter year"
        error={String(errors.year?.message ?? "")}
        {...register("year")}
      />

      <div className="space-y-1">
        <Controller
          control={control}
          name="annotation"
          render={({ field }) => (
            <>
              <div className="flex justify-between items-center">
                <Label>Annotation</Label>
                <span className="text-xs text-muted-foreground">
                  {field.value.length}/500
                </span>
              </div>
              <Textarea
                {...field}
                placeholder="Enter annotation"
                maxLength={500}
              />
            </>
          )}
        />
        {errors.annotation && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.annotation.message ?? "")}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        {selected ? "Update Book" : "Save Book"}
      </Button>
    </form>
  );
}
