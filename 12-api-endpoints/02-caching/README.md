# Caching

The goal of this lesson is to understand the fundamentals of caching in the context of Next.js API endpoints and Route Handlers. Caching means storing a previously produced result so it can potentially be reused later instead of recomputing it. That reuse can reduce work. It can also serve data that is no longer current.

This lesson is conceptual and version-aware. It does not teach advanced Next.js caching APIs. Route Handlers should not be assumed to be automatically cached simply because they use `GET`. Next.js caching semantics are not identical across all versions.

## Overview

**Caching** means storing a previously produced result so that it can potentially be reused later instead of recomputing it.

Without cache:

```text
Request
↓
Execute work
↓
Produce result
↓
Return response

Another request
↓
Execute the same work again
↓
Produce result again
↓
Return response
```

With cache:

```text
Request
↓
Compute result
↓
Store result
↓
Return response

Later request
↓
Reusable cached result exists
↓
Return cached result
```

Caching **can** reduce repeated computation and latency. Cached data **may** become outdated. Those two facts sit together. A cache is useful only when reuse is both worthwhile and safe.

## What Is a Cache?

A **cache** is temporary storage for data or computed results that may be reused.

A cache is not necessarily permanent storage. It holds a copy or a computed result for a period, or until something makes that result unusable.

```text
Original source
↓
Result
↓
Cache
↓
Future reuse
```

Caches can exist at different layers. This lesson does not enumerate Next.js internal cache layers. The useful idea is: a cache stores something already produced so a later compatible request might skip the original work.

## Why Cache Data?

Potential benefits include:

- less repeated work;
- lower server computation;
- reduced latency;
- fewer calls to expensive resources;
- potentially better scalability.

These are possible outcomes, not guarantees. Caching does **not** always improve performance. A cheap handler, a low hit rate, or an expensive cache lookup can make extra caching complexity pointless.

## The Core Trade-off

The core trade-off is:

```text
Performance
vs
Freshness
```

More reuse → less repeated computation.

More reuse → possibility of older data.

```text
Freshness <----------------> Reuse
```

Caching decisions depend on application requirements. An inventory count that must be exact and a public application name that rarely changes do not have the same reuse policy.

## Cache Hit

A **cache hit** means a requested result already exists in the cache and can be reused.

```text
Request
↓
Check cache
↓
Result found
↓
Cache hit
↓
Return cached result
```

The original work is not repeated for that request. The client still receives a response. The source of that response is the stored result.

## Cache Miss

A **cache miss** means the requested result is not available in the cache.

```text
Request
↓
Check cache
↓
Result missing
↓
Cache miss
↓
Compute result
↓
Store result
↓
Return result
```

A cache miss is a **normal** caching event. The first request for a value is often a miss. A miss after expiration or invalidation is also normal. A miss does not mean the application is broken.

## Cache Key

A **cache key** is how the cache identifies which stored result belongs to which request or computation.

Conceptually:

```text
Key:
products

Value:
[
  ...
]
```

Another conceptual example:

```text
Key:
product:42

Value:
{
  "id": 42
}
```

Real cache keys may depend on multiple inputs: path, query values, and other request identity. Different inputs must not share one entry unless they truly represent the same reusable result.

This lesson does not implement a caching library. The key is a conceptual identity, not a specific API.

## Same Input, Reusable Output

Caching is most straightforward when equivalent inputs safely produce a result that can be reused.

Example:

```text
GET /api/application-info

{
  "name": "NextReview"
}
```

If the information rarely changes and is public, reuse **may** be appropriate. This lesson does **not** state that Next.js automatically caches this endpoint.

## Fresh Data

Some responses must reflect **current** information.

Examples:

- live inventory;
- latest transaction state;
- current availability;
- rapidly changing metrics.

In those situations, stale cached output may be unacceptable. The handler may need to compute a current result. Revalidation mechanisms are a later topic.

## Stale Data

**Stale data** is cached information that no longer matches the current underlying state.

Conceptual example:

```text
Database inventory:
5

Cached inventory:
8
```

