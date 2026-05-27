import { z } from "zod"

export interface IPublisher {
  id?: string
  name: string
}

export interface IPublisherForm {
  name: string
}

export const publisherSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
})
