import type { INav } from "@/types/nav-t";

export const menu: INav[] = [
  { title: "Home", slug: "" },
  {
    title: "Books",
    slug: "books",
    role: "user",
    children: [
      { title: "Book List", slug: "books/list" },
      { title: "Book Search", slug: "books/search" },
      { title: "Library Inventory", slug: "books/inventory" },
      { title: "Book Details", slug: "books/details" },
    ],
  },
  {
    title: "Subscribers",
    slug: "subscribers",
    role: "user",
    children: [
      { title: "Subscriber List", slug: "subscribers/list" },
      { title: "Subscriber Search", slug: "subscribers/search" },
      { title: "Borrowed Books", slug: "subscribers/borrowed" },
      { title: "Overdue Borrowers", slug: "subscribers/overdue" },
    ],
  },
  {
    title: "Loans",
    slug: "loans",
    role: "user",
    children: [
      { title: "Loan History", slug: "loans/history" },
      { title: "Borrowed Books", slug: "loans/borrowed" },
      { title: "Returned Books", slug: "loans/returned" },
      { title: "Book Borrowers", slug: "loans/borrowers" },
    ],
  },
  {
    title: "Authors & Publishers",
    slug: "authors",
    role: "user",
    children: [
      { title: "Authors", slug: "authors/list" },
      { title: "Publishers", slug: "publishers/list" },
      { title: "Books by Year", slug: "books-by-year" },
    ],
  },
  {
    title: "Reports",
    slug: "reports",
    role: "user",
    children: [
      { title: "Inventory Report", slug: "reports/inventory" },
      { title: "Loan Report", slug: "reports/loans" },
      { title: "Overdue Report", slug: "reports/overdue" },
      { title: "Subscriber Report", slug: "reports/subscribers" },
    ],
  },
];
