"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/parts/form-input"
import { codeSchema } from "@/types/code-t"
import type { ICode, ICodeForm } from "@/types/code-t"

interface IProps {
  selected: ICode | undefined
  onSaved: (code: ICode) => void
}

export function CodeForm(props: IProps) {
  const { selected, onSaved } = props

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICodeForm>({
    resolver: zodResolver(codeSchema),
    mode: "onTouched",
    defaultValues: { value: selected?.value ?? "" },
  })

  function onSubmit(values: ICodeForm) {
    onSaved({ id: selected?.id, value: values.value })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
      <FormInput
        label="Code Value (UDC or ISBN)"
        placeholder="Enter code value"
        error={errors.value?.message ?? ""}
        {...register("value")}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : selected ? "Update Code" : "Save Code"}
      </Button>
    </form>
  )
}
