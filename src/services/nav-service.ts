import { connectMongoose } from "@/utils/mongoose-client"
import { NavModel } from "@/models/nav-model"
import { Role } from "@/constants/role"
import type { INavDoc } from "@/types/nav-t"

// Re-export the pure buildMenu function so existing imports keep working
export { buildMenu } from "@/utils/nav-utils"

const defaultNavItems: Omit<INavDoc, "id">[] = [
  { titleKey: "home",              slug: "",                    role: null,                    order: 1, parentSlug: null },
  { titleKey: "books",             slug: "books",               role: Role.User,               order: 2, parentSlug: null },
  { titleKey: "bookList",          slug: "books/list",          role: null,                    order: 1, parentSlug: "books" },
  { titleKey: "bookSearch",        slug: "books/search",        role: null,                    order: 2, parentSlug: "books" },
  { titleKey: "libraryInventory",  slug: "books/inventory",     role: null,                    order: 3, parentSlug: "books" },
  { titleKey: "bookDetails",       slug: "books/details",       role: null,                    order: 4, parentSlug: "books" },
  { titleKey: "subscribers",       slug: "subscribers",         role: Role.User,               order: 3, parentSlug: null },
  { titleKey: "subscriberList",    slug: "subscribers/list",    role: null,                    order: 1, parentSlug: "subscribers" },
  { titleKey: "subscriberSearch",  slug: "subscribers/search",  role: null,                    order: 2, parentSlug: "subscribers" },
  { titleKey: "borrowedBooks",     slug: "subscribers/borrowed",role: null,                    order: 3, parentSlug: "subscribers" },
  { titleKey: "overdueBorrowers",  slug: "subscribers/overdue", role: null,                    order: 4, parentSlug: "subscribers" },
  { titleKey: "loans",             slug: "loans",               role: Role.User,               order: 4, parentSlug: null },
  { titleKey: "loanHistory",       slug: "loans/history",       role: null,                    order: 1, parentSlug: "loans" },
  { titleKey: "borrowedBooks",     slug: "loans/borrowed",      role: null,                    order: 2, parentSlug: "loans" },
  { titleKey: "returnedBooks",     slug: "loans/returned",      role: null,                    order: 3, parentSlug: "loans" },
  { titleKey: "bookBorrowers",     slug: "loans/borrowers",     role: null,                    order: 4, parentSlug: "loans" },
  { titleKey: "authorsPublishers", slug: "authors",             role: Role.Administrator,      order: 5, parentSlug: null },
  { titleKey: "authors",           slug: "authors/list",        role: null,                    order: 1, parentSlug: "authors" },
  { titleKey: "publishers",        slug: "publishers/list",     role: null,                    order: 2, parentSlug: "authors" },
  { titleKey: "codes",             slug: "codes/list",          role: null,                    order: 3, parentSlug: "authors" },
  { titleKey: "booksByYear",       slug: "books-by-year",       role: null,                    order: 4, parentSlug: "authors" },
  { titleKey: "reports",           slug: "reports",             role: Role.User,               order: 6, parentSlug: null },
  { titleKey: "inventoryReport",   slug: "reports/inventory",   role: null,                    order: 1, parentSlug: "reports" },
  { titleKey: "loanReport",        slug: "reports/loans",       role: null,                    order: 2, parentSlug: "reports" },
  { titleKey: "overdueReport",     slug: "reports/overdue",     role: null,                    order: 3, parentSlug: "reports" },
  { titleKey: "subscriberReport",  slug: "reports/subscribers", role: null,                    order: 4, parentSlug: "reports" },
]

function mapDoc(doc: {
  id: string
  titleKey: string
  slug: string
  role: string | null
  order: number
  parentSlug: string | null
}): INavDoc {
  return {
    id: doc.id,
    titleKey: doc.titleKey,
    slug: doc.slug,
    role: doc.role,
    order: doc.order,
    parentSlug: doc.parentSlug,
  }
}

export async function getAllNavItems(): Promise<INavDoc[]> {
  await connectMongoose()
  const count = await NavModel.countDocuments()
  if (count === 0) {
    await NavModel.insertMany(defaultNavItems)
  }
  const docs = await NavModel.find().sort({ order: 1 })
  return docs.map((d) => mapDoc(d.toJSON() as unknown as INavDoc))
}
