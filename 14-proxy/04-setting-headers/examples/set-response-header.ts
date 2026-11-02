// Isolated educational proxy.ts that sets an outgoing response header.
// response.headers belongs to the outgoing HTTP response.
// The client can potentially observe this header.
// Response headers should not expose secrets or private server information.
// This example uses a harmless diagnostic value.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(_request: NextRequest) {
  const response =
    NextResponse.next();

  response.headers.set(
    "x-proxy-processed",
    "true"
  );

  return response;
}
