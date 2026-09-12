// Isolated example that conceptually represents app/api/request-info/route.ts.
// The handler reads information from the current request.
// The result therefore depends on request-time information.
// No cookies or headers are needed for this example.

export async function GET(request: Request) {
  const url = new URL(request.url);

  return Response.json({
    pathname: url.pathname,
  });
}
