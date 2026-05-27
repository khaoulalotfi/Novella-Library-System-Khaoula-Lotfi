"use client"

import { useState } from "react"
import { getApi, postApi } from "@/utils/server-api"
import type { ICode } from "@/types/code-t"

export function useCodes(initialCodes: ICode[]) {
  const [codes, setCodes] = useState<ICode[]>(initialCodes)
  const [selected, setSelected] = useState<ICode | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  function handleEdit(code: ICode) {
    setSelected(code)
    setError(undefined)
    setOpen(true)
  }

  function handleAdd() {
    setSelected(undefined)
    setError(undefined)
    setOpen(true)
  }

  async function handleSaved(code: ICode) {
    try {
      if (selected?.id) {
        const result = await postApi(`/api/codes/${selected.id}`, code, "PUT")
        if (result && "error" in result) {
          setError(result.error as string)
          return
        }
      } else {
        const result = await postApi("/api/codes", code)
        if (result && "error" in result) {
          setError(result.error as string)
          return
        }
      }
      const refreshed = await getApi<ICode[]>("/api/codes")
      if (Array.isArray(refreshed)) setCodes(refreshed)
      setOpen(false)
      setSelected(undefined)
      setError(undefined)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.")
    }
  }

  async function handleDelete(id: string): Promise<void> {
    await postApi(`/api/codes/${id}`, {}, "DELETE")
    setCodes(codes.filter((c) => c.id !== id))
  }

  function handleOpenChange(v: boolean) {
    setOpen(v)
    if (!v) {
      setSelected(undefined)
      setError(undefined)
    }
  }

  return {
    codes,
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
