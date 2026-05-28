"use client";

import { useSubscribers } from "@/hooks/use-subscribers";
import { SubscriberForm } from "./form";
import { SubscriberList } from "./list";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ISubscriber } from "@/types/subscriber-t";
import type { IDict } from "@/lib/dictionary";

interface IProps {
  subscribers: ISubscriber[];
  isAdmin: boolean;
  dict: IDict["subscribers"];
}

export function SubscriberWrapper(props: IProps) {
  const { subscribers: initialSubscribers, isAdmin, dict } = props;
  const {
    subscribers,
    selected,
    open,
    error,
    handleEdit,
    handleAdd,
    handleSaved,
    handleDelete,
    handleOpenChange,
  } = useSubscribers(initialSubscribers);

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">{dict.title}</h1>
            <p className="text-muted-foreground mt-1">
              {dict.subtitle}
            </p>
            <div className="flex items-center gap-x-2 mt-3">
              <Badge
                variant="outline"
                className="text-primary border-primary/40"
              >
                {`${subscribers.length} ${subscribers.length === 1 ? dict.subscriberSingular : dict.subscriberPlural} ${dict.total}`}
              </Badge>
            </div>
          </div>
          {isAdmin && (
            <Dialog open={open} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button onClick={handleAdd} size="lg">
                  {dict.addSubscriber}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-primary">
                    {selected ? dict.editSubscriber : dict.addNewSubscriber}
                  </DialogTitle>
                </DialogHeader>
                <SubscriberForm
                  key={selected?.id ?? "new"}
                  selected={selected}
                  onSaved={handleSaved}
                  dict={dict}
                />
                {error && (
                  <p className="text-destructive text-xs font-medium">{error}</p>
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <SubscriberList
          subscribers={subscribers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={isAdmin}
          dict={dict}
        />
      </div>
    </div>
  );
}