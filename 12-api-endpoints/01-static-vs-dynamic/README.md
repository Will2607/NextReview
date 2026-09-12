# Static vs Dynamic Route Handlers

The goal of this lesson is to understand the conceptual difference between static and dynamic behavior in Next.js Route Handlers. API responses can be produced from stable, reusable information, or they can depend on data that exists only when a request arrives. That distinction is about **execution behavior**, not about HTTP method names and not about `[id]` URL segments.

This lesson focuses only on that distinction. Caching, streaming, and redirects are later topics.

## Overview

API responses can have different execution characteristics.

Some responses are based on information that does not change between requests. Other responses depend on information that is only available when a request arrives.

Static-like response:

```text
GET /api/version

{
  "version": "1.0.0"
}
```

Dynamic response:

```text
GET /api/request-info

{
  "requestedAt": "...",
  "requestUrl": "..."
}
```

This distinction affects **when** and **how** a response can be produced. A stable version string may be prepared without looking at the current request. A timestamp or request URL cannot.

## What Does Static Mean?

**Static** behavior means a response can be produced without depending on request-specific or frequently changing runtime information.

```text
Known information
↓
Stable response
↓
Potentially reusable output
```

Example:

```ts
export async function GET() {
  return Response.json({
    application: "NextReview",
    status: "available",
  });
}
```

The response does not depend on:

- the incoming request;
- cookies;
- headers;
- current time;
- random values;
- user-specific data.

This alone does **not** guarantee caching in every Next.js configuration. Static describes a kind of result. Caching is a later topic.

## What Does Dynamic Mean?

**Dynamic** behavior is request-time execution that depends on information that cannot be fully determined ahead of the request.

```text
Request arrives
↓
Runtime information is read
↓
Response is computed
↓
Response is returned
```

Conceptual examples of such information:

- request URL;
- request headers;
- cookies;
- current time;
- random values;
- user-specific data;
- frequently changing data.

This lesson does not implement cookies or headers. The idea is enough: if the handler needs information that appears only at request time, execution is dynamic.

## Static Does Not Mean Static File

A static Route Handler is still **server-side application code**.

It does **not** mean the developer manually created a `.json` file.

```text
Static behavior
≠
physical static file
```

The framework may be able to prepare or reuse the result depending on configuration. The handler remains a `route.ts` function. Static is an execution characteristic, not a file type.

## Dynamic Does Not Mean Dynamic Route Segment

This distinction is critical.

**Dynamic route segment:**

```text
/api/users/[id]
```

describes **URL structure**. The path has a variable part.

**Dynamic execution:**

the response is **computed at request time**.

These are separate concepts. A route with `[id]` is called a dynamic route segment. This lesson uses “dynamic” primarily to discuss **execution behavior**.

A path can contain `[id]` and still return stable data. A path can have no `[id]` and still run dynamically because it reads `Date.now()` or `request.url`. This lesson does not re-teach dynamic route segments in depth.

## GET Is Not Automatically Static

`GET` describes an **HTTP method**.

Static or dynamic describes **execution behavior**.

Therefore:

```text
GET
≠ automatically static
```

A `GET` handler may still depend on request-time information.

```ts
export async function GET(request: Request) {
  return Response.json({
    url: request.url,
  });
}
```

This response depends on the incoming request. The method is still `GET`. The execution is still request-time.

## POST Is Generally Request-Time Work

Methods such as `POST` usually process incoming request data and therefore naturally involve request-time execution.

That is only a reminder. Static versus dynamic is about **execution characteristics**, not about method names. This is not another HTTP methods lesson.

## Deterministic Responses

In this lesson, **deterministic** means: given the same fixed application state, the handler produces the same result and does not depend on request-specific or non-deterministic runtime information.

```ts
export async function GET() {
  return Response.json({
    service: "catalog",
  });
}
```

The same application state yields the same JSON. That is easier to treat as static than a response that depends on runtime information.

## Non-Deterministic Responses

Non-deterministic operations can produce different values between executions.

Examples:

- `Math.random()`
- `Date.now()`
- `new Date()`

Conceptually:

```ts
export async function GET() {
  return Response.json({
    generatedAt: new Date().toISOString(),
  });
}
```

Each execution can produce a different result. This kind of response conceptually belongs to **dynamic request-time behavior** unless explicitly handled through other framework mechanisms.

Those other mechanisms are caching-related. This lesson does not introduce caching strategies.

## Request-Dependent Responses

