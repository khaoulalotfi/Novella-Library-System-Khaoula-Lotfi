import { z } from "zod"

export interface IAuthor {
  id?: string
  name: string
}

export interface IAuthorForm {
  name: string
}

export const authorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
})
