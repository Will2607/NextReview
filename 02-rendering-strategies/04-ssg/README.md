# Static Site Generation (SSG)

## Overview

**Static Site Generation (SSG)** is a rendering strategy in which page output is generated before a user request, commonly during a build process.

Mental model:

```text
Build
↓
Render
↓
Generated output
↓
Stored result
↓
User request
↓
Existing output is served
```

The main distinction is *when* rendering occurs: before the individual request, not while that request is being handled. This lesson is framework-agnostic and does not teach how any specific framework implements static generation.

## What Does "Static" Mean?

In SSG, **static** refers to pre-generated output. It does **not** necessarily mean:

- no JavaScript;
- no interaction;
- no application logic;
- no dynamic behavior after loading;
- that content can never change.

The generated output remains the same until another generation process produces a new version. How and when that regeneration happens is outside this lesson.

## Build Time

**Build time** is the stage where application source code and available data can be processed to create deployable output. With SSG, page rendering can happen during this stage: pages are produced ahead of time and stored as part of the build result.

This lesson does not teach build tooling internals. The important idea is that generation occurs before users ask for the page.

## Basic SSG Flow

A simplified lifecycle:

1. The application build starts.
2. Required content is available.
3. Page representations are generated.
4. Generated output is stored as part of the build.
5. A user later requests a page.
6. The existing generated representation is returned.

No real build system is required to understand the idea—only the order: generate first, serve later.

## Before the User Request

The defining characteristic of SSG is that rendering happens before the individual user request:

```text
render first
↓
request later
```

That differs from request-time rendering, where the representation is produced while handling the request. This lesson stays focused on SSG timing rather than repeating other strategies in depth.

## Pre-Generated Output

Generated page output already exists before the request arrives. Because the representation was prepared earlier, a simplified SSG model can reduce the amount of rendering work required when requests occur.

That does not remove all server or infrastructure work. It means the *page rendering* step was already completed for that version of the content.

## Request Flow

```text
User request
↓
Locate generated output
↓
Return generated output
↓
Browser displays content
```

This is a simplified model. In practice, hosting and delivery details vary. Conceptually, the request is fulfilled from output that already exists.

## Content Freshness

Pre-generated content represents the data available when generation occurred. Conceptual timeline:

```text
10:00 — Build generates page using current content
10:30 — Source data changes
10:31 — Existing generated page may still represent the earlier data
```

A new generation process may be needed to incorporate updated content. This lesson does not introduce later strategies for updating generated pages after deploy.

## Suitable Content

SSG can fit content that:

- changes infrequently;
- can be known before requests;
- is shared across many users;
- does not depend heavily on request-specific information.

Conceptual examples:

- documentation;
- marketing content;
- public informational pages;
- articles;
- product information that changes infrequently.

These are fit signals, not rules that every such page must use SSG.

## Request-Specific Content

Fully request-specific or personalized content may not fit a simple SSG model as naturally. Conceptual examples:

- personalized dashboard;
- current account balance;
- user-specific information.

If each user needs a different representation based on the current request, pre-generating one shared output is a weaker match. Alternative approaches are not covered here.

## Initial Content

Meaningful page content can already exist in the generated output sent to the browser. That may be useful for:

- initial content delivery;
- users who should see useful content quickly;
- search engines that process page content.

These are potential benefits, not absolute performance guarantees.

## JavaScript and Interactivity

SSG does not mean JavaScript cannot run in the browser. A pre-generated page may still include browser-side JavaScript for:

- menus;
- interactive forms;
- filters;
- other user interactions.

Rendering timing and browser interactivity are separate concerns. A page can be generated ahead of time and still become interactive after load.

## Server Work at Request Time

Because rendering was already performed, a simplified SSG model requires less rendering work when a request arrives. Servers or infrastructure may still perform other work, such as locating and delivering the stored output. Hosting architecture is outside this lesson.

## Build Cost

Rendering work is moved earlier into the generation/build process. Conceptual consequences:

- more pages can increase generation work;
- more data can increase generation work;
- large sites may require longer builds.

Build cost is the trade-off for preparing output before requests.

## Scalability Considerations

