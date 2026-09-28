// Isolated example that conceptually represents app/api/legacy-status/route.ts.
// This is a temporary redirect.
// request.url provides the base origin.
// new URL resolves the internal destination.
// 307 preserves the request method.
// This example uses the standard Web Response API.

export async function GET(request: Request) {
  const destination = new URL(
    "/api/status",
    request.url
  );

  return Response.redirect(
    destination,
    307
  );
}
