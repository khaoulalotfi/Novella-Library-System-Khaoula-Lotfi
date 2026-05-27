"use client"

import { usePublishers } from "@/hooks/use-publishers"
import { PublisherForm } from "./form"
import { PublisherList } from "./list"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { IPublisher } from "@/types/publisher-t"

interface IProps {
  publishers: IPublisher[]
}

export function PublishersWrapper(props: IProps) {
  const { publishers: initialPublishers } = props
  const {
    publishers,
    selected,
    open,
    error,
    handleEdit,
    handleAdd,
    handleSaved,
    handleDelete,
    handleOpenChange,
  } = usePublishers(initialPublishers)

  return (
    <div className="p-6">
      <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Publishers</h1>
            <p className="text-muted-foreground mt-1">Manage publishers</p>
            <div className="flex items-center gap-x-2 mt-3">
              <Badge variant="outline" className="text-primary border-primary/40">
                {`${publishers.length} ${publishers.length === 1 ? "Publisher" : "Publishers"} Total`}
              </Badge>
            </div>
          </div>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} size="lg">+ Add Publisher</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-primary">
                  {selected ? "Edit Publisher" : "Add New Publisher"}
                </DialogTitle>
              </DialogHeader>
              <PublisherForm
                key={selected?.id ?? "new"}
                selected={selected}
                onSaved={handleSaved}
              />
              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <PublisherList
          publishers={publishers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
