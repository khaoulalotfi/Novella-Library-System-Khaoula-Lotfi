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
import type { IPublisher } from "@/types/publisher-t"

interface IProps {
  publishers: IPublisher[]
  onEdit: (publisher: IPublisher) => void
  onDelete: (id: string) => Promise<void>
}

export function PublisherList(props: IProps) {
  const { publishers, onEdit, onDelete } = props

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {publishers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
              No publishers found.
            </TableCell>
          </TableRow>
        ) : (
          publishers.map((publisher) => (
            <TableRow key={publisher.id}>
              <TableCell>{publisher.name}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(publisher)}>
                    Edit
                  </Button>
                  <DeleteConfirmDialog
                    title={`Delete "${publisher.name}"?`}
                    description="This will permanently remove this publisher."
                    onConfirm={() => onDelete(publisher.id ?? "")}
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
