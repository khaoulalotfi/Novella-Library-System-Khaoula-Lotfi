"use client";

import { useLoans } from "@/hooks/use-loans";
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
import { DeleteConfirmDialog } from "@/components/parts/delete-confirm-dialog";
import { BorrowForm } from "./borrow-form";
import type { ILoan, ISubscriber } from "@/types/subscriber-t";
import type { IBook } from "@/types/book-t";

interface IProps {
  loans: ILoan[];
  subscribers: ISubscriber[];
  books: IBook[];
  isAdmin: boolean;
  currentSubscriber?: ISubscriber;
}

export function BorrowedWrapper(props: IProps) {
  const { loans: initialLoans, subscribers, books, isAdmin, currentSubscriber } = props;
  const {
    loans,
    open,
    form,
    formErrors,
    setForm,
    handleOpenChange,
    handleReturn,
    handleBorrow,
    getSubscriber,
    getBook,
  } = useLoans(initialLoans, subscribers, books, currentSubscriber?.id);

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
              <BorrowForm
                form={form}
                formErrors={formErrors}
                setForm={setForm}
                subscribers={subscribers}
                books={books}
                isAdmin={isAdmin}
                currentSubscriber={currentSubscriber}
                onBorrow={handleBorrow}
              />
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
                        title={`Return "${book?.title ?? loan.bookId}"?`}
                        description={`This will permanently remove the loan record for "${book?.title ?? loan.bookId}".`}
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
