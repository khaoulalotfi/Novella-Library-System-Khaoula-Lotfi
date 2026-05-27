import { model, models, Schema, type Model, type Types } from "mongoose"
import type { WithStringId } from "./model-t"

export interface IAuthorDoc {
  id: string
  name: string
}

type IReturnType = WithStringId<IAuthorDoc>

const AuthorSchema = new Schema<IAuthorDoc>(
  { name: { type: String, required: true } },
  {
    timestamps: false,
    collection: "authors",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: IAuthorDoc & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const AuthorModel: Model<IAuthorDoc> =
  models["Author"] ?? model<IAuthorDoc>("Author", AuthorSchema)
