"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/parts/form-input"
import { publisherSchema } from "@/types/publisher-t"
import type { IPublisher, IPublisherForm } from "@/types/publisher-t"

interface IProps {
  selected: IPublisher | undefined
  onSaved: (publisher: IPublisher) => void
}

export function PublisherForm(props: IProps) {
  const { selected, onSaved } = props

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IPublisherForm>({
    resolver: zodResolver(publisherSchema),
    mode: "onTouched",
    defaultValues: { name: selected?.name ?? "" },
  })

  function onSubmit(values: IPublisherForm) {
    onSaved({ id: selected?.id, name: values.name })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
      <FormInput
        label="Name"
        placeholder="Enter publisher name"
        error={errors.name?.message ?? ""}
        {...register("name")}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : selected ? "Update Publisher" : "Save Publisher"}
      </Button>
    </form>
  )
}
