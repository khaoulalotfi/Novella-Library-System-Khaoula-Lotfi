import { connectMongoose } from "@/utils/mongoose-client"
import { CodeModel } from "@/models/code-model"
import type { ICode } from "@/types/code-t"

function mapCode(doc: { id: string; value: string }): ICode {
  return { id: doc.id, value: doc.value }
}

export async function getAllCodes(): Promise<ICode[]> {
  await connectMongoose()
  const codes = await CodeModel.find()
  return codes.map(mapCode)
}

export async function createCode(
  data: ICode
): Promise<{ error: string } | ICode> {
  await connectMongoose()
  const existing = await CodeModel.findOne({
    value: { $regex: new RegExp(`^${data.value.trim()}$`, "i") },
  })
  if (existing) return { error: "A code with this value already exists." }
  const doc = await CodeModel.create({ value: data.value.trim() })
  return mapCode(doc)
}

export async function updateCode(
  id: string,
  data: ICode
): Promise<{ error: string } | ICode> {
  await connectMongoose()
  const existing = await CodeModel.findOne({
    value: { $regex: new RegExp(`^${data.value.trim()}$`, "i") },
    _id: { $ne: id },
  })
  if (existing) return { error: "A code with this value already exists." }
  const doc = await CodeModel.findByIdAndUpdate(
    id,
    { value: data.value.trim() },
    { new: true }
  )
  if (!doc) return { error: "Code not found." }
  return mapCode(doc)
}

export async function deleteCode(id: string): Promise<void> {
  await connectMongoose()
  await CodeModel.findByIdAndDelete(id)
}
