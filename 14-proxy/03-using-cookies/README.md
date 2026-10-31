# Using Cookies in Proxy

The goal of this lesson is to understand how cookies can be read and modified inside Next.js Proxy using `NextRequest` and `NextResponse`. Cookies are small name-value data that travel with HTTP requests and responses. Proxy can inspect incoming cookies and attach cookie instructions to the outgoing response.

This lesson focuses only on cookies. Setting Headers is a later Proxy topic.

## Overview

Cookies are small pieces of data associated with HTTP requests and responses.

```text
Browser
↓
Cookie stored
↓
Request
↓
Cookie sent to server
↓
Proxy reads cookie
```

And:

```text
Proxy
↓
Response
↓
Set-Cookie instruction
↓
Browser stores or updates cookie
```

Next.js exposes cookie helpers through:

- `request.cookies`
- `response.cookies`

`request.cookies` describes what arrived. `response.cookies` describes what the browser should store or remove after this response.

## What Is a Cookie?

A **cookie** is a small name-value piece of data associated with HTTP communication.

Example:

```text
theme=dark
```

Conceptually:

```text
name:
theme

value:
dark
```

Cookies can represent things such as:

- user preferences;
- temporary state;
- session identifiers;
- feature choices.

A cookie itself is **not** automatically secure or authenticated data. The browser sent a string. That string is input until the application treats it carefully.

## Cookies in HTTP

Conceptually:

- Incoming request cookies → carried in the **Cookie** request header.
- Outgoing cookies → communicated through **Set-Cookie** response headers.

HTTP headers are not taught in depth here. Setting Headers is a later roadmap topic. This relationship only helps explain cookies: the request carries what the browser already has; the response can tell the browser to change that store.

## Cookies in NextRequest

`NextRequest` provides `request.cookies` for reading and manipulating cookies associated with the incoming request.

```ts
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const theme = request.cookies.get("theme");

  // ...
}
```

`get()` returns cookie information when the cookie exists.

## request.cookies.get()

```ts
const theme = request.cookies.get("theme");
```

If the Cookie header contains `theme=dark`, then `request.cookies.get("theme")` can provide a cookie object representing:

```text
name:
theme

value:
dark
```

If the cookie does **not** exist, `get()` returns `undefined`.

## Reading the Cookie Value

```ts
const theme = request.cookies.get("theme");

const value = theme?.value;
```

Optional chaining is useful because:

- Cookie may exist → value available.
- Cookie may not exist → `undefined`.

Do not assume `theme` is always an object.

## request.cookies.has()

```ts
const hasTheme = request.cookies.has("theme");
```

- `true` → cookie exists.
- `false` → cookie does not exist.

Use this for simple existence checks when the value is not needed yet.

## request.cookies.getAll()

`getAll()` returns cookies associated with the request.

```ts
const allCookies = request.cookies.getAll();
```

This can be useful for inspection or debugging. Do **not** dump sensitive cookie values into logs in production. A session identifier in a log is still a sensitive value.

## Request Cookies vs Response Cookies

This distinction is essential.

**Request cookies** (`request.cookies`) represent cookies that arrived with the incoming request.

**Response cookies** (`response.cookies`) represent cookies being attached to the outgoing response.

```text
Request
↓
request.cookies
↓
Proxy logic
↓
response.cookies
↓
Response
```

Reading is about what the browser already sent. Setting or deleting is about what the browser should do next.

## Creating a Response Before Setting a Cookie

```ts
const response = NextResponse.next();

response.cookies.set(
  "theme",
  "dark"
);

return response;
```

- `NextResponse.next()` creates the response that continues normal request processing.
- `response.cookies.set()` adds a cookie to the outgoing response.

The function must return **that** response. Creating a cookie on one object and returning a different `NextResponse.next()` would drop the cookie instruction.

## response.cookies.set()

```ts
response.cookies.set(
  "theme",
  "dark"
);
```

```text
name:
theme

value:
dark
```

The client can receive the cookie through the response. After a successful store, later requests may include `theme=dark`.

## Setting Cookie Options

Object syntax allows additional cookie options:

```ts
response.cookies.set({
  name: "theme",
  value: "dark",
  path: "/",
});
```

This lesson introduces only:

- `path`
- `httpOnly`
- `secure`
- `sameSite`
- `maxAge`

Not every possible cookie attribute is covered.

## path

`path` determines which URL paths should receive the cookie.

`path: "/"` means the cookie applies broadly across the application.

`path: "/dashboard"` restricts cookie scope to that path area.

Keep this basic: path is a **scope** attribute, not a redirect.

## httpOnly

`httpOnly: true` means browser-side JavaScript cannot directly read that cookie through normal `document.cookie` access.

This is commonly useful for security-sensitive cookies such as session identifiers. Authentication is **not** implemented in this lesson. The flag limits script access; it does not encrypt the value.

## secure

`secure: true` instructs the browser to send the cookie only over secure **HTTPS** connections.

