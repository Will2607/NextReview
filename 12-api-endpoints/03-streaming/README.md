# Streaming API Responses

The goal of this lesson is to understand how a Next.js Route Handler can progressively send an HTTP response using Web Streams. A traditional endpoint may wait until every piece of data exists, then send one complete body. A streaming endpoint can start the response earlier and send **chunks** as they become available.

This lesson focuses on API response streaming:

```text
Route Handler
→ HTTP Response
→ progressive chunks
→ client
```

It does not re-teach React Suspense or `loading.tsx`. Those belong to UI streaming, studied earlier.

## Overview

A traditional response may wait until all data is available before sending the complete result.

Traditional flow:

```text
Request
↓
Perform all work
↓
Build entire response
↓
Send response
↓
Client receives result
```

Streaming allows the server to send pieces progressively:

```text
Request
↓
Start response
↓
Chunk 1
↓
Chunk 2
↓
Chunk 3
↓
Close stream
```

Each piece is commonly called a **chunk**. The client can begin receiving data before the last chunk exists.

## What Is Streaming?

**Streaming** is transferring data progressively instead of requiring the entire result to be produced before transmission begins.

```text
Producer
↓
Chunk
↓
Chunk
↓
Chunk
↓
Consumer
```

The producer and consumer can process data incrementally. The producer does not have to finish the whole body first. The consumer does not have to wait for a single complete document before seeing the first bytes.

## Complete Response vs Streaming Response

| Complete Response | Streaming Response |
| --- | --- |
| Wait for all data | Can begin earlier |
| Send one complete body | Send multiple chunks |
| Simpler mental model | More complex lifecycle |
| Client processes after completion | Client may process incrementally |

Streaming is **not** automatically better. A small JSON object that is already ready is often simpler as one complete response.

## What Is a Chunk?

A **chunk** is one portion of the response body sent through the stream.

Conceptually:

```text
Chunk 1:
"Starting...\n"

Chunk 2:
"Processing...\n"

Chunk 3:
"Finished.\n"
```

The complete response is formed from the sequence of chunks. Order matters. Together they are the body. Individually they are pieces delivered over time.

## Web Streams API

Route Handlers can use the standard **Web Streams API**.

This lesson introduces **`ReadableStream`** at a basic level:

- `ReadableStream` → produces data over time.
- `Response` → can use that stream as its body.

The complete Web Streams API is not taught here. `pull()`, `cancel()`, BYOB readers, and `TransformStream` stay out of scope.

## ReadableStream

```ts
const stream = new ReadableStream({
  start(controller) {
    // Produce chunks here.
  },
});
```

`start` receives a **controller** used to push data into the stream.

This lesson uses only:

- `controller.enqueue(...)`
- `controller.close()`

Those two operations are enough to produce a finite educational stream.

## controller.enqueue()

**`enqueue`** adds another chunk to the stream.

```text
controller.enqueue(chunk1)
controller.enqueue(chunk2)
controller.enqueue(chunk3)
```

Each call makes another piece available to the response stream. The consumer may receive those pieces as they are enqueued, especially when later chunks wait on asynchronous work.

## controller.close()

**`close`** signals that no more chunks will be produced.

```text
enqueue(...)
enqueue(...)
close()
```

Forgetting to finish a stream can leave the consumer waiting for data that never arrives. A finite stream needs an explicit end. This stays conceptual: close is how the producer says “the body is complete.”

## Strings and Binary Data

Response streams commonly work with **byte-oriented** chunks.

Text must typically be encoded before it is enqueued.

**`TextEncoder`** converts a string into bytes:

```ts
const encoder = new TextEncoder();

const chunk = encoder.encode("Hello\n");
```

```text
string
↓
TextEncoder
↓
Uint8Array
↓
stream
```

This lesson does not teach binary protocols. Encoding is only the step from text to stream bytes.

## Basic Route Handler Stream

```ts
export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode("First chunk\n"));
      controller.enqueue(encoder.encode("Second chunk\n"));
      controller.enqueue(encoder.encode("Third chunk\n"));
      controller.close();
    },
  });

  return new Response(stream);
}
```

