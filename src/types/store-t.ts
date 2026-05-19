import type { INav } from "./nav-t";
import type { IBook } from "./book-t";

export interface INotificationSlice {
  messages: string[];
  setMessage: (message: string) => void;
}

export interface INavSlice {
  menu: INav[];
  setMenu: (menu: INav[]) => void;
}

export interface IBookSlice {
  books: IBook[];
  setBooks: (books: IBook[]) => void;
}