Serving existing generated output can be efficient because repeated requests do not necessarily require repeated page rendering. That is a simplified conceptual advantage—not a claim of unlimited scalability. Delivery details such as CDNs are not studied here.

## Network Considerations

The browser can receive generated content without waiting for page rendering to occur after the request reaches the application. Network latency still exists: the response must still travel to the user. SSG does not eliminate network cost; it can reduce request-time rendering work.

## SEO Considerations

Meaningful generated content can exist in the page output before browser JavaScript executes. That can be useful for discoverability because content is present in what is delivered.

Clarify:

- SSG does not automatically guarantee good SEO;
- SEO depends on content, metadata, site structure, accessibility, and other factors.

Metadata implementation is out of scope.

## Performance Considerations

Potential advantages:

- rendering already completed;
- reduced request-time rendering work;
- meaningful initial content.

Possible costs:

- generation time;
- stale content relative to newer source data;
- large build workload for many pages.

Overall performance depends on the application architecture and how well the content fits pre-generation.

## SSG vs SSR

| SSG | SSR |
| --- | --- |
| Rendering happens before requests | Rendering happens when a request is handled |
| Output can be reused for multiple requests | Output can be generated for a specific request |
| Freshness depends on regeneration | Request-time information can influence rendering |

The core difference is timing. This table is only a concise contrast, not a repeat of the full SSR lesson.

## SSG vs SPA

SSG describes *when* page output is generated.  
SPA describes application/navigation behavior.

They answer different questions and are not opposites. This lesson does not expand the comparison further.

## Advantages of SSG

Potential advantages (not guarantees):

- pre-generated content;
- reduced rendering work per request;
- useful initial content;
- potential performance benefits;
- potential SEO benefits;
- predictable output for a given generation.

## Trade-offs of SSG

SSG also involves trade-offs:

- generation/build time;
- content freshness;
- need to regenerate when source content changes;
- difficulty with heavily personalized content;
- build complexity for very large numbers of pages.

Solutions to these trade-offs are later topics. This lesson only identifies them.

## When SSG May Be Appropriate

SSG may fit conceptual cases such as:

- documentation;
- blogs;
- marketing pages;
- public informational content;
- pages based on data that changes infrequently.

## When SSG May Be Less Appropriate

SSG may be less appropriate for:

- highly personalized pages;
- information that changes constantly;
- content that must reflect request-specific information immediately.

This lesson does not recommend another strategy for those cases.

## SSG Does Not Mean "No Server"

Pre-generated output still needs to be delivered to users somehow. Servers or hosting infrastructure may still be involved in serving resources. SSG changes *when pages are rendered*, not whether delivery infrastructure exists.

## SSG Does Not Mean "No JavaScript"

Rendering timing and browser interactivity are separate concerns. A page can be statically generated and still contain interactive JavaScript after it loads.

## Simplified SSG Mental Model

```text
Build process
|
| Render
v
Generated page
|
| Stored
v
User requests page
|
v
Existing generated output returned
```

Pages are rendered during the build, stored, and later returned as already-prepared output when users request them.

## Common Misconceptions

**"Static means the page can never change."**  
False. A new generation can produce a new version of the output.

**"SSG means JavaScript cannot be used."**  
False. Pre-generated pages can still include browser-side JavaScript.

**"SSG means there is no server."**  
False. Generated output still needs to be delivered somehow.

**"SSG and SPA are opposites."**  
False. They describe different concerns: generation timing vs application/navigation behavior.

**"SSG is always faster."**  
False. Request-time rendering work may decrease, but build cost, freshness, and network still matter.

**"SSG automatically provides perfect SEO."**  
False. Meaningful initial content can help, but SEO depends on many factors.

**"SSG works well for every type of content."**  
False. Highly personalized or constantly changing content may fit poorly.

## Key Takeaways

1. SSG generates page output before user requests, commonly during a build.
2. Rendering happens before the individual request.
3. Generation commonly occurs during a build process.
4. Generated output can be reused across many requests.
5. SSG can reduce request-time rendering work.
6. Content freshness can become a trade-off until the next generation.
7. Build time and page count can affect generation cost.
8. SSG can still include browser-side JavaScript.
9. SSG differs from SSR primarily in rendering timing.
10. SSG is appropriate only when application requirements fit the strategy.
