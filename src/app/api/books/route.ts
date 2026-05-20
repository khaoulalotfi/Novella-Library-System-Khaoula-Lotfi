import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
} from "@/controllers/book-controller"
import type { NextRequest } from "next/server"

export async function GET() {
  try {
    const books = await getAllBooks()
    return Response.json(books)
  } catch (error) {
    console.error("GET /api/books:", error)
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await createBook(body)
    if ("error" in result) return Response.json(result, { status: 400 })
    return Response.json(result.book)
  } catch (error) {
    console.error("POST /api/books:", error)
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    const result = await updateBook(id, data)
    if ("error" in result) return Response.json(result, { status: 400 })
    return Response.json(result.book)
  } catch (error) {
    console.error("PUT /api/books:", error)
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const result = await deleteBook(id)
    if ("error" in result) return Response.json(result, { status: 400 })
    return Response.json(result)
  } catch (error) {
    console.error("DELETE /api/books:", error)
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
