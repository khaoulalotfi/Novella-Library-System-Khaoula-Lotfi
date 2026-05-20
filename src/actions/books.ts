"use server";

import { getApi, postApi, putApi, deleteApi } from "@/utils/server-api";
import type { IBook, IAuthor, IPublisher, ICode } from "@/types/book-t";

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

export async function createBook(data: Omit<IBook, "id">): Promise<IBook> {
  return await postApi("/api/books", data);
}

export async function updateBook(
  id: string,
  data: Omit<IBook, "id">,
): Promise<IBook> {
  return await postApi("/api/books", { id, ...data }, "PUT");
}

export async function deleteBook(id: string): Promise<void> {
  await deleteApi("/api/books", id);
}