Execution:

```text
GET request
↓
ReadableStream created
↓
chunks are enqueued
↓
Response uses stream
↓
stream closes
```

The handler returns a `Response` whose body is the stream, not a finished JSON object.

## Why This Example Is Technically Streaming

Although all three chunks are produced immediately in this small example, the response body is still expressed as a **stream**.

Because there is no delay or asynchronous work, the client may observe the chunks arriving very close together. The example exists only to demonstrate the API structure, not a visible pause between pieces.

## Delayed Streaming

Streaming becomes more obvious when chunks become available at **different times**.

Conceptual example:

```text
0s
→ "Starting"

1s
→ "Processing"

2s
→ "Finished"
```

The server can begin transmitting before all work is complete. The first line can leave the server while later work is still running.

## Async Producer Pattern

A simple educational pattern:

```ts
const stream = new ReadableStream({
  async start(controller) {
    // Produce chunks over time.
  },
});
```

Asynchronous work can happen before later chunks are enqueued. `start` can `await` something, then `enqueue` again. This stays introductory.

## A Delay Helper

```ts
function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
```

This helper exists only to make progressive delivery visible in the educational example. Artificial delays are **not** production logic. Real streams wait on real work, not on `setTimeout` added just to look like streaming.

## Delayed Streaming Example

Conceptually:

```text
controller.enqueue("Starting")
↓
wait
↓
controller.enqueue("Processing")
↓
wait
↓
controller.enqueue("Finished")
↓
controller.close()
```

The response can begin before the final chunk exists. “Starting” does not have to wait for “Finished.” That is the point of progressive delivery.

## Response Body

`Response` accepts a stream as its body:

```ts
return new Response(stream);
```

Compare:

```ts
return Response.json(data);
```

versus:

```ts
return new Response(stream);
```

- `Response.json` creates a complete JSON response.
- `Response(stream)` can progressively produce the response body.

This comparison is educational. It does not claim `Response.json` can never be combined with other streaming techniques in broader systems.

## Content Type

Clients need to understand the representation being streamed.

```ts
return new Response(stream, {
  headers: {
    "Content-Type": "text/plain; charset=utf-8",
  },
});
```

HTTP headers are a later roadmap topic. This lesson only notes that **`Content-Type`** describes the body representation: plain text, JSON Lines, and so on. It does not teach headers generally.

## Streaming Text

Plain text is a straightforward streaming example.

Possible stream:

```text
"Task started\n"
"Task running\n"
"Task completed\n"
```

The client can theoretically process lines as they arrive. This lesson does not implement a browser streaming client.

## Streaming JSON

A traditional JSON document must remain syntactically valid as **one complete document**.

Sending arbitrary independent JSON objects one after another does **not** automatically create valid JSON.

Invalid conceptual output:

```text
{"id":1}{"id":2}{"id":3}
```

That is two (or three) values jammed together, not one JSON document. A streaming-friendly format may be preferable when records arrive incrementally.

## JSON Lines

**JSON Lines** is a simple record-oriented format: one complete JSON value per line.

```text
{"id":1,"name":"A"}
{"id":2,"name":"B"}
{"id":3,"name":"C"}
```

Each line is valid JSON by itself. Consumers can process records incrementally without waiting for a closing `]` of a giant array.

This format stays introductory. This lesson does not teach a JSON Lines library.

## JSON Lines Content Type

A streaming endpoint can indicate an appropriate representation through `Content-Type`.

This lesson does not standardize or overstate one universal header value. For the isolated example, the files use:

```text
application/x-ndjson
```

NDJSON / JSON Lines-style output is useful for demonstrating record-by-record streaming. Content negotiation is not taught.

## Streaming Large Results

Without streaming:

```text
Generate entire large result
↓
hold complete result
↓
send
```

With streaming:

```text
Generate portion
↓
send portion
↓
generate next portion
↓
send next portion
```

The application **may** avoid waiting for all output to exist before transmission begins. This lesson does not make precise memory or performance guarantees.

## Time to First Byte

**Time to first byte** is a conceptual idea only: streaming can allow the server to begin producing a response earlier.

