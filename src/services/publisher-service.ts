import { connectMongoose } from "@/utils/mongoose-client"
import { PublisherModel } from "@/models/publisher-model"
import type { IPublisher } from "@/types/publisher-t"

function mapPublisher(doc: { id: string; name: string }): IPublisher {
  return { id: doc.id, name: doc.name }
}

export async function getAllPublishers(): Promise<IPublisher[]> {
  await connectMongoose()
  const publishers = await PublisherModel.find()
  return publishers.map(mapPublisher)
}

export async function createPublisher(
  data: IPublisher
): Promise<{ error: string } | IPublisher> {
  await connectMongoose()
  const existing = await PublisherModel.findOne({
    name: { $regex: new RegExp(`^${data.name.trim()}$`, "i") },
  })
  if (existing) return { error: "A publisher with this name already exists." }
  const doc = await PublisherModel.create({ name: data.name.trim() })
  return mapPublisher(doc)
}

export async function updatePublisher(
  id: string,
  data: IPublisher
): Promise<{ error: string } | IPublisher> {
  await connectMongoose()
  const existing = await PublisherModel.findOne({
    name: { $regex: new RegExp(`^${data.name.trim()}$`, "i") },
    _id: { $ne: id },
  })
  if (existing) return { error: "A publisher with this name already exists." }
  const doc = await PublisherModel.findByIdAndUpdate(
    id,
    { name: data.name.trim() },
    { new: true }
  )
  if (!doc) return { error: "Publisher not found." }
  return mapPublisher(doc)
}

export async function deletePublisher(id: string): Promise<void> {
  await connectMongoose()
  await PublisherModel.findByIdAndDelete(id)
}
