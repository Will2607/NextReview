# Proxy Use Cases

The goal of this lesson is to understand **when** Proxy is an appropriate tool in a modern Next.js application. The previous lesson explained what Proxy is. This lesson is about architectural judgment: which request-level problems belong at the Proxy boundary, and which do not.

This lesson does not teach Route Matcher, cookies, or headers.

## Overview

Proxy sits before route handling and can make **request-level** decisions.

```text
Request
↓
Proxy
↓
Decision
↓
Continue / Redirect / Rewrite / Respond
↓
Application route
```

Proxy is useful when a decision must happen **before** the request reaches the final route. If the route can decide later, or if the work is heavy application logic, Proxy is usually the wrong home.

## What Makes a Good Proxy Use Case?

A good use case is one where:

- the decision belongs at **request level**;
- it should happen **before** rendering or route handling;
- it affects **navigation or request flow**;
- it should apply **consistently** to a set of routes.

Proxy should **not** become a container for arbitrary business logic. Calculating invoices, processing payments, or querying a large database are not request-flow decisions.

## Conditional Redirects

```text
Request arrives
↓
Proxy checks condition
↓
Old or restricted path detected
↓
Redirect
```

Example:

```text
/legacy
→ /current
```

Redirects are a natural Proxy use case because the request can be redirected **before** the original route executes. The legacy page does not need to render first.

Redirect status codes were studied earlier. This lesson does not re-teach them in depth.

## Rewrites

```text
Request:
/support

Proxy internally routes it to:
/help
```

The browser-facing URL **may** remain `/support`.

Rewrites can be useful when **internal routing** differs from **public URLs**. Visitors keep one address. The application handles another.

Rewrites are not implemented in the example files. Rewrite configuration is not taught here.

## Feature Gating

Proxy can decide whether a request should reach a feature.

```text
Request:
/beta

If feature enabled:
→ continue.

If feature disabled:
→ redirect or return an early response.
```

The gate happens before the beta route renders. This lesson does not implement a remote feature-flag service. A hardcoded flag is enough to show the idea.

## A/B Testing

Conceptually only:

```text
Incoming request
↓
Assign experience A or B
↓
Rewrite to different internal destination
```

Proxy can make an early routing decision before page rendering. Experience A and experience B can be different internal routes.

This lesson does **not** implement randomness and does **not** use cookies. Persistent experiment assignment often requires additional state, which is outside this lesson.

## Access Control at a High Level

```text
Request
↓
Proxy checks request-level access context
↓
Allowed
→ continue

Not allowed
→ redirect or reject
```

This lesson does **not** implement authentication, cookies, or authorization libraries.

Proxy can be **one part** of an access-control strategy. Sensitive authorization must still be enforced **close to protected data and operations**. A Proxy redirect is not the last word on who may read a record.

## Important Security Limitation

Proxy checks should **not** be treated as the only authorization barrier for sensitive server operations.

A page-level redirect is not a substitute for enforcing permissions in server-side business logic or data access. If Proxy sends an unauthorized user away from `/admin`, the admin data APIs and queries must still refuse that user. This stays conceptual.

## Early Responses

Proxy can return a response **before** a route executes.

```text
Request
↓
Proxy detects invalid condition
↓
Return response
↓
Route never runs
```

Possible use cases:

- temporary block;
- maintenance response;
- request rejection;
- simple request-level guard.

Rate limiting is not implemented here.

## Maintenance Mode

```text
Normal request
↓
Proxy sees maintenance flag
↓
redirect to maintenance page
or
return maintenance response
```

This can **centralize** request-level behavior. Many routes share one preliminary rule. Environment variables are not implemented in this lesson.

## Legacy URL Handling

Old routes such as `/old-dashboard` and `/legacy-account` can be redirected before route execution.

Dedicated redirect configuration may sometimes be better for **simple static mappings**. Proxy is more useful when redirect behavior **depends on request-level conditions**, not only a fixed list of old paths.

## Request Logging

Proxy can observe requests before they reach routes.

Potential information:

- pathname;
- method;
- request timing context.

This lesson does not implement an external logging service and does not teach headers. Logging stays a conceptual use case.

## Request Filtering

Proxy can reject or reroute certain requests based on request-level conditions.

Conceptual examples:

- unsupported path state;
- maintenance restriction;
- internal routing rule.

IP blocking and security filters are not implemented here.

## Localization Routing

Proxy can participate in choosing a localized route based on request context.

```text
Request:
/

Possible routing decision:
/en
/es
```

This lesson does **not** implement locale detection, headers, or cookies. **Internationalization is a later roadmap topic.** The mention here is only that routing-to-a-locale can be a request-level decision.

## Multi-Tenant Routing

```text
Incoming request
↓
identify tenant context
↓
rewrite to tenant-specific route area
```

This is a use-case example only. Domain parsing, headers, and a multi-tenant architecture are not implemented.

## Request-Level Experiment Routing

```text
Request
↓
Proxy selects variation
↓
rewrite to internal variation route
```

Example:

```text
/pricing
→ internal A
or
→ internal B
```

The public path can stay `/pricing` while internal destinations differ. Executable examples in this lesson do not introduce random selection.

## Bot or Crawler Handling

Request context can sometimes be used to vary request flow for bots or crawlers.

This lesson does not implement user-agent parsing and does not teach SEO strategies.

## Geo-Based Routing

```text
Request context
↓
regional decision
↓
regional route
```

Geolocation is not implemented. This lesson does not claim location data is available in all deployments. The idea stays high level: region *can* be a request-level routing input.

## Proxy for Centralized Request Decisions

Proxy can be useful when the **same** request-level rule should apply consistently before **multiple** routes.

```text
Several routes
↓
same preliminary request rule
↓
Proxy centralizes that decision
```

