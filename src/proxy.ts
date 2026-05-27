import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/utils/auth";

const publicPaths = ["/", "/signin", "/signup", "/profile"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    publicPaths.includes(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(
      /\.(css|js|png|jpg|jpeg|svg|ico|woff|woff2|ttf|map|json|webp)$/,
    )
  ) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}
