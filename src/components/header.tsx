import { AuthNav } from "./auth-nav";
import { Nav } from "./nav";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { menu } from "@/data/nav";
import type { INav } from "@/types/nav-t";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = session?.user.role;

  const filtered: INav[] = !session
    ? []
    : role === "administrator"
      ? menu
      : menu.filter((item) => item.role === "user");

  return (
    <header className="w-full border-b border-border flex items-center justify-between px-6 py-0 relative z-50">
      <Nav menu={filtered} />
      <AuthNav />
    </header>
  );
}
