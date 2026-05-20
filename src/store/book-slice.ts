import type { StateCreator } from "zustand";
import type { IBookSlice } from "@/types/store-t";

export const createBookSlice: StateCreator<IBookSlice> = (set) => ({
  books: [],
  setBooks: (books) => set(() => ({ books })),
});
