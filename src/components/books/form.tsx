"use client"

import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { IBook, IAuthor, IPublisher, ICode } from "@/types/book-t"

function toNum(val: unknown): number | undefined {
  if (typeof val === "number") return isNaN(val) ? undefined : val
  if (val === "" || val == null) return undefined
  const n = Number(val)
  return isNaN(n) ? undefined : n
}

const currentYear = new Date().getFullYear()

const bookSchema = z.object({
  inventoryNumber: z.preprocess(
    toNum,
    z.number({ message: "Inventory number is required" })
      .int("Must be a whole number")
      .min(1, "Inventory number is required"),
  ),
  code: z.string().optional(),
  authors: z.array(z.string()).min(1, "At least one author is required"),
  title: z.string()
    .min(1, "Title is required")
    .transform((val) => {
      const t = val.trim()
      return t ? t.charAt(0).toUpperCase() + t.slice(1) : t
    }),
  price: z.preprocess(
    toNum,
    z.number({ message: "Price is required" })
      .positive("Price must be greater than 0"),
  ),
  publisher: z.string().min(1, "Publisher is required"),
  year: z.preprocess(
    toNum,
    z.number({ message: "Year is required" })
      .int("Must be a whole number")
      .min(1000, "Year must be at least 1000")
      .max(currentYear, "Year cannot be in the future"),
  ),
  annotation: z.string()
    .min(1, "Annotation is required")
    .max(500, "Max 500 characters")
    .transform((val) => val.trim()),
})

// Inline resolver — calls bookSchema.safeParseAsync directly,
// no third-party resolver package required.
async function bookResolver(values: unknown) {
  const result = await bookSchema.safeParseAsync(values)
  if (result.success) {
    return { values: result.data, errors: {} }
  }
  // Map each Zod issue to its top-level field name
  const errors: Record<string, { type: string; message: string }> = {}
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "")
    if (key && !errors[key]) {
      errors[key] = { type: String(issue.code), message: issue.message }
    }
  }
  return { values: {}, errors }
}

interface IProps {
  selected: IBook | undefined
  authors: IAuthor[]
  publishers: IPublisher[]
  codes: ICode[]
  onSaved: (book: IBook) => void
}

export function BookForm({ selected, authors, publishers, codes, onSaved }: IProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, control, handleSubmit, formState: { errors } } = useForm<any>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: bookResolver as any,
    defaultValues: {
      inventoryNumber: selected?.inventoryNumber ?? "",
      code: selected?.code ?? "",
      authors: Array.isArray(selected?.authors) ? selected.authors : [],
      title: selected?.title ?? "",
      price: selected?.price ?? "",
      publisher: selected?.publisher ?? "",
      year: selected?.year ?? "",
      annotation: selected?.annotation ?? "",
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(values: any) {
    onSaved({
      id: selected?.id,
      inventoryNumber: values.inventoryNumber,
      code: values.code,
      authors: values.authors,
      title: values.title,
      price: values.price,
      publisher: values.publisher,
      year: values.year,
      annotation: values.annotation,
    })
  }

  const authorOptions = authors.map((a) => ({ id: a.id ?? "", label: a.name }))
  const publisherOptions = publishers.map((p) => ({ id: p.id ?? "", label: p.name }))
  const codeOptions = codes.map((c) => ({ id: c.id ?? "", label: c.value }))

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">

      {/* Inventory Number */}
      <div className="space-y-1">
        <Label>Inventory Number</Label>
        <Input {...register("inventoryNumber")} placeholder="Enter inventory number" />
        {errors.inventoryNumber && (
          <p className="text-destructive text-sm font-medium">{String(errors.inventoryNumber.message ?? "")}</p>
        )}
      </div>

      {/* Code — optional */}
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
                  <SelectItem key={opt.id} value={opt.id}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Authors — multi-select */}
      <div className="space-y-1">
        <Label>Author(s)</Label>
        <Controller
          control={control}
          name="authors"
          render={({ field }) => {
            const picked: string[] = Array.isArray(field.value) ? field.value : []
            return (
              <>
                <Select
                  onValueChange={(val) => {
                    if (!picked.includes(val)) field.onChange([...picked, val])
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select author(s)" />
                  </SelectTrigger>
                  <SelectContent>
                    {authorOptions
                      .filter((o) => !picked.includes(o.id))
                      .map((opt) => (
                        <SelectItem key={opt.id} value={opt.id}>{opt.label}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {picked.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {picked.map((val) => {
                      const opt = authorOptions.find((o) => o.id === val)
                      return (
                        <Badge key={val} variant="outline" className="gap-x-1">
                          {opt?.label ?? val}
                          <button
                            type="button"
                            onClick={() => field.onChange(picked.filter((v) => v !== val))}
                            className="text-muted-foreground hover:text-destructive ml-1"
                          >
                            ×
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                )}
              </>
            )
          }}
        />
        {errors.authors && (
          <p className="text-destructive text-sm font-medium">{String(errors.authors.message ?? "")}</p>
        )}
      </div>

      {/* Title */}
      <div className="space-y-1">
        <Label>Title</Label>
        <Input {...register("title")} placeholder="Enter title" />
        {errors.title && (
          <p className="text-destructive text-sm font-medium">{String(errors.title.message ?? "")}</p>
        )}
      </div>

      {/* Price */}
      <div className="space-y-1">
        <Label>Price</Label>
        <Input {...register("price")} placeholder="Enter price" />
        {errors.price && (
          <p className="text-destructive text-sm font-medium">{String(errors.price.message ?? "")}</p>
        )}
      </div>

      {/* Publisher */}
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
                  <SelectItem key={opt.id} value={opt.id}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.publisher && (
          <p className="text-destructive text-sm font-medium">{String(errors.publisher.message ?? "")}</p>
        )}
      </div>

      {/* Year */}
      <div className="space-y-1">
        <Label>Year</Label>
        <Input {...register("year")} placeholder="Enter year" />
        {errors.year && (
          <p className="text-destructive text-sm font-medium">{String(errors.year.message ?? "")}</p>
        )}
      </div>

      {/* Annotation */}
      <div className="space-y-1">
        <Controller
          control={control}
          name="annotation"
          render={({ field }) => (
            <>
              <div className="flex justify-between items-center">
                <Label>Annotation</Label>
                <span className="text-xs text-muted-foreground">
                  {(field.value as string)?.length ?? 0}/500
                </span>
              </div>
              <Textarea {...field} placeholder="Enter annotation" maxLength={500} />
            </>
          )}
        />
        {errors.annotation && (
          <p className="text-destructive text-sm font-medium">{String(errors.annotation.message ?? "")}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        {selected ? "Update Book" : "Save Book"}
      </Button>
    </form>
  )
}
