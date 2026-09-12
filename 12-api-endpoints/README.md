# API Endpoints

The goal of this lesson is to understand how the Next.js App Router exposes HTTP endpoints through Route Handlers. A Next.js application can render pages and also accept HTTP requests at dedicated URLs. Those URLs are API endpoints. `route.ts` is the file that defines them.

This lesson focuses only on API endpoints. Static versus Dynamic behavior, caching, streaming, and redirects are later topics.

## Overview

A Next.js application can expose HTTP endpoints in addition to rendering pages.

Conceptual examples:

```text
GET /api/users
POST /api/users
GET /api/users/123
```

Clients can send HTTP requests to these endpoints and receive responses. The response is data (often JSON), not a React page.

This lesson introduces:

- Route Handlers;
- `route.ts`;
- HTTP methods;
- `Request`;
- `Response`.

Caching behavior is not taught in depth here.

## What Is an API Endpoint?

An **API endpoint** is a URL exposed by an application that accepts HTTP requests and returns an HTTP response.

```text
Client
↓
HTTP Request
↓
API Endpoint
↓
Application Logic
↓
HTTP Response
```

Example request:

```text
GET /api/products
```

Example response:

```json
{
  "products": []
}
```

The client does not receive a rendered page. It receives an HTTP response that application logic produced.

## Route Handlers

In the Next.js App Router, custom HTTP request handlers are implemented using **Route Handlers**.

```text
app/
└── api/
    └── users/
        └── route.ts
```

`route.ts` defines HTTP handlers for that route segment. A client request to `/api/users` is handled by the functions exported from that file.

Route Handlers are an App Router feature. This lesson does not teach Pages Router API Routes.

## route.ts Convention

```text
app/api/users/route.ts
```

maps conceptually to:

```text
/api/users
```

Minimal handler:

```ts
export async function GET() {
  return Response.json({
    message: "Users endpoint",
  });
}
```

The exported function name corresponds to the HTTP method. `GET` handles `GET` requests. `POST` handles `POST` requests. Next.js matches the incoming method to the matching export.

## Supported HTTP Methods

Route Handlers support:

- `GET`
- `POST`
- `PUT`
- `PATCH`
- `DELETE`
- `HEAD`
- `OPTIONS`

| Method | Typical purpose |
| --- | --- |
| `GET` | Read data |
| `POST` | Create or submit data |
| `PUT` | Replace a resource |
| `PATCH` | Partially update a resource |
| `DELETE` | Remove a resource |
| `HEAD` | Retrieve response metadata without a response body |
| `OPTIONS` | Describe supported request methods/options |

These are **conventional** meanings. Next.js does not automatically enforce business rules such as “POST must create a record.” The method name only selects which exported function runs.

## GET Endpoint

```ts
export async function GET() {
  return Response.json({
    message: "Hello from the API",
  });
}
```

Flow:

```text
GET request
↓
GET function executes
↓
Response is returned
```

A `GET` request to this route runs `GET()` and returns JSON. No page is rendered.

## Response.json()

The Web `Response` API can return JSON data.

```ts
return Response.json({
  id: 1,
  name: "Alice",
});
```

JavaScript data is serialized into a JSON HTTP response. The client receives JSON, not a JavaScript object. This lesson does not introduce serialization edge cases.

## Status Codes

HTTP responses contain **status codes**. They describe the outcome of the request.

Examples:

- `200` → successful request
- `201` → resource created
- `400` → invalid request
- `404` → resource not found
- `500` → server error

```ts
return Response.json(
  { message: "Created" },
  { status: 201 }
);
```

The first argument is the JSON body. The second argument sets response options, including `status`. HTTP theory stays concise here: status tells the client what happened.

## The Request Object

A Route Handler can receive a standard Web **`Request`** object.

```ts
export async function POST(request: Request) {
  // ...
}
```

`Request` provides information such as:

- method;
- URL;
- headers;
- body.

Headers appear later in the roadmap and are not taught in depth here. This lesson uses `Request` for the URL and the body.

## Reading JSON Request Bodies

```ts
export async function POST(request: Request) {
  const body: unknown = await request.json();

  return Response.json({
    received: body,
  });
}
```

Flow:

```text
Client sends JSON
↓
request.json()
↓
JavaScript value
```

The parsed value is typed as `unknown`, not `any`. Incoming data is untrusted. Real applications should validate untrusted request data. Input validation implementation is outside this lesson.

## POST Endpoint

A simple conceptual example:

```ts
export async function POST(request: Request) {
  const body: unknown = await request.json();

  return Response.json(
    {
      message: "Resource received",
      data: body,
    },
    {
      status: 201,
    }
  );
}
```

What each part does:

- `POST` runs for `POST` requests.
- `request.json()` reads the JSON body as `unknown`.
- `Response.json(...)` returns JSON.
- `{ status: 201 }` signals that a resource was created (conventionally).

No database is involved. The handler reads input and returns a response.

## Multiple HTTP Methods in One route.ts

The same `route.ts` can export handlers for multiple HTTP methods.

