import { z } from "zod";
import type { ResolverResult } from "react-hook-form";

function toNum(val: unknown): number | undefined {
  if (typeof val === "number") return isNaN(val) ? undefined : val;
  if (val === "" || val == null) return undefined;
  const n = Number(val);
  return isNaN(n) ? undefined : n;
}

const currentYear = new Date().getFullYear();

export const bookSchema = z.object({
  inventoryNumber: z.preprocess(
    toNum,
    z
      .number({ message: "Inventory number is required" })
      .int("Must be a whole number")
      .min(1, "Inventory number is required"),
  ),
  code: z.string().optional(),
  authors: z.array(z.string()).min(1, "At least one author is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .transform((val) => {
      const t = val.trim();
      return t ? t.charAt(0).toUpperCase() + t.slice(1) : t;
    }),
  price: z.preprocess(
    toNum,
    z
      .number({ message: "Price is required" })
      .positive("Price must be greater than 0"),
  ),
  publisher: z.string().min(1, "Publisher is required"),
  year: z.preprocess(
    toNum,
    z
      .number({ message: "Year is required" })
      .int("Must be a whole number")
      .min(1000, "Year must be at least 1000")
      .max(currentYear, "Year cannot be in the future"),
  ),
  annotation: z
    .string()
    .min(1, "Annotation is required")
    .max(500, "Max 500 characters")
    .transform((val) => val.trim()),
});

export interface BookFormValues {
  inventoryNumber: string;
  code: string;
  authors: string[];
  title: string;
  price: string;
  publisher: string;
  year: string;
  annotation: string;
}

export async function bookResolver(
  values: BookFormValues,
): Promise<ResolverResult<BookFormValues>> {
  const result = await bookSchema.safeParseAsync(values);
  if (result.success) {
    return { values: result.data as unknown as BookFormValues, errors: {} };
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
