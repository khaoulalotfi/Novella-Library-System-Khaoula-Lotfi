"use server";

import { getApi, postApi } from "@/utils/server-api";
import { LoanFilter } from "@/constants/loan-filter";
import type { ISubscriber, ILoan } from "@/types/subscriber-t";

export async function getSubscribers(): Promise<ISubscriber[]> {
  const result = await getApi<ISubscriber[]>("/api/subscribers");
  if (!result || !Array.isArray(result)) return [];
  return result;
}

export async function createSubscriber(
  data: Omit<ISubscriber, "id">,
): Promise<ISubscriber> {
  return await postApi("/api/subscribers", data);
}

export async function updateSubscriber(
  id: string,
  data: Omit<ISubscriber, "id">,
): Promise<ISubscriber> {
  return await postApi(`/api/subscribers/${id}`, data, "PUT");
}

export async function deleteSubscriber(id: string): Promise<void> {
  await postApi(`/api/subscribers/${id}`, {}, "DELETE");
}

export async function getLoans(): Promise<ILoan[]> {
  const result = await getApi<ILoan[]>("/api/loans");
  if (!result || !Array.isArray(result)) return [];
  return result;
}

export async function getBorrowedBooks(): Promise<ILoan[]> {
  const result = await getApi<ILoan[]>(`/api/loans?filter=${LoanFilter.Borrowed}`);
  if (!result || !Array.isArray(result)) return [];
  return result;
}

export async function getOverdueLoans(): Promise<ILoan[]> {
  const result = await getApi<ILoan[]>(`/api/loans?filter=${LoanFilter.Overdue}`);
  if (!result || !Array.isArray(result)) return [];
  return result;
}

export async function createLoan(data: Omit<ILoan, "id">): Promise<ILoan> {
  return await postApi("/api/loans", data);
}

export async function deleteLoan(id: string): Promise<void> {
  await postApi(`/api/loans/${id}`, {}, "DELETE");
}
