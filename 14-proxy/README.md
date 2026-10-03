# Proxy

The goal of this lesson is to understand the fundamentals of Proxy in modern Next.js. Proxy allows code to run **before** a request reaches the final route rendering or Route Handler. It inspects the incoming request and decides how that request should continue.

This lesson focuses only on the core Proxy concept. Route Matcher, cookies, headers, and dedicated use cases are later subtopics.

## Overview

Proxy allows code to run before a request reaches the final route rendering or route handler.

Conceptual flow:

```text
Client Request
      |
      v
    Proxy
      |
      v
Route / Page / Route Handler
      |
      v
   Response
```

Proxy can inspect the incoming request before the application route completes.

At a high level, Proxy can decide to:

- continue the request;
- redirect;
- rewrite;
- modify request or response information;
- return a response directly.

Those capabilities stay introductory here. This lesson centers on *when* Proxy runs and *what* `NextResponse.next()` means.

## Why Is It Called Proxy?

Older Next.js versions used the file convention:

```text
middleware.ts
```

Modern Next.js renamed this feature to:

```text
proxy.ts
```

The word “middleware” could be confused with middleware systems such as Express.js. The name **Proxy** better represents a **network boundary** that processes requests before they reach application rendering.

```text
middleware.ts
→ deprecated

proxy.ts
→ current convention
```

This lesson does not create `middleware.ts`. That name appears only to explain the rename.

## Proxy in the Request Lifecycle

```text
Browser
   |
   v
Incoming HTTP Request
   |
   v
Proxy
   |
   +---- Continue
   |
   +---- Redirect
   |
   +---- Rewrite
   |
   +---- Respond
   |
   v
Next.js Route
```

Proxy executes **before** route rendering. The full internal Next.js execution order is not taught here. Remember the placement: request arrives, Proxy runs, then the route may run.

## proxy.ts File Convention

Proxy is defined using `proxy.ts` or `proxy.js`.

Conceptual project structure:

```text
project/
├── app/
├── proxy.ts
├── package.json
└── ...
```

`proxy.ts` normally lives at the **project root**.

If a project uses `src/`, it may be:

```text
project/
└── src/
    ├── app/
    └── proxy.ts
```

`proxy.ts` should be at the same structural level as `app` or `pages`. It is not placed inside a route segment as if it were `page.tsx`.

## Basic Proxy Function

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return NextResponse.next();
}
```

- **`NextRequest`** represents the incoming request.
- **`NextResponse`** provides Next.js-specific response helpers.
- **`proxy()`** executes before the final route.
- **`NextResponse.next()`** allows request processing to continue.

## Exporting Proxy

A Proxy file exports **one** Proxy function.

It may be exported as `export function proxy(...) {}` or conceptually as a default export.

This lesson uses the named export:

```ts
export function proxy(...)
```

Do not create multiple Proxy functions. One file, one entry point.

## NextRequest

**`NextRequest`** extends the standard Web `Request` model with Next.js-specific capabilities.

In this lesson, only this property is used:

```ts
const pathname = request.nextUrl.pathname;
```

`pathname` represents the path of the incoming request.

Examples:

```text
/
→ "/"

/dashboard
→ "/dashboard"

/products/42
→ "/products/42"
```

Cookies and headers are later topics. Path inspection is enough to understand conditional Proxy logic.

## NextResponse

**`NextResponse`** is the Next.js response utility commonly used from Proxy.

Mentioned only conceptually in this lesson:

- `NextResponse.next()`
- `NextResponse.redirect()`
- `NextResponse.rewrite()`

Headers and cookies are not taught here.

## NextResponse.next()

`NextResponse.next()` means: **continue processing this request normally**.

```text
Request
↓
Proxy
↓
No special action required
↓
NextResponse.next()
↓
Route continues
```

This is one of the most important concepts in this lesson. `next()` does **not** redirect. It does not skip the route. It lets the request proceed to the page or Route Handler.

## Conditional Proxy Logic

Proxy can inspect the request and make decisions.

```ts
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/legacy")) {
    // Special handling could happen here.
  }

  return NextResponse.next();
}
```

Conditional logic allows Proxy to react differently depending on the request. Matcher configuration is not introduced yet. The condition lives in the function body.

## Path Inspection

```ts
if (request.nextUrl.pathname === "/old") {
  // Handle this request differently.
}
```

Proxy can inspect URL information before the final route executes. That inspection stays basic: compare or prefix-check the pathname.

## Continue vs Intercept

Two conceptual outcomes:

**Continue:**

```text
Request
↓
Proxy
↓
NextResponse.next()
↓
Normal route
```

**Intercept:**

```text
Request
↓
Proxy
↓
Proxy decides another action
↓
Redirect / Rewrite / Response
```

“Intercept” here is a general **networking** concept. It is **not** related to Intercepting Routes. Intercepting Routes present another route inside current UI context. Proxy sits in front of request handling. Those are different lessons.

## Proxy Redirects

Request `/legacy` can be redirected to `/new` **before** route rendering:

```ts
return NextResponse.redirect(
  new URL("/new", request.url)
);
```

Redirects were already studied previously. This lesson does not repeat HTTP redirect theory. The purpose here is only to show that Proxy can initiate a redirect before the route runs.

## Proxy Rewrites

**Redirect:** the browser moves to another URL.

**Rewrite:** the request is internally handled by another destination while the browser-facing URL may remain unchanged.

Conceptually:

```text
Request:
/support

