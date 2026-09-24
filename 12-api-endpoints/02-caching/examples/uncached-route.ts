// Isolated example that conceptually represents freshness-sensitive information.
// The value changes over time.
// Reusing an older result would change the freshness semantics.
// Caching decisions therefore depend on application requirements.
// No Next.js caching API is configured.

export async function GET() {
  return Response.json({
    generatedAt: new Date().toISOString(),
  });
}
