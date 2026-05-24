import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IAuthorDocument extends Document {
  id: string;
  name: string;
}

const authorSchema = new Schema<IAuthorDocument>(
  { name: { type: String, required: true } },
  { id: true },
);

export const AuthorModel: Model<IAuthorDocument> =
  mongoose.models["authors"] ??
  mongoose.model<IAuthorDocument>("authors", authorSchema);
