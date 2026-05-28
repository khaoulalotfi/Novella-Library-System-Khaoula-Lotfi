import { Role } from "@/constants/role"
import type { INav, INavDoc } from "@/types/nav-t"
import type { IDict } from "@/lib/dictionary"

/**
 * Pure function — converts a flat list of INavDoc records into a
 * nested INav[] menu tree, translating titleKeys using the given dictionary.
 */
export function buildMenu(docs: INavDoc[], nav: IDict["nav"]): INav[] {
  const topLevel = docs
    .filter((d) => d.parentSlug === null)
    .sort((a, b) => a.order - b.order)

  return topLevel.map((parent) => {
    const children = docs
      .filter((d) => d.parentSlug === parent.slug)
      .sort((a, b) => a.order - b.order)
      .map((child) => ({
        title: nav[child.titleKey as keyof typeof nav] ?? child.titleKey,
        slug: child.slug,
      }))

    const item: INav = {
      title: nav[parent.titleKey as keyof typeof nav] ?? parent.titleKey,
      slug: parent.slug,
    }

    if (parent.role) {
      item.role = parent.role as Role
    }

    if (children.length > 0) {
      item.children = children
    }

    return item
  })
}
