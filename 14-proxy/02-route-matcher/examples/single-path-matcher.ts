// Isolated educational proxy.ts with a nested dashboard matcher.
// Proxy executes only for the configured route scope.
// /dashboard and nested dashboard paths are included conceptually.
// Unrelated application routes bypass this Proxy configuration.
// matcher decides where Proxy runs, not what Proxy does.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
