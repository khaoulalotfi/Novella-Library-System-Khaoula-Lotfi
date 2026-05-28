import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/utils/auth"

const locales = ["en", "fr"] as const
type Locale = (typeof locales)[number]
const defaultLocale: Locale = "en"

const publicPaths = ["/", "/signin", "/signup", "/profile"]

function getLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale
  }
  return defaultLocale
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(css|js|png|jpg|jpeg|svg|ico|woff|woff2|ttf|map|json|webp)$/)
  ) {
    return NextResponse.next()
  }

  // Redirect to locale-prefixed path when locale is missing
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(url)
  }

  // Identify the current locale from the path
  const locale = (locales.find((l) => pathname.startsWith(`/${l}`)) ?? defaultLocale) as Locale

  // Strip locale prefix to check against public paths
  const stripped = pathname.replace(/^\/(en|fr)/, "") || "/"

  if (publicPaths.includes(stripped)) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-lang", locale)
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  // Auth check for protected routes
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return NextResponse.redirect(new URL(`/${locale}/signin`, request.url))
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-lang", locale)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)",],
}
