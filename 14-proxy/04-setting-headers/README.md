# Setting Headers in Proxy

The goal of this lesson is to understand how HTTP request and response headers can be read and modified inside modern Next.js Proxy. Headers are metadata that travel with a request or a response. Proxy can inspect incoming request headers and can influence request headers sent **upstream** or response headers sent **to the client**.

This lesson focuses only on headers. Internationalization and advanced HTTP security configuration are later topics. After this lesson, the Proxy section is complete.

## Overview

HTTP headers carry **metadata** associated with requests and responses.

Conceptual request:

```text
Client
↓
Request
├── Method
├── URL
├── Headers
└── Body
```

Conceptual response:

```text
Server
↓
Response
├── Status
├── Headers
└── Body
```

Proxy can inspect incoming request headers and can also influence request or response headers before processing continues. Metadata is not the body. A JSON payload is content. `Content-Type` is a header about that content.

## What Is an HTTP Header?

A **header** is a name-value pair carrying HTTP metadata.

Example:

```text
Accept-Language: en-US
```

Conceptually:

```text
name:
Accept-Language

value:
en-US
```

Headers are different from the response body. The body is the primary content. Headers describe or accompany that content.

## Request Headers

Request headers travel from the **client toward the server**.

Conceptual examples:

- `Accept`
- `Accept-Language`
- `User-Agent`
- `Authorization`

These are not taught individually in depth. Headers can contain both **standard** and **custom** information. A client can send `Accept: application/json` or `x-example: hello`.

## Response Headers

Response headers travel from the **server back to the client**.

Conceptual examples:

- `Content-Type`
- `Cache-Control`
- `Location`

Caching and redirects are not re-taught here. The goal is only to distinguish **response metadata** from **request metadata**. The same word “header” applies in both directions. The **direction** is what changes.

## Headers in NextRequest

`NextRequest` exposes incoming headers through `request.headers`.

```ts
export function proxy(request: NextRequest) {
  const language =
    request.headers.get("accept-language");

  // ...
}
```

`request.headers` follows the standard Web **Headers** API. Names are looked up with `get()`. Missing names return `null`.

## headers.get()

```ts
const value =
  request.headers.get("x-example");
```

- Header exists → returns its value.
- Header does not exist → returns `null`.

HTTP header names are **case-insensitive** conceptually. `Accept-Language` and `accept-language` refer to the same header.

## Reading a Request Header

```ts
const userAgent =
  request.headers.get("user-agent");
```

Proxy can inspect request metadata **before** the route executes. This lesson does not parse the User-Agent value and does not build bot detection. Reading is enough.

## Headers Are Client-Controlled Input

This security principle is essential.

Many incoming request headers can be **manipulated by the client**.

Therefore `request.headers.get(...)` must **not** automatically be trusted.

Example: `x-role: admin` does **not** mean the requester is an administrator.

Never implement authorization based only on an arbitrary custom header. A header is a string the client offered, not a verified permission.

## Headers Object

The standard Web API is `Headers`.

```ts
const headers = new Headers();

headers.set(
  "x-example",
  "value"
);
```

`Headers` represents a collection of HTTP headers. Proxy typically starts from the incoming collection and, when needed, copies it before changing it.

## Cloning Request Headers

Request headers should be **copied** before modification.

```ts
const requestHeaders =
  new Headers(request.headers);
```

- `request.headers` → incoming header collection.
- `new Headers(request.headers)` → **mutable copy**.

Mutate the copy. Do not assume the original incoming object is the one you pass upstream.

## Setting a Request Header

```ts
const requestHeaders =
  new Headers(request.headers);

requestHeaders.set(
  "x-request-source",
  "proxy"
);
```

This modifies the **copied** header collection.

This alone does **not** yet pass the modified headers to the application. The copy must be attached to `NextResponse.next(...)` using the **request** option.

## Passing Modified Request Headers Upstream

This is one of the most important sections.

