"use client";

import { useState } from "react";
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
import { getApi, postApi } from "@/utils/server-api";
import type { ISubscriber } from "@/types/subscriber-t";

interface IProps {
  subscribers: ISubscriber[];
}

export function SubscriberWrapper({ subscribers: initialSubscribers }: IProps) {
  const [subscribers, setSubscribers] =
    useState<ISubscriber[]>(initialSubscribers);
  const [selected, setSelected] = useState<ISubscriber | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  function handleEdit(subscriber: ISubscriber) {
    setSelected(subscriber);
    setError(undefined);
    setOpen(true);
  }

  function handleAdd() {
    setSelected(undefined);
    setError(undefined);
    setOpen(true);
  }

  async function handleSaved(subscriber: ISubscriber) {
    try {
      if (selected?.id) {
        const result = await postApi(
          `/api/subscribers/${selected.id}`,
          subscriber,
          "PUT",
        );
        if (result && "error" in result) {
          setError(result.error as string);
          return;
        }
      } else {
        const result = await postApi("/api/subscribers", subscriber);
        if (result && "error" in result) {
          setError(result.error as string);
          return;
        }
      }
      const refreshed = await getApi<ISubscriber[]>({
        url: "/api/subscribers",
      });
      if (Array.isArray(refreshed)) setSubscribers(refreshed);
      setOpen(false);
      setSelected(undefined);
      setError(undefined);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    }
  }

  async function handleDelete(id: string): Promise<void> {
    await postApi(`/api/subscribers/${id}`, {}, "DELETE");
    setSubscribers(subscribers.filter((s) => s.id !== id));
  }

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Subscriber List</h1>
            <p className="text-muted-foreground mt-1">
              Manage library subscribers
            </p>
            <div className="flex items-center gap-x-2 mt-3">
              <Badge
                variant="outline"
                className="text-primary border-primary/40"
              >
                {`${subscribers.length} ${subscribers.length === 1 ? "Subscriber" : "Subscribers"} Total`}
              </Badge>
            </div>
          </div>
          <Dialog
            open={open}
            onOpenChange={(v) => {
              setOpen(v);
              if (!v) {
                setSelected(undefined);
                setError(undefined);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={handleAdd} size="lg">
                + Add Subscriber
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-primary">
                  {selected ? "Edit Subscriber" : "Add New Subscriber"}
                </DialogTitle>
              </DialogHeader>
              <SubscriberForm
                key={selected?.id ?? "new"}
                selected={selected}
                onSaved={handleSaved}
              />
              {error && (
                <p className="text-destructive text-xs font-medium">{error}</p>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <SubscriberList
          subscribers={subscribers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