The cache still has a number. That number is no longer true. Caching introduces the possibility of stale results. Whether that is acceptable depends on the product.

## Cache Invalidation

**Cache invalidation** means making an existing cached result no longer reusable because the underlying data changed or because its allowed lifetime ended.

```text
Cached result
↓
Underlying data changes
↓
Cached result becomes stale
↓
Cache must eventually stop using it
```

Invalidation is a concept, not an API in this lesson. Next.js-specific invalidation mechanisms (`revalidatePath`, `revalidateTag`, `cacheTag`, `updateTag`, and related APIs) will be studied separately.

## Time-Based Expiration

Some caches use a **lifetime**.

```text
Store value
↓
Valid for a period
↓
Period expires
↓
Value must be recomputed or refreshed
```

After the period, the stored result is no longer treated as reusable. This lesson does not introduce `cacheLife` or `revalidate` configuration.

## Explicit Invalidation

Conceptually:

```text
Data changes
↓
Application knows previous cached result is no longer valid
↓
Cached entry is invalidated
```

The application decides that reuse must stop now, rather than waiting for a timer. This lesson does not provide a Next.js-specific implementation.

## GET and Caching

`GET` requests commonly represent read operations. They are natural **candidates** for caching when their results are safe to reuse.

However:

```text
GET
≠ automatically cached

GET
≠ automatically safe to cache
```

Examples:

- Public application metadata → **may** be reusable.
- Current user profile → must **not** be blindly shared across users.
- Frequently changing inventory → freshness requirements matter.

`GET` describes the method. Caching is a separate decision about reuse, isolation, and freshness.

## POST and Caching

`POST` commonly represents operations that process or mutate data. It is generally **not** treated like a reusable read response.

A `POST` body is request-specific work. Reusing one `POST` result as if it were a shared catalog read is usually the wrong model. This section stays short. It is not HTTP caching specification theory.

## Public Data

Public, shared information is generally easier to reason about for caching.

Examples that **may** be suitable:

- public configuration;
- documentation metadata;
- application version;
- public catalog information that changes infrequently.

“May be” is intentional. Public data can still change. Public data can still have freshness rules. Public only means it is not user-private.

## Personalized Data

User-specific data requires particular caution.

Example:

```text
GET /api/profile

User A:
{
  "name": "Alice"
}

User B:
{
  "name": "Bob"
}
```

Danger:

```text
User A response
↓
incorrectly shared cache entry
↓
User B receives Alice's information
```

That would be a serious **security and privacy** issue. A shared cache entry must never expose one user’s private response to another user.

## Sensitive Data

Sensitive or private responses must never be reused across users without correct isolation.

Potential examples:

- account details;
- private messages;
- billing data;
- authorization-sensitive content.

Authentication is not implemented in this lesson. The rule is conceptual: private results are not shared public cache values.

## Request-Specific Responses

Responses that depend on request-specific information are generally more difficult to reuse safely.

Conceptual examples:

- current user;
- authorization context;
- request-specific parameters;
- personalization.

Cookies and headers are later topics. Here, the point is identity of the result: if two requests are not equivalent, they must not share one undifferentiated cached response.

## Caching and Query Parameters

```text
GET /api/products?category=books
```

and:

```text
GET /api/products?category=games
```

represent **different inputs**.

A cache must not accidentally treat different request inputs as the same result. This is a **cache-key** concern. Books and games are different lookups. This lesson does not implement cache key construction.

## Caching Dynamic Parameters

```text
GET /api/products/1
GET /api/products/2
```

These routes represent **different resources**. A correct caching strategy must distinguish them. Product `1` is not product `2`.

This is not a repeat of the dynamic route segments lesson. The path values are different cache identities.

## Caching vs Static Behavior

Keep this distinction careful.

**Static behavior** concerns when and how output can be produced without request-specific runtime information.

**Caching** concerns storing and reusing a previously produced result.

They are related but not identical.

```text
Static
≠ caching

Dynamic
≠ never cacheable in every possible system
```

