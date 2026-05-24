import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ICodeDocument extends Document {
  id: string;
  value: string;
}

const codeSchema = new Schema<ICodeDocument>(
  { value: { type: String, required: true } },
  { id: true },
);

export const CodeModel: Model<ICodeDocument> =
  mongoose.models["codes"] ??
  mongoose.model<ICodeDocument>("codes", codeSchema);
