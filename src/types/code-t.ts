import { z } from "zod"

export interface ICode {
  id?: string
  value: string
}

export interface ICodeForm {
  value: string
}

export const codeSchema = z.object({
  value: z.string().min(1, "Code value is required"),
})
