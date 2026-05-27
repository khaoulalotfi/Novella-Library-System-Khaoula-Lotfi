import { model, models, Schema, type Model, type Types } from "mongoose"
import type { WithStringId } from "./model-t"

export interface IPublisherDoc {
  id: string
  name: string
}

type IReturnType = WithStringId<IPublisherDoc>

const PublisherSchema = new Schema<IPublisherDoc>(
  { name: { type: String, required: true } },
  {
    timestamps: false,
    collection: "publishers",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: IPublisherDoc & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const PublisherModel: Model<IPublisherDoc> =
  models["Publisher"] ?? model<IPublisherDoc>("Publisher", PublisherSchema)
