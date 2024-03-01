import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { allowedLocales } from "./constants/countries";

export function middleware(request: NextRequest) {
  const country = request.geo?.country || "US";
  const isImage = request.headers.get("sec-fetch-dest") === "image";
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith(`/${country}`) ||
    allowedLocales.includes(pathname.substring(1, 3)) ||
    isImage
  ) {
    return;
  }

  request.nextUrl.pathname = `${country}${request.nextUrl.pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
