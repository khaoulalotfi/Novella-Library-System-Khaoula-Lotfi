"use client";

import { useState } from "react";
import { SubscriberSearchForm } from "./search-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ISubscriber } from "@/types/subscriber-t";
import type { IDict } from "@/lib/dictionary";

interface IProps {
  subscribers: ISubscriber[];
  dict: IDict["subscribers"];
}

export function SubscriberSearchWrapper(props: IProps) {
  const { subscribers, dict } = props;
  const [results, setResults] = useState<ISubscriber[]>([]);
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState<ISubscriber | undefined>(undefined);
  const [open, setOpen] = useState(false);

  function handleSearch(found: ISubscriber[]) {
    setResults(found);
    setSearched(true);
  }

  function handleDetails(subscriber: ISubscriber) {
    setSelected(subscriber);
    setOpen(true);
  }

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <h1 className="text-3xl font-bold text-primary">{dict.searchTitle}</h1>
      </div>
      <div className="mb-8">
        <SubscriberSearchForm
          subscribers={subscribers}
          onSearch={handleSearch}
          dict={dict}
        />
      </div>
      {searched && (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <p className="text-sm text-muted-foreground">
              {results.length} {dict.resultsFound}
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{dict.colName}</TableHead>
                <TableHead>{dict.colSurname}</TableHead>
                <TableHead>{dict.colPhone}</TableHead>
                <TableHead>{dict.colEmail}</TableHead>
                <TableHead>{dict.colGender}</TableHead>
                <TableHead>{dict.colActions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    {dict.noSubscribersFound}
                  </TableCell>
                </TableRow>
              ) : (
                results.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell>{subscriber.name}</TableCell>
                    <TableCell>{subscriber.surname}</TableCell>
                    <TableCell>{subscriber.phone}</TableCell>
                    <TableCell>{subscriber.email}</TableCell>
                    <TableCell>
                      {subscriber.gender === "male" ? dict.male : dict.female}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleDetails(subscriber)}
                      >
                        {dict.details}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

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
                <span className="font-medium capitalize">
                  {selected.gender}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
