import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const country = request.geo?.country || "US";
  const isImage = request.headers.get("sec-fetch-dest") === "image";

  if (request.nextUrl.pathname.startsWith(`/${country}`) || isImage) {
    return;
  }
  request.nextUrl.pathname = `${country}${request.nextUrl.pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
