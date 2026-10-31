// Isolated educational proxy.ts that reads an incoming preference cookie.
// request.cookies represents cookies received with the request.
// get() returns the cookie when it exists.
// The cookie value is treated only as a preference.
// Cookies should not automatically be trusted for authorization.
// console.log is used only for educational visibility.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const theme = request.cookies.get("theme");

  if (theme) {
    console.log(
      `Theme preference: ${theme.value}`
    );
  }

  return NextResponse.next();
}