```ts
const response = NextResponse.next({
  request: {
    headers: requestHeaders,
  },
});

return response;
```

```text
requestHeaders
↓
NextResponse.next(...)
↓
modified request metadata becomes available upstream
```

Conceptually:

```text
Client Request
↓
Proxy
↓
modify request headers
↓
Application route receives modified request context
```

The application sees `x-request-source` as part of the **incoming request**, not as a header on the browser’s response—unless you also put it on the response by mistake.

## Meaning of Upstream

In this lesson, **upstream** means the next server-side part of the application that receives the request **after** Proxy.

```text
Proxy
↓
Page / Server Component / Route Handler
```

This is not networking architecture theory. Upstream is “the route that runs next.”

## Important API Distinction

**Correct when modifying the request:**

```ts
NextResponse.next({
  request: {
    headers: requestHeaders,
  },
});
```

**Versus a different behavior:**

```ts
NextResponse.next({
  headers: requestHeaders,
});
```

- The **`request.headers`** option forwards headers **upstream as request headers**.
- The **top-level `headers`** option places headers on the **outgoing response**.

This distinction must stay explicit. Nesting under `request` is the request path. The top-level `headers` key is the client-facing response path.

## Why This Distinction Matters

Intent: “Pass `x-request-id` to server-side route logic.”

Desired: **request** header.

Not: **response** header exposed to the browser.

Accidentally placing internal request metadata on a response can expose information unnecessarily. A tracing id meant for server logs is not automatically safe to show to every client.

Documentation comparison (not an executable insecure example):

```ts
// Correct for upstream request headers:
NextResponse.next({
  request: {
    headers: requestHeaders,
  },
});

// Different behavior — headers go on the outgoing response
// and can be exposed to the client:
NextResponse.next({
  headers: requestHeaders,
});
```

## Setting Response Headers

```ts
const response =
  NextResponse.next();

response.headers.set(
  "x-example-response",
  "hello"
);

return response;
```

`response.headers` modifies metadata sent **back toward the client**. The browser or HTTP client can observe those names and values.

## Request Header vs Response Header

| Type | Direction |
| --- | --- |
| Request header | Client / Proxy → application |
| Response header | Application / Proxy → client |

Proxy can participate in **both** directions. Same `Headers` API. Opposite destinations.

## Reading Before Writing

```ts
const existing =
  request.headers.get("x-example");
```

Proxy can inspect existing values before deciding whether a modified value should be introduced. Complicated merge logic is not implemented here. Read first; then decide.

## headers.set()

`headers.set(name, value)` sets the header value.

If the header already exists, the existing value is **replaced**. Keep this basic: `set` overwrites.

## headers.append()

`Headers` also provides `append()`.

Conceptually:

- `set()` → replace/set value.
- `append()` → add another value.

`append()` is not used in the required examples.

## headers.delete()

Conceptually:

```ts
headers.delete("x-example");
```

removes a header from a mutable `Headers` object. This is not included in the required example files.

## Custom Headers

Applications commonly use custom headers with names such as:

- `x-request-id`
- `x-internal-source`

The `x-` prefix is a common **naming convention**, not a security mechanism. Custom headers are still ordinary HTTP metadata. Anyone who can send a request can send `x-internal-source`.

## Internal Request Metadata

Proxy may attach metadata needed by later server-side processing.

```text
Incoming request
↓
Proxy
↓
x-request-source: proxy
↓
Route Handler
```

This stays educational. Tracing infrastructure is not built here.

## Request IDs

Request IDs can help correlate requests across server logs or services.

This is a use-case example only. This lesson does not generate UUIDs and does not implement distributed tracing.

## Response Metadata

Proxy can add response metadata.

```ts
response.headers.set(
  "x-proxy-processed",
  "true"
);
```

Clients can observe response headers unless other infrastructure removes them. Therefore do **not** expose sensitive internal information on the response.

## Sensitive Headers