That **may** improve perceived responsiveness. The client sees something sooner. This lesson does not provide benchmarks or networking theory.

## Backpressure

A producer can theoretically generate data faster than a consumer can process it. That mismatch is known as **backpressure**.

Web Streams backpressure mechanics are **outside this lesson**. `desiredSize`, `pull()`, and queuing strategies are not taught.

## Stream Lifecycle

```text
Create stream
↓
Start producing
↓
Enqueue chunks
↓
Finish production
↓
Close stream
```

A stream has a **lifecycle** rather than one single completed body value. It starts, produces, and ends. The body exists over time.

## Errors During Streaming

A failure can occur after some response data has already been produced.

```text
Chunk 1 sent
↓
Chunk 2 sent
↓
Unexpected error
```

That is different from failing **before** an HTTP response begins. If nothing has been sent, the handler can still return a normal `400` or `500`. After chunks have left the server, the client already has a partial body. Production error recovery is not implemented here.

## controller.error()

A stream controller can signal a stream failure with `controller.error()`.

It is mentioned only so the name exists. The required examples do not use it. Advanced stream recovery is not taught.

## HTTP Status and Streaming

Status and response metadata are established as part of **beginning** the HTTP response.

Once streaming has started, handling later failures is different from simply returning a completely new normal response. You cannot replace status `200` with status `500` as if the first response never started.

This stays high level. HTTP protocol internals are out of scope.

## Streaming vs Polling

**Polling:**

```text
Client
→ request
→ response

wait

Client
→ another request
→ another response
```

**Streaming:**

```text
Client
→ one request
→ response remains open
→ multiple chunks arrive
```

Polling repeats complete request/response cycles. Streaming keeps one response open and delivers pieces. Polling is not implemented here.

## Streaming vs WebSockets

- **Streaming HTTP response:** typically one request with progressively delivered response data.
- **WebSocket:** persistent bidirectional communication.

They solve different communication requirements. This lesson does not teach WebSockets.

## Streaming vs Server-Sent Events

**Server-Sent Events** are a specific protocol and pattern for server-to-client event streams over HTTP.

**`ReadableStream`** is a lower-level stream primitive that can be used for different response representations: plain text, JSON Lines, or other bodies.

SSE is not implemented here. SSE is a pattern. `ReadableStream` is the primitive this lesson uses.

## API Streaming vs UI Streaming

This distinction is essential.

**API response streaming:**

```text
Route Handler
↓
HTTP response chunks
↓
consumer
```

**UI streaming:**

```text
React / Next.js rendering
↓
progressive UI delivery
↓
browser
```

They share the general idea of progressive delivery. They operate at **different abstraction levels**. One streams an HTTP body from `route.ts`. The other streams rendered UI.

## Previous Loading and Streaming Lesson

The earlier routing lesson focused on:

- `loading.tsx`
- Suspense
- progressive rendering of UI

This lesson focuses on:

- Route Handlers
- `ReadableStream`
- raw response chunks

That earlier material is not duplicated here.

## When API Streaming May Be Useful

Potential examples:

- progressively generated text;
- long-running output;
- large sequential datasets;
- incremental processing results;
- AI-generated text;
- export generation where data can be emitted incrementally.

These stay conceptual. This lesson does not call an AI API.

## When Streaming May Be Unnecessary

Examples:

- tiny JSON responses;
- immediately available data;
- endpoints where the consumer requires the entire document before doing anything;
- simple CRUD operations.

Streaming introduces complexity and should solve a real requirement. A `{ "status": "ok" }` endpoint does not need a stream.

## Advantages

Potential advantages:

- earlier delivery of partial results;
- lower wait before the first useful data;
- incremental processing;
- useful for long-running producers;
- potential memory benefits in some workloads.

These **can** or **may** happen. They are not automatic.

## Trade-offs

Streaming also costs:

- more complex server implementation;
- more complex client consumption;
- partial-response failure scenarios;
- output framing requirements;
- harder debugging;
- harder testing;
- not every data format works naturally with streaming.

A complete JSON document is easier to parse and test than a custom chunk protocol.

