// Isolated educational proxy.ts that sets a default preference cookie.
// has() checks whether the incoming request already has the cookie.
// The outgoing response sets a default preference only when needed.
// path "/" applies the cookie broadly.
// sameSite "lax" is included as a basic cookie option.
// This is not authentication or session logic.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.has("theme")) {
    response.cookies.set({
      name: "theme",
      value: "light",
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}
