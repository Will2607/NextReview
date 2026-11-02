// Isolated educational proxy.ts that reads an incoming request header.
// request.headers contains incoming request metadata.
// get() returns the value or null.
// The value is inspected only for education.
// Incoming headers should not automatically be trusted.
// console.log is used only for educational visibility.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const userAgent =
    request.headers.get("user-agent");

  if (userAgent) {
    console.log(
      `Request user agent: ${userAgent}`
    );
  }

  return NextResponse.next();
}
