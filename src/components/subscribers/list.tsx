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

interface IProps {
  subscribers: ISubscriber[];
  onEdit: (subscriber: ISubscriber) => void;
  onDelete: (id: string) => Promise<void>;
  isAdmin: boolean;
}

export function SubscriberList(props: IProps) {
  const { subscribers, onEdit, onDelete, isAdmin } = props;
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
            <TableHead>Name</TableHead>
            <TableHead>Surname</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>ID Number</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-muted-foreground"
              >
                No subscribers yet.
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
                <TableCell className="capitalize">
                  {subscriber.gender}
                </TableCell>
                <TableCell className="flex gap-x-2">
                  {isAdmin && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(subscriber)}
                      >
                        Edit
                      </Button>
                      <DeleteConfirmDialog
                        title={`Delete Subscriber "${subscriber.name} ${subscriber.surname}"?`}
                        description={`This will permanently remove "${subscriber.name} ${subscriber.surname}" from the system.`}
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
                    Details
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
              Subscriber Details
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{selected.name}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Surname</span>
                <span className="font-medium">{selected.surname}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium">{selected.phone}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{selected.email}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Date of Birth</span>
                <span className="font-medium">{selected.dateOfBirth}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">ID Number</span>
                <span className="font-medium">{selected.idNumber}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted-foreground">Gender</span>
                <span className="font-medium capitalize">
                  {selected.gender}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
