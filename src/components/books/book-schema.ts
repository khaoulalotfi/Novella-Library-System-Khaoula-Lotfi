import { z } from "zod"

const currentYear = new Date().getFullYear()

export const bookSchema = z.object({
  inventoryNumber: z
    .string()
    .min(1, "Inventory number is required")
    .refine(
      (v) => !isNaN(Number(v)) && Number.isInteger(Number(v)) && Number(v) >= 1,
      "Must be a positive whole number",
    ),
  code: z.string().optional(),
  authors: z.array(z.string()).min(1, "At least one author is required"),
  title: z.string().min(1, "Title is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine(
      (v) => !isNaN(Number(v)) && Number(v) > 0,
      "Price must be greater than 0",
    ),
  publisher: z.string().min(1, "Publisher is required"),
  year: z
    .string()
    .min(1, "Year is required")
    .refine(
      (v) => {
        const n = Number(v)
        return !isNaN(n) && Number.isInteger(n) && n >= 1000 && n <= currentYear
      },
      `Year must be between 1000 and ${currentYear}`,
    ),
  annotation: z
    .string()
    .min(1, "Annotation is required")
    .max(500, "Max 500 characters"),
})
