import type { NextRequest } from "next/server"
import { getAllCodes, createCode } from "@/services/code-service"
import { codeSchema } from "@/types/code-t"
import type { ICodeForm } from "@/types/code-t"
import { z } from "zod"

export async function GET() {
  const codes = await getAllCodes()
  return Response.json(codes)
}

export async function POST(request: NextRequest) {
  const body: ICodeForm = await request.json()
  const parse = codeSchema.safeParse(body)
  if (!parse.success) {
    return Response.json(
      { errors: z.flattenError(parse.error).fieldErrors },
      { status: 400 }
    )
  }
  const result = await createCode(parse.data)
  if ("error" in result) return Response.json(result, { status: 400 })
  return Response.json(result, { status: 201 })
}
