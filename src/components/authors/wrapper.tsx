"use client"

import { useAuthors } from "@/hooks/use-authors"
import { AuthorForm } from "./form"
import { AuthorList } from "./list"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { IAuthor } from "@/types/author-t"

interface IProps {
  authors: IAuthor[]
}

export function AuthorsWrapper(props: IProps) {
  const { authors: initialAuthors } = props
  const {
    authors,
    selected,
    open,
    error,
    handleEdit,
    handleAdd,
    handleSaved,
    handleDelete,
    handleOpenChange,
  } = useAuthors(initialAuthors)

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Authors</h1>
            <p className="text-muted-foreground mt-1">Manage authors</p>
            <div className="flex items-center gap-x-2 mt-3">
              <Badge variant="outline" className="text-primary border-primary/40">
                {`${authors.length} ${authors.length === 1 ? "Author" : "Authors"} Total`}
              </Badge>
            </div>
          </div>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} size="lg">+ Add Author</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-primary">
                  {selected ? "Edit Author" : "Add New Author"}
                </DialogTitle>
              </DialogHeader>
              <AuthorForm
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
        <AuthorList
          authors={authors}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