Internally handled by:
/help
```

Rewrites are not implemented in the required example files. This is not a dedicated rewrite lesson.

## Direct Responses

Proxy can return a response without continuing to a route.

```text
Request
↓
Proxy
↓
Return Response
↓
Route does not execute
```

This stays at a basic level. No API authorization examples are built here.

## Proxy Is Server-Side

Proxy executes on the **server side**.

It is not:

- a React component;
- browser JavaScript;
- a Client Component;
- a page.

Therefore: do not use React hooks, and do not add `"use client"`.

## Proxy Runtime

In current Next.js, Proxy defaults to the **Node.js runtime**.

This stays brief. Node.js runtime details, Edge runtime, and runtime configuration appear later in the roadmap.

## Proxy and Rendering

```text
Proxy
→ runs before rendering.

Page
→ produces UI.

Route Handler
→ produces an HTTP response.

Proxy
→ can influence how a request reaches those endpoints.
```

Pages and Route Handlers are not re-taught here.

## Proxy Is Not a Page

`proxy.ts` does **not** create a URL.

Unlike:

```text
app/about/page.tsx
→ /about
```

`proxy.ts` participates in **request processing**. There is no `/proxy` route merely because the file exists. This distinction is essential.

## Proxy Is Not a Route Handler

```text
route.ts
→ handles a specific route endpoint.

proxy.ts
→ can operate before requests reach routes.
```

Proxy does **not** replace Route Handlers. A `GET` handler still owns `/api/items`. Proxy may see the request first.

## Proxy Is Not Express Middleware

Although older Next.js terminology used “Middleware,” it should not be mentally modeled as a generic Express middleware chain.

Proxy has Next.js-specific lifecycle, conventions, and APIs. This lesson does not teach Express.

## One Proxy File

An application generally defines **one** Proxy entry file.

Logic can be organized into imported helper functions if needed:

```text
proxy.ts
↓
import helper logic
↓
single Proxy entry point
```

This lesson does not create helper modules. The idea is one entry point, not many `proxy.ts` files.

## Keep Proxy Lightweight

Proxy runs before route processing, so unnecessary work can affect many requests.

Avoid putting these in Proxy unless there is a strong reason:

- heavy business logic;
- expensive database operations;
- large computations;
- unrelated application workflows.

This stays conceptual. Proxy is a request boundary, not the application core.

## Proxy as a Network Boundary

Mental model:

```text
Client
↓
Proxy boundary
↓
Application
```

Proxy sits in front of the application route handling process. That makes it useful for **request-level** decisions.

This lesson does not claim Proxy is literally a standalone reverse proxy server in every deployment. The name describes the role in the Next.js request path.

## Request-Level Decisions

Conceptual examples:

- continue normally;
- redirect old locations;
- rewrite requests;
- inspect request context;
- reject certain requests;
- modify request/response metadata.

These are not expanded into dedicated use-case implementations. The roadmap has a separate **Use cases** subtopic.

## Proxy vs Application Logic

**Proxy logic:** request-level decision before route execution.

**Application logic:** business behavior belonging to pages, Route Handlers, services, or server logic.

Good conceptual Proxy concern: should this request continue to this application route?

Poor Proxy concern: calculate an entire invoice and perform a complex business workflow.

## Proxy Should Not Be the Default Solution

Modern Next.js documentation recommends using Proxy **deliberately** rather than treating it as the default place for application logic.

When another framework primitive solves the problem more directly, prefer that primitive. This stays conceptual. Every alternative API is not enumerated here.

## Conditional Example

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/old") {
    return NextResponse.redirect(
      new URL("/new", request.url)
    );
  }

  return NextResponse.next();
}
```

- `/old` → redirect.
- `/anything-else` → continue normally.

