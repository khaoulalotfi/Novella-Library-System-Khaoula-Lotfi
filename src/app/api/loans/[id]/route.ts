import type { NextRequest } from "next/server"
import { deleteLoan } from "@/services/loan-service"

interface IParams { params: Promise<{ id: string }> }

export async function DELETE(_request: NextRequest, ctx: IParams) {
  const { id } = await ctx.params
  await deleteLoan(id)
  return Response.json({ success: true })
}
