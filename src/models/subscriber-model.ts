import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ISubscriberDocument extends Document {
  id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  idNumber: string;
  gender: "male" | "female";
}

const subscriberSchema = new Schema<ISubscriberDocument>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    idNumber: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["male", "female"], required: true },
  },
  { id: true, timestamps: true },
);

export const SubscriberModel: Model<ISubscriberDocument> =
  mongoose.models["subscribers"] ??
  mongoose.model<ISubscriberDocument>("subscribers", subscriberSchema);
