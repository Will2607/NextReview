# Redirects

The goal of this lesson is to understand HTTP redirects in Next.js Route Handlers. An HTTP endpoint does not always return data. Sometimes the server tells the client to request another URL instead. That instruction is a **redirect**.

This lesson focuses only on redirects. Structuring Routes, Middleware, and `next.config` redirects are later topics.

## Overview

An HTTP endpoint does not always return data.

Sometimes the server tells the client to request another URL instead.

Conceptual flow:

```text
Client
↓
GET /api/old-location
↓
Server
↓
Redirect response
↓
Client follows destination
↓
GET /api/new-location
```

This is an **HTTP redirect**. The first response is not the resource. It is directions to another location.

## What Is an HTTP Redirect?

A **redirect** is an HTTP response that indicates that the requested resource should be obtained from another location.

```text
Original URL
↓
3xx response
↓
Destination URL
↓
Client requests destination
```

Redirects are represented through HTTP status codes in the **3xx** family. This lesson does not teach the entire HTTP specification. The 3xx codes below are the ones needed to reason about Route Handler redirects.

## Redirect Response

A redirect response contains:

- a 3xx HTTP status;
- a destination;
- normally a **`Location`** response header.

Conceptually:

```text
HTTP/1.1 307 Temporary Redirect
Location: /api/new-location
```

HTTP headers are a later roadmap topic. This lesson only explains **`Location`** because it is essential to redirects: it names the destination URL the client should use next.

## Source and Destination

**Source:** the URL originally requested.

**Destination:** the URL the client should navigate to.

Example:

```text
Source:
/api/legacy

Destination:
/api/current
```

Flow:

```text
/api/legacy
↓
redirect
↓
/api/current
```

The source is what arrived. The destination is where the client should go.

## Temporary vs Permanent Redirects

Two broad categories:

**Temporary:** the original URL may still be valid in the future.

**Permanent:** the resource is intended to live at the new location permanently.

```text
Temporary
→ "Use this other URL for now."

Permanent
→ "This resource has moved."
```

Temporary means “try this destination this time.” Permanent means “update your map; the old location is not the home of this resource anymore.”

## Important Status Codes

| Status | Meaning |
| --- | --- |
| 301 | Moved Permanently |
| 302 | Found / Temporary Redirect |
| 307 | Temporary Redirect |
| 308 | Permanent Redirect |

All four are redirect status codes, but their **request-method semantics** differ. The next sections separate historical codes from method-preserving codes.

## 301 vs 308

**301** is the traditional permanent redirect.

**308** is a permanent redirect that **preserves the HTTP method and request body**.

Conceptual example:

```text
POST /old
↓
308
↓
POST /new
```

Next.js commonly uses **308** for permanent redirects because preserving the method avoids changing the request semantics. A `POST` stays a `POST`. This lesson does not go deeply into historical browser behavior.

## 302 vs 307

**302** is the traditional temporary redirect.

**307** is a temporary redirect that **explicitly preserves the HTTP method and request body**.

Conceptual example:

```text
POST /old
↓
307
↓
POST /new
```

**307** removes ambiguity about method preservation. The client should repeat the same method at the destination.

## Why Method Preservation Matters

Example:

```text
POST /api/orders
```

contains order data.

If redirected:

```text
POST /api/orders
↓
redirect
↓
/api/new-orders
```

Preserving `POST` may be essential. Changing `POST` into `GET` could change the meaning of the operation. The destination would no longer receive the same kind of request. Method-preserving redirects (`307`, `308`) keep that meaning.

## GET Redirect Example

```text
GET /api/legacy
↓
307
↓
GET /api/current
```

With `GET` requests, method-preservation differences may not be as visually obvious. The method was already `GET`. The semantics are still important: the redirect should not silently rewrite a non-GET method into `GET` in other cases.

## Response.redirect()

The standard Web `Response` API provides **`Response.redirect()`**.

```ts
export async function GET(request: Request) {
  const destination = new URL("/api/current", request.url);

  return Response.redirect(destination, 307);
}
```

- `request.url` provides an absolute URL base.
- `new URL(...)` constructs the redirect destination.
- `Response.redirect(...)` creates the redirect response.

This stays focused on redirects. The second argument is the status code.

## Why Use new URL()

`Response.redirect` requires a valid URL destination.

When working from the current request, a relative path can be resolved against `request.url`.

```ts
new URL("/api/current", request.url)
```

Conceptually:

```text
Current request:
https://example.com/api/legacy

Relative destination:
/api/current

Resolved:
https://example.com/api/current
```

