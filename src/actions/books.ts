"use server";

import { getApi } from "@/utils/server-api";
import type { IBook } from "@/types/book-t";

export async function getBooks(): Promise<IBook[]> {
  const result = await getApi<IBook[] | { error: string }>({
    url: "/api/books",
  });
  if (!result || !Array.isArray(result)) return [];
  return result;
}