```ts
export async function GET(request: Request) {
  const url = new URL(request.url);

  return Response.json({
    pathname: url.pathname,
  });
}
```

The response depends on the incoming request. Therefore the handler needs **request-time information**. The pathname is not known until the request arrives.

## Runtime Information

Some information exists only when a request happens.

Conceptual examples:

- which URL was requested;
- request metadata;
- current user context;
- current timestamp;
- request body.

Such information generally pushes the handler toward **dynamic execution**. Cookies and headers are later topics; they are listed here only as kinds of request-time data.

## force-static

This lesson introduces only this route configuration:

```ts
export const dynamic = "force-static";
```

It can be used to explicitly opt a **compatible `GET` Route Handler** into static behavior.

```ts
export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    service: "catalog",
    status: "available",
  });
}
```

Read this carefully:

- this is an **explicit static intent**;
- the handler should **not** depend on request-specific runtime information;
- this lesson does **not** cover the caching system behind it.

`force-dynamic`, `error`, `auto`, `revalidate`, `use cache`, and `cacheLife` are outside the scope of this lesson.

## Static-Compatible Handler

```ts
export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    application: "NextReview",
    environment: "educational",
  });
}
```

This handler is compatible with static behavior because:

- no request parameter is read;
- no current timestamp;
- no random value;
- no request-specific state.

The JSON is known from the application itself. `force-static` states that intent explicitly.

## Dynamic Handler

```ts
export async function GET() {
  return Response.json({
    generatedAt: new Date().toISOString(),
  });
}
```

The timestamp changes between executions. Therefore the response is naturally **request-time dependent**. This lesson does not discuss caching overrides.

## Request Object and Dynamic Behavior

Simply accepting a `Request` parameter does not conceptually matter unless the handler actually **uses** request-specific information.

**Example A:**

```ts
export async function GET(_request: Request) {
  return Response.json({
    status: "ok",
  });
}
```

**Example B:**

```ts
export async function GET(request: Request) {
  return Response.json({
    url: request.url,
  });
}
```

- **A** does not use request-specific information.
- **B** depends on the request URL.

This comparison stays conceptual. It does not claim anything about every optimization decision Next.js may perform.

## Build Time vs Request Time

**Static work** may be prepared before an individual request and reused.

**Dynamic work** must be performed when the relevant request occurs.

Static:

```text
Build / preparation
       |
       v
Prepared result
       |
       v
Request
       |
       v
Response
```

Dynamic:

```text
Request
       |
       v
Execute handler
       |
       v
Read runtime data
       |
       v
Response
```

Use **may** for static behavior. Preparation and reuse depend on configuration. Dynamic work waits for the request because the needed information is not available earlier.

## Freshness

Trade-off, conceptually:

**Static:**

- easier to reuse;
- potentially faster;
- lower repeated computation;
- may not represent per-request information.

**Dynamic:**

- can reflect request-time information;
- can produce fresh or personalized results;
- requires runtime execution.

This lesson does not introduce stale time or revalidation. Freshness here means: does the response need to reflect *this* request, *this* moment, or *this* user?

## Performance

At a high level only:

Static-compatible responses **may** reduce repeated server computation.

Dynamic responses require request-time work.

Static is **not** always faster. Network latency, deployment architecture, data access, and other factors can affect actual performance. Choose the model that matches the data, not a speed slogan.

## User-Specific Data

If a response must depend on the current user’s request context, it generally needs **dynamic** behavior.

Examples:

- current user’s profile;
- current session information;
- personalized dashboard data.

Authentication is not implemented here. Cookies are not used. The rule is conceptual: personal data is per-request context.

## Frequently Changing Data

Data that changes frequently may need request-time behavior depending on the application’s freshness requirements.

Example: current inventory level.

Databases are not implemented. Revalidation is not introduced. If the value must match “now,” execution is typically dynamic.

## Static Data Example

Conceptual data that **may** be suitable for static behavior:

- application name;
- API version;
- public configuration known at build/deployment time.

Environment variables are not used in this lesson. These examples are stable application facts.

## Dynamic Data Example

Conceptual data that **may** require request-time execution:

- current time;
- current request URL;
- personalized response;
- live inventory.

These values are not fully known before the request, or they change between executions.

## Static vs Dynamic Decision

Educational decision flow:

```text
Does the response depend on request-specific information?

Yes
→ Dynamic behavior is likely required.

No
↓
Does it depend on non-deterministic or frequently changing runtime information?

Yes
→ Dynamic behavior may be appropriate.

No
↓
Static behavior may be appropriate.
```