The relative path becomes an absolute destination on the same origin as the incoming request.

## Temporary Redirect with Response.redirect()

```ts
export async function GET(request: Request) {
  const destination = new URL("/api/current", request.url);

  return Response.redirect(destination, 307);
}
```

**307** communicates a temporary redirect and preserves the request method.

## Permanent Redirect with Response.redirect()

```ts
export async function GET(request: Request) {
  const destination = new URL("/api/v2", request.url);

  return Response.redirect(destination, 308);
}
```

**308** communicates permanent movement while preserving the method.

## Next.js redirect()

Next.js provides **`redirect()`** as a higher-level redirect utility:

```ts
import { redirect } from "next/navigation";
```

```ts
import { redirect } from "next/navigation";

export async function GET() {
  redirect("/api/current");
}
```

`redirect()` **terminates the current control flow** by initiating a redirect. It is not described here as returning a normal `Response` value.

## redirect() Does Not Behave Like a Normal Return

This distinction is important.

Incorrect mental model:

```ts
return redirect("/api/current");
```

Preferred conceptual model:

```ts
redirect("/api/current");
```

`redirect()` does not behave like an ordinary value-producing helper. It **interrupts** the current control flow. Implementation details stay high level: after `redirect()`, later statements in that path are not treated as normal continuation.

## redirect() and Errors

`redirect()` internally interrupts control flow.

Because of that, code should not casually treat it like a normal function result. This is not a full error-handling lesson and does not repeat `error.tsx`.

## redirect() and try/catch

`redirect()` should generally **not** be placed where a broad `catch` block would incorrectly catch the redirect control-flow signal.

Conceptual pattern:

```ts
try {
  // Perform work that may fail.
} catch (error) {
  // Handle actual failure.
}

redirect("/dashboard");
```

Keep `redirect()` outside the `catch` that handles real failures. This pattern becomes particularly relevant in mutation workflows. **Server Actions are outside this lesson.**

## permanentRedirect()

```ts
import { permanentRedirect } from "next/navigation";
```

```ts
import { permanentRedirect } from "next/navigation";

export async function GET() {
  permanentRedirect("/api/v2");
}
```

`permanentRedirect()` represents a **permanent** redirect. In normal Next.js usage it uses HTTP **308** semantics.

## redirect() vs permanentRedirect()

| Function | Intent |
| --- | --- |
| `redirect()` | Temporary redirect |
| `permanentRedirect()` | Permanent redirect |

```text
redirect()
→ destination may change later.

permanentRedirect()
→ destination represents a permanent move.
```

This lesson does not introduce configuration-based redirects.

## Response.redirect() vs Next.js redirect()

| API | Level |
| --- | --- |
| `Response.redirect()` | Standard Web API |
| `redirect()` | Next.js utility |
| `permanentRedirect()` | Next.js utility |

Route Handlers can work with standard `Response` APIs. Next.js also provides framework-level navigation utilities. Neither is always superior. Choose the API that matches the surrounding code: Web `Response` when returning a response object; Next.js helpers when using the framework redirect control flow.

## Returning Data vs Redirecting

Data response:

```ts
return Response.json({
  status: "ok",
});
```

Redirect response:

```ts
return Response.redirect(destination, 307);
```

```text
Data response
→ client receives content.

Redirect response
→ client is instructed to use another URL.
```

One delivers a body. The other delivers a new location.

## Redirect vs Link

**Link:** the user chooses navigation.

**Redirect:** the server or application routing logic instructs navigation to another destination.

This lesson does not teach `next/link`. A link is a choice in the UI. A redirect is an HTTP instruction.

## Redirect vs Rewrite

**Redirect:** the browser or client is sent to another URL.

```text
/old
↓
redirect
↓
/new
```

**Rewrite:** the request may be internally handled elsewhere while the visible URL may remain unchanged.

**Rewrites are outside this lesson.** They are not implemented here. Remember only: a redirect changes the client’s destination URL; a rewrite does not have to.

## Internal Redirects

Example:

```text
/api/v1/status
↓
/api/v2/status
```

Both URLs belong to the same application.

```ts
new URL("/api/v2/status", request.url)
```

The destination is an internal path resolved against the current request origin.

## External Redirects

Redirects can also target another origin.

Conceptually:

```text
https://example.com
↓
https://docs.example.com
```

```ts
return Response.redirect(
  "https://docs.example.com",
  307
);
```

