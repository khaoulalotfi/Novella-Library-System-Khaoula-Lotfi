import { model, models, Schema, type Model, type Types } from "mongoose"
import type { WithStringId } from "./model-t"

export interface ISubscriberDoc {
  id: string
  name: string
  surname: string
  phone: string
  email: string
  dateOfBirth: string
  idNumber: string
  gender: "male" | "female"
}

type IReturnType = WithStringId<ISubscriberDoc>

const SubscriberSchema = new Schema<ISubscriberDoc>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    idNumber: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["male", "female"], required: true },
  },
  {
    timestamps: false,
    collection: "subscribers",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: ISubscriberDoc & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const SubscriberModel: Model<ISubscriberDoc> =
  models["Subscriber"] ?? model<ISubscriberDoc>("Subscriber", SubscriberSchema)
