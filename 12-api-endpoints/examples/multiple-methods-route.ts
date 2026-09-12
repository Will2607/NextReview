// Isolated example that conceptually represents app/api/items/route.ts.
// GET /api/items → GET()
// POST /api/items → POST()
// DELETE /api/items → DELETE()
// No real persistent resources are created or deleted.

export async function GET() {
  return Response.json({
    items: [],
  });
}

export async function POST(request: Request) {
  const body: unknown = await request.json();

  return Response.json(
    {
      message: "Item received.",
      data: body,
    },
    {
      status: 201,
    }
  );
}

export async function DELETE() {
  return Response.json({
    message: "Delete request received.",
  });
}
