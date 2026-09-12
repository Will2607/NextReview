// Isolated example that conceptually represents app/api/users/[id]/route.ts.
// [id] is a dynamic route segment.
// GET /api/users/42 provides id = "42".
// params is awaited in current Next.js App Router versions.
// No actual user lookup is performed.

export async function GET(
  _request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await context.params;

  return Response.json({
    id,
    message: `Requested user ${id}`,
  });
}
