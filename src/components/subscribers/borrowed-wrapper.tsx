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
import type { IDict } from "@/lib/dictionary";

interface IProps {
  loans: ILoan[];
  subscribers: ISubscriber[];
  books: IBook[];
  isAdmin: boolean;
  currentSubscriber?: ISubscriber;
  dict: IDict["subscribers"];
}

export function BorrowedWrapper(props: IProps) {
  const { loans: initialLoans, subscribers, books, isAdmin, currentSubscriber, dict } = props;
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
            <h1 className="text-3xl font-bold text-primary">{dict.borrowedTitle}</h1>
            <p className="text-muted-foreground mt-1">
              {dict.borrowedSubtitle}
            </p>
            <div className="flex items-center gap-x-2 mt-3">
              <Badge
                variant="outline"
                className="text-primary border-primary/40"
              >
                {`${loans.length} ${loans.length === 1 ? dict.loanSingular : dict.loanPlural} ${dict.active}`}
              </Badge>
            </div>
          </div>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button size="lg">{dict.borrowBook}</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-primary">
                  {dict.borrowABook}
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
                dict={dict}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{dict.colName}</TableHead>
              <TableHead>{dict.colSurname}</TableHead>
              <TableHead>{dict.colBookTitle}</TableHead>
              <TableHead>{dict.colBorrowDate}</TableHead>
              <TableHead>{dict.colReturnDate}</TableHead>
              <TableHead>{dict.colActions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  {dict.noBorrowedBooks}
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
                        title={`${dict.return} "${book?.title ?? loan.bookId}"?`}
                        description={dict.deleteLoanDescription.replace("{title}", book?.title ?? loan.bookId)}
                        confirmLabel={dict.return}
                        triggerLabel={dict.return}
                        cancelLabel={dict.cancel}
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
