# Fetching Locations

The goal of this lesson is to understand **where** data fetching should happen in a modern Next.js App Router application. **Fetching location** means the execution environment where data retrieval occurs: **Server** or **Client**. Caching, fetching patterns, and revalidation are later topics.

```text
Data source
     |
     v
Where should data be fetched?
     |
     +---- Server
     |
     +---- Client
```

The decision depends on:

- security;
- data source;
- interactivity;
- browser-only requirements;
- server-only resources;
- whether the data is required for initial rendering.

This lesson does **not** introduce caching.

## Server Environment

Server-side code executes **outside** the user’s browser.

```text
Browser
↓
Next.js Server
↓
External API / Database / Internal Service
```

Server-side code can access resources that must remain **private**.

Examples:

- databases;
- private APIs;
- server environment variables;
- internal services;
- private credentials.

A database is not implemented here. The important idea is: the browser never sees the private connection.

## Client Environment

Client-side code executes in the **user’s browser**.

```text
Browser
↓
fetch()
↓
HTTP endpoint
↓
response
↓
UI update
```

Client code must be considered **visible** to the user. Anything shipped to the client can be inspected.

Therefore client code must not contain:

- database passwords;
- private API keys;
- secret tokens;
- private credentials.

## Server Components

App Router components are **Server Components by default**.

```tsx
export default async function ProductsPage() {
  // Server Component
}
```

- No `"use server"` directive is required for a Server Component.
- Server Components can use **`async`/`await`** directly.
- They can fetch data **before** rendering their result.

`"use server"` is for Server Actions, a later topic. Default pages already run on the server.

## Server-Side Fetching

```tsx
type Product = {
  id: number;
  name: string;
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://example.com/api/products"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json() as Promise<Product[]>;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main>
      <h1>Products</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
```

- This happens in the **server** environment.
- `useEffect` is **unnecessary**.
- Data can be obtained before server rendering completes.
- Caching behavior is **outside** this lesson.

The page awaits products, then renders HTML with the list already filled.

## Why Fetch on the Server?

Common reasons:

1. Private credentials remain on the server.
2. Direct database access is possible.
3. Internal services can be accessed safely.
4. Initial page data can be obtained before rendering.
5. Less data-fetching JavaScript may be required in the browser.

Server fetching is **not** always faster. Network, data size, and rendering still matter. The reasons above are about **safety**, **capability**, and **when** the data is available—not a speed guarantee.

## Database Access

```text
Server Component
↓
Database client
↓
Database
```

This is possible because execution occurs on the server.

Contrast with:

```text
Browser
↓
Database
```

Directly exposing database credentials to browser code is **unsafe**. Database access is not implemented in this lesson.

## Client Components

Client Components use:

```tsx
"use client";
```

They are needed when code requires:

- `useState`;
- `useEffect`;
- event handlers;
- browser APIs;
- interactive updates.

Client Components are not re-taught in depth. The directive creates a **client boundary**.

## Client-Side Fetching

```tsx
"use client";

import {
  useEffect,
  useState,
} from "react";

type Product = {
  id: number;
  name: string;
};

export default function ProductsClient() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response =
          await fetch("/api/products");

        if (!response.ok) {
          throw new Error(
            "Failed to fetch products"
          );
        }

        const data =
          (await response.json()) as Product[];

        setProducts(data);
      } finally {
        setLoading(false);
      }
    }

    void loadProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <main>
      <h1>Products</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
```

- `"use client"` creates a client boundary.
- `useEffect` runs in the **browser**.
- The HTTP request begins **after** client execution.
- Private credentials must **never** be included here.
- This is a basic educational example.
- `useEffect` is **not** presented as the only client-side data fetching strategy.

SWR, TanStack Query, and Axios are **not** installed.

## Server vs Client

| Concern | Server | Client |
| --- | --- | --- |
| Execution | Server | Browser |
| Private credentials | Appropriate | Must not be exposed |
| Direct database access | Possible | Not appropriate |
| Browser APIs | Not available normally | Available |
| `useState` / `useEffect` | No | Yes |
| Initial page data | Natural fit | Possible after browser execution |
| Interactive refetching | Requires architecture | Natural fit |

