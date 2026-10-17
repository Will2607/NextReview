# Route Matcher

The goal of this lesson is to understand how **matcher** controls where Next.js Proxy executes. The previous lessons explained what Proxy is and when it may be useful. This lesson is about **scope**: which request paths should invoke `proxy.ts`, and which should skip it.

This lesson focuses only on route matching. Cookies and headers are later topics.

## Overview

Without careful scoping, Proxy may participate in more requests than necessary. **matcher** allows the application to declare which request paths should invoke Proxy.

```text
Incoming request
↓
Matcher check
↓
Matched?
├── Yes → Proxy executes
└── No  → Proxy skipped
```

This can reduce unnecessary Proxy execution and make request behavior easier to reason about. Unrelated paths never enter `proxy()`.

## What Is matcher?

**matcher** is Proxy configuration that selects which paths should be processed by `proxy.ts`.

```ts
export const config = {
  matcher: "/dashboard/:path*",
};
```

Examples:

```text
/dashboard
→ matches

/dashboard/users
→ matches

/dashboard/settings/profile
→ matches

/about
→ does not match
```

`/about` never runs this Proxy. `/dashboard/users` does.

## Where matcher Is Defined

```ts
export function proxy() {
  // Proxy logic
}

export const config = {
  matcher: "/dashboard/:path*",
};
```

`config` is exported from `proxy.ts` alongside the Proxy function. **matcher is configuration**, not application runtime business logic. It declares *where* Proxy runs. The function body declares *what* happens when it runs.

## Single Path Matcher

```ts
export const config = {
  matcher: "/dashboard",
};
```

This scopes Proxy to the `/dashboard` path. Keep this as an introductory exact-path idea. Nested coverage uses a different pattern, shown next.

## Matching Nested Paths

```ts
export const config = {
  matcher: "/dashboard/:path*",
};
```

Conceptually:

- `:path` → named path portion
- `*` → allows additional nested path content

Examples that match:

```text
/dashboard
/dashboard/users
/dashboard/users/42
```

This lesson does not teach advanced path-to-regexp syntax. Read `:path*` as “this segment and nested segments under it.”

## Multiple Matchers

`matcher` can be an **array**.

```ts
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
  ],
};
```

```text
/dashboard
→ matched

/account/settings
→ matched

/products
→ not matched
```

Each string is a separate pattern. A request matches if it matches **any** entry.

## Why Multiple Matchers Are Useful

One Proxy may need to run for multiple **unrelated** application areas.

Example:

```text
Protected application areas:

/dashboard
/account

Public area:

/marketing
```

matcher allows Proxy to focus on the relevant groups. `/marketing` can skip Proxy entirely. Authentication is not implemented here.

## Matcher vs if Inside proxy()

This distinction is important.

**Example A** — condition inside Proxy:

```ts
export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  // Logic
}
```

Conceptually:

```text
Proxy already executed
↓
then condition decides what to do
```

**Example B** — matcher:

```ts
export const config = {
  matcher: "/dashboard/:path*",
};
```

Conceptually:

```text
Matcher checked
↓
non-matching request
↓
Proxy does not execute
```

matcher is useful when the goal is to **avoid Proxy execution entirely** for unrelated routes. Internal `if` conditions are not always wrong. They are useful once Proxy is already running. They do not replace matcher when the intent is “do not run at all.”

## Matcher and Proxy Scope

```text
Broad matcher
→ Proxy participates in many requests.

Narrow matcher
→ Proxy participates only where required.
```

Use Proxy **deliberately**. Scope should match the actual request-level rule, not “the whole site, just in case.”

## Exact vs Nested Matching

Compare conceptually:

```text
"/dashboard"

vs

"/dashboard/:path*"
```

- **Exact path matcher:** targets one route pattern.
- **Nested matcher:** can include deeper routes.

Do not overstate exact internal semantics beyond this introductory model. Use exact when only that path matters. Use `:path*` when the whole dashboard tree should invoke Proxy.

## Excluding Paths

Sometimes it is easier to define which paths should **not** invoke Proxy.

Conceptually, run Proxy everywhere except:

- API routes
- Next.js static files
- image optimization routes
- selected static assets

Negative lookahead patterns introduce that idea at a **basic** level.

## Negative Lookahead

Regular-expression-style matcher patterns can exclude prefixes.

Current-style example:

```ts
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
```

`(?!...)` is a **negative lookahead**. Conceptually it means: match paths that do **not** begin with the excluded alternatives.

