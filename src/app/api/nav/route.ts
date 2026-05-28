import { getAllNavItems } from "@/services/nav-service"

export async function GET() {
  const items = await getAllNavItems()
  return Response.json(items)
}
