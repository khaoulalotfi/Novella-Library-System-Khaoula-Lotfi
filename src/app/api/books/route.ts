import { getAllBooks, createBook } from "@/controllers/book-controller";
import type { NextRequest } from "next/server";

export async function GET() {
  try {
    const books = await getAllBooks();
    return Response.json(books);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await createBook(body);
    if ("error" in result) return Response.json(result, { status: 400 });
    return Response.json(result.book);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
