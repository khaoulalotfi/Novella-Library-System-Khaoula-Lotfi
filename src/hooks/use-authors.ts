"use client"

import { useState } from "react"
import { getApi, postApi } from "@/utils/server-api"
import type { IAuthor } from "@/types/author-t"

export function useAuthors(initialAuthors: IAuthor[]) {
  const [authors, setAuthors] = useState<IAuthor[]>(initialAuthors)
  const [selected, setSelected] = useState<IAuthor | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  function handleEdit(author: IAuthor) {
    setSelected(author)
    setError(undefined)
    setOpen(true)
  }

  function handleAdd() {
    setSelected(undefined)
    setError(undefined)
    setOpen(true)
  }

  async function handleSaved(author: IAuthor) {
    try {
      if (selected?.id) {
        const result = await postApi(`/api/authors/${selected.id}`, author, "PUT")
        if (result && "error" in result) {
          setError(result.error as string)
          return
        }
      } else {
        const result = await postApi("/api/authors", author)
        if (result && "error" in result) {
          setError(result.error as string)
          return
        }
      }
      const refreshed = await getApi<IAuthor[]>("/api/authors")
      if (Array.isArray(refreshed)) setAuthors(refreshed)
      setOpen(false)
      setSelected(undefined)
      setError(undefined)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.")
    }
  }

  async function handleDelete(id: string): Promise<void> {
    await postApi(`/api/authors/${id}`, {}, "DELETE")
    setAuthors(authors.filter((a) => a.id !== id))
  }

  function handleOpenChange(v: boolean) {
    setOpen(v)
    if (!v) {
      setSelected(undefined)
      setError(undefined)
    }
  }

  return {
    authors,
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
