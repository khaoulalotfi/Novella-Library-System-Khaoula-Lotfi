"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/parts/form-input"
import { createAuthorSchema } from "@/types/author-t"
import type { IAuthor, IAuthorForm } from "@/types/author-t"
import type { IDict } from "@/lib/dictionary"
import { FormMode } from "@/constants/form-mode"

interface IProps {
  selected: IAuthor | undefined
  onSaved: (author: IAuthor) => void
  dict: IDict["authors"]
}

export function AuthorForm(props: IProps) {
  const { selected, onSaved, dict } = props

  const schema = createAuthorSchema({ nameMin: dict.errNameMin })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAuthorForm>({
    resolver: zodResolver(schema),
    mode: FormMode.OnTouched,
    defaultValues: { name: selected?.name ?? "" },
  })

  function onSubmit(values: IAuthorForm) {
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
        {isSubmitting ? dict.saving : selected ? dict.updateAuthor : dict.saveAuthor}
      </Button>
    </form>
  )
}
