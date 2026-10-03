// Isolated example that conceptually represents proxy.ts.
// Proxy runs before route rendering.
// NextResponse.next() allows normal request processing to continue.
// This example intentionally performs no conditional logic.
// proxy.ts does not create a URL route.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(_request: NextRequest) {
  return NextResponse.next();
}
