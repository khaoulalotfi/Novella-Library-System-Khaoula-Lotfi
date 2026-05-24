"use server";

import { getApi, postApi } from "@/utils/server-api";
import type { IBook, IAuthor, IPublisher, ICode } from "@/types/book-t";

type BookActionResult = { error: string } | { book: IBook };

export async function getBooks(): Promise<IBook[]> {
  const result = await getApi<IBook[]>({ url: "/api/books" });
  if (!result || !Array.isArray(result)) return [];
  return result;
}

export async function getAuthors(): Promise<IAuthor[]> {
  const result = await getApi<IAuthor[]>({ url: "/api/authors" });
  if (!result || !Array.isArray(result)) return [];
  return result;
}

export async function getPublishers(): Promise<IPublisher[]> {
  const result = await getApi<IPublisher[]>({ url: "/api/publishers" });
  if (!result || !Array.isArray(result)) return [];
  return result;
}

export async function getCodes(): Promise<ICode[]> {
  const result = await getApi<ICode[]>({ url: "/api/codes" });
  if (!result || !Array.isArray(result)) return [];
  return result;
}

export async function createBook(
  data: Omit<IBook, "id">,
): Promise<BookActionResult> {
  return (await postApi("/api/books", data)) as BookActionResult;
}

export async function updateBook(
  id: string,
  data: Omit<IBook, "id">,
): Promise<BookActionResult> {
  return (await postApi(`/api/books/${id}`, data, "PUT")) as BookActionResult;
}

export async function deleteBook(id: string): Promise<void> {
  await postApi(`/api/books/${id}`, {}, "DELETE");
}