This lesson does not teach regular expressions in depth. Read the pattern as “most paths, except these prefixes.”

## Common Next.js Paths to Exclude

Proxy often does not need to run for framework or static resource paths such as:

- `/api`
- `/_next/static`
- `/_next/image`
- `/favicon.ico`

This **depends on application requirements**. These paths must **not** always be excluded. Exclude them when Proxy has no reason to inspect those requests.

## Static Assets

Proxy running for static assets is often unnecessary.

Examples:

- images
- fonts
- icons
- compiled framework assets

If Proxy has no reason to inspect those requests, excluding them can reduce unnecessary work. This lesson does not teach static asset handling.

## Matcher Arrays

```ts
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/account/:path*",
  ],
};
```

Each entry represents a route pattern for Proxy execution. Three areas, one Proxy file, one `config`.

## Matcher Is Declarative

matcher declares scope **ahead of** Proxy runtime logic.

```text
matcher
→ where Proxy should run.

proxy()
→ what Proxy should do once it runs.
```

This distinction is essential. Configuration selects the set of paths. The function implements continue, redirect, rewrite, or respond.

## Matcher Does Not Redirect

matcher only decides **whether Proxy runs**.

It does **not** itself:

- redirect;
- rewrite;
- return a response;
- authenticate a user.

Those actions happen **inside** the Proxy function.

## Matcher Does Not Protect Routes by Itself

This security distinction is important.

```ts
export const config = {
  matcher: "/admin/:path*",
};
```

This only means: **Proxy executes for `/admin`.**

It does **not** mean: `/admin` is automatically protected.

Actual access logic must still exist inside Proxy or appropriate server-side logic. Matching `/admin` is not a lock.

## Matchers and Access Control

```text
matcher
→ selects candidate routes.

Proxy logic
→ decides whether request continues.

Server-side authorization
→ protects sensitive operations and data.
```

Authentication is not implemented here. matcher only names the candidates.

## Static Configuration Requirement

matcher configuration should be **statically analyzable**.

Use direct constants:

```ts
export const config = {
  matcher: "/dashboard/:path*",
};
```

Do **not** construct matcher values dynamically at runtime.

What **not** to treat as valid configuration:

```ts
const path = process.env.MATCHER_PATH;

export const config = {
  matcher: path,
};
```

Framework configuration requires **predictable static values**. This lesson does not use environment variables in examples.

## Source Patterns

matcher entries describe **request path patterns**.

Examples:

```text
"/dashboard/:path*"
"/account/:path*"
```

Keep terminology simple: a pattern is a path shape the incoming pathname is compared against.

## Matching Root-Like Sections

```text
"/shop/:path*"
```

can represent:

```text
/shop
/shop/products
/shop/products/42
```

This is only a recognition example. The shop area, including nested product URLs, can share one matcher entry.

## Specific Paths vs Broad Patterns

**Specific:**

```text
"/admin/settings"
```

**Broad:**

```text
"/admin/:path*"
```

Trade-off:

- **Specific matcher** → smaller scope.
- **Broad matcher** → easier coverage of an entire route area.

Choose based on actual requirements. One settings page does not need the whole admin tree if Proxy only cares about that page.

## Avoid Overly Broad Matchers

```text
matcher: "/:path*"
```

or equivalent broad matching can cause Proxy to participate in **nearly all** application requests.

This may be justified in some systems, but should not be the default without a reason.

## Avoid Overly Complex Matchers

A single large regex can become difficult to understand and maintain.

If the intent can be expressed with several **simple** matcher entries, that may be easier to reason about. This lesson does not prescribe one universal style.

## Matcher and Maintainability

Good matcher configuration should make it obvious:

- which routes invoke Proxy;
- which routes bypass Proxy;
- why those routes were selected.

Avoid clever patterns that future developers cannot easily understand. Clarity beats a compact puzzle.

## Example: Dashboard Scope

Requirement: Proxy should execute for:

```text
/dashboard
/dashboard/users
/dashboard/settings
```

But not:

```text
/
/about
/products
```

Matcher:

```ts
export const config = {
  matcher: "/dashboard/:path*",
};
```

This is clearer than checking every unrelated route inside Proxy. `/about` never enters `proxy()`.

## Example: Multiple Application Areas

Requirement: Proxy should run for:

```text
/dashboard/*
/account/*
```

Matcher:

```ts
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
  ],
};
```

