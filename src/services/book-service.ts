import { connectMongoose } from "@/utils/mongoose-client"
import { BookModel, type IBookDoc } from "@/models/book-model"
import { AuthorModel } from "@/models/author-model"
import { PublisherModel } from "@/models/publisher-model"
import { CodeModel } from "@/models/code-model"
import type { IBook } from "@/types/book-t"

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

async function isDuplicateInventoryNumber(
  inventoryNumber: number,
  excludeId?: string
): Promise<boolean> {
  const query: Record<string, unknown> = { inventoryNumber }
  if (excludeId) query._id = { $ne: excludeId }
  return !!(await BookModel.findOne(query))
}

async function isDuplicateTitleAuthors(
  title: string,
  authors: string[],
  excludeId?: string
): Promise<boolean> {
  const sorted = [...authors].sort()
  const query: Record<string, unknown> = {
    title: { $regex: new RegExp(`^${escapeRegex(title)}$`, "i") },
    authors: { $all: sorted, $size: sorted.length },
  }
  if (excludeId) query._id = { $ne: excludeId }
  return !!(await BookModel.findOne(query))
}

function mapBook(
  b: IBookDoc,
  authorMap: Map<string, string>,
  publisherMap: Map<string, string>,
  codeMap: Map<string, string>
): IBook {
  const authorIds: string[] =
    Array.isArray(b.authors) && b.authors.length > 0 ? b.authors : []
  return {
    id: b.id,
    inventoryNumber: b.inventoryNumber,
    code: b.code ?? undefined,
    codeValue: b.code ? (codeMap.get(b.code) ?? undefined) : undefined,
    authors: authorIds,
    authorNames: authorIds.map((id) => authorMap.get(id) ?? id),
    title: b.title,
    price: b.price,
    publisher: b.publisher ?? undefined,
    publisherName: b.publisher
      ? (publisherMap.get(b.publisher) ?? b.publisher)
      : undefined,
    year: b.year,
    annotation: b.annotation ?? "",
  }
}

export async function getAllBooks(): Promise<IBook[]> {
  await connectMongoose()
  const [books, authors, publishers, codes] = await Promise.all([
    BookModel.find(),
    AuthorModel.find(),
    PublisherModel.find(),
    CodeModel.find(),
  ])
  const authorMap = new Map<string, string>(
    authors.map((a) => [a.id as string, a.name as string])
  )
  const publisherMap = new Map<string, string>(
    publishers.map((p) => [p.id as string, p.name as string])
  )
  const codeMap = new Map<string, string>(
    codes.map((c) => [c.id as string, c.value as string])
  )
  return books.map((b) => mapBook(b as IBookDoc, authorMap, publisherMap, codeMap))
}

export async function createBook(
  data: Omit<IBook, "id">
): Promise<{ error: string } | { book: IBook }> {
  await connectMongoose()
  if (await isDuplicateInventoryNumber(data.inventoryNumber)) {
    return { error: "A book with this inventory number already exists." }
  }
  if (await isDuplicateTitleAuthors(data.title, data.authors)) {
    return { error: "A book with this title and authors already exists." }
  }
  const doc = await BookModel.create(data)
  return {
    book: {
      id: doc.id,
      inventoryNumber: doc.inventoryNumber,
      code: doc.code ?? undefined,
      authors: doc.authors,
      title: doc.title,
      price: doc.price,
      publisher: doc.publisher ?? undefined,
      year: doc.year,
      annotation: doc.annotation ?? "",
    },
  }
}

export async function updateBook(
  id: string,
  data: Omit<IBook, "id">
): Promise<{ error: string } | { book: IBook }> {
  await connectMongoose()
  if (await isDuplicateInventoryNumber(data.inventoryNumber, id)) {
    return { error: "A book with this inventory number already exists." }
  }
  if (await isDuplicateTitleAuthors(data.title, data.authors, id)) {
    return { error: "A book with this title and authors already exists." }
  }
  const doc = await BookModel.findByIdAndUpdate(id, data, { new: true })
  if (!doc) return { error: "Book not found." }
  return {
    book: {
      id: doc.id,
      inventoryNumber: doc.inventoryNumber,
      code: doc.code ?? undefined,
      authors: doc.authors,
      title: doc.title,
      price: doc.price,
      publisher: doc.publisher ?? undefined,
      year: doc.year,
      annotation: doc.annotation ?? "",
    },
  }
}

export async function deleteBook(
  id: string
): Promise<{ error: string } | { success: true }> {
  await connectMongoose()
  const doc = await BookModel.findByIdAndDelete(id)
  if (!doc) return { error: "Book not found." }
  return { success: true }
}
