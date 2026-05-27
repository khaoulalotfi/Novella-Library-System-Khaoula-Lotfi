"use client";

import { useState } from "react";
import { getApi, postApi } from "@/utils/server-api";
import type { ISubscriber } from "@/types/subscriber-t";

export function useSubscribers(initialSubscribers: ISubscriber[]) {
  const [subscribers, setSubscribers] =
    useState<ISubscriber[]>(initialSubscribers);
  const [selected, setSelected] = useState<ISubscriber | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  function handleEdit(subscriber: ISubscriber) {
    setSelected(subscriber);
    setError(undefined);
    setOpen(true);
  }

  function handleAdd() {
    setSelected(undefined);
    setError(undefined);
    setOpen(true);
  }

  async function handleSaved(subscriber: ISubscriber) {
    try {
      if (selected?.id) {
        const result = await postApi(
          `/api/subscribers/${selected.id}`,
          subscriber,
          "PUT",
        );
        if (result && "error" in result) {
          setError(result.error as string);
          return;
        }
      } else {
        const result = await postApi("/api/subscribers", subscriber);
        if (result && "error" in result) {
          setError(result.error as string);
          return;
        }
      }
      const refreshed = await getApi<ISubscriber[]>("/api/subscribers");
      if (Array.isArray(refreshed)) setSubscribers(refreshed);
      setOpen(false);
      setSelected(undefined);
      setError(undefined);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    }
  }

  async function handleDelete(id: string): Promise<void> {
    await postApi(`/api/subscribers/${id}`, {}, "DELETE");
    setSubscribers(subscribers.filter((s) => s.id !== id));
  }

  function handleOpenChange(v: boolean) {
    setOpen(v);
    if (!v) {
      setSelected(undefined);
      setError(undefined);
    }
  }

  return {
    subscribers,
    selected,
    open,
    error,
    handleEdit,
    handleAdd,
    handleSaved,
    handleDelete,
    handleOpenChange,
  };
}
