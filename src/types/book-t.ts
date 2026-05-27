import { z } from "zod"

export interface IBook {
  id?: string
  inventoryNumber: number
  code?: string
  codeValue?: string
  authors: string[]
  authorNames?: string[]
  title: string
  price: number
  publisher?: string
  publisherName?: string
  year: number
  annotation: string
}

export interface IBookForm {
  inventoryNumber: string
  code?: string
  authors: string[]
  title: string
  price: string
  publisher: string
  year: string
  annotation: string
}

const currentYear = new Date().getFullYear()

export const bookServerSchema = z.object({
  inventoryNumber: z.coerce
    .number({ message: "Inventory number is required" })
    .int("Must be a whole number")
    .min(1, "Inventory number must be at least 1"),
  code: z.string().optional(),
  authors: z.array(z.string().min(1)).min(1, "At least one author is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .transform((v) => {
      const t = v.trim()
      return t ? t.charAt(0).toUpperCase() + t.slice(1) : t
    }),
  price: z.coerce
    .number({ message: "Price is required" })
    .positive("Price must be greater than 0"),
  publisher: z.string().min(1, "Publisher is required"),
  year: z.coerce
    .number({ message: "Year is required" })
    .int("Must be a whole number")
    .min(1000, "Year must be at least 1000")
    .max(currentYear, "Year cannot be in the future"),
  annotation: z
    .string()
    .min(1, "Annotation is required")
    .max(500, "Max 500 characters"),
})
