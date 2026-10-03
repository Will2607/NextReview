// Isolated educational Proxy that redirects one path before route rendering.
// /legacy is handled before route rendering.
// NextResponse.redirect() changes the navigation destination.
// All other requests continue normally.
// Redirect mechanics were studied previously.

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
