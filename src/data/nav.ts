import "server-only"
import { getAllNavItems, buildMenu } from "@/services/nav-service"
import type { IDict } from "@/lib/dictionary"
import type { INav } from "@/types/nav-t"

export async function getMenu(nav: IDict["nav"]): Promise<INav[]> {
  const docs = await getAllNavItems()
  return buildMenu(docs, nav)
}
