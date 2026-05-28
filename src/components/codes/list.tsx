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
import type { IDict } from "@/lib/dictionary"

interface IProps {
  codes: ICode[]
  onEdit: (code: ICode) => void
  onDelete: (id: string) => Promise<void>
  dict: IDict["codes"]
}

export function CodeList(props: IProps) {
  const { codes, onEdit, onDelete, dict } = props

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{dict.colValue}</TableHead>
          <TableHead className="text-right">{dict.colActions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {codes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
              {dict.noCodesFound}
            </TableCell>
          </TableRow>
        ) : (
          codes.map((code) => (
            <TableRow key={code.id}>
              <TableCell>{code.value}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(code)}>
                    {dict.edit}
                  </Button>
                  <DeleteConfirmDialog
                    title={`${dict.delete} "${code.value}"?`}
                    description={dict.deleteDescription}
                    triggerLabel={dict.delete}
                    confirmLabel={dict.delete}
                    cancelLabel={dict.cancel}
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
