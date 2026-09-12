// Isolated example that conceptually represents app/api/messages/route.ts.
// Request bodies are untrusted input.
// unknown is used instead of any.
// The validation below is intentionally minimal and educational.
// No database is involved.

type MessageInput = {
  message: string;
};

export async function POST(request: Request) {
  const body: unknown = await request.json();

  if (
    typeof body !== "object" ||
    body === null ||
    !("message" in body) ||
    typeof body.message !== "string"
  ) {
    return Response.json(
      {
        error: "A message string is required.",
      },
      {
        status: 400,
      }
    );
  }

  const input: MessageInput = {
    message: body.message,
  };

  return Response.json(
    {
      message: "Message received.",
      data: input,
    },
    {
      status: 201,
    }
  );
}
