// Isolated educational Proxy: early response before the route executes.
// 503 represents temporary unavailability.
// This is a minimal educational example.
// No global maintenance system is implemented.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/temporarily-disabled") {
    return new NextResponse(
      "This route is temporarily unavailable.",
      {
        status: 503,
      }
    );
  }

  return NextResponse.next();
}
