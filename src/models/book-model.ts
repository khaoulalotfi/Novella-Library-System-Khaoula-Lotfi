import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IBookDocument extends Document {
  id: string;
  inventoryNumber: number;
  code: string | null;
  authors: string[];
  title: string;
  price: number;
  publisher: string;
  year: number;
  annotation: string;
}

const bookSchema = new Schema<IBookDocument>(
  {
    inventoryNumber: { type: Number, required: true, unique: true },
    code: { type: String, default: null },
    authors: { type: [String], required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    publisher: { type: String, required: true },
    year: { type: Number, required: true },
    annotation: { type: String, required: true, maxlength: 500 },
  },
  { id: true },
);

export const BookModel: Model<IBookDocument> =
  mongoose.models["books"] ??
  mongoose.model<IBookDocument>("books", bookSchema);