This is an **educational decision model**, not the complete internal Next.js algorithm.

## Current Next.js Route Handler Defaults

Route Handlers are **not cached by default**.

A `GET` Route Handler **can opt into** static/cached behavior.

Developers must not assume:

```text
GET
→ automatically cached
→ automatically static
```

The default is not “GET is static.” Opting in is explicit. This lesson does not explain the caching implementation.

## Cache Components Note

Modern Next.js also has a **Cache Components** model that can affect prerendering behavior.

This lesson does not teach Cache Components, `use cache`, `cacheLife`, or `cacheTag`. Those belong to later caching-related lessons.

## Static vs Dynamic Is About Requirements

The decision should follow **application requirements**.

Ask:

- Does the result vary per request?
- Does it require current runtime data?
- Does it need personalization?
- Can the same result safely be reused?
- How fresh must the data be?

Do not prescribe static behavior merely for optimization. If the result must be personal or current, dynamic is the fitting model.

## Static Does Not Mean Better

Static and dynamic are **not quality levels**.

- **Static:** appropriate when the result can be reused.
- **Dynamic:** appropriate when the result must depend on request-time information.

Use the correct behavior for the requirement. A timestamp endpoint that pretends to be static is the wrong model, not a faster one.

## Security Consideration

A response must never be made reusable across users if doing so could expose user-specific or sensitive data.

If Alice’s data were prepared once and reused for Bob, that would be a leak. Personal results stay request-time. This stays conceptual. Authentication and caching are not implemented here.

## Static vs Dynamic Summary

| Characteristic | Static | Dynamic |
| --- | --- | --- |
| Per-request information required | Usually no | Often yes |
| Same result reusable | Often | Not necessarily |
| Runtime execution required | Potentially less | Yes |
| Personalized content | Usually unsuitable | Suitable |
| Current time/random values | Usually unsuitable | Suitable |
| Request-specific URL/data | Usually unsuitable | Suitable |

This is a **conceptual comparison**, not a complete description of Next.js internals.

## Common Misconceptions

**"Every GET Route Handler is static."**  
False. `GET` is a method. Execution can still be request-time.

**"Every GET Route Handler is automatically cached."**  
False. Route Handlers are not cached by default. A `GET` handler can opt into static/cached behavior.

**"Static means a physical JSON file."**  
False. Static behavior is still server-side handler code. It is not a hand-written `.json` file.

**"Dynamic means the URL contains `[id]`."**  
False. `[id]` is a dynamic **route segment**. Dynamic **execution** is request-time work.

**"Dynamic responses are bad."**  
False. Dynamic is correct when the result must depend on request-time information.

**"Static responses are always faster."**  
False. Static **may** reduce repeated computation. It is not always faster.

**"POST can be statically generated like a normal static GET response."**  
False. `POST` typically processes incoming request data and is request-time work.

**"Reading request-specific information has no effect on execution behavior."**  
False. Using the request URL or other request data needs request-time information.

**"`force-static` makes any request-dependent handler safe to treat as static."**  
False. `force-static` is an explicit intent for a **compatible** handler. Request-specific or user-specific data must not be treated as reusable static output.

**"Static vs dynamic and caching are exactly the same topic."**  
False. This lesson is about execution behavior. Caching is a separate upcoming topic.

## What We Are Not Learning Yet

These topics appear later in the roadmap:

- Caching
- `use cache`
- `cacheLife`
- `cacheTag`
- revalidation
- Streaming
- Redirects
- Middleware
- cookies
- headers
- authentication
- database access
- external APIs
- Server Actions

## Key Takeaways

1. **Static** behavior means a response can be produced without request-specific or frequently changing runtime information.
2. **Dynamic** behavior means request-time execution that depends on information available when the request arrives.
3. Static does **not** mean a manually created file. It is still handler code.
4. Dynamic **execution** is different from dynamic **route segments** such as `[id]`.
5. **`GET` does not automatically mean static.**
6. Route Handlers are **not cached by default**. A `GET` handler can opt into static/cached behavior.
7. Request-specific data requires **request-time** information.
8. Timestamps and random values are **non-deterministic** and belong with dynamic behavior.
9. **`export const dynamic = "force-static"`** can explicitly opt a compatible `GET` handler into static behavior.
10. Static and dynamic have different **freshness** and **execution** trade-offs.
11. Neither model is universally better. Match the requirement.
12. **Caching** is a separate upcoming topic.
