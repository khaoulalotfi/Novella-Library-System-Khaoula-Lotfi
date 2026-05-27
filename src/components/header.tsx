import { AuthNav } from "./auth-nav"
import { Nav } from "./nav"
import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import { menu } from "@/data/nav"
import { Role } from "@/constants/role"
import type { INav } from "@/types/nav-t"

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const role = session?.user.role

  const filtered: INav[] = !session
    ? []
    : role === Role.Administrator
      ? menu
      : menu.filter((item) => item.role === Role.User)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/8 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-6">
        <Nav menu={filtered} />
        <AuthNav />
      </div>
    </header>
  )
}
