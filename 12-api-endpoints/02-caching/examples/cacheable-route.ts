// Isolated example that conceptually represents app/api/application-info/route.ts.
// The result is public and does not depend on the incoming request.
// The result changes rarely, so reuse may be conceptually suitable.
// This example does NOT configure actual Next.js caching.

export async function GET() {
  return Response.json({
    application: "NextReview",
    purpose: "Next.js roadmap study",
  });
}
