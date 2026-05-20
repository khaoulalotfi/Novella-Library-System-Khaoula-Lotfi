import { connectMongoose } from "@/utils/mongoose-client"
import { BookModel } from "@/models/book-model"
import { AuthorModel } from "@/models/author-model"
import { PublisherModel } from "@/models/publisher-model"
import { CodeModel } from "@/models/code-model"
import type { IBook } from "@/types/book-t"

// ─── helpers ────────────────────────────────────────────────────────────────

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

async function isDuplicateInventoryNumber(
  inventoryNumber: number,
  excludeId?: string,
): Promise<boolean> {
  const query: Record<string, unknown> = { inventoryNumber }
  if (excludeId) query._id = { $ne: excludeId }
  return !!(await BookModel.findOne(query))
}

async function isDuplicateTitleAuthors(
  title: string,
  authors: string[],
  excludeId?: string,
): Promise<boolean> {
  const sorted = [...authors].sort()
  const query: Record<string, unknown> = {
    title: { $regex: new RegExp(`^${escapeRegex(title)}$`, "i") },
    authors: { $all: sorted, $size: sorted.length },
  }
  if (excludeId) query._id = { $ne: excludeId }
  return !!(await BookModel.findOne(query))
}

// ─── read ────────────────────────────────────────────────────────────────────

export async function getAllBooks(): Promise<IBook[]> {
  await connectMongoose()

  const [books, authors, publishers, codes] = await Promise.all([
    BookModel.find().lean(),
    AuthorModel.find().lean(),
    PublisherModel.find().lean(),
    CodeModel.find().lean(),
  ])

  const authorMap = new Map(
    (authors as any[]).map((a) => [a._id.toString(), a.name as string]),
  )
  const publisherMap = new Map(
    (publishers as any[]).map((p) => [p._id.toString(), p.name as string]),
  )
  const codeMap = new Map(
    (codes as any[]).map((c) => [c._id.toString(), c.value as string]),
  )

  return (books as any[]).map((b) => {
    const authorIds: string[] =
      Array.isArray(b.authors) && b.authors.length > 0
        ? b.authors
        : b.author
        ? [String(b.author)]
        : []

    return {
      id: b._id.toString(),
      inventoryNumber: b.inventoryNumber,
      code: b.code ?? null,
      codeValue: b.code ? (codeMap.get(b.code) ?? null) : null,
      authors: authorIds,
      authorNames: authorIds.map((id) => authorMap.get(id) ?? id),
      title: b.title,
      price: b.price,
      publisher: b.publisher ?? null,
      publisherName: b.publisher
        ? (publisherMap.get(b.publisher) ?? b.publisher)
        : null,
      year: b.year,
      annotation: b.annotation ?? "",
    } as IBook
  })
}

// ─── create ──────────────────────────────────────────────────────────────────

export async function createBook(
  data: Omit<IBook, "id">,
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
      id: doc._id.toString(),
      inventoryNumber: doc.inventoryNumber,
      code: doc.code ?? null,
      authors: doc.authors,
      title: doc.title,
      price: doc.price,
      publisher: doc.publisher ?? null,
      year: doc.year,
      annotation: doc.annotation ?? "",
    },
  }
}

// ─── update ──────────────────────────────────────────────────────────────────

export async function updateBook(
  id: string,
  data: Omit<IBook, "id">,
): Promise<{ error: string } | { book: IBook }> {
  await connectMongoose()

  if (await isDuplicateInventoryNumber(data.inventoryNumber, id)) {
    return { error: "A book with this inventory number already exists." }
  }

  if (await isDuplicateTitleAuthors(data.title, data.authors, id)) {
    return { error: "A book with this title and authors already exists." }
  }

  const doc = await BookModel.findByIdAndUpdate(id, data, { new: true }).lean()
  if (!doc) return { error: "Book not found." }

  return {
    book: {
      id: (doc as any)._id.toString(),
      inventoryNumber: (doc as any).inventoryNumber,
      code: (doc as any).code ?? null,
      authors: (doc as any).authors,
      title: (doc as any).title,
      price: (doc as any).price,
      publisher: (doc as any).publisher ?? null,
      year: (doc as any).year,
      annotation: (doc as any).annotation ?? "",
    },
  }
}

// ─── delete ──────────────────────────────────────────────────────────────────

export async function deleteBook(
  id: string,
): Promise<{ error: string } | { success: true }> {
  await connectMongoose()
  const doc = await BookModel.findByIdAndDelete(id)
  if (!doc) return { error: "Book not found." }
  return { success: true }
}
