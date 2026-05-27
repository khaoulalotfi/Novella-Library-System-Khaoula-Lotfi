import type { NextRequest } from "next/server"
import {
  getSubscriberById,
  updateSubscriber,
  deleteSubscriber,
} from "@/services/subscriber-service"
import type { ISubscriberForm } from "@/types/subscriber-t"

interface IParams { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, ctx: IParams) {
  const { id } = await ctx.params
  const subscriber = await getSubscriberById(id)
  if (!subscriber) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(subscriber)
}

export async function PUT(request: NextRequest, ctx: IParams) {
  const { id } = await ctx.params
  const data: ISubscriberForm = await request.json()
  const result = await updateSubscriber(id, data)
  if (!result) return Response.json({ error: "Subscriber not found" }, { status: 404 })
  if ("error" in result) return Response.json({ error: result.error }, { status: 400 })
  return Response.json(result)
}

export async function DELETE(_request: NextRequest, ctx: IParams) {
  const { id } = await ctx.params
  await deleteSubscriber(id)
  return Response.json({ success: true })
}
