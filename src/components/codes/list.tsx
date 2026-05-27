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
import type { ICode } from "@/types/code-t"

interface IProps {
  codes: ICode[]
  onEdit: (code: ICode) => void
  onDelete: (id: string) => Promise<void>
}

export function CodeList(props: IProps) {
  const { codes, onEdit, onDelete } = props

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Value</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {codes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
              No codes found.
            </TableCell>
          </TableRow>
        ) : (
          codes.map((code) => (
            <TableRow key={code.id}>
              <TableCell>{code.value}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(code)}>
                    Edit
                  </Button>
                  <DeleteConfirmDialog
                    title={`Delete "${code.value}"?`}
                    description="This will permanently remove this code."
                    onConfirm={() => onDelete(code.id ?? "")}
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
