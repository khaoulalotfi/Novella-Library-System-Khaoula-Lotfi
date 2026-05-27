"use client";

import type { ISubscriber } from "@/types/subscriber-t";

interface IProps {
  subscriber: ISubscriber;
}

export function SubscriberDetailsWrapper(props: IProps) {
  const { subscriber } = props;
  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <h1 className="text-3xl font-bold text-primary">Subscriber Details</h1>
        <p className="text-muted-foreground mt-1">
          {subscriber.name} {subscriber.surname}
        </p>
      </div>
      <div className="rounded-xl border border-border p-6 space-y-4 text-sm max-w-lg">
        <div className="flex justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">Name</span>
          <span className="font-medium">{subscriber.name}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">Surname</span>
          <span className="font-medium">{subscriber.surname}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">Phone</span>
          <span className="font-medium">{subscriber.phone}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">Email</span>
          <span className="font-medium">{subscriber.email}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">Date of Birth</span>
          <span className="font-medium">{subscriber.dateOfBirth}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">ID Number</span>
          <span className="font-medium">{subscriber.idNumber}</span>
        </div>
        <div className="flex justify-between pb-2">
          <span className="text-muted-foreground">Gender</span>
          <span className="font-medium capitalize">{subscriber.gender}</span>
        </div>
      </div>
    </div>
  );
}
