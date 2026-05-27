import { model, models, Schema, type Model, type Types } from "mongoose"
import type { WithStringId } from "./model-t"

export interface IBookDoc {
  id: string
  inventoryNumber: number
  code: string | null
  authors: string[]
  title: string
  price: number
  publisher: string
  year: number
  annotation: string
}

type IReturnType = WithStringId<IBookDoc>

const BookSchema = new Schema<IBookDoc>(
  {
    inventoryNumber: { type: Number, required: true, unique: true },
    code: { type: String, default: null },
    authors: { type: [String], required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    publisher: { type: String, required: true },
    year: { type: Number, required: true },
    annotation: { type: String, required: true, maxlength: 500 },
  },
  {
    timestamps: false,
    collection: "books",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: IBookDoc & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const BookModel: Model<IBookDoc> =
  models["Book"] ?? model<IBookDoc>("Book", BookSchema)
