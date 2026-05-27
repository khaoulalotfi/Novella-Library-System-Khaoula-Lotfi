import { model, models, Schema, type Model, type Types } from "mongoose"
import type { WithStringId } from "./model-t"

export interface ILoanDoc {
  id: string
  subscriberId: string
  bookId: string
  borrowDate: string
  returnDate: string
}

type IReturnType = WithStringId<ILoanDoc>

const LoanSchema = new Schema<ILoanDoc>(
  {
    subscriberId: { type: String, required: true },
    bookId: { type: String, required: true },
    borrowDate: { type: String, required: true },
    returnDate: { type: String, required: true },
  },
  {
    timestamps: false,
    collection: "loans",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: ILoanDoc & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const LoanModel: Model<ILoanDoc> =
  models["Loan"] ?? model<ILoanDoc>("Loan", LoanSchema)
