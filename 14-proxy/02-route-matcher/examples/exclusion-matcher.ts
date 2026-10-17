// Isolated educational proxy.ts with a negative-lookahead exclusion pattern.
// The excluded paths are common examples rather than universal requirements.
// Most other paths can invoke Proxy.
// This pattern is intentionally more advanced than the previous examples.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
