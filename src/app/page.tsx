import { redirect } from "next/navigation"

// Middleware redirects / to /{locale}, but this fallback ensures safety
export default function Home() {
  redirect("/en")
}
