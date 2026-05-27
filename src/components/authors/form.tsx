"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/parts/form-input"
import { authorSchema } from "@/types/author-t"
import type { IAuthor, IAuthorForm } from "@/types/author-t"

interface IProps {
  selected: IAuthor | undefined
  onSaved: (author: IAuthor) => void
}

export function AuthorForm(props: IProps) {
  const { selected, onSaved } = props

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAuthorForm>({
    resolver: zodResolver(authorSchema),
    mode: "onTouched",
    defaultValues: { name: selected?.name ?? "" },
  })

  function onSubmit(values: IAuthorForm) {
    onSaved({ id: selected?.id, name: values.name })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
      <FormInput
        label="Name"
        placeholder="Enter author name"
        error={errors.name?.message ?? ""}
        {...register("name")}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : selected ? "Update Author" : "Save Author"}
      </Button>
    </form>
  )
}
