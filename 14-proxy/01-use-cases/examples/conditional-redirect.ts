// Isolated educational Proxy: request-level redirect decision.
// /legacy is handled before the route executes.
// All other requests continue normally.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/legacy") {
    return NextResponse.redirect(
      new URL("/current", request.url)
    );
  }

  return NextResponse.next();
}