```ts
export async function GET() {
  return Response.json({
    message: "Reading resources",
  });
}

export async function POST(request: Request) {
  const body: unknown = await request.json();

  return Response.json(
    {
      message: "Creating resource",
      data: body,
    },
    {
      status: 201,
    }
  );
}
```

Mapping:

- `GET /api/items` → `GET()`
- `POST /api/items` → `POST()`

One file, one URL path, several methods. Each export handles one method.

## PUT

The conventional purpose of **`PUT`** is to replace an existing resource representation.

```ts
export async function PUT(request: Request) {
  const body: unknown = await request.json();

  return Response.json({
    message: "Resource replaced",
    data: body,
  });
}
```

`PUT` typically means “here is the full replacement.” This lesson does not discuss idempotency in depth.

## PATCH

The conventional purpose of **`PATCH`** is to partially modify a resource.

```ts
export async function PATCH(request: Request) {
  const body: unknown = await request.json();

  return Response.json({
    message: "Resource updated",
    data: body,
  });
}
```

`PUT` conceptually replaces the whole representation. `PATCH` conceptually changes only the provided fields. Next.js does not enforce that difference. The names express intent.

## DELETE

```ts
export async function DELETE() {
  return Response.json({
    message: "Resource deleted",
  });
}
```

`DELETE` conventionally means remove a resource. No real data is deleted in this educational example. Persistence is not introduced.

## HEAD and OPTIONS

**`HEAD`** is similar conceptually to `GET` but without returning a response body to the client. The client can inspect metadata such as status without receiving the full payload.

**`OPTIONS`** is used to describe communication options for a resource.

If `OPTIONS` is not explicitly defined, Next.js can automatically provide an `OPTIONS` response based on the supported methods. This lesson does not teach CORS.

## URL Structure

The `app` directory structure participates in building endpoint paths.

| File | Endpoint |
| --- | --- |
| `app/api/users/route.ts` | `/api/users` |
| `app/api/products/route.ts` | `/api/products` |
| `app/api/products/[id]/route.ts` | `/api/products/:id` |

Folders become path segments. `route.ts` attaches HTTP handlers to that path. `[id]` is a dynamic segment, introduced next.

## Dynamic API Routes

Dynamic segments identify a variable part of the path.

Structure:

```text
app/
└── api/
    └── users/
        └── [id]/
            └── route.ts
```

Conceptual URL:

```text
/api/users/42
```

`42` corresponds to `id`. The folder name `[id]` marks that segment as dynamic. This stays basic: one named parameter, one path value.

## Dynamic Route Parameters

Dynamic route handlers can receive route context.

Modern App Router example:

```ts
export async function GET(
  _request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await context.params;

  return Response.json({
    id,
  });
}
```

`params` is asynchronous in current Next.js versions and therefore is awaited. `_request` is unused because this handler only needs the path parameter. This lesson does not introduce a `RouteContext` helper.

## Query Parameters

Compare:

```text
/api/products/42
```

and:

```text
/api/products?category=books
```

The first uses a **dynamic segment** in the path. The second uses a **query parameter** in the query string.

```ts
export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");

  return Response.json({
    category,
  });
}
```

- **Dynamic segment** → identifies part of the route path.
- **Query parameter** → additional information in the URL query string.

Both are untrusted input.

## Page vs Route Handler

| File | Purpose |
| --- | --- |
| `page.tsx` | Render route UI |
| `route.ts` | Handle HTTP requests |

Example:

- `app/products/page.tsx` → renders UI for `/products`
- `app/api/products/route.ts` → handles HTTP requests for `/api/products`

A page produces React UI. A Route Handler produces an HTTP response.

## Important Route Conflict

`page.tsx` and `route.ts` cannot exist at the same route segment level because both would claim the same route.

Invalid conceptual structure:

```text
app/
└── products/
    ├── page.tsx
    └── route.ts
```

That creates a conflict. One segment cannot be both a page and a Route Handler.

Valid example:

```text
app/
├── products/
│   └── page.tsx
└── api/
    └── products/
        └── route.ts
```

`/products` is a page. `/api/products` is an endpoint. This lesson does not expand into advanced routing architecture.

## API Folder Is a Convention

`app/api/` is a common **organizational convention**.

A Route Handler can technically exist in other route segments within `app/`.

```text
app/status/route.ts
→ /status
```

Using `api/` is often useful to clearly distinguish API endpoints from page routes. This is not a Structuring Routes lesson. Remember only that `api` is conventional, not a required folder name for every handler.

## Request and Response Are Web APIs

Route Handlers use the standard Web **`Request`** and **`Response`** APIs.

Developers can work with familiar concepts such as:

- `request.url`;
- `request.json()`;
- `Response.json()`;
- status codes.

These are web platform APIs, not Next.js-only types. The lesson stays at that high level.

## NextRequest and NextResponse

Next.js also provides extended request and response APIs:

- `NextRequest`
- `NextResponse`

They are not taught here. The basic examples in this lesson intentionally use standard `Request` and `Response`.

## Server-Side Execution

Route Handler code executes in a **server runtime** rather than as normal browser component code.

Therefore:

- it does not render React UI;
- it handles HTTP requests;
- server-only operations can conceptually happen there.

