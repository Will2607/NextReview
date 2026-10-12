// Isolated educational Proxy: conceptual feature gating.
// The flag is hardcoded only for education.
// Real feature systems may use other infrastructure.
// No authentication or remote feature service is implemented.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const FEATURE_ENABLED = false;

export function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/beta") &&
    !FEATURE_ENABLED
  ) {
    return NextResponse.redirect(
      new URL("/coming-soon", request.url)
    );
  }

  return NextResponse.next();
}
