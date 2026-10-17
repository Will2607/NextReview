// Isolated educational proxy.ts with multiple matcher patterns.
// matcher may contain multiple route patterns.
// dashboard and account route areas invoke Proxy.
// matcher arrays are useful when several application areas share request-level behavior.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
  ],
};
