// Isolated educational Proxy that inspects the incoming pathname.
// request.nextUrl.pathname exposes the incoming pathname.
// Proxy can inspect the request before the final route.
// The request continues after the condition.
// console.log exists only for educational visibility.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/preview")) {
    console.log("Preview request detected.");
  }

  return NextResponse.next();
}
