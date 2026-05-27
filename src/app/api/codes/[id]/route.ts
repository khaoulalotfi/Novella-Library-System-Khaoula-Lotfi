import type { NextRequest } from "next/server"
import { updateCode, deleteCode } from "@/services/code-service"
import { codeSchema } from "@/types/code-t"
import type { ICodeForm } from "@/types/code-t"
import { z } from "zod"

interface IParams { params: Promise<{ id: string }> }

export async function PUT(request: NextRequest, ctx: IParams) {
  const { id } = await ctx.params
  const body: ICodeForm = await request.json()
  const parse = codeSchema.safeParse(body)
  if (!parse.success) {
    return Response.json(
      { errors: z.flattenError(parse.error).fieldErrors },
      { status: 400 },
    )
  }
  const result = await updateCode(id, { value: parse.data.value })
  if ("error" in result) return Response.json(result, { status: 400 })
  return Response.json(result)
}

export async function DELETE(_request: NextRequest, ctx: IParams) {
  const { id } = await ctx.params
  await deleteCode(id)
  return Response.json({ success: true })
}
