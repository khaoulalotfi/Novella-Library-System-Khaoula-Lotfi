import type { NextRequest } from "next/server"
import { updateBook, deleteBook } from "@/services/book-service"
import type { IBook } from "@/types/book-t"

interface IParams { params: Promise<{ id: string }> }

export async function PUT(request: NextRequest, ctx: IParams) {
  const { id } = await ctx.params
  const data: IBook = await request.json()
  const result = await updateBook(id, data)
  if ("error" in result) return Response.json(result, { status: 400 })
  return Response.json(result.book)
}

export async function DELETE(_request: NextRequest, ctx: IParams) {
  const { id } = await ctx.params
  const result = await deleteBook(id)
  if ("error" in result) return Response.json(result, { status: 400 })
  return Response.json(result)
}