External destinations require greater security care when **any portion of the destination comes from user input**. A hardcoded docs URL is one thing. A query parameter named `to` is another.

## Open Redirect Vulnerability

An **open redirect** happens when the application trusts a destination it does not control.

Unsafe conceptual flow:

```text
GET /api/redirect?to=https://malicious.example
↓
application trusts to
↓
user redirected to attacker-controlled location
```

Potential risks include:

- phishing;
- misleading trusted links;
- redirect abuse.

The user thinks they are staying on a trusted application. The application sends them elsewhere.

## Do Not Blindly Trust Redirect Destinations

Incorrect (documentation only — do not use):

```ts
// Incorrect:
// const destination = url.searchParams.get("to");
// return Response.redirect(destination);
```

This is unsafe if arbitrary external URLs are accepted. `to` is untrusted input. Using it as `Location` can create an open redirect. There is no executable example of this pattern in this lesson’s `examples/` folder.

## Safer Redirect Destinations

Simple strategies, conceptually:

- use predefined destinations;
- allow only internal paths;
- validate allowed origins;
- use an allowlist when appropriate.

This lesson does not create a full security validation framework. The rule is: the application should decide the destination, not an arbitrary string from the client.

## Internal Path Example

```ts
const routes = {
  docs: "/docs",
  home: "/",
};
```

A known key determines the destination. Predefined, application-controlled destinations are easier to reason about safely. The client might send `docs`. The application maps that to `/docs`. The client does not supply `https://malicious.example`.

## Redirect Loops

```text
/a
↓
redirect to /b

/b
↓
redirect to /a
```

Result: a **redirect loop**. The destination is unreachable. The client keeps following redirects and never settles.

Another example:

```text
/old
↓
redirect to /old
```

That is also invalid behavior. A source must not redirect to itself.

## Redirect Chains

```text
/old
↓
/older
↓
/new
↓
/current
```

This is a **redirect chain**. Unnecessary chains add additional requests and complexity. Prefer redirecting **directly** to the intended destination when possible: `/old` → `/current`, not a tour of retired URLs.

## Permanent Redirect Caution

Permanent redirects should be chosen **deliberately**.

Browsers, clients, intermediaries, and search engines may treat a permanent move differently from a temporary move. They may remember the new location.

Do not use `permanentRedirect()` merely because the destination works today. Use it when the move is intended to be permanent.

## Redirects and APIs

API consumers may react differently to redirects.

Browsers commonly follow redirects automatically.

Other HTTP clients may:

- follow automatically;
- expose the redirect response;
- require configuration.

This lesson does not teach specific HTTP libraries. Do not assume every consumer behaves like a browser.

## Redirect Responses Do Not Return Business Data

If an endpoint redirects, the purpose of that response is to **direct the client elsewhere**.

Do not expect the redirect response itself to behave like a normal JSON business response. `{ "status": "ok" }` and `Location: /api/current` are different kinds of answers.

## Redirect After an Operation

Conceptually:

```text
Request
↓
operation succeeds
↓
redirect to another location
```

Example:

```text
Submit operation
↓
success
↓
redirect to resource page
```

This stays conceptual. Server Actions and form handling are not introduced.

## Redirect Before Expensive Work

If the application already knows a request should go elsewhere, it may be preferable to redirect **before** unnecessary processing.

```text
Old endpoint requested
↓
known replacement exists
↓
redirect immediately
```

This is a conceptual preference, not a performance guarantee.

## Redirect Status Selection

Educational decision model:

```text
Is the destination intended to be permanent?

Yes
↓
Should the request method be preserved?
↓
308 is a common modern choice.

No
↓
Temporary redirect
↓
307 is a common method-preserving choice.
```

**301** and **302** remain important HTTP redirect codes, but **307** and **308** provide explicit method-preservation semantics.

This is an educational model rather than the complete HTTP specification.

## Status Code Summary

```text
301
→ permanent
→ historical method behavior can differ between clients

302
→ temporary
→ historical method behavior can differ between clients

307
→ temporary
→ preserves method and body

308
→ permanent
→ preserves method and body
```

Keep 307/308 as the method-preserving pair. Keep 301/302 as the traditional pair whose method behavior can vary by client.

## Redirects and Browser Address Bar

**Redirect:** the destination becomes the navigated URL.

```text
Request:
/old

Redirect destination:
/new

After following redirect:
browser location:
/new
```

The client ends on `/new`. Rewrites are not discussed further.

## Redirects and SEO

This lesson is about API endpoints, so SEO stays brief.

A **permanent** redirect signals that a resource has moved permanently.

