import mongoose, { Schema } from "mongoose";

const publisherSchema = new Schema({
  name: { type: String, required: true },
});

export const PublisherModel =
  mongoose.models["publishers"] ??
  mongoose.model("publishers", publisherSchema);
