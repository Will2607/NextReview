// Isolated educational proxy.ts that deletes a preference cookie.
// The example reads request context through pathname.
// response.cookies.delete() tells the client to remove the cookie.
// Deleting from the outgoing response differs conceptually from
// manipulating only the incoming request cookie abstraction.
// The example is intentionally minimal.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  if (
    request.nextUrl.pathname ===
    "/reset-preferences"
  ) {
    response.cookies.delete("theme");
  }

  return response;
}
