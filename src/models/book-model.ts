import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  inventoryNumber: { type: String, required: true },
  code: { type: String, required: true },
  authors: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  publisher: { type: String, required: true },
  year: { type: String, required: true },
  annotation: { type: String, required: true },
});

export const BookModel =
  mongoose.models["books"] ?? mongoose.model("books", bookSchema);
