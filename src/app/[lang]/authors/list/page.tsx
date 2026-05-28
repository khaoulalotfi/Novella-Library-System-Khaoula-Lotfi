import { AuthorsWrapper } from "@/components/authors/wrapper"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/dictionary"
import { getApi } from "@/utils/server-api"
import type { IAuthor } from "@/types/author-t"

interface IProps {
  params: Promise<{ lang: Locale }>
}

export default async function AuthorsListPage(props: IProps) {
  const { lang } = await props.params
  const authors = (await getApi<IAuthor[]>("/api/authors")) ?? []
  const dict = await getDictionary(lang)
  return <AuthorsWrapper authors={authors} dict={dict.authors} />
}
