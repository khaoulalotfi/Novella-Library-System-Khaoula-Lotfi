import type { NextRequest } from "next/server"
import { getAllPublishers, createPublisher } from "@/services/publisher-service"
import { publisherSchema } from "@/types/publisher-t"
import type { IPublisherForm } from "@/types/publisher-t"
import { z } from "zod"

export async function GET() {
  const publishers = await getAllPublishers()
  return Response.json(publishers)
}

export async function POST(request: NextRequest) {
  const body: IPublisherForm = await request.json()
  const parse = publisherSchema.safeParse(body)
  if (!parse.success) {
    return Response.json(
      { errors: z.flattenError(parse.error).fieldErrors },
      { status: 400 }
    )
  }
  const result = await createPublisher(parse.data)
  if ("error" in result) return Response.json(result, { status: 400 })
  return Response.json(result, { status: 201 })
}