This is normally important for sensitive cookies in production. TLS is not taught here. The flag is about **when the cookie may travel**, not about encrypting the cookie string itself.

## sameSite

`sameSite` is a browser control for when cookies may accompany **cross-site** requests.

Common values, conceptually:

- `lax`
- `strict`
- `none`

This stays introductory. CSRF is not taught in depth. `sameSite` influences sending behavior; it does not replace authentication.

## maxAge

`maxAge` defines how long a cookie may remain valid, expressed in **seconds**.

```ts
maxAge: 60 * 60
```

means approximately one hour. After that lifetime, the browser should no longer treat the cookie as valid.

## Session Cookies vs Persistent Cookies

A **session-like** cookie does not explicitly persist for a long configured lifetime.

A **persistent** cookie uses lifetime information such as `maxAge`.

Browser storage internals are not taught here. The distinction is whether a lifetime was declared.

## Deleting Cookies

Response cookies can be removed using `response.cookies.delete("theme")`.

```ts
const response = NextResponse.next();

response.cookies.delete("theme");

return response;
```

The outgoing response instructs the browser to **remove** that cookie. Later requests should no longer include it, if the delete is accepted.

## request.cookies.delete()

`NextRequest` cookies can also be manipulated at the request abstraction level.

The important distinction: changing `request.cookies` does **not** itself mean the browser permanently deletes or updates its stored cookie.

To communicate a cookie change back to the browser, the **outgoing response** must carry the appropriate cookie instruction. Request-object edits are local to this request’s view. Response cookies talk to the client.

## Cookie Preference Example

A simple preference:

```text
theme
```

Incoming request:

```text
theme=dark
```

Proxy:

```ts
const theme = request.cookies.get("theme");
```

If present, request-level logic can inspect the preference. Theme **rendering** is not implemented here. Proxy only sees the string.

## Cookie Initialization Example

```text
Request arrives
↓
theme cookie exists?
├── Yes → continue
└── No
    ↓
    create response
    ↓
    set theme=light
    ↓
    return response
```

Proxy can initialize simple request-related preferences. The first visit without `theme` can receive a default.

## Cookie-Based Feature Preference

Conceptually:

```text
feature-preview=true
```

Proxy could inspect this value and decide how a request is handled. Complex feature flags are not implemented. This is not combined with authentication.

## Cookies Are Client-Supplied Input

This is an important security principle.

Incoming cookies **can be modified by the client**.

Therefore `request.cookies.get(...)` must **not** automatically be trusted as authoritative.

Example: `role=admin` must **not** automatically mean the user is an administrator.

This lesson does not create insecure executable authorization logic. Treat cookie values as claims the client offered, not as proof.

## Cookies Are Not Authorization

Cookie value ≠ verified permission.

A user-controlled cookie cannot replace secure server-side authorization.

Incorrect mental model:

```text
if cookie role === "admin"
→ grant privileged access
```

That is unsafe unless the value is cryptographically or server-side verified through a proper authentication or session system. Such a system is **not** implemented here.

## Session Identifiers

Real applications often store an **opaque session identifier** in a cookie.

```text
session=<opaque-value>
```

Server-side systems can then use that identifier to find or validate session state. This lesson does not implement sessions and does not generate tokens.

## Avoid Storing Sensitive Data Directly

Cookies should generally **not** contain plaintext secrets.

Avoid storing:

- passwords;
- private credentials;
- access secrets;
- sensitive personal information.

This lesson does not add security implementation beyond that principle.

## Cookie Size

Cookies are intended for **small** pieces of data.

They are sent with applicable HTTP requests, so large cookie payloads create unnecessary request overhead. Browser-specific size limits are not listed here.

## Cookie Scope

Cookie attributes determine **where** and **when** cookies are sent.

Relevant concepts in this lesson:

- `path`
- `secure`
- `sameSite`
- lifetime (`maxAge`)

Domain-specific cookie behavior is not introduced in depth.

## Cookies and Redirects

A response can both set a cookie and redirect.

Conceptually:

```ts
const response = NextResponse.redirect(destination);

response.cookies.set(...);

return response;
```

This is mentioned only conceptually. It is not a required example file. Redirects were already studied previously.

## Cookies and NextResponse.next()

Cookies can also be attached to a normal continuing response.

```ts
const response = NextResponse.next();

response.cookies.set(
  "preference",
  "compact"
);

return response;
```

Request processing **continues** while the browser is instructed to store the cookie. `next()` is not a redirect.

## Cookies and Proxy Decisions

```text
Request
↓
Read preference cookie
↓
Decision
↓
Continue / redirect / rewrite
```

Cookies can provide request context for Proxy decisions. Authentication decisions are not implemented here.

## When Cookies May Be Useful

Possible examples:

- theme preference;
- language preference;
- dismissed banner state;
- experiment assignment;
- session identifier;
- lightweight request context.

These stay conceptual. Internationalization and persistent A/B systems are separate topics.

## When Cookies May Be a Poor Choice

Examples:

