import mongoose, { Schema } from "mongoose";

const codeSchema = new Schema({
  value: { type: String, required: true },
});

export const CodeModel =
  mongoose.models["codes"] ?? mongoose.model("codes", codeSchema);
