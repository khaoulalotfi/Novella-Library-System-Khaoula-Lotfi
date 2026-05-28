"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/parts/form-input"
import { createPublisherSchema } from "@/types/publisher-t"
import type { IPublisher, IPublisherForm } from "@/types/publisher-t"
import type { IDict } from "@/lib/dictionary"

interface IProps {
  selected: IPublisher | undefined
  onSaved: (publisher: IPublisher) => void
  dict: IDict["publishers"]
}

export function PublisherForm(props: IProps) {
  const { selected, onSaved, dict } = props

  const schema = createPublisherSchema({ nameMin: dict.errNameMin })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IPublisherForm>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: selected?.name ?? "" },
  })

  function onSubmit(values: IPublisherForm) {
    onSaved({ id: selected?.id, name: values.name })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
      <FormInput
        label={dict.formNameLabel}
        placeholder={dict.formNamePlaceholder}
        error={errors.name?.message ?? ""}
        {...register("name")}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? dict.saving : selected ? dict.updatePublisher : dict.savePublisher}
      </Button>
    </form>
  )
}
