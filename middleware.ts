import { NextRequest, NextResponse } from "next/server";

const canonicalHost = "instantinterviewprep.com";

export function middleware(request: NextRequest) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const isHttp = forwardedProto ? forwardedProto.split(",")[0].trim() !== "https" : request.nextUrl.protocol !== "https:";
  const hostname = (request.headers.get("x-forwarded-host")?.split(",")[0].trim() ?? request.nextUrl.hostname).toLowerCase();
  const isProductionHost = hostname === canonicalHost || hostname === `www.${canonicalHost}`;
  const isNonCanonicalHost = hostname === `www.${canonicalHost}`;

  if (!isProductionHost || (!isHttp && !isNonCanonicalHost)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.hostname = canonicalHost;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.[^/]+$).*)"],
};