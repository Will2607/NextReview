// Isolated example using Next.js redirect().
// redirect() is provided by Next.js.
// It initiates temporary redirect behavior.
// redirect() terminates the current control flow.
// It should not be treated like a normal returned data value.
// No code should be placed after it expecting normal execution.

import { redirect } from "next/navigation";

export async function GET() {
  redirect("/api/current");
}