Some headers may contain sensitive information.

Conceptual examples:

- `Authorization`
- internal tokens
- private infrastructure metadata

Do **not** copy sensitive request headers into response headers. This is a critical security rule. What arrived for the server is not automatically safe to echo back.

## Authorization Header

`Authorization` is a request header commonly used to carry credentials.

This lesson does not implement Bearer authentication, parse JWTs, or build authorization.

Credentials must be handled carefully and must **not** be reflected back to clients.

## Forwarding All Request Headers

Blindly forwarding headers to another **external** service can be dangerous.

Potential problems:

- credential leakage;
- internal metadata leakage;
- unexpected behavior.

Prefer deliberate **allowlisting** when forwarding headers outside the application. External fetches are not implemented here.

## Request Headers and Routes

```text
Client
↓
request headers
↓
Proxy
↓
modified request headers
↓
Route Handler / server logic
```

The destination route can use the modified server-side request context. A destination route is not implemented in this lesson.

## Response Headers and Browser

```text
Proxy
↓
response.headers.set(...)
↓
Response
↓
Browser / client
```

These headers belong to the HTTP **response**. They are client-visible unless something later strips them.

## Header Size

Headers should remain reasonably small.

Large headers can cause web server or infrastructure errors.

`431 Request Header Fields Too Large` is an example status for that class of problem.

HTTP limits are not taught in depth. Arbitrary byte limits are not listed because they vary by infrastructure.

## Avoid Large Header Payloads

Headers are intended for **metadata**, not large application payloads.

Do **not** put these inside headers:

- large JSON documents;
- binary files;
- large user profiles;
- large serialized application state.

Use the response body or appropriate storage instead.

## Headers vs Cookies

The previous lesson used dedicated cookie APIs.

Cookies are represented through HTTP headers:

- incoming: `Cookie`
- outgoing: `Set-Cookie`

Next.js provides dedicated cookie APIs because cookie handling has its own semantics. Cookies are not re-taught here.

## Headers vs Body

```text
Headers
→ metadata.

Body
→ primary request or response content.
```

Example:

- `Content-Type` → header.
- JSON payload → body.

## Headers vs URL

Headers can carry metadata that should not necessarily be encoded into the URL.

Do **not** treat headers as hidden security simply because they are not visible in the address bar. Clients can still control many request headers.

## Proxy Request Header Example

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders =
    new Headers(request.headers);

  requestHeaders.set(
    "x-request-source",
    "proxy"
  );

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
```

Steps:

1. Copy incoming headers.
2. Set `x-request-source` on the copy.
3. Pass the copy under `request.headers` so **upstream** sees it.
4. Continue the request.

The custom header is request metadata for the application, not a client-facing response field in this example.

## Proxy Response Header Example

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(_request: NextRequest) {
  const response =
    NextResponse.next();

  response.headers.set(
    "x-proxy-processed",
    "true"
  );

  return response;
}
```

This value is part of the **outgoing response** metadata. A client may see `x-proxy-processed: true`.

## Both Request and Response Headers

```text
Request
↓
Proxy
├── add request header
└── add response header
↓
Application / client
```

These operate in **different directions** even though both use header APIs. One copy goes upstream. One set goes to the client. A combined example file is not required.

## When Setting Request Headers May Be Useful

Conceptual examples:

- internal request classification;
- request tracing metadata;
- passing Proxy-derived context to server-side logic.

Tracing systems are not implemented here.

## When Setting Response Headers May Be Useful

Conceptual examples:

- simple diagnostic metadata;
- cache metadata;
- security policy metadata;
- custom application response metadata.

Caching and security headers are not taught in depth.

## Headers and Logging

Headers may be useful in server-side observability.

Do **not** log secrets or credentials. An external logging system is not implemented here.

## Headers and Security

Several principles:

