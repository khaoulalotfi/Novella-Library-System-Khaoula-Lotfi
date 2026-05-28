"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/parts/form-input"
import { createCodeSchema } from "@/types/code-t"
import type { ICode, ICodeForm } from "@/types/code-t"
import type { IDict } from "@/lib/dictionary"

interface IProps {
  selected: ICode | undefined
  onSaved: (code: ICode) => void
  dict: IDict["codes"]
}

export function CodeForm(props: IProps) {
  const { selected, onSaved, dict } = props

  const schema = createCodeSchema({ valueRequired: dict.errValueRequired })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICodeForm>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { value: selected?.value ?? "" },
  })

  function onSubmit(values: ICodeForm) {
    onSaved({ id: selected?.id, value: values.value })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
      <FormInput
        label={dict.formValueLabel}
        placeholder={dict.formValuePlaceholder}
        error={errors.value?.message ?? ""}
        {...register("value")}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? dict.saving : selected ? dict.updateCode : dict.saveCode}
      </Button>
    </form>
  )
}
