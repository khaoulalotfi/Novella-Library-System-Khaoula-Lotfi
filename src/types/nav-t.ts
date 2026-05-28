import type { Role } from "@/constants/role"

export interface INav {
  title: string
  slug: string
  children?: INav[]
  role?: Role
}

export interface INavDoc {
  id: string
  titleKey: string
  slug: string
  role: string | null
  order: number
  parentSlug: string | null
}

export type IProps = { menu: INav[] }

export interface ISection {
  title: string
  slug: string
  description: string
}
