import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ILoanDocument extends Document {
  id: string;
  subscriberId: string;
  bookId: string;
  borrowDate: string;
  returnDate: string;
}

const loanSchema = new Schema<ILoanDocument>(
  {
    subscriberId: { type: String, required: true },
    bookId: { type: String, required: true },
    borrowDate: { type: String, required: true },
    returnDate: { type: String, required: true },
  },
  { id: true, timestamps: true },
);

export const LoanModel: Model<ILoanDocument> =
  mongoose.models["loans"] ??
  mongoose.model<ILoanDocument>("loans", loanSchema);
