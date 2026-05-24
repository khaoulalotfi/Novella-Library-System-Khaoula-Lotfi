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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteConfirmDialog } from "@/components/parts/delete-confirm-dialog";
import { postApi } from "@/utils/server-api";
import type { ILoan } from "@/types/subscriber-t";
import type { ISubscriber } from "@/types/subscriber-t";
import type { IBook } from "@/types/book-t";

interface ILoanForm {
  subscriberId: string;
  bookId: string;
  borrowDate: string;
  returnDate: string;
}

interface ILoanFormErrors {
  subscriberId?: string;
  bookId?: string;
  borrowDate?: string;
  returnDate?: string;
}

interface IProps {
  loans: ILoan[];
  subscribers: ISubscriber[];
  books: IBook[];
}

export function BorrowedWrapper({
  loans: initialLoans,
  subscribers,
  books,
}: IProps) {
  const [loans, setLoans] = useState<ILoan[]>(initialLoans);
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<ILoanFormErrors>({});
  const [form, setForm] = useState<ILoanForm>({
    subscriberId: "",
    bookId: "",
    borrowDate: "",
    returnDate: "",
  });

  function handleOpenChange(v: boolean) {
    setOpen(v);
    if (!v) {
      setFormErrors({});
      setForm({ subscriberId: "", bookId: "", borrowDate: "", returnDate: "" });
    }
  }

  async function handleReturn(id: string): Promise<void> {
    await postApi(`/api/loans/${id}`, {}, "DELETE");
    setLoans(loans.filter((l) => l.id !== id));
  }

  async function handleBorrow(): Promise<void> {
    const errors: ILoanFormErrors = {};
    if (!form.subscriberId) errors.subscriberId = "Please select a subscriber.";
    if (!form.bookId) errors.bookId = "Please select a book.";
    if (!form.borrowDate) errors.borrowDate = "Please enter a borrow date.";
    if (!form.returnDate) errors.returnDate = "Please enter a return date.";
    if (
      form.borrowDate &&
      form.returnDate &&
      form.returnDate <= form.borrowDate
    ) {
      errors.returnDate = "Return date must be after borrow date.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const result = await postApi("/api/loans", form);
    if (result && "error" in result) {
      setFormErrors({ subscriberId: result.error as string });
      return;
    }

    const newLoan = result as ILoan;
    setLoans([...loans, newLoan]);
    setOpen(false);
    setForm({ subscriberId: "", bookId: "", borrowDate: "", returnDate: "" });
  }

  function getSubscriber(subscriberId: string): ISubscriber | undefined {
    return subscribers.find((s) => s.id === subscriberId);
  }

  function getBook(bookId: string): IBook | undefined {
    return books.find((b) => b.id === bookId);
  }

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Borrowed Books</h1>
            <p className="text-muted-foreground mt-1">
              All books currently on loan
            </p>
            <div className="flex items-center gap-x-2 mt-3">
              <Badge
                variant="outline"
                className="text-primary border-primary/40"
              >
                {`${loans.length} ${loans.length === 1 ? "Loan" : "Loans"} Active`}
              </Badge>
            </div>
          </div>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button size="lg">+ Borrow Book</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-primary">
                  Borrow a Book
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label>Subscriber</Label>
                  <Select
                    value={form.subscriberId}
                    onValueChange={(v) => setForm({ ...form, subscriberId: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subscriber" />
                    </SelectTrigger>
                    <SelectContent>
                      {subscribers.map((s) => (
                        <SelectItem key={s.id} value={s.id ?? ""}>
                          {s.name} {s.surname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.subscriberId && (
                    <p className="text-destructive text-xs font-medium">
                      {formErrors.subscriberId}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label>Book</Label>
                  <Select
                    value={form.bookId}
                    onValueChange={(v) => setForm({ ...form, bookId: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select book" />
                    </SelectTrigger>
                    <SelectContent>
                      {books.map((b) => (
                        <SelectItem key={b.id} value={b.id ?? ""}>
                          {b.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.bookId && (
                    <p className="text-destructive text-xs font-medium">
                      {formErrors.bookId}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label>Borrow Date</Label>
                  <Input
                    type="date"
                    value={form.borrowDate}
                    onChange={(e) =>
                      setForm({ ...form, borrowDate: e.target.value })
                    }
                  />
                  {formErrors.borrowDate && (
                    <p className="text-destructive text-xs font-medium">
                      {formErrors.borrowDate}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label>Return Date</Label>
                  <Input
                    type="date"
                    value={form.returnDate}
                    onChange={(e) =>
                      setForm({ ...form, returnDate: e.target.value })
                    }
                  />
                  {formErrors.returnDate && (
                    <p className="text-destructive text-xs font-medium">
                      {formErrors.returnDate}
                    </p>
                  )}
                </div>
                <Button className="w-full" onClick={handleBorrow}>
                  Confirm Borrow
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Surname</TableHead>
              <TableHead>Book Title</TableHead>
              <TableHead>Borrow Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  No borrowed books found.
                </TableCell>
              </TableRow>
            ) : (
              loans.map((loan) => {
                const subscriber = getSubscriber(loan.subscriberId);
                const book = getBook(loan.bookId);
                return (
                  <TableRow key={loan.id}>
                    <TableCell>
                      {subscriber?.name ?? loan.subscriberId}
                    </TableCell>
                    <TableCell>{subscriber?.surname ?? "—"}</TableCell>
                    <TableCell>{book?.title ?? loan.bookId}</TableCell>
                    <TableCell>{loan.borrowDate}</TableCell>
                    <TableCell>{loan.returnDate}</TableCell>
                    <TableCell>
                      <DeleteConfirmDialog
                        title="Return Book"
                        description={`Are you sure you want to return "${book?.title ?? loan.bookId}"? This action cannot be undone.`}
                        confirmLabel="Return"
                        triggerLabel="Return"
                        onConfirm={() =>
                          loan.id ? handleReturn(loan.id) : Promise.resolve()
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