These are **general guidelines**, not absolute rules.

## When Server Fetching Makes Sense

Examples:

- initial page data;
- private APIs;
- database queries;
- server-only business logic;
- internal services;
- requests requiring private credentials.

## When Client Fetching Makes Sense

Examples:

- user-triggered refresh;
- browser-dependent data;
- interactive widgets;
- load-more actions;
- frequently changing UI;
- requests triggered after user interaction.

Polling and WebSockets are not implemented.

## Server Secrets

Server code can use private environment variables.

Conceptually:

```ts
process.env.PRIVATE_API_KEY
```

This lesson does **not**:

- create `.env` files;
- add real credentials;
- teach environment-variable configuration in depth.

Environment Variables is a later roadmap topic. Remember only: secrets stay on the server.

## API Boundary

When a Client Component needs **private** server data, a **server boundary** may be required.

```text
Client Component
↓
Route Handler / API
↓
Private resource
```

The client calls the **server endpoint**. Private implementation details remain on the server. A Route Handler is not created here. API Endpoints were studied previously.

The browser talks to `/api/...`. The Route Handler talks to the database. The password never ships to the client.

## Server Components Do Not Always Need Internal APIs

Avoid this unnecessary flow when the caller is already on the server:

```text
Server Component
↓
HTTP call to own Route Handler
↓
Database
```

When server-side code can instead use:

```text
Server Component
↓
server data function
↓
Database
```

Server Components can often call **server-side data functions directly**. They do not need to HTTP-round-trip to their own API. A database is not implemented here.

## Browser APIs

These are client-side browser APIs:

- `window`;
- `document`;
- `navigator`;
- `localStorage`.

Server Components do **not** have normal browser access.

If data retrieval depends directly on browser-only state, **client** execution may be required.

## Server to Client Data

A Server Component can fetch data and pass **serializable** values to a Client Component through **props**.

```text
Server Component
↓
fetch data
↓
Client Component props
↓
interactive UI
```

Server:

```tsx
const products = await getProducts();

return (
  <ProductList
    initialProducts={products}
  />
);
```

Client:

```tsx
"use client";

export function ProductList({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  // interactive behavior
}
```

```text
Data fetching
→ Server.

Interactivity
→ Client.
```

## Client Boundary

`"use client"` creates a **client boundary**.

Keep that boundary **as low as practical**.

```text
ProductsPage
(Server)
│
├── ProductList
│   (Server)
│
└── FilterControls
    (Client)
```

One interactive component does **not** require making the entire page a Client Component.

## Initial Data vs Interactive Data

**Initial data** is often a good Server candidate.

**Subsequent user-triggered data** may be a Client candidate.

Example:

```text
Initial product list
→ Server.

Load more
→ Client.
```

Server and Client approaches can **coexist**.

## Hybrid Fetching

**Hybrid fetching** means using both environments according to responsibility.

Example:

- Server: initial account data.
- Client: refresh recent activity after user interaction.

Do not treat Server and Client as application-wide mutually exclusive choices.

## Avoid Duplicate Fetching

A problem:

The Server fetches products.

Then the browser immediately fetches the **same** products again **without a reason**.

That creates unnecessary duplicate work. Caching and memoization are **not** introduced here. The architectural habit is: if the server already provided the list, do not refetch it on mount unless there is a real reason.

## Loading States

Client fetching often requires explicit client state such as:

- loading
- data
- error

Server fetching participates in server rendering and Next.js streaming mechanisms.

Loading and Streaming are **not** re-taught here.

## Error Handling

Both environments can experience failures.

- Server: server fetch fails.
- Client: browser fetch fails.

The Error States lesson is **not** recreated here. Failures exist in both places; they are handled with different tools.

## Data Serialization

Data passed from Server Components to Client Components should be **serializable**.

Simple examples:

- strings;
- numbers;
- booleans;
- arrays;
- plain objects.

