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
import type { IDict } from "@/lib/dictionary"

interface IProps {
  publishers: IPublisher[]
  onEdit: (publisher: IPublisher) => void
  onDelete: (id: string) => Promise<void>
  dict: IDict["publishers"]
}

export function PublisherList(props: IProps) {
  const { publishers, onEdit, onDelete, dict } = props

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{dict.colName}</TableHead>
          <TableHead className="text-right">{dict.colActions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {publishers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
              {dict.noPublishersFound}
            </TableCell>
          </TableRow>
        ) : (
          publishers.map((publisher) => (
            <TableRow key={publisher.id}>
              <TableCell>{publisher.name}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(publisher)}>
                    {dict.edit}
                  </Button>
                  <DeleteConfirmDialog
                    title={`${dict.delete} "${publisher.name}"?`}
                    description={dict.deleteDescription}
                    triggerLabel={dict.delete}
                    confirmLabel={dict.delete}
                    cancelLabel={dict.cancel}
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
