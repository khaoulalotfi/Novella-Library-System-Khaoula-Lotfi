"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DeleteConfirmDialog } from "@/components/parts/delete-confirm-dialog"
import type { IAuthor } from "@/types/author-t"
import type { IDict } from "@/lib/dictionary"

interface IProps {
  authors: IAuthor[]
  onEdit: (author: IAuthor) => void
  onDelete: (id: string) => Promise<void>
  dict: IDict["authors"]
}

export function AuthorList(props: IProps) {
  const { authors, onEdit, onDelete, dict } = props

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{dict.colName}</TableHead>
          <TableHead className="text-right">{dict.colActions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {authors.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
              {dict.noAuthorsFound}
            </TableCell>
          </TableRow>
        ) : (
          authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell>{author.name}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(author)}>
                    {dict.edit}
                  </Button>
                  <DeleteConfirmDialog
                    title={`${dict.delete} "${author.name}"?`}
                    description={dict.deleteDescription}
                    triggerLabel={dict.delete}
                    confirmLabel={dict.delete}
                    cancelLabel={dict.cancel}
                    onConfirm={() => onDelete(author.id ?? "")}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