React serialization internals are not covered in depth. Prefer plain data over class instances or functions as props across the boundary.

## Server-Only Dependencies

Conceptual examples:

- database drivers;
- private SDKs;
- filesystem operations.

These belong in **server-side** code and should **not** be imported into Client Components.

## Client Bundle

Client Components require **browser JavaScript**.

Do not add `"use client"` unless the component genuinely requires client capabilities.

Avoid precise performance claims. The point is: unused client boundaries still ship extra client code.

## Server Fetching Does Not Mean Static

```text
Server fetching
≠ automatically static rendering.
```

Server-side data can participate in different rendering and caching strategies. Those strategies are **not** taught yet.

## Client Fetching Does Not Mean SPA

Using client-side fetching in **one** component does not mean the entire Next.js application becomes a SPA.

Server and Client Components can coexist.

## Decision Framework

```text
Does the request require a private credential?

Yes
→ Server.

No
↓

Does it require direct database access?

Yes
→ Server.

No
↓

Does it require browser-only APIs?

Yes
→ Client.

No
↓

Is it data required for initial page rendering?

Usually consider Server first.

Does it happen because of immediate user interaction?

Client may be appropriate.
```

This is **guidance**, not an absolute algorithm.

## Decision Table

| Requirement | Preferred Location |
| --- | --- |
| Direct database query | Server |
| Private API credential | Server |
| Initial page data | Usually Server |
| Browser API required | Client |
| `useState` / event handlers | Client |
| User-triggered refetch | Often Client |
| Private resource requested by browser | Client → Server API boundary |

These are architectural guidelines rather than rigid universal rules.

## Common Misconceptions

**"All fetching should happen inside `useEffect`."**  
False. Server Components can `await fetch` without effects.

**"Server Components cannot fetch data."**  
False. They can be `async` and fetch before render.

**"Every Server Component must call a Route Handler."**  
False. They can call server data functions directly.

**"Client Components can safely contain API secrets."**  
False. Client code is visible. Secrets stay on the server.

**"Using `"use client"` automatically improves performance."**  
False. It ships a client boundary. Use it when client capabilities are needed.

**"Client fetching makes the whole application client rendered."**  
False. One Client Component does not turn the app into a SPA.

**"Server fetching means the page is automatically static."**  
False. Server fetching is an environment, not a rendering strategy.

**"Database queries should happen directly from the browser."**  
False. Credentials and drivers belong on the server.

**"Server and Client fetching cannot be mixed."**  
False. Hybrid fetching is common: server for initial data, client for later interaction.

## What We Are Not Learning Yet

These topics appear later:

- Caching Data
- Data Fetching Patterns
- Parallel vs Sequential
- Preloading Data
- Memoization in Fetch
- React Cache
- Revalidating Cached Data
- Revalidation Errors
- Handling Sensitive Data in depth
- Server Actions
- SWR
- TanStack Query
- Axios
- WebSockets
- polling implementation
- database libraries

## Key Takeaways

1. **Fetching location** is the environment where retrieval runs: Server or Client.
2. **Server** code runs outside the browser; **Client** code runs in the browser.
3. **Server Components** are the App Router default.
4. Server Components can use **`async`/`await`** directly.
5. Server-side fetching can complete **before** render, without `useEffect`.
6. Client-side fetching uses `"use client"` and typically `useEffect` (not the only strategy).
7. **Secrets** belong on the server, never in client bundles.
8. **Direct database access** belongs on the server.
9. **Browser APIs** (`window`, `localStorage`, …) require client execution.
10. **`"use client"`** creates a client boundary; keep it as low as practical.
11. Server Components do **not** always need an internal HTTP API to load data.
12. Client Components that need private data should call a **server API boundary**.
13. Server data can be passed to Client Components as **serializable props**.
14. **Hybrid** approaches are common: initial list on the server, load-more on the client.
15. Fetching location should be **intentional**, based on security, APIs, and interactivity.
16. **Caching** is a separate upcoming topic.
