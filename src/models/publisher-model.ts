import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IPublisherDocument extends Document {
  id: string;
  name: string;
}

const publisherSchema = new Schema<IPublisherDocument>(
  { name: { type: String, required: true } },
  { id: true },
);

export const PublisherModel: Model<IPublisherDocument> =
  mongoose.models["publishers"] ??
  mongoose.model<IPublisherDocument>("publishers", publisherSchema);
