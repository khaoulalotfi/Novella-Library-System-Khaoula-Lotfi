import { BookInventoryWrapper } from "@/components/books/inventory-wrapper";
import { getApi } from "@/utils/server-api";
import type { IBook } from "@/types/book-t";

export default async function BookInventoryPage() {
  const books = (await getApi<IBook[]>({ url: "/api/books" })) ?? [];
  return <BookInventoryWrapper books={books} />;
}
