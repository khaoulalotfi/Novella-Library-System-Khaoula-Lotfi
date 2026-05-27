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

interface IProps {
  authors: IAuthor[]
  onEdit: (author: IAuthor) => void
  onDelete: (id: string) => Promise<void>
}

export function AuthorList(props: IProps) {
  const { authors, onEdit, onDelete } = props

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {authors.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
              No authors found.
            </TableCell>
          </TableRow>
        ) : (
          authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell>{author.name}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(author)}>
                    Edit
                  </Button>
                  <DeleteConfirmDialog
                    title={`Delete "${author.name}"?`}
                    description="This will permanently remove this author."
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
