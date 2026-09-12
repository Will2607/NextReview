// Isolated example that conceptually represents app/api/project-info/route.ts.
// This handler does not depend on request-specific information.
// force-static expresses explicit static behavior.
// Caching details are intentionally outside this lesson.

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    project: "NextReview",
    purpose: "Next.js roadmap study",
  });
}
