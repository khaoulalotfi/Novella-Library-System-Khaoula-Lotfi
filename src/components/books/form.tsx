"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createBookSchema } from "./book-schema"
import type { IBookForm } from "@/types/book-t"
import type { IBook } from "@/types/book-t";
import type { IAuthor } from "@/types/author-t";
import type { IPublisher } from "@/types/publisher-t";
import type { ICode } from "@/types/code-t";
import type { IDict } from "@/lib/dictionary";

interface IProps {
  selected: IBook | undefined;
  authors: IAuthor[];
  publishers: IPublisher[];
  codes: ICode[];
  onSaved: (book: IBook) => void;
  dict: IDict["books"];
}

export function BookForm(props: IProps) {
  const { selected, authors, publishers, codes, onSaved, dict } = props;

  const schema = createBookSchema({
    inventoryRequired: dict.errInventoryRequired,
    inventoryMustBePositive: dict.errInventoryMustBePositive,
    authorRequired: dict.errAuthorRequired,
    titleRequired: dict.errTitleRequired,
    priceRequired: dict.errPriceRequired,
    pricePositive: dict.errPricePositive,
    publisherRequired: dict.errPublisherRequired,
    yearRequired: dict.errYearRequired,
    yearRange: dict.errYearRange,
    annotationRequired: dict.errAnnotationRequired,
    annotationMax: dict.errAnnotationMax,
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IBookForm>({
    resolver: zodResolver(schema),
    mode: "onTouched",
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

  function onSubmit(values: IBookForm) {
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

  const authorOptions = authors.map((a) => ({ id: a.id ?? "", title: a.name }));
  const publisherOptions = publishers.map((p) => ({
    id: p.id ?? "",
    title: p.name,
  }));
  const codeOptions = codes.map((c) => ({ id: c.id ?? "", title: c.value }));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      autoComplete="off"
    >
      <FormInput
        label={dict.formInventoryNumber}
        placeholder={dict.formInventoryPlaceholder}
        error={String(errors.inventoryNumber?.message ?? "")}
        {...register("inventoryNumber")}
      />

      <div className="space-y-1">
        <Label>{dict.formCodeOptional}</Label>
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
              <SelectTrigger>
                <SelectValue placeholder={dict.formSelectCode} />
              </SelectTrigger>
              <SelectContent>
                {codeOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.title}
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
        label={dict.formAuthors}
        placeholder={dict.formSelectAuthors}
      />

      <FormInput
        label={dict.colTitle}
        placeholder={dict.formEnterTitle}
        error={String(errors.title?.message ?? "")}
        {...register("title")}
      />

      <FormInput
        label={dict.colPrice}
        placeholder={dict.formEnterPrice}
        error={String(errors.price?.message ?? "")}
        {...register("price")}
      />

      <div className="space-y-1">
        <Label>{dict.colPublisher}</Label>
        <Controller
          control={control}
          name="publisher"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
              <SelectTrigger>
                <SelectValue placeholder={dict.formSelectPublisher} />
              </SelectTrigger>
              <SelectContent>
                {publisherOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.title}
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
        label={dict.colYear}
        placeholder={dict.formEnterYear}
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
                <Label>{dict.formAnnotation}</Label>
                <span className="text-xs text-muted-foreground">
                  {field.value.length}/500
                </span>
              </div>
              <Textarea
                {...field}
                placeholder={dict.formEnterAnnotation}
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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? dict.saving : selected ? dict.updateBook : dict.saveBook}
      </Button>
    </form>
  );
}
