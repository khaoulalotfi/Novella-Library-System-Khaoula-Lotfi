"use server";

import type { IState } from "@/types/shared-t";
import type { IBook } from "@/types/book-t";

export async function saveBook(
  state: IState,
  formData: FormData,
): Promise<IState> {
  const data: IBook = {
    id: formData.get("id") as string,
    inventoryNumber: formData.get("inventoryNumber") as string,
    code: formData.get("code") as string,
    authors: formData.get("authors") as string,
    title: formData.get("title") as string,
    price: formData.get("price") as string,
    publisher: formData.get("publisher") as string,
    year: formData.get("year") as string,
    annotation: formData.get("annotation") as string,
  };

  if (!data.title) {
    return {
      isSaved: false,
      errors: { title: ["Title is required"] },
    };
  }

  return { isSaved: true, message: "Book saved successfully" };
}
