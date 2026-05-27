import type { NextRequest } from "next/server"
import { getAllAuthors, createAuthor } from "@/services/author-service"
import { authorSchema } from "@/types/author-t"
import type { IAuthorForm } from "@/types/author-t"
import { z } from "zod"

export async function GET() {
  const authors = await getAllAuthors()
  return Response.json(authors)
}

export async function POST(request: NextRequest) {
  const body: IAuthorForm = await request.json()
  const parse = authorSchema.safeParse(body)
  if (!parse.success) {
    return Response.json(
      { errors: z.flattenError(parse.error).fieldErrors },
      { status: 400 }
    )
  }
  const result = await createAuthor(parse.data)
  if ("error" in result) return Response.json(result, { status: 400 })
  return Response.json(result, { status: 201 })
}
