import type { NextRequest } from "next/server"
import { getLoansByFilter, createLoan } from "@/services/loan-service"
import { loanServerSchema } from "@/types/subscriber-t"
import type { ILoanForm } from "@/types/subscriber-t"
import { z } from "zod"

export async function GET(request: NextRequest) {
  const filter = request.nextUrl.searchParams.get("filter")
  const loans = await getLoansByFilter(filter)
  return Response.json(loans)
}

export async function POST(request: NextRequest) {
  const body: ILoanForm = await request.json()
  const parse = loanServerSchema.safeParse(body)
  if (!parse.success) {
    return Response.json(
      { errors: z.flattenError(parse.error).fieldErrors },
      { status: 400 }
    )
  }
  const loan = await createLoan(parse.data)
  return Response.json(loan, { status: 201 })
}
