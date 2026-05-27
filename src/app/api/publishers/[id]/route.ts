import type { NextRequest } from "next/server"
import { updatePublisher, deletePublisher } from "@/services/publisher-service"
import { publisherSchema } from "@/types/publisher-t"
import type { IPublisherForm } from "@/types/publisher-t"
import { z } from "zod"

interface IParams { params: Promise<{ id: string }> }

export async function PUT(request: NextRequest, ctx: IParams) {
  const { id } = await ctx.params
  const body: IPublisherForm = await request.json()
  const parse = publisherSchema.safeParse(body)
  if (!parse.success) {
    return Response.json(
      { errors: z.flattenError(parse.error).fieldErrors },
      { status: 400 },
    )
  }
  const result = await updatePublisher(id, { name: parse.data.name })
  if ("error" in result) return Response.json(result, { status: 400 })
  return Response.json(result)
}

export async function DELETE(_request: NextRequest, ctx: IParams) {
  const { id } = await ctx.params
  await deletePublisher(id)
  return Response.json({ success: true })
}