No authentication is added. The example is only about scope.

## Example: Broad Application Scope with Exclusions

Requirement: Proxy should run for most application routes but avoid framework/static paths.

Conceptually:

```ts
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
```

This is **more advanced** than the simple route examples. Regex syntax beyond the essential negative-lookahead meaning is not taught here.

## Matcher Evaluation Mental Model

```text
Incoming pathname
↓
Compare against matcher configuration
↓
No match
→ Skip Proxy

Match
→ Execute proxy()
↓
Proxy decides next action
```

First the matcher. Then, only on match, the function.

## Matcher vs Application Router

matcher does **not** create routes.

The routes still come from the App Router filesystem. matcher only controls **Proxy participation** for existing request paths. `/dashboard` exists because of `app/dashboard/`, not because of `config.matcher`.

## Matcher and Dynamic Routes

App route:

```text
/products/[id]
```

Incoming URLs:

```text
/products/1
/products/42
```

Matcher:

```text
"/products/:path*"
```

can cover the route area without needing to know individual IDs. Dynamic routes are not re-taught here.

## Matcher and Query Parameters

matcher primarily focuses on **request path** matching.

Example:

```text
/products?page=2
```

```text
pathname:
/products

query:
page=2
```

Advanced `has` / `missing` conditions are not taught yet. Query-based matcher examples are not added.

## Advanced Matcher Conditions

Next.js supports more advanced matcher configuration.

This lesson does **not** teach:

- `has`
- `missing`
- header conditions
- cookie conditions
- query conditions

Cookies and Headers are later roadmap topics.

## Performance Considerations

If Proxy does not need to run, avoiding unnecessary execution can reduce request-processing work.

This lesson does not provide benchmarks. matcher does **not** automatically make an application fast. It can skip work that was never needed.

## Common Misconceptions

**"matcher creates a route."**  
False. Routes come from the App Router. matcher only selects which paths run Proxy.

**"matcher performs redirects."**  
False. Redirects happen inside `proxy()`, if at all.

**"matcher automatically protects a route."**  
False. Matching `/admin` only means Proxy runs. Protection requires real access logic.

**"Every route must appear in matcher."**  
False. Many routes should skip Proxy. That is the point of scoping.

**"An if statement and matcher are always identical."**  
False. An `if` runs after Proxy has already started. matcher can skip execution entirely.

**"Proxy must run before every asset request."**  
False. Static and framework paths are often excluded when Proxy has nothing to do there.

**"A broader matcher is always better."**  
False. Broader scope means more requests pay the Proxy cost.

**"All matcher patterns must be regular expressions."**  
False. Simple strings such as `"/dashboard/:path*"` are common.

**"matcher can be generated dynamically at runtime."**  
False. Configuration should be statically analyzable constants.

**"Using matcher removes the need for authorization."**  
False. matcher selects candidates. Authorization still belongs in Proxy and/or server-side logic next to data.

## What We Are Not Learning Yet

These topics appear later:

- Using Cookies
- Setting Headers
- `has` matcher conditions
- `missing` matcher conditions
- cookie-based matcher conditions
- header-based matcher conditions
- authentication implementation
- authorization implementation
- Internationalization
- advanced regular expressions
- Proxy unit testing

## Key Takeaways

1. **matcher** is Proxy configuration that selects which paths invoke `proxy.ts`.
2. It is exported as **`export const config`** next to the Proxy function.
3. matcher controls **scope**: match → run Proxy; no match → skip Proxy.
4. A **single** matcher such as `"/dashboard"` scopes one path pattern.
5. **`"/dashboard/:path*"`** covers nested dashboard paths conceptually.
6. An **array** of patterns matches if any entry matches.
7. matcher differs from an **`if` inside `proxy()`**: matcher can skip execution; `if` runs after Proxy has started.
8. **Exclusion patterns** describe paths that should not invoke Proxy.
9. **`(?!...)`** is a negative lookahead: match paths that do not start with the excluded prefixes.
10. Framework and static paths such as `/api`, `/_next/static`, `/_next/image`, and `/favicon.ico` **may** be excluded when Proxy has no work there.
11. matcher does **not** redirect, rewrite, or authorize; it only decides whether Proxy runs.
12. matcher values should stay **statically analyzable**, not built at runtime.
13. Overly **broad** or **complex** patterns hurt maintainability and can run Proxy too often.
14. **Using Cookies** is the next separate roadmap topic.
