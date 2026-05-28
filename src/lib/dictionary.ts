import "server-only"

import { dict as enDict } from "@/dictionaries/en"

export type Locale = "en" | "fr"

export const locales: Locale[] = ["en", "fr"]
export const defaultLocale: Locale = "en"

export type IDict = typeof enDict

const dictionaries: Record<Locale, () => Promise<IDict>> = {
  en: () => import("@/dictionaries/en").then((m) => m.dict),
  fr: () => import("@/dictionaries/fr").then((m) => m.dict),
}

export async function getDictionary(locale: Locale): Promise<IDict> {
  return dictionaries[locale]()
}
