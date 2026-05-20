import mongoose, { Schema } from "mongoose";

const authorSchema = new Schema({
  name: { type: String, required: true },
});

export const AuthorModel =
  mongoose.models["authors"] ?? mongoose.model("authors", authorSchema);
