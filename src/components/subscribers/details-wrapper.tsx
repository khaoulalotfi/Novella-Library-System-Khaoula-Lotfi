"use client";

import type { ISubscriber } from "@/types/subscriber-t";
import type { IDict } from "@/lib/dictionary";

interface IProps {
  subscriber: ISubscriber;
  dict: IDict["subscribers"];
}

export function SubscriberDetailsWrapper(props: IProps) {
  const { subscriber, dict } = props;
  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <h1 className="text-3xl font-bold text-primary">{dict.detailsPageTitle}</h1>
        <p className="text-muted-foreground mt-1">
          {subscriber.name} {subscriber.surname}
        </p>
      </div>
      <div className="rounded-xl border border-border p-6 space-y-4 text-sm max-w-lg">
        <div className="flex justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">{dict.colName}</span>
          <span className="font-medium">{subscriber.name}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">{dict.colSurname}</span>
          <span className="font-medium">{subscriber.surname}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">{dict.colPhone}</span>
          <span className="font-medium">{subscriber.phone}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">{dict.colEmail}</span>
          <span className="font-medium">{subscriber.email}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">{dict.colDateOfBirth}</span>
          <span className="font-medium">{subscriber.dateOfBirth}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">{dict.colIdNumber}</span>
          <span className="font-medium">{subscriber.idNumber}</span>
        </div>
        <div className="flex justify-between pb-2">
          <span className="text-muted-foreground">{dict.colGender}</span>
          <span className="font-medium">{subscriber.gender === "male" ? dict.male : dict.female}</span>
        </div>
      </div>
    </div>
  );
}
