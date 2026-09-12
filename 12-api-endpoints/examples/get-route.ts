// Isolated example that conceptually represents app/api/status/route.ts.
// GET /api/status is handled by the GET export.
// GET handles requests that use the GET HTTP method.
// Response.json creates a JSON HTTP response.

export async function GET() {
  return Response.json({
    status: "ok",
  });
}