A static-compatible handler produces a stable result. Caching is the act of keeping and returning a stored result. A dynamic computation might still be stored in some systems. A static result is not automatically cached in every Next.js configuration.

The exact interaction depends on the framework and configuration. This lesson does not go into advanced Next.js internals.

## Caching vs Persistent Storage

| Store | Role |
| --- | --- |
| Database | source of persistent application data |
| Cache | temporary reusable copy or computed result |

```text
Database
→ authoritative data

Cache
→ potentially reusable representation
```

Caches should generally **not** be treated as the only authoritative store of critical business data. If the cache is empty or wrong, the application still needs a source of truth.

## Response Caching Concept

An entire HTTP response can be reusable.

First request:

```text
GET /api/status

Response generated:
{
  "status": "available"
}
```

A potential cache stores that response. A later compatible request **may** receive the same reusable result.

This lesson does **not** claim that a particular Next.js implementation performs this automatically.

## Data Caching Concept

Caching may also apply to **underlying data or computation** rather than the complete HTTP response.

```text
Route Handler
↓
Data lookup
↓
Cached data
↓
Build response
```

The handler still builds an HTTP response. The expensive lookup might be the reused part. This lesson does not teach Next.js Data Cache internals.

## Different Cache Layers

Caching can happen at multiple layers:

- browser;
- intermediary/CDN;
- framework/server;
- application data layer.

“The cache” is not always a single universal store. A browser might reuse a response. A server might reuse computed data. Those are different places. This lesson does not describe specific Next.js cache architecture.

## Caching Is Not Memoization

Caching and memoization are related ideas but not necessarily identical.

- **Caching:** broad reuse of stored results.
- **Memoization:** typically reuses a function result based on inputs.

React Cache and memoization appear later in the roadmap. This lesson does not teach React `cache`.

## Example: Good Cache Candidate

Conceptual endpoint:

```text
GET /api/application-info

{
  "name": "NextReview",
  "purpose": "Study project"
}
```

Characteristics:

- public;
- same for all users;
- rarely changes;
- no request-specific information.

Conclusion: it **may** be a reasonable candidate for caching. It must not be cached merely because the example is simple.

## Example: Poor Shared Cache Candidate

Endpoint:

```text
GET /api/account
```

Characteristics:

- depends on current user;
- contains private data;
- different response per user.

Blindly sharing one cached response across users would be **unsafe**. Alice’s account must not become Bob’s response.

## Example: Freshness-Sensitive Data

Endpoint:

```text
GET /api/inventory/42
```

The underlying quantity changes frequently.

Long-lived reuse → lower computation, but potentially **incorrect inventory**.

That is the freshness trade-off. Performance is not free if the number on screen is wrong.

## Reuse Decision

Educational decision model:

```text
Is the response user-specific or sensitive?

Yes
→ Do not use a shared reusable result without correct isolation.

No
↓
Does the result vary based on request input?

Yes
→ Cache identity must distinguish those inputs.

No
↓
Does the information change frequently?

Yes
→ Freshness requirements must be considered.

No
↓
Caching may be appropriate.
```

This is a **conceptual model**, not the complete Next.js caching algorithm.

## Caching and Performance

Without caching:

```text
100 similar requests
→ potentially 100 computations
```

With a reusable result:

```text
initial computation
→ cached result
→ later compatible requests may reuse it
```

Actual performance depends on:

- workload;
- infrastructure;
- cache location;
- cache hit rate;
- computation cost.

This lesson does not provide benchmarks. Caching **may** help when the same safe result is requested often and the original work is expensive enough to matter.

## Cache Hit Rate

**Cache hit rate** represents how often requested values are successfully served from cache.

High reuse can make caching more beneficial. If almost every request is a miss, the cache adds lookup cost without much reuse. This lesson does not introduce equations or monitoring tools.

## Cache Size

Caches are **finite** resources.

Keeping every possible value forever is generally not practical. Entries expire, are invalidated, or are removed to make room. Eviction algorithms such as LRU, LFU, and FIFO are outside this lesson.

## Current Next.js Context

Modern Next.js has explicit caching capabilities and a **Cache Components** model.

