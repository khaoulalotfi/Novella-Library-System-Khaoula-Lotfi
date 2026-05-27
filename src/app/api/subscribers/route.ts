import type { NextRequest } from "next/server"
import { getAllSubscribers, createSubscriber } from "@/services/subscriber-service"
import { subscriberServerSchema } from "@/types/subscriber-t"
import type { ISubscriberForm } from "@/types/subscriber-t"
import { z } from "zod"

export async function GET() {
  const subscribers = await getAllSubscribers()
  return Response.json(subscribers)
}

export async function POST(request: NextRequest) {
  const body: ISubscriberForm = await request.json()
  const parse = subscriberServerSchema.safeParse(body)
  if (!parse.success) {
    return Response.json(
      { errors: z.flattenError(parse.error).fieldErrors },
      { status: 400 }
    )
  }
  const result = await createSubscriber(parse.data)
  if ("error" in result) return Response.json(result, { status: 400 })
  return Response.json(result, { status: 201 })
}