Matcher configuration is not taught yet. The point is centralization, not how to limit which paths run Proxy.

## What Proxy Should NOT Be Used For

Poor fits include:

- heavy business logic;
- complex database workflows;
- rendering UI;
- long-running computation;
- replacing Route Handlers;
- replacing server-side authorization;
- general utility functions;
- logic that only one component needs.

If it is not a request-flow decision, it probably does not belong in Proxy.

## Heavy Database Work

Proxy runs before route handling and can affect **many** requests.

Heavy database work there can:

- increase latency;
- increase infrastructure cost;
- make request flow harder to reason about.

This lesson does not connect to a database.

## Complex Business Logic

Bad fit:

- calculate invoice;
- process payment;
- generate report;
- update several database records.

Those belong in dedicated server-side application logic, not Proxy.

## Route-Specific Logic

If behavior belongs only to **one** endpoint, it may be clearer to keep it in:

- the page;
- the Route Handler;
- a server-side service;

instead of Proxy. Proxy earns its place when the rule is preliminary and shared, not when it is the entire implementation of one feature.

## Proxy vs Route Handler

| Layer | Role |
| --- | --- |
| Proxy | pre-route request decision |
| Route Handler | handles an HTTP endpoint |

```text
Proxy:
Should this request reach the endpoint?

Route Handler:
What should the endpoint do?
```

## Proxy vs Redirect Configuration

A **simple fixed redirect** may be better handled by redirect configuration.

A **conditional redirect** may justify Proxy.

This lesson does not implement `next.config` redirects.

## Proxy vs Client-Side Logic

**Client-side logic** runs after browser code loads.

**Proxy** runs before the route reaches final rendering.

If the decision must happen **before content is served**, Proxy may be more appropriate. Client Components are not taught here.

## Performance Considerations

Proxy participates in request processing.

```text
small condition
→ usually easier to justify.

large expensive workflow
→ poor fit.
```

Use Proxy intentionally. A cheap pathname check is a different cost from a report generator.

## Scope Matters

Proxy logic may apply to **many** requests unless its scope is restricted.

That is why understanding **where** Proxy executes matters.

Controlling this scope precisely is the next dedicated topic: **Route Matcher**.

Matcher syntax is **not** shown here.

## Decision Framework

Educational model:

```text
Does the decision need to happen before route rendering or endpoint execution?

No
→ Proxy is probably unnecessary.

Yes
↓
Is it primarily a request-routing or request-flow concern?

No
→ use a more appropriate application layer.

Yes
↓
Can it remain lightweight?

No
→ reconsider the architecture.

Yes
↓
Proxy may be appropriate.
```

This is an educational model, not a strict framework rule.

## Good Use Case Examples

- conditional redirect;
- conditional rewrite;
- maintenance routing;
- simple feature gating;
- centralized request-level access check;
- experiment routing;
- legacy URL handling;
- request observation/logging;
- localization routing at a conceptual level.

## Poor Use Case Examples

- payment processing;
- complex database transactions;
- full authentication system;
- generating large reports;
- rendering application UI;
- implementing every application condition globally;
- long-running external API workflows.

## Common Misconceptions

**"Proxy should contain all authentication logic."**  
False. Proxy may participate in a request-level check. It is not a complete authentication system and not the only authorization layer.

**"Every route decision belongs in Proxy."**  
False. Route-specific behavior often belongs in the page, Route Handler, or a service.

**"Proxy replaces Route Handlers."**  
False. Proxy asks whether the request should arrive. The handler still does the endpoint work.

**"Proxy is ideal for heavy database queries."**  
False. Heavy queries increase latency and blur request-flow versus application logic.

**"Every redirect needs Proxy."**  
False. Simple static mappings may belong in redirect configuration.

**"Proxy should execute expensive work for every request."**  
False. Keep Proxy lightweight. Expensive work is a poor fit.

**"A/B testing always requires Proxy."**  
False. Proxy can route experiments early. Persistent assignment and other layers may still be needed. Randomness is not required in this lesson.

**"Proxy can safely replace server-side authorization."**  
False. Sensitive operations must still enforce permissions next to the data.

**"Localization must always be implemented with Proxy."**  
False. Localization routing is only a possible request-level concern. Internationalization is a later topic.

**"Using Proxy automatically improves application architecture."**  
False. Misplaced Proxy logic makes the request path harder to understand.

## What We Are Not Learning Yet

These topics appear later:

- Route Matcher
- matcher syntax
- matcher configuration
- Using Cookies
- Setting Headers
- real authentication
- real authorization
- persistent A/B assignment
- rate limiting
- geolocation implementation
- internationalization implementation
- multi-tenant architecture
- Proxy testing

## Key Takeaways

1. A **good Proxy use case** is a lightweight, request-level flow decision that should happen before the route.
2. Proxy is useful when the same preliminary rule should apply **before** rendering or endpoint execution.
3. **Conditional redirects** fit Proxy because the original route need not run.
4. **Rewrites** fit when internal routing differs from the public URL.
5. **Feature gating** means continue, redirect, or respond early based on whether a feature should be reached.
6. **A/B routing** can be an early Proxy decision; persistent assignment is outside this lesson.
7. Proxy may participate in **access control** but must **not** be the only authorization layer.
8. An **early response** returns from Proxy so the route never runs.
9. **Maintenance routing** can centralize a request-level flag or destination.
10. **Logging and observation** can happen at Proxy because it sees the request first.
11. **Heavy business logic** is a poor fit.
12. **Database-heavy workflows** are a poor fit: they add cost and confuse layers.
13. **Scope matters**: Proxy may run for many requests until Route Matcher restricts it.
14. **Route Matcher** is the next dedicated topic.
