import { AuthNav } from "./auth-nav"
import { Nav } from "./nav"
import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import { getMenu } from "@/data/nav"
import { Role } from "@/constants/role"
import type { Locale, IDict } from "@/lib/dictionary"
import type { INav } from "@/types/nav-t"

interface IProps {
  lang: Locale
  dict: IDict
}

export async function Header(props: IProps) {
  const { lang, dict } = props

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const role = session?.user.role
  const allMenu = await getMenu(dict.nav)

  const filtered: INav[] = !session
    ? []
    : role === Role.Administrator
      ? allMenu
      : allMenu.filter((item) => item.role === Role.User)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/8 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-6">
        <Nav menu={filtered} lang={lang} />
        <AuthNav lang={lang} dict={dict.auth} />
      </div>
    </header>
  )
}
