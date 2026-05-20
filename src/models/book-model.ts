import mongoose, { Schema, type Model } from "mongoose";

const bookSchema = new Schema({
  inventoryNumber: { type: Number, required: true, unique: true },
  code: { type: String, default: null },
  authors: { type: [String], required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  publisher: { type: String, required: true },
  year: { type: Number, required: true },
  annotation: { type: String, required: true, maxlength: 500 },
});

export const BookModel: Model<any> =
  mongoose.models["books"] ?? mongoose.model("books", bookSchema);
