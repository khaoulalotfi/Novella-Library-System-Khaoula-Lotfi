import type { NextRequest } from "next/server"
import { getAllBooks, createBook } from "@/services/book-service"
import { bookServerSchema } from "@/types/book-t"
import type { IBook } from "@/types/book-t"
import { z } from "zod"

export async function GET() {
  const books = await getAllBooks()
  return Response.json(books)
}

export async function POST(request: NextRequest) {
  const body: IBook = await request.json()
  const parse = bookServerSchema.safeParse(body)
  if (!parse.success) {
    return Response.json(
      { errors: z.flattenError(parse.error).fieldErrors },
      { status: 400 }
    )
  }
  const result = await createBook(parse.data)
  if ("error" in result) return Response.json(result, { status: 400 })
  return Response.json(result.book, { status: 201 })
}
