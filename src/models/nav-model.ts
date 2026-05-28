import { model, models, Schema, type Model, type Types } from "mongoose"
import type { WithStringId } from "./model-t"

export interface INavDocument {
  titleKey: string
  slug: string
  role: string | null
  order: number
  parentSlug: string | null
}

type IReturnType = WithStringId<INavDocument>

const NavSchema = new Schema<INavDocument>(
  {
    titleKey: { type: String, required: true },
    slug: { type: String, default: "" },
    role: { type: String, default: null },
    order: { type: Number, required: true },
    parentSlug: { type: String, default: null },
  },
  {
    timestamps: false,
    collection: "navigation",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: INavDocument & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

// Delete any stale cached model so schema changes take effect immediately
if ("Nav" in models) {
  delete (models as Record<string, unknown>)["Nav"]
}

export const NavModel: Model<INavDocument> = model<INavDocument>("Nav", NavSchema)
