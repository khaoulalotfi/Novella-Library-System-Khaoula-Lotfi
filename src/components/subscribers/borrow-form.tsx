"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ILoanForm, ILoanFormErrors, ISubscriber } from "@/types/subscriber-t";
import type { IBook } from "@/types/book-t";
import type { IDict } from "@/lib/dictionary";

interface IProps {
  form: ILoanForm;
  formErrors: ILoanFormErrors;
  setForm: (form: ILoanForm) => void;
  subscribers: ISubscriber[];
  books: IBook[];
  isAdmin: boolean;
  currentSubscriber?: ISubscriber;
  onBorrow: () => void;
  dict: IDict["subscribers"];
}

export function BorrowForm(props: IProps) {
  const { form, formErrors, setForm, subscribers, books, isAdmin, currentSubscriber, onBorrow, dict } = props;
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label>{dict.subscriberLabel}</Label>
        {isAdmin ? (
          <Select
            value={form.subscriberId}
            onValueChange={(v) => setForm({ ...form, subscriberId: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder={dict.selectSubscriber} />
            </SelectTrigger>
            <SelectContent>
              {subscribers.map((s) => (
                <SelectItem key={s.id} value={s.id ?? ""}>
                  {s.name} {s.surname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            value={`${currentSubscriber?.name ?? ""} ${currentSubscriber?.surname ?? ""}`}
            disabled
          />
        )}
        {formErrors.subscriberId && (
          <p className="text-destructive text-xs font-medium">
            {formErrors.subscriberId}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label>{dict.bookLabel}</Label>
        <Select
          value={form.bookId}
          onValueChange={(v) => setForm({ ...form, bookId: v })}
        >
          <SelectTrigger>
            <SelectValue placeholder={dict.selectBook} />
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
        <Label>{dict.borrowDate}</Label>
        <Input
          type="date"
          value={form.borrowDate}
          onChange={(e) => setForm({ ...form, borrowDate: e.target.value })}
        />
        {formErrors.borrowDate && (
          <p className="text-destructive text-xs font-medium">
            {formErrors.borrowDate}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label>{dict.returnDate}</Label>
        <Input
          type="date"
          value={form.returnDate}
          onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
        />
        {formErrors.returnDate && (
          <p className="text-destructive text-xs font-medium">
            {formErrors.returnDate}
          </p>
        )}
      </div>
      <Button className="w-full" onClick={onBorrow}>
        {dict.confirmBorrow}
      </Button>
    </div>
  );
}
