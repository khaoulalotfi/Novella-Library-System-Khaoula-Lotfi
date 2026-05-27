"use client"

import { useState } from "react"
import { getApi, postApi } from "@/utils/server-api"
import type { IPublisher } from "@/types/publisher-t"

export function usePublishers(initialPublishers: IPublisher[]) {
  const [publishers, setPublishers] = useState<IPublisher[]>(initialPublishers)
  const [selected, setSelected] = useState<IPublisher | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  function handleEdit(publisher: IPublisher) {
    setSelected(publisher)
    setError(undefined)
    setOpen(true)
  }

  function handleAdd() {
    setSelected(undefined)
    setError(undefined)
    setOpen(true)
  }

  async function handleSaved(publisher: IPublisher) {
    try {
      if (selected?.id) {
        const result = await postApi(
          `/api/publishers/${selected.id}`,
          publisher,
          "PUT"
        )
        if (result && "error" in result) {
          setError(result.error as string)
          return
        }
      } else {
        const result = await postApi("/api/publishers", publisher)
        if (result && "error" in result) {
          setError(result.error as string)
          return
        }
      }
      const refreshed = await getApi<IPublisher[]>("/api/publishers")
      if (Array.isArray(refreshed)) setPublishers(refreshed)
      setOpen(false)
      setSelected(undefined)
      setError(undefined)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.")
    }
  }

  async function handleDelete(id: string): Promise<void> {
    await postApi(`/api/publishers/${id}`, {}, "DELETE")
    setPublishers(publishers.filter((p) => p.id !== id))
  }

  function handleOpenChange(v: boolean) {
    setOpen(v)
    if (!v) {
      setSelected(undefined)
      setError(undefined)
    }
  }

  return {
    publishers,
    selected,
    open,
    error,
    handleEdit,
    handleAdd,
    handleSaved,
    handleDelete,
    handleOpenChange,
  }
}
