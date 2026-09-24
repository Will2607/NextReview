// Isolated example that conceptually represents app/api/stream/progress/route.ts.
// The delay exists only for education.
// Each chunk becomes available at a different time.
// The response can begin before all chunks have been generated.
// Real applications should not add artificial delays merely to use streaming.

function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(
        encoder.encode("Task started\n")
      );

      await delay(500);

      controller.enqueue(
        encoder.encode("Task processing\n")
      );

      await delay(500);

      controller.enqueue(
        encoder.encode("Task completed\n")
      );

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
