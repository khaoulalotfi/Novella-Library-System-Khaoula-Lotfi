import { connectMongoose } from "@/utils/mongoose-client"
import { AuthorModel } from "@/models/author-model"
import type { IAuthor } from "@/types/author-t"

function mapAuthor(doc: { id: string; name: string }): IAuthor {
  return { id: doc.id, name: doc.name }
}

export async function getAllAuthors(): Promise<IAuthor[]> {
  await connectMongoose()
  const authors = await AuthorModel.find()
  return authors.map(mapAuthor)
}

export async function createAuthor(
  data: IAuthor
): Promise<{ error: string } | IAuthor> {
  await connectMongoose()
  const existing = await AuthorModel.findOne({
    name: { $regex: new RegExp(`^${data.name.trim()}$`, "i") },
  })
  if (existing) return { error: "An author with this name already exists." }
  const doc = await AuthorModel.create({ name: data.name.trim() })
  return mapAuthor(doc)
}

export async function updateAuthor(
  id: string,
  data: IAuthor
): Promise<{ error: string } | IAuthor> {
  await connectMongoose()
  const existing = await AuthorModel.findOne({
    name: { $regex: new RegExp(`^${data.name.trim()}$`, "i") },
    _id: { $ne: id },
  })
  if (existing) return { error: "An author with this name already exists." }
  const doc = await AuthorModel.findByIdAndUpdate(
    id,
    { name: data.name.trim() },
    { new: true }
  )
  if (!doc) return { error: "Author not found." }
  return mapAuthor(doc)
}

export async function deleteAuthor(id: string): Promise<void> {
  await connectMongoose()
  await AuthorModel.findByIdAndDelete(id)
}
