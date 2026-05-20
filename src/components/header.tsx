import { AuthNav } from "./auth-nav";
import { Nav } from "./nav";
import { menu } from "@/data/nav";

export async function Header() {
  return (
    <header className="w-full border-b border-border flex items-center justify-between px-6 py-2 relative z-50">
      <Nav menu={menu} />
      <AuthNav />
    </header>
  );
}
