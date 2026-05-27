"use client"

import { useCodes } from "@/hooks/use-codes"
import { CodeForm } from "./form"
import { CodeList } from "./list"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { ICode } from "@/types/code-t"

interface IProps {
  codes: ICode[]
}

export function CodesWrapper(props: IProps) {
  const { codes: initialCodes } = props
  const {
    codes,
    selected,
    open,
    error,
    handleEdit,
    handleAdd,
    handleSaved,
    handleDelete,
    handleOpenChange,
  } = useCodes(initialCodes)

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Codes</h1>
            <p className="text-muted-foreground mt-1">Manage UDC / ISBN codes</p>
            <div className="flex items-center gap-x-2 mt-3">
              <Badge variant="outline" className="text-primary border-primary/40">
                {`${codes.length} ${codes.length === 1 ? "Code" : "Codes"} Total`}
              </Badge>
            </div>
          </div>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} size="lg">+ Add Code</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-primary">
                  {selected ? "Edit Code" : "Add New Code"}
                </DialogTitle>
              </DialogHeader>
              <CodeForm
                key={selected?.id ?? "new"}
                selected={selected}
                onSaved={handleSaved}
              />
              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <CodeList
          codes={codes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
