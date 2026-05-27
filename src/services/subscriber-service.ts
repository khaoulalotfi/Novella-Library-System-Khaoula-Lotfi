import { connectMongoose } from "@/utils/mongoose-client"
import { SubscriberModel, type ISubscriberDoc } from "@/models/subscriber-model"
import type { ISubscriber } from "@/types/subscriber-t"

function mapSubscriber(s: ISubscriberDoc): ISubscriber {
  return {
    id: s.id,
    name: s.name,
    surname: s.surname,
    phone: s.phone,
    email: s.email,
    dateOfBirth: s.dateOfBirth,
    idNumber: s.idNumber,
    gender: s.gender,
  }
}

async function isDuplicateField(
  field: string,
  value: string,
  excludeId?: string
): Promise<boolean> {
  const query: Record<string, unknown> = { [field]: value }
  if (excludeId) query._id = { $ne: excludeId }
  return !!(await SubscriberModel.findOne(query))
}

export async function getAllSubscribers(): Promise<ISubscriber[]> {
  await connectMongoose()
  const subscribers = await SubscriberModel.find()
  return subscribers.map((s) => mapSubscriber(s as ISubscriberDoc))
}

export async function getSubscriberById(
  id: string
): Promise<ISubscriber | null> {
  await connectMongoose()
  const subscriber = await SubscriberModel.findById(id)
  if (!subscriber) return null
  return mapSubscriber(subscriber as ISubscriberDoc)
}

export async function createSubscriber(
  data: Omit<ISubscriber, "id">
): Promise<{ error: string } | ISubscriber> {
  await connectMongoose()
  if (await isDuplicateField("idNumber", data.idNumber)) {
    return { error: "A subscriber with this ID number already exists." }
  }
  if (await isDuplicateField("phone", data.phone)) {
    return { error: "A subscriber with this phone number already exists." }
  }
  if (await isDuplicateField("email", data.email)) {
    return { error: "A subscriber with this email already exists." }
  }
  const subscriber = await SubscriberModel.create(data)
  return mapSubscriber(subscriber as ISubscriberDoc)
}

export async function updateSubscriber(
  id: string,
  data: Omit<ISubscriber, "id">
): Promise<{ error: string } | ISubscriber | null> {
  await connectMongoose()
  if (await isDuplicateField("idNumber", data.idNumber, id)) {
    return { error: "A subscriber with this ID number already exists." }
  }
  if (await isDuplicateField("phone", data.phone, id)) {
    return { error: "A subscriber with this phone number already exists." }
  }
  if (await isDuplicateField("email", data.email, id)) {
    return { error: "A subscriber with this email already exists." }
  }
  const subscriber = await SubscriberModel.findByIdAndUpdate(id, data, {
    new: true,
  })
  if (!subscriber) return null
  return mapSubscriber(subscriber as ISubscriberDoc)
}

export async function deleteSubscriber(id: string): Promise<void> {
  await connectMongoose()
  await SubscriberModel.findByIdAndDelete(id)
}