Route Handlers should **not** be assumed to be automatically cached simply because they use `GET`.

Advanced APIs and framework-specific cache semantics will be studied separately. Caching behavior can differ across Next.js versions.

This lesson does not teach:

- `use cache`
- `cacheLife`
- `cacheTag`
- `updateTag`
- `revalidateTag`
- `revalidatePath`

## Caching and Security

Never allow a shared cache entry to expose one user’s private response to another user.

Potential mistakes include failing to distinguish:

- user identity;
- authorization context;
- query parameters;
- dynamic route parameters.

Those mistakes are conceptual here. Authentication is not implemented. The security rule still comes first: isolation before reuse.

## Caching and Correctness

Caching is not only a performance concern.

An incorrect cache strategy can produce **incorrect application behavior**.

Examples:

- old price;
- old inventory count;
- outdated permissions;
- another user’s response.

Therefore:

```text
Correctness first
↓
Caching optimization second
```

A faster wrong answer is still wrong.

## Caching Is an Optimization

Caching should solve a measurable reuse or performance problem.

Do not add caching merely because it exists. Simple or inexpensive operations may not benefit meaningfully from additional caching complexity. An extra cache that is rarely hit is more surface area, not more speed.

## Common Misconceptions

**"Every GET endpoint is automatically cached."**  
False. `GET` is a method. Route Handlers should not be assumed to be automatically cached.

**"Every GET response is safe to cache."**  
False. Personalized, sensitive, or rapidly changing data may be unsafe or incorrect to reuse.

**"Static and cached mean exactly the same thing."**  
False. Static behavior is about how output can be produced. Caching is about storing and reusing a result.

**"Cached data is always current."**  
False. Cached data can be stale.

**"Cache and database are the same thing."**  
False. A database is typically the authoritative store. A cache is a temporary reusable copy or computed result.

**"Caching only affects performance."**  
False. Caching can affect correctness, privacy, and security.

**"Personalized responses can always share the same cache entry."**  
False. Sharing one entry across users can leak private data.

**"A cache miss means the application is broken."**  
False. A miss is a normal event: compute, optionally store, return.

**"More caching is always better."**  
False. Extra caching can add complexity, stale data, and security risk without helping.

**"Cached results can stay forever."**  
False. Caches are finite. Lifetimes and invalidation exist because reuse cannot be unlimited.

**"Invalidation is unnecessary if the first response was correct."**  
False. The first response can be correct and still become stale when the underlying data changes.

## What We Are Not Learning Yet

These topics appear later in the roadmap:

- Cache Components implementation
- `use cache`
- `cacheLife`
- `cacheTag`
- `revalidatePath`
- `revalidateTag`
- `updateTag`
- detailed cache invalidation APIs
- React `cache`
- memoization in `fetch`
- Streaming
- Redirects
- Middleware
- cookies
- headers
- authentication
- databases

## Key Takeaways

1. **Caching** means storing a previously produced result so it can potentially be reused.
2. Results may be reused to reduce repeated work and latency—when reuse is safe and worthwhile.
3. A **cache hit** means the stored result was found and reused.
4. A **cache miss** means the result was missing; work runs, and the result may then be stored.
5. A **cache key** identifies which stored result belongs to which input or computation.
6. **Stale data** is cached information that no longer matches the current underlying state.
7. **Invalidation** makes a cached result no longer reusable; Next.js-specific APIs come later.
8. **Freshness** and **performance** trade off: more reuse can mean older data.
9. **`GET` does not automatically mean cached**, and not every `GET` response is safe to cache.
10. **Public** data is easier to cache safely than **personalized** data.
11. Request inputs (query values, path identities) must be distinguished in cache identity.
12. **Caching** and **static behavior** are related but different.
13. A **cache** is not a **database**; the cache is not the authoritative store of critical data.
14. Caching can affect **correctness** and **security**; get those right before optimizing.
15. Modern Next.js has advanced caching APIs (`use cache`, `cacheLife`, `cacheTag`, revalidation helpers, and others) that will be studied later.