No matcher is added.

## Proxy and Static Assets

Request-level logic should not necessarily need to run for every type of application request.

Static assets, framework internals, and application routes may have different needs.

Controlling exactly where Proxy executes is the subject of the upcoming **Route Matcher** lesson. Matcher patterns are not shown here.

## Proxy and Authentication

Authentication can be a possible request-level concern.

This lesson does **not** implement authentication or session logic. Authentication architecture is outside this lesson.

## Proxy and Logging

Request logging can be a possible use case.

Analytics, external logging services, and observability are not implemented here.

## Proxy and Redirects

Redirects are a natural request-level action.

The previous Redirects lesson is not repeated. This lesson uses only one small redirect example.

## Proxy and Rewrites

Rewrites stay conceptual.

This lesson does not introduce rewrite configuration, `next.config` rewrites, advanced routing, or proxy rewrite headers.

## Migration from Middleware

Older Next.js:

```text
middleware.ts
```

Current Next.js:

```text
proxy.ts
```

Older function:

```ts
export function middleware() {}
```

Current function:

```ts
export function proxy() {}
```

The old convention is **deprecated**. This lesson does not create migration scripts or run codemods.

## Why the Rename Matters

The rename is not merely cosmetic.

It encourages a more accurate mental model:

```text
Proxy
→ request boundary in front of application routes.
```

Instead of:

```text
Middleware
→ generic application middleware layer.
```

Think “boundary before the app,” not “Express-style middleware stack.”

## Proxy Control Flow

Simplified model:

```text
Incoming request
      |
      v
    Proxy
      |
      +--------------------+
      |                    |
      v                    v
Continue              Change handling
      |                    |
NextResponse.next()   Redirect / Rewrite /
      |               Direct response
      v
Application route
```

This is simplified. Matcher, cookies, and headers come later.

## Common Misconceptions

**"Proxy creates a URL."**  
False. `proxy.ts` does not map to `/proxy`. It participates in request processing.

**"`proxy.ts` is a React component."**  
False. It is server-side request-boundary code, not UI.

**"Proxy runs in the browser."**  
False. Proxy executes on the server side.

**"Proxy replaces Route Handlers."**  
False. Route Handlers still own specific endpoints. Proxy may run first.

**"Every request requires custom Proxy logic."**  
False. Many applications need no Proxy, or only a small amount. Use it deliberately.

**"Proxy is just Express middleware."**  
False. It has Next.js-specific lifecycle and APIs. The old name caused that confusion.

**"`NextResponse.next()` redirects to another page."**  
False. `next()` continues the current request to the normal route.

**"Proxy should contain all application business logic."**  
False. Keep heavy workflows in pages, Route Handlers, or server logic.

**"`middleware.ts` is still the preferred modern file name."**  
False. `middleware.ts` is deprecated. `proxy.ts` is the current convention.

**"Proxy and Intercepting Routes are the same concept."**  
False. Proxy is a request boundary. Intercepting Routes are a routing pattern for contextual presentation.

**"Proxy must always return JSON."**  
False. The usual continue path is `NextResponse.next()`. Redirects and other responses are also possible.

## What We Are Not Learning Yet

These topics appear later:

- Proxy Use cases in depth
- Route Matcher
- matcher configuration
- regular-expression matchers
- Using Cookies
- Setting Headers
- authentication implementation
- authorization implementation
- CORS
- `waitUntil`
- `NextFetchEvent`
- advanced rewrite behavior
- advanced Proxy flags
- Proxy unit testing
- Internationalization
- Node.js vs Edge runtime details

## Key Takeaways

1. **Proxy** is the modern Next.js request boundary that runs before the final route.
2. **`middleware.ts` is deprecated**; **`proxy.ts`** is the current convention.
3. `proxy.ts` lives at the project root (or next to `app/` under `src/`).
4. Proxy executes **before** route rendering.
5. **`NextRequest`** represents the incoming request.
6. **`NextResponse`** provides Next.js response helpers from Proxy.
7. **`NextResponse.next()`** means continue processing the request normally.
8. Proxy can inspect **`request.nextUrl.pathname`**.
9. Proxy can **conditionally** continue or alter request handling.
10. **Redirects** and **rewrites** are possible Proxy actions.
11. Proxy can also **return a response** without reaching a route.
12. Proxy executes **server-side**, not in the browser.
13. Proxy is **not** a page and **not** a Route Handler.
14. Proxy should stay focused on **request-level** concerns and stay lightweight.
15. **Route Matcher**, cookies, headers, and detailed use cases are separate upcoming topics.
