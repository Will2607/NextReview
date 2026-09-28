// Isolated example of a permanent route migration.
// permanentRedirect() communicates a permanent move.
// Next.js uses 308 semantics for permanent redirects.
// 308 preserves the request method.
// Permanent redirects should be used deliberately.

import { permanentRedirect } from "next/navigation";

export async function GET() {
  permanentRedirect("/api/v2/status");
}