## Streaming Does Not Automatically Make Work Faster

Streaming can make results available **sooner**.

It does not necessarily reduce the **total computation time**.

Example:

```text
Total task duration:
10 seconds

Without streaming:
nothing useful until second 10.

With streaming:
some useful information may arrive earlier.
```

Total computation may still take approximately the same amount of time. Streaming changes *when* pieces appear, not always *how long* the work takes.

## Streaming Does Not Mean Infinite Response

A stream can be **finite**.

```text
Chunk 1
Chunk 2
Chunk 3
close()
```

A stream does not have to remain open indefinitely. Many educational and production streams start, send a known sequence, and close.

## Streaming Does Not Mean Real-Time

Streaming can deliver data progressively. It does **not** automatically guarantee real-time communication semantics.

Real-time architecture is outside this lesson. Progressive HTTP chunks are not the same claim as “live, guaranteed low-latency messaging.”

## Security Considerations

Streamed data must follow the same security requirements as normal responses.

Never stream:

- secrets;
- credentials;
- unauthorized user data;
- internal sensitive debugging information.

Once a chunk has been sent, it cannot simply be “unsent” to the client. A leaked line in chunk 1 is already at the consumer. Authentication is not implemented here.

## Common Misconceptions

**"Streaming means WebSockets."**  
False. A streaming HTTP response is typically one request with a progressive body. WebSockets are bidirectional and persistent.

**"Streaming means Server-Sent Events."**  
False. SSE is one event-stream pattern. `ReadableStream` is a lower-level primitive.

**"Streaming is only for video."**  
False. Text, records, and other bodies can stream too.

**"Every API endpoint should stream."**  
False. Small, complete, immediately available responses often should not.

**"`ReadableStream` automatically makes computation faster."**  
False. It can deliver pieces earlier. Total work may stay the same.

**"Streaming and React Suspense are the same feature."**  
False. API streaming sends HTTP chunks. Suspense is UI progressive rendering.

**"Every chunk must be JSON."**  
False. Chunks can be plain text, JSON Lines, or other encodings.

**"A streaming response must stay open forever."**  
False. Streams can be finite and then `close()`.

**"`Response.json` is required for every API endpoint."**  
False. `new Response(stream)` is valid when the body is a stream.

**"Streaming removes the need to close the response."**  
False. A finite producer should close the stream when no more chunks will arrive.

**"Streaming automatically handles all error scenarios."**  
False. Failures after partial output are harder than returning one error response before the body starts.

## What We Are Not Learning Yet

These topics appear later or elsewhere:

- Redirects
- Server-Sent Events implementation
- WebSockets
- advanced backpressure
- stream cancellation
- `TransformStream`
- compression
- advanced HTTP headers
- Middleware
- authentication
- database streaming
- external API streaming
- AI provider streaming
- Server Actions

## Key Takeaways

1. **Response streaming** means sending an HTTP body progressively instead of waiting for the entire result first.
2. A **chunk** is one portion of that body.
3. A **complete response** waits and sends one body; a **streaming response** can send multiple chunks over time.
4. **`ReadableStream`** produces data over time and can be the `Response` body.
5. **`controller.enqueue()`** pushes another chunk into the stream.
6. **`controller.close()`** signals that no more chunks will be produced.
7. **`TextEncoder`** turns strings into byte chunks for the stream.
8. **`new Response(stream)`** uses the stream as the response body, unlike `Response.json` for one complete JSON document.
9. Streaming is more useful when data becomes available **incrementally**.
10. Normal **JSON** is one complete document; concatenating objects is not automatically valid JSON.
11. **JSON Lines** puts one complete JSON value per line so records can be processed incrementally.
12. Streaming **may** improve perceived responsiveness without necessarily reducing total computation time.
13. **API streaming** (Route Handler chunks) is not the same as **UI streaming** (`loading.tsx` / Suspense).
14. Streaming differs from **polling** (repeated requests), **WebSockets** (bidirectional), and **SSE** (an event-stream pattern).
15. Streaming adds implementation, framing, and error-handling complexity.
16. **Redirects** is the next separate roadmap topic.
