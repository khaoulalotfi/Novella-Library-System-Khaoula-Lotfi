import type { NextRequest } from "next/server"
import { updateAuthor, deleteAuthor } from "@/services/author-service"
import { authorSchema } from "@/types/author-t"
import type { IAuthorForm } from "@/types/author-t"
import { z } from "zod"

interface IParams { params: Promise<{ id: string }> }

export async function PUT(request: NextRequest, ctx: IParams) {
  const { id } = await ctx.params
  const body: IAuthorForm = await request.json()
  const parse = authorSchema.safeParse(body)
  if (!parse.success) {
    return Response.json(
      { errors: z.flattenError(parse.error).fieldErrors },
      { status: 400 },
    )
  }
  const result = await updateAuthor(id, { name: parse.data.name })
  if ("error" in result) return Response.json(result, { status: 400 })
  return Response.json(result)
}

export async function DELETE(_request: NextRequest, ctx: IParams) {
  const { id } = await ctx.params
  await deleteAuthor(id)
  return Response.json({ success: true })
}
