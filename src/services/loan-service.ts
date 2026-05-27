import { connectMongoose } from "@/utils/mongoose-client"
import { LoanModel, type ILoanDoc } from "@/models/loan-model"
import { LoanFilter } from "@/constants/loan-filter"
import type { ILoan } from "@/types/subscriber-t"

function mapLoan(l: ILoanDoc): ILoan {
  return {
    id: l.id,
    subscriberId: l.subscriberId,
    bookId: l.bookId,
    borrowDate: l.borrowDate,
    returnDate: l.returnDate,
  }
}

export async function getAllLoans(): Promise<ILoan[]> {
  await connectMongoose()
  const loans = await LoanModel.find()
  return loans.map((l) => mapLoan(l as ILoanDoc))
}

export async function getBorrowedBooks(): Promise<ILoan[]> {
  await connectMongoose()
  const today = new Date().toISOString().split("T")[0] ?? ""
  const loans = await LoanModel.find({ returnDate: { $gte: today } })
  return loans.map((l) => mapLoan(l as ILoanDoc))
}

export async function getReturnedBooks(): Promise<ILoan[]> {
  await connectMongoose()
  const today = new Date().toISOString().split("T")[0] ?? ""
  const loans = await LoanModel.find({ returnDate: { $lt: today } })
  return loans.map((l) => mapLoan(l as ILoanDoc))
}

export async function getOverdueLoans(): Promise<ILoan[]> {
  await connectMongoose()
  const today = new Date().toISOString().split("T")[0] ?? ""
  const loans = await LoanModel.find({ returnDate: { $lt: today } })
  return loans.map((l) => mapLoan(l as ILoanDoc))
}

export async function getLoansByFilter(
  filter: string | null
): Promise<ILoan[]> {
  if (filter === LoanFilter.Borrowed) return getBorrowedBooks()
  if (filter === LoanFilter.Returned) return getReturnedBooks()
  if (filter === LoanFilter.Overdue) return getOverdueLoans()
  return getAllLoans()
}

export async function createLoan(data: Omit<ILoan, "id">): Promise<ILoan> {
  await connectMongoose()
  const loan = await LoanModel.create(data)
  return mapLoan(loan as ILoanDoc)
}

export async function deleteLoan(id: string): Promise<void> {
  await connectMongoose()
  await LoanModel.findByIdAndDelete(id)
}
