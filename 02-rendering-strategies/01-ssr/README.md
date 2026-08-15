# Server-Side Rendering (SSR)

## Overview

**Server-Side Rendering (SSR)** is a rendering strategy in which the server produces the page representation in response to a request, then sends that result to the browser.

Basic mental model:

```text
Request
↓
Server
↓
Render
↓
Response
↓
Browser
```

SSR describes *where* rendering occurs (on the server) and *when* it commonly occurs (while handling a request). This lesson is framework-agnostic and does not teach how any specific framework implements SSR.

## What Does "Server-Side" Mean?

In SSR, the rendering work takes place in a server environment rather than relying entirely on the user’s browser to produce the initial representation.

Conceptually, the server may have access to information such as:

- request information;
- server-side data;
- user-specific context;
- application logic.

Those are sources of input for rendering. This lesson does not introduce runtimes, cookies, authentication, databases, or APIs.

## Basic SSR Request Flow

A conceptual SSR lifecycle looks like this:

1. The browser requests a page.
2. The server receives the request.
3. The server obtains or prepares the required information.
4. The server renders a representation of the page.
5. The server sends the generated response.
6. The browser displays the received content.

No real HTTP server is required to understand the idea—only the order of responsibilities.

## When Rendering Happens

In a typical SSR model, rendering occurs when a request is processed:

```text
request → render → response
```

The representation is produced as part of handling that request, using information available at that moment. Other rendering strategies exist and will be studied separately; this lesson stays focused on SSR timing.

## What the Browser Receives

With SSR, the browser can receive meaningful generated page content as part of the response. The initial representation is already prepared before (or as) the response arrives.

That differs from architectures where the browser must perform most of the initial rendering work after downloading and running application code. This lesson does not expand into those alternative strategies.

## SSR Does Not Mean "No JavaScript"

Server-rendered pages can still use browser-side JavaScript for interaction. Conceptual examples include:

- opening a menu;
- editing a form;
- responding to clicks;
- updating interactive controls.

SSR describes how the initial representation is produced. It does not forbid client-side interactivity afterward.

Hydration—attaching client-side behavior to server-produced markup—is related in some architectures. It is outside the scope of this lesson.

## Server and Browser Responsibilities

A simplified division:

**Server**

- receives the request;
- prepares information;
- renders the initial representation;
- returns the response.

**Browser**

- receives the response;
- displays the content;
- may later execute JavaScript for interaction.

Real applications may distribute responsibilities in more complex ways. This model is a teaching simplification, not a complete architecture diagram.

## Request-Specific Content

SSR can be useful when content depends on the current request. Conceptual examples include:

- user-specific dashboard information;
- request-specific content;
- frequently changing information.

Because rendering happens while handling the request, different requests can produce different output. Authentication mechanisms and data-fetching APIs are not covered here—only the idea that request context can shape the result.

## Content Freshness

Rendering during a request can make it possible to produce output using information available at that moment. That can be useful when content needs to be relatively fresh.

SSR does **not** automatically guarantee perfectly fresh data. Freshness still depends on where the information comes from and how the application prepares it. Caching and revalidation are separate topics.

## Initial Content

SSR can provide meaningful content in the initial response. Conceptually, that may help because:

- users can receive useful content without depending entirely on client rendering;
- content can exist in the response before browser-side application logic completes.

These are potential benefits, not absolute performance guarantees.

## SEO Considerations

Having meaningful content in the initial response can be useful for search engine discovery, because content is present in what the server returns.

Clarify the limits:

- SSR does not automatically guarantee good SEO;
- SEO depends on many factors beyond rendering;
- other architectures can also support SEO.

Metadata APIs are out of scope.

## Performance Considerations

SSR has both potential benefits and costs. Considerations include:

- meaningful initial content;
- server processing;
- network latency;
- response generation time;
- client-side JavaScript;
- infrastructure capacity.

SSR is not inherently faster in every situation. It moves work to the server for each rendered request and still depends on the network path between browser and server.

## Server Cost

Performing rendering for requests consumes server resources. Conceptually that includes:

- CPU;
- memory;
- request volume;
- rendering work.

Higher traffic or heavier pages means more server work. This lesson does not teach infrastructure design—only that SSR has a server-side cost.

## Network Considerations

The user must wait for a request to reach the server and for a response to return. Network latency and server processing can both influence how soon content appears. Exact timings vary by environment; the important idea is the request-response dependency.

## Advantages of SSR

Potential advantages (not guarantees):

- meaningful initial content in the response;
- request-time rendering;
- access to server-side information when preparing output;
- potential SEO benefits in appropriate scenarios;
- useful behavior for request-dependent content.

Whether these matter depends on the product’s requirements.

## Trade-offs of SSR

SSR also involves trade-offs:

- server rendering cost;
- increased server involvement for each rendered request;
- response latency from the request-response round trip;
- infrastructure requirements under load;
- repeated rendering work across requests;
- architectural complexity compared with simpler pages.

Caching is not presented here as the solution; it belongs to later topics.

## When SSR May Be Appropriate

SSR may be appropriate for conceptual cases such as:

- content that depends on the current request;
- frequently changing content;
- personalized pages;
- pages where useful initial content is important.

Appropriateness is a product decision, not an automatic rule.

## When SSR May Be Unnecessary

SSR may be unnecessary when:

- content changes very rarely;
- pages are extremely simple;
- request-time rendering provides little benefit.

Alternative strategies are not explained in this lesson.

## SSR Is a Trade-off

SSR is one rendering strategy. It solves certain problems—especially request-time, server-produced initial content—while introducing costs such as server work and request latency.

The appropriate rendering strategy depends on application requirements. Comparing all strategies comes later; for now, understand SSR on its own terms.

## Simplified SSR Mental Model

```text
Browser
|
| Request
v
Server
|
| Prepare data
| Render page
v
Generated response
|
v
Browser displays content
```

The browser asks for a page. The server prepares what it needs, renders the representation, and returns it. The browser then displays that content and may add interactivity later.

## Common Misconceptions

**"SSR means the browser does no work."**  
False. The browser still receives, displays, and often runs JavaScript for interaction.

**"SSR means JavaScript is not used."**  
False. SSR can produce the initial representation while client-side JavaScript still powers interactivity.

**"SSR is always faster."**  
False. Speed depends on server work, network latency, page complexity, and other factors.

**"SSR automatically provides perfect SEO."**  
False. Meaningful initial HTML can help discovery, but SEO depends on many factors.

**"Every page should use SSR."**  
False. Some pages gain little from request-time server rendering.

## Key Takeaways

1. SSR means the server produces the page representation for a request.
2. Rendering occurs on the server.
3. SSR commonly happens in response to a request (`request → render → response`).
4. The browser receives generated content in the response.
5. Browser-side JavaScript can still be used for interaction.
6. Request-specific information can influence the rendered result.
7. SSR can provide useful initial content without relying only on client rendering.
8. SSR consumes server resources for rendering work.
9. SEO and performance involve considerations and trade-offs, not guarantees.
10. SSR is one strategy with benefits and costs; choose it based on requirements.
