// Isolated example that conceptually represents app/api/generated-at/route.ts.
// The timestamp is created at runtime.
// Different executions can produce different values.
// This demonstrates dynamic behavior conceptually.

export async function GET() {
  return Response.json({
    generatedAt: new Date().toISOString(),
  });
}
