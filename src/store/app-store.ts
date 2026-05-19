import { createStore } from "zustand";
import { createNavigationSlice } from "./navigation-slice";
import { createNotificationSlice } from "./notification-slice";
import { createBookSlice } from "./book-slice";
import type {
  INavSlice,
  INotificationSlice,
  IBookSlice,
} from "@/types/store-t";

export type IStoreState = INotificationSlice & INavSlice & IBookSlice;

export const appStore = () =>
  createStore<IStoreState>()((...a) => ({
    ...createNotificationSlice(...a),
    ...createNavigationSlice(...a),
    ...createBookSlice(...a),
  }));
