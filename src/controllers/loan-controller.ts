import { connectMongoose } from "@/utils/mongoose-client";
import { LoanModel, type ILoanDocument } from "@/models/loan-model";
import type { ILoan } from "@/types/subscriber-t";

function mapLoan(l: ILoanDocument): ILoan {
  return {
    id: l.id,
    subscriberId: l.subscriberId,
    bookId: l.bookId,
    borrowDate: l.borrowDate,
    returnDate: l.returnDate,
  };
}

export async function getAllLoans(): Promise<ILoan[]> {
  await connectMongoose();
  const loans = await LoanModel.find().exec();
  return loans.map(mapLoan);
}

export async function getBorrowedBooks(): Promise<ILoan[]> {
  await connectMongoose();
  const today = new Date().toISOString().split("T")[0] ?? "";
  const loans = await LoanModel.find({ returnDate: { $gte: today } }).exec();
  return loans.map(mapLoan);
}

export async function getReturnedBooks(): Promise<ILoan[]> {
  await connectMongoose();
  const today = new Date().toISOString().split("T")[0] ?? "";
  const loans = await LoanModel.find({ returnDate: { $lt: today } }).exec();
  return loans.map(mapLoan);
}

export async function getOverdueLoans(): Promise<ILoan[]> {
  await connectMongoose();
  const today = new Date().toISOString().split("T")[0] ?? "";
  const loans = await LoanModel.find({ returnDate: { $lt: today } }).exec();
  return loans.map(mapLoan);
}

export async function createLoan(data: Omit<ILoan, "id">): Promise<ILoan> {
  await connectMongoose();
  const loan = await LoanModel.create(data);
  return mapLoan(loan);
}

export async function deleteLoan(id: string): Promise<void> {
  await connectMongoose();
  await LoanModel.findByIdAndDelete(id);
}
