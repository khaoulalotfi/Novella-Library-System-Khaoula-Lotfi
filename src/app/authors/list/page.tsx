import { AuthorsWrapper } from "@/components/authors/wrapper"
import { getApi } from "@/utils/server-api"
import { dict } from "@/dictionaries/en"
import type { IAuthor } from "@/types/author-t"

export default async function AuthorsListPage() {
  const authors = (await getApi<IAuthor[]>("/api/authors")) ?? []
  return <AuthorsWrapper authors={authors} dict={dict.authors} />
}
