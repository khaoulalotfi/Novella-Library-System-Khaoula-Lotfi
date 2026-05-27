import { model, models, Schema, type Model, type Types } from "mongoose"
import type { WithStringId } from "./model-t"

export interface ICodeDoc {
  id: string
  value: string
}

type IReturnType = WithStringId<ICodeDoc>

const CodeSchema = new Schema<ICodeDoc>(
  { value: { type: String, required: true } },
  {
    timestamps: false,
    collection: "codes",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: ICodeDoc & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const CodeModel: Model<ICodeDoc> =
  models["Code"] ?? model<ICodeDoc>("Code", CodeSchema)
