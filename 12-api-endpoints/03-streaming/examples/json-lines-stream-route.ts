// Isolated educational JSON Lines / NDJSON-style stream.
// Each line contains one complete JSON value.
// This is different from concatenating arbitrary JSON objects without framing.
// Line-delimited records can be processed incrementally.
// This example produces all records immediately and exists to demonstrate output framing.

type Item = {
  id: number;
  name: string;
};

const items: Item[] = [
  { id: 1, name: "Alpha" },
  { id: 2, name: "Beta" },
  { id: 3, name: "Gamma" },
];

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const item of items) {
        const line = `${JSON.stringify(item)}\n`;

        controller.enqueue(
          encoder.encode(line)
        );
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
    },
  });
}
