// Isolated educational proxy.ts that forwards a custom request header upstream.
// Incoming headers are cloned before modification.
// x-request-source is custom request metadata.
// The request option passes modified headers upstream.
// This header is not intentionally exposed as a response header.
// Custom headers are not authorization.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders =
    new Headers(request.headers);

  requestHeaders.set(
    "x-request-source",
    "proxy"
  );

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