A **temporary** redirect signals that the move is temporary.

This is not an SEO lesson.

## When Redirects May Be Useful

Examples:

- old API locations;
- renamed routes;
- migrated resources;
- canonical destinations;
- temporary route changes;
- routing after successful operations.

These stay conceptual. A redirect expresses “this request should continue at another URL.”

## When Redirects May Be Unnecessary

Examples:

- normal successful JSON responses;
- client-side UI changes that do not involve navigation;
- errors that should instead return an appropriate HTTP error;
- situations where the original URL should continue serving the resource.

Redirects should express actual navigation or location semantics. They are not a generic “something happened” response.

## Redirect vs Error Response

| Situation | Typical response |
| --- | --- |
| Resource moved | redirect |
| Invalid request | 400-style error response |
| Resource missing | 404-style response |
| Server failure | 500-style response |

Redirects should **not** be used as generic error handling. A bad body is not “moved.” A crash is not a new `Location`.

## Security Considerations

Never blindly redirect to arbitrary user-controlled URLs.

Potential inputs that need care:

- query parameters;
- request body values;
- dynamic parameters;
- externally supplied URLs.

```text
Validate destination
before
performing redirect
```

Authentication is not implemented in this lesson. Untrusted destination strings are still untrusted.

## Common Misconceptions

**"Every redirect should use 301."**  
False. 301 is permanent. Temporary moves should not pretend to be permanent. Method semantics also differ.

**"302 and 307 are exactly identical."**  
False. 307 explicitly preserves method and body. 302’s historical method behavior can differ between clients.

**"301 and 308 are exactly identical."**  
False. 308 is the method-preserving permanent redirect. 301 is the traditional permanent code.

**"Redirecting means returning JSON with a URL."**  
False. A redirect is a 3xx response with a destination, typically `Location`. It is not a JSON body that happens to contain a link.

**"`redirect()` returns a normal value that should always be returned."**  
False. `redirect()` interrupts control flow. It should not be treated like a normal returned data value.

**"`permanentRedirect()` should be used whenever a route currently has a new destination."**  
False. Use it when the move is intended to be permanent, not merely because a new path works today.

**"Redirects and rewrites are the same thing."**  
False. A redirect sends the client to another URL. A rewrite may handle the request internally without changing the visible URL.

**"A redirect always keeps the original URL visible."**  
False. After a redirect, the destination typically becomes the navigated URL.

**"Every HTTP client follows redirects in exactly the same way."**  
False. Browsers often follow automatically. Other clients may not, or may need configuration.

**"Any user-provided redirect URL is safe."**  
False. Arbitrary destinations can create open redirects.

**"Redirect loops are harmless."**  
False. Loops make the destination unreachable.

## What We Are Not Learning Yet

These topics appear later in the roadmap:

- Structuring Routes
- Middleware
- Route Matcher
- Using Cookies
- Setting Headers as a dedicated topic
- Middleware use cases
- redirects configured in `next.config`
- rewrites implementation
- authentication redirects
- internationalization redirects
- Server Actions
- Proxy
- advanced SEO

## Key Takeaways

1. An **HTTP redirect** tells the client to obtain the resource from another location.
2. A **3xx** response is the HTTP family used for redirects.
3. **Source** is the original URL; **destination** is where the client should go.
4. **`Location`** names that destination on the redirect response.
5. **Temporary** means the original URL may still be valid later; **permanent** means the resource has moved.
6. **301** is Moved Permanently (traditional permanent redirect).
7. **302** is Found / temporary redirect (traditional temporary redirect).
8. **307** is Temporary Redirect and preserves method and body.
9. **308** is Permanent Redirect and preserves method and body.
10. **307** and **308** are the method-preserving pair; Next.js commonly uses 308 for permanent redirects.
11. **`Response.redirect()`** builds a redirect `Response` from a destination URL and status.
12. Next.js **`redirect()`** is a temporary redirect utility that interrupts control flow.
13. **`permanentRedirect()`** is a permanent redirect utility with 308 semantics in normal Next.js usage.
14. **`redirect()`** should not be treated like a normal returned value.
15. A **redirect** changes the client URL; a **rewrite** may keep the visible URL (rewrites are out of scope).
16. **Loops** bounce forever; **chains** stack extra hops—prefer a direct destination.
17. Arbitrary user-controlled destinations can create **open redirect** vulnerabilities.
18. Permanent redirects should be chosen **deliberately**.
19. **Structuring Routes** is a separate upcoming roadmap topic.
