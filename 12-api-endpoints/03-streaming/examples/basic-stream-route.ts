// Isolated example that conceptually represents app/api/stream/basic/route.ts.
// TextEncoder converts strings into byte chunks.
// enqueue pushes another chunk into the response stream.
// close indicates that no additional chunks will be produced.
// The chunks are created immediately in this example.
// This example demonstrates structure, not delayed delivery.

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode("First chunk\n"));
      controller.enqueue(encoder.encode("Second chunk\n"));
      controller.enqueue(encoder.encode("Third chunk\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
