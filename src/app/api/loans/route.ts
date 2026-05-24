import type { NextRequest } from "next/server";
import {
  getAllLoans,
  getBorrowedBooks,
  getOverdueLoans,
  createLoan,
} from "@/controllers/loan-controller";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter");

    if (filter === "borrowed") {
      const loans = await getBorrowedBooks();
      return Response.json(loans);
    }

    if (filter === "overdue") {
      const loans = await getOverdueLoans();
      return Response.json(loans);
    }

    const loans = await getAllLoans();
    return Response.json(loans);
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
    const loan = await createLoan(body);
    return Response.json(loan);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