1. Treat incoming headers as **untrusted** unless verified.
2. Do not expose sensitive **internal** headers to clients.
3. Do not **reflect** arbitrary incoming header values into outgoing responses without validation.
4. Do not store large application state in headers.
5. Do not rely on custom headers **alone** as authorization.

## Header Reflection

Dangerous pattern, conceptually:

```text
incoming:
x-user-input

outgoing:
x-user-input
```

Blindly copying arbitrary client input into a response can create unwanted behavior. This stays conceptual. An insecure executable example is not created.

## Proxy and Security Headers

Proxy can participate in setting security-related response headers.

Conceptual examples:

- `Content-Security-Policy`
- `X-Content-Type-Options`

These headers are **not** taught here. Advanced security header configuration is outside this lesson.

## Proxy and CORS

Headers are central to CORS.

This lesson does **not** teach `Access-Control-Allow-Origin`, preflight requests, or CORS policies. CORS is outside this roadmap lesson.

## Static Header Configuration vs Proxy

**Static**, predictable response headers may sometimes be configured elsewhere.

**Request-dependent** header decisions may justify Proxy.

`next.config` headers configuration is not taught here.

## Do Not Use Proxy Without a Reason

If a header can be set more locally and clearly in a Route Handler, that may be preferable.

Proxy should be used when request-level behavior needs to happen **before** routes execute or across relevant route scopes.

## Common Misconceptions

**"Request headers and response headers are the same."**  
False. They travel in opposite directions. Request goes toward the application. Response goes toward the client.

**"`NextResponse.next({ headers })` modifies the upstream request."**  
False. Top-level `headers` go on the **outgoing response**. Use `request: { headers }` for upstream request headers.

**"All incoming headers are trustworthy."**  
False. Many request headers are client-controlled.

**"Custom `x-` headers are automatically secure."**  
False. The prefix is a naming habit, not a lock.

**"Headers are a good place for large JSON payloads."**  
False. Headers are metadata. Large payloads belong in the body or storage.

**"Authorization should rely only on `x-role`."**  
False. A custom role header is not verified identity.

**"Proxy must set headers for every request."**  
False. Use Proxy when a request-level header decision is actually needed.

**"Cookies and headers have nothing to do with each other."**  
False. Cookies travel via `Cookie` / `Set-Cookie`. Dedicated cookie APIs exist because cookies have extra semantics.

**"Response headers are invisible to clients."**  
False. Clients can observe response headers unless something strips them.

**"Large headers have no infrastructure cost."**  
False. Oversized headers can fail at servers or proxies (`431` is one example).

**"Forwarding every header to external systems is always safe."**  
False. Credentials and internal metadata can leak.

## What We Are Not Learning Yet

These topics appear later or elsewhere:

- Internationalization
- CORS
- CSP implementation
- advanced security headers
- JWT
- authentication
- authorization
- distributed tracing
- external service header forwarding
- `next.config` headers
- Server Actions
- Proxy testing

## Key Takeaways

1. HTTP **headers** are name-value metadata, not the request or response body.
2. **Request** headers go toward the application; **response** headers go toward the client.
3. **`request.headers`** is the incoming Web Headers collection.
4. **`headers.get(name)`** returns the value or `null`.
5. Clone with **`new Headers(request.headers)`** before modifying.
6. The copy is mutable; the incoming collection is the source to copy from.
7. **`headers.set(name, value)`** sets or replaces a header.
8. Modified request headers are passed **upstream** with `NextResponse.next({ request: { headers } })`.
9. That `request` option is how the next page or Route Handler sees the new request metadata.
10. **`NextResponse.next({ headers })`** (top-level) puts headers on the **client-facing response**, not the upstream request.
11. **`response.headers.set()`** adds outgoing response metadata.
12. Incoming headers are **untrusted** client input.
13. Sensitive headers must **not** be reflected to clients.
14. Headers should stay **small**; they are not payload storage.
15. Headers are **metadata**; large JSON belongs in the body.
16. Setting Headers **completes** the Proxy subtopics on this roadmap.
