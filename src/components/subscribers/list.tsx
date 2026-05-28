"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/parts/delete-confirm-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ISubscriber } from "@/types/subscriber-t";
import type { IDict } from "@/lib/dictionary";

interface IProps {
  subscribers: ISubscriber[];
  onEdit: (subscriber: ISubscriber) => void;
  onDelete: (id: string) => Promise<void>;
  isAdmin: boolean;
  dict: IDict["subscribers"];
}

export function SubscriberList(props: IProps) {
  const { subscribers, onEdit, onDelete, isAdmin, dict } = props;
  const [selected, setSelected] = useState<ISubscriber | undefined>(undefined);
  const [open, setOpen] = useState(false);

  function handleDetails(id: string) {
    const subscriber = subscribers.find((s) => s.id === id);
    if (subscriber) setSelected(subscriber);
    setOpen(true);
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{dict.colName}</TableHead>
            <TableHead>{dict.colSurname}</TableHead>
            <TableHead>{dict.colPhone}</TableHead>
            <TableHead>{dict.colEmail}</TableHead>
            <TableHead>{dict.colDateOfBirth}</TableHead>
            <TableHead>{dict.colIdNumber}</TableHead>
            <TableHead>{dict.colGender}</TableHead>
            <TableHead>{dict.colActions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-muted-foreground"
              >
                {dict.noSubscribers}
              </TableCell>
            </TableRow>
          ) : (
            subscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell>{subscriber.name}</TableCell>
                <TableCell>{subscriber.surname}</TableCell>
                <TableCell>{subscriber.phone}</TableCell>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>{subscriber.dateOfBirth}</TableCell>
                <TableCell>{subscriber.idNumber}</TableCell>
                <TableCell>
                  {subscriber.gender === "male" ? dict.male : dict.female}
                </TableCell>
                <TableCell className="flex gap-x-2">
                  {isAdmin && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(subscriber)}
                      >
                        {dict.edit}
                      </Button>
                      <DeleteConfirmDialog
                        title={`${dict.delete} "${subscriber.name} ${subscriber.surname}"?`}
                        description={dict.deleteDescription.replace("{name}", `${subscriber.name} ${subscriber.surname}`)}
                        triggerLabel={dict.delete}
                        confirmLabel={dict.delete}
                        cancelLabel={dict.cancel}
                        onConfirm={() =>
                          subscriber.id
                            ? onDelete(subscriber.id)
                            : Promise.resolve()
                        }
                      />
                    </>
                  )}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      subscriber.id && handleDetails(subscriber.id)
                    }
                  >
                    {dict.details}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-primary">
              {dict.subscriberDetails}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">{dict.colName}</span>
                <span className="font-medium">{selected.name}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">{dict.colSurname}</span>
                <span className="font-medium">{selected.surname}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">{dict.colPhone}</span>
                <span className="font-medium">{selected.phone}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">{dict.colEmail}</span>
                <span className="font-medium">{selected.email}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">{dict.colDateOfBirth}</span>
                <span className="font-medium">{selected.dateOfBirth}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">{dict.colIdNumber}</span>
                <span className="font-medium">{selected.idNumber}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted-foreground">{dict.colGender}</span>
                <span className="font-medium">
                  {selected.gender === "male" ? dict.male : dict.female}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
