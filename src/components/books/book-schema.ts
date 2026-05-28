import { z } from "zod"

export interface IBookSchemaMessages {
  inventoryRequired: string
  inventoryMustBePositive: string
  authorRequired: string
  titleRequired: string
  priceRequired: string
  pricePositive: string
  publisherRequired: string
  yearRequired: string
  yearRange: string
  annotationRequired: string
  annotationMax: string
}

export function createBookSchema(m: IBookSchemaMessages) {
  const currentYear = new Date().getFullYear()
  return z.object({
    inventoryNumber: z
      .string()
      .min(1, m.inventoryRequired)
      .refine(
        (v) => !isNaN(Number(v)) && Number.isInteger(Number(v)) && Number(v) >= 1,
        m.inventoryMustBePositive,
      ),
    code: z.string().optional(),
    authors: z.array(z.string()).min(1, m.authorRequired),
    title: z.string().min(1, m.titleRequired),
    price: z
      .string()
      .min(1, m.priceRequired)
      .refine(
        (v) => !isNaN(Number(v)) && Number(v) > 0,
        m.pricePositive,
      ),
    publisher: z.string().min(1, m.publisherRequired),
    year: z
      .string()
      .min(1, m.yearRequired)
      .refine(
        (v) => {
          const n = Number(v)
          return !isNaN(n) && Number.isInteger(n) && n >= 1000 && n <= currentYear
        },
        m.yearRange.replace("{year}", String(currentYear)),
      ),
    annotation: z
      .string()
      .min(1, m.annotationRequired)
      .max(500, m.annotationMax),
  })
}
