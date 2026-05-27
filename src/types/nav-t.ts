import type { Role } from "@/constants/role"

export interface INav {
  title: string
  slug: string
  children?: INav[]
  role?: Role
}

export type IProps = { menu: INav[] }

export interface ISection {
  title: string
  slug: string
  description: string
}