Runtimes are not introduced in depth. Node.js versus Edge is a later roadmap topic.

## Example Request Flow

```text
Browser or Client
      |
      | POST /api/users
      v
app/api/users/route.ts
      |
      | POST()
      v
Read request body
      |
      v
Application logic
      |
      v
Response.json(...)
      |
      v
Client receives response
```

The client sends a method and a path. Next.js selects `route.ts` and the matching export. The handler reads the request, runs logic, and returns a `Response`.

## API Endpoints Without a Database

An API endpoint does not require a database.

A Route Handler can:

- return calculated data;
- transform input;
- return application information;
- communicate with other services;
- eventually interact with persistence.

For this lesson, no databases or external services are added. A JSON message is enough to demonstrate the endpoint.

## Error Responses

API errors are simple HTTP responses.

```ts
return Response.json(
  {
    message: "Invalid request",
  },
  {
    status: 400,
  }
);
```

API errors are HTTP responses. They are different from the route UI Error States previously studied. `error.tsx` replaces failed page UI. A `400` response tells an HTTP client the request was invalid. This lesson does not teach advanced exception handling.

## API Endpoint vs Server Component

Conceptually:

- **Server Component** → produces React UI.
- **Route Handler** → produces an HTTP response.

A Server Component is still a page-building unit. A Route Handler is an HTTP endpoint. This lesson does not teach Server Components in depth.

## When Route Handlers May Be Useful

Examples include:

- exposing application data;
- handling form or client requests;
- webhooks;
- backend-for-frontend endpoints;
- server-side integration points.

These are examples only. Webhooks are not implemented here.

## When a Route Handler May Be Unnecessary

Server Components do not necessarily need to call an internal Route Handler merely to access server-side data.

That is a conceptual caution only. If the UI already runs on the server, adding `/api/...` just so the page can fetch from itself is often unnecessary. Data fetching architecture is not taught here.

## Security Considerations

Endpoint input should be treated as **untrusted**.

Do not trust:

- JSON bodies;
- query parameters;
- dynamic parameters;
- request headers.

Real applications normally require:

- validation;
- authorization;
- careful error handling.

Authentication and authorization are not implemented in this lesson. The rule for now: incoming values are not safe by default.

## Common Misconceptions

**"Every `route.ts` must be inside `app/api`."**  
False. `app/api/` is a common convention. A Route Handler can exist in other `app/` segments.

**"`route.ts` renders React pages."**  
False. `route.ts` handles HTTP requests. `page.tsx` renders UI.

**"A GET endpoint must connect to a database."**  
False. A handler can return calculated or static JSON. Persistence is optional.

**"Each HTTP method needs a separate `route.ts` file."**  
False. One `route.ts` can export `GET`, `POST`, `DELETE`, and other methods.

**"`@folder` syntax is used for API methods."**  
False. `@folder` is a Parallel Routes slot convention. HTTP methods are exported function names.

**"`page.tsx` and `route.ts` can always exist at the same route segment."**  
False. They conflict if they share the same segment. Both would claim the same route.

**"Request bodies are automatically safe."**  
False. Bodies, query strings, params, and headers are untrusted input.

**"API endpoints must use `NextResponse`."**  
False. Standard `Response` is enough for the examples in this lesson.

**"Route Handlers only support GET and POST."**  
False. They also support `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS`.

## What We Are Not Learning Yet

These topics appear later in the roadmap:

- Static vs Dynamic API behavior
- caching
- streaming responses
- redirects
- Middleware
- cookies
- advanced headers
- authentication
- authorization
- databases
- external APIs
- runtime configuration
- Server Actions

## Key Takeaways

1. An **API endpoint** is a URL that accepts HTTP requests and returns HTTP responses.
2. A **Route Handler** is the App Router way to implement those endpoints.
3. **`route.ts`** defines HTTP handlers for a route segment.
4. Filesystem structure maps to endpoint URLs, such as `app/api/users/route.ts` → `/api/users`.
5. **`GET`** handles read-style requests and can return JSON.
6. **`POST`** can read a JSON body and return a created-style response.
7. **`PUT`** conventionally replaces a resource; **`PATCH`** conventionally updates part of it; **`DELETE`** conventionally removes it.
8. **`HEAD`** and **`OPTIONS`** are also supported.
9. **`Request`** is the Web request object (method, URL, headers, body).
10. **`Response`** is the Web response object returned to the client.
11. **`Response.json()`** serializes JavaScript data into a JSON HTTP response.
12. A second argument can set an HTTP **status code**, such as `201` or `400`.
13. JSON bodies are read with `request.json()` and typed as **`unknown`**.
14. **Query parameters** live in the URL query string; they are not path segments.
15. **Dynamic segments** such as `[id]` identify part of the path; `params` is awaited.
16. **`page.tsx`** renders UI; **`route.ts`** handles HTTP requests.
17. `page.tsx` and `route.ts` **cannot** occupy the same route segment.
18. Request data must be treated as **untrusted**.
19. Static vs Dynamic, Caching, Streaming, and Redirects are separate upcoming topics.