- large application data;
- passwords;
- database records;
- large JSON documents;
- secrets;
- server-only state that the client should never possess.

If the client should not hold the value, do not put it in a cookie.

## Cookie Security Options

| Option | Purpose |
| --- | --- |
| `httpOnly` | Prevent normal browser JavaScript access |
| `secure` | Send over HTTPS only |
| `sameSite` | Control cross-site cookie behavior |
| `path` | Restrict URL path scope |
| `maxAge` | Define a lifetime |

The exact configuration depends on the use case. A theme preference and a session identifier do not need the same flags.

## Example Secure-Looking Cookie Configuration

Documentation only — not an executable example file:

```ts
const response = NextResponse.next();

response.cookies.set({
  name: "session-id",
  value: "opaque-session-reference",
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
});
```

- `httpOnly` restricts normal browser JavaScript access.
- `secure` requires HTTPS transmission.
- `sameSite` influences cross-site sending.
- `path: "/"` applies the cookie broadly.

These attributes improve cookie **handling characteristics**. They do **not** automatically create a secure authentication system. No real session IDs are generated in this lesson.

## Development vs Production

`secure: true` requires HTTPS.

Local development may use HTTP, so production cookie configuration may differ from local development. Environment-specific implementation is not added here.

## Cookies vs Local Storage

**Cookie:** can automatically participate in HTTP requests according to its attributes.

**Local Storage:** browser-side storage that is **not** automatically sent with HTTP requests.

Browser storage APIs are not taught here. The useful contrast is: cookies can ride along with requests; local storage stays in the browser unless application code sends it.

## Cookies and Privacy

Cookies may contain user-associated state and should be handled carefully.

This is limited to **engineering responsibility**. Legal or compliance guidance is not created here.

## Cookie Mutation Mental Model

```text
Incoming Request
      |
      v
request.cookies
      |
      v
Read request state
      |
      v
Create NextResponse
      |
      v
response.cookies.set/delete
      |
      v
Outgoing Response
      |
      v
Browser updates cookie state
```

Read from the request. Write on the response you return. The browser updates after it receives that response.

## Common Misconceptions

**"`request.cookies` and `response.cookies` are the same thing."**  
False. Request cookies arrived with this request. Response cookies are instructions for the browser.

**"Reading a cookie automatically authenticates the user."**  
False. A cookie is client-supplied input, not verified identity.

**"Cookies are secure because they come from the browser."**  
False. The client can modify them.

**"`httpOnly` encrypts the cookie."**  
False. It restricts normal JavaScript access. It does not encrypt the value.

**"`secure` encrypts the cookie contents."**  
False. It requires HTTPS when sending. It does not encrypt the stored string by itself.

**"`sameSite` replaces authentication."**  
False. It influences cross-site sending. It is not an auth system.

**"Deleting a cookie from `request.cookies` always deletes it from the browser."**  
False. The browser updates when the **response** carries the delete instruction.

**"Cookies are appropriate for large application state."**  
False. They are for small values and travel with requests.

**"Every cookie should contain user information."**  
False. Many cookies are preferences or opaque references, not profiles.

**"Setting a cookie requires a separate API endpoint."**  
False. Proxy can set cookies on `NextResponse.next()` (or other responses).

**"Proxy cookies require `middleware.ts`."**  
False. Modern Next.js uses `proxy.ts`. `middleware.ts` is deprecated.

## What We Are Not Learning Yet

These topics appear later or elsewhere:

- Setting Headers
- JWT
- session implementation
- authentication
- authorization
- CSRF protection implementation
- cookie encryption
- cookie signing
- persistent A/B systems
- Internationalization
- database-backed sessions
- OAuth
- external authentication providers

## Key Takeaways

1. A **cookie** is a small name-value piece of data associated with HTTP communication.
2. Incoming cookies arrive with the request; outgoing cookies are instructed via the response (`Set-Cookie`).
3. **`request.cookies`** represents cookies received with this request.
4. **`response.cookies`** represents cookies attached to the outgoing response.
5. **`request.cookies.get(name)`** returns the cookie object or `undefined`.
6. **`request.cookies.has(name)`** is a simple existence check.
7. **`request.cookies.getAll()`** lists request cookies; do not log secrets in production.
8. **`response.cookies.set()`** instructs the browser to store or update a cookie.
9. **`response.cookies.delete()`** instructs the browser to remove a cookie.
10. **`path`** restricts which URL paths receive the cookie.
11. **`httpOnly`** blocks normal `document.cookie` access; it does not encrypt.
12. **`secure`** sends the cookie only over HTTPS; it does not encrypt contents by itself.
13. **`sameSite`** influences cross-site cookie sending (`lax`, `strict`, `none`).
14. **`maxAge`** is lifetime in seconds.
15. Cookies are **client-supplied input** and can be modified by the client.
16. Cookies do **not** automatically prove authentication or authorization.
17. Do **not** store plaintext secrets or large application state in cookies.
18. **Setting Headers** is the next separate Proxy topic.
