# SPA vs SSR

## Overview

Web applications can distribute rendering responsibilities differently between the browser and the server. Two important approaches for understanding where and when user interface content is produced are:

- **Single Page Applications (SPA)**
- **Server-Side Rendering (SSR)**

This lesson is a conceptual comparison. It does not teach a specific framework or show how to implement either approach in production code.

## What Is a Single Page Application?

A **Single Page Application (SPA)** is a web application in which the browser initially loads the application, and JavaScript takes significant responsibility for updating the interface afterward.

Conceptually:

- the browser loads the application once at the start;
- JavaScript drives much of the visible UI after that load;
- subsequent view changes can happen without requesting an entirely new HTML page from the server;
- the result can feel like an interactive client-side application rather than a sequence of full page reloads.

The defining idea is not a particular library—it is that the client application remains loaded and updates the UI as the user interacts.

## Basic SPA Flow

```text
Browser
↓
Initial request
↓
Server
↓
HTML + JavaScript
↓
Browser executes JavaScript
↓
Application renders and updates the UI
```

1. **Browser** — the user opens the application.
2. **Initial request** — the browser asks the server for the application entry point.
3. **Server** — responds with the initial document and the JavaScript needed to run the app.
4. **HTML + JavaScript** — the browser receives a shell (or bootstrap page) plus scripts.
5. **Browser executes JavaScript** — the client application starts.
6. **Application renders and updates the UI** — further interface changes are driven largely by client-side logic.

## What Is Server-Side Rendering?

**Server-Side Rendering (SSR)** means the server generates HTML for a request and returns that HTML to the browser.

Conceptually:

- the browser sends a request;
- the server processes the request;
- the server generates HTML;
- the generated HTML is returned to the browser;
- the browser can display the returned content.

The key idea is that meaningful markup is produced on the server as part of handling the request, rather than relying only on the browser to build the full representation after JavaScript runs.

## Basic SSR Flow

```text
Browser
↓
Request
↓
Server
↓
Generate HTML
↓
HTML response
↓
Browser displays content
```

1. **Browser** — the user navigates to a URL.
2. **Request** — the browser asks the server for that page.
3. **Server** — receives and processes the request.
4. **Generate HTML** — the server builds the HTML representation for the response.
5. **HTML response** — that markup is sent back.
6. **Browser displays content** — the user can see the returned content.

## Client and Server Responsibilities

The **client** (browser) typically:

- displays the UI;
- runs browser-side JavaScript;
- responds to user interactions such as clicks and form input.

The **server** typically:

- receives requests;
- processes server-side logic;
- generates responses;
- may generate HTML as part of those responses.

These roles exist in both SPA and SSR architectures. The difference is how much of the UI representation is produced on each side, and when that work happens relative to the request.

## Initial Page Load

On the **initial request**, the approaches differ conceptually:

- A **SPA** may depend more heavily on JavaScript before the complete interactive interface is available. The first response may include a limited HTML shell plus scripts that build or complete the UI in the browser.
- **SSR** can provide generated HTML in the initial response, so the browser receives more of the page content already prepared by the server.

Neither approach is always faster. Actual performance depends on architecture, network conditions, server processing time, JavaScript size, caching, and many other factors.

## Navigation After Initial Load

After the first load:

- **SPAs** commonly update views from the client. The application is already running, so changing what the user sees may not require downloading an entirely new HTML document.
- **Traditional SSR** approaches may involve additional requests that return newly generated HTML for each navigation.

This is a conceptual contrast, not a claim that every SPA or every SSR system behaves the same way in every product.

## UI Interactivity

SPAs are commonly associated with highly interactive applications because much of the UI update loop lives in the browser after the application loads.

Server-rendered pages can also contain interactive JavaScript. SSR describes where the initial (or request-time) HTML is produced; it does not mean the page cannot become interactive afterward.

## SEO Considerations

Search engines need to discover and interpret page content. Having meaningful HTML available in the initial response can be useful in some scenarios because that content is present without waiting for client-side rendering to finish.

That said:

- a SPA does **not** automatically mean bad SEO;
- SSR does **not** automatically guarantee good SEO.

Modern search engines and modern SPA architectures can handle many scenarios that historically caused SEO difficulties. SEO outcomes depend on content quality, structure, indexing behavior, and overall architecture—not on the SPA/SSR label alone.

## Performance Considerations

Performance is a trade-off, not a single winner. Relevant factors include:

- network requests;
- how much JavaScript must download and run;
- server processing time;
- client processing time;
- overall application size;
- how frequently users interact with the interface.

Moving work to the server or the client changes *where* cost appears. It does not remove cost entirely.

## Client Work vs Server Work

Different architectures distribute work differently:

- A **SPA** may place more rendering and application work in the browser.
- **SSR** may place more rendering work on the server for each request that needs generated HTML.

This is a simplified conceptual model, not an absolute rule. Real systems often mix responsibilities.

## SPA Advantages

A SPA approach can offer:

- rich client-side interactions;
- smooth view transitions once the application is loaded;
- reduced need for complete document reloads;
- interactive, application-like experiences.

These are common strengths, not guarantees for every project.

## SPA Trade-offs

A SPA approach may also involve:

- increased JavaScript responsibility on the client;
- larger client-side complexity as the application grows;
- initial loading considerations (scripts must be available before the full client experience is ready);
- additional client-side concerns around keeping application state consistent with what the user sees.

## SSR Advantages

SSR can offer:

- HTML generated before the response reaches the browser;
- useful initial content delivery in the first response;
- reduced dependency on client-side rendering for that initial content;
- potential SEO benefits in appropriate scenarios.

Again, these are possible advantages—not absolute performance claims.

## SSR Trade-offs

SSR may also involve:

- server rendering work for requests that need generated HTML;
- additional server resources under load;
- request/response overhead when each navigation depends on a new server-generated document;
- increased server involvement in the rendering path.

The comparison stays balanced: SSR moves work; it does not eliminate complexity.

## SPA vs SSR Comparison

| Aspect | SPA (conceptual) | SSR (conceptual) |
|--------|------------------|------------------|
| Where rendering primarily happens | Often more in the browser after load | On the server for the request response |
| Initial HTML | May be a shell; fuller UI may depend on JavaScript | Can include generated page content |
| JavaScript responsibility | Commonly high for UI updates | Still possible; less central for initial markup |
| Navigation behavior | Often updates views on the client | May return newly generated HTML per request |
| Server involvement | Serves the app and data; less UI HTML per view change | Involved in generating HTML for requests |
| Client involvement | High for rendering and interactions | Displays HTML; may add interactivity |
| Common strengths | Interactive, app-like experiences | Meaningful HTML in the initial response |
| Common trade-offs | Client complexity and initial JS cost | Server cost and request involvement |

Wording stays careful: products vary, and these rows describe tendencies, not hard rules.

## They Are Not Necessarily Mutually Exclusive

Modern web applications can combine client-side and server-side rendering ideas. SPA and SSR describe useful mental models for where work happens, but they are not always exclusive architectural choices.

This lesson does not cover hybrid implementation details or later rendering strategies. The point for now is simply that real systems may use more than one idea at once.

## When a SPA Approach May Be Useful

A SPA-oriented approach may fit:

- dashboards;
- highly interactive tools;
- application-like interfaces;
- interfaces with frequent client interactions after load.

These are conceptual examples, not prescriptions of a specific framework.

## When SSR May Be Useful

SSR may fit:

- content that should be available in the initial response;
- pages where server-generated HTML is beneficial;
- applications where server-side processing is already important for producing the response.

Choose based on product needs, not on the assumption that one label is always better.

## Key Takeaways

1. A **SPA** loads an application into the browser and relies heavily on JavaScript to update the UI.
2. **SSR** generates HTML on the server as part of handling a request.
3. Rendering work can occur on the client, the server, or both.
4. On the initial request, SPAs may depend more on JavaScript, while SSR can return generated HTML.
5. After load, SPAs commonly update views on the client; traditional SSR may return new HTML for navigation.
6. The core trade-off is how client and server share responsibility for producing and updating the UI.
7. Meaningful initial HTML can help SEO in some cases, but SPA ≠ bad SEO and SSR ≠ guaranteed SEO.
8. Performance depends on network, JavaScript size, server work, and more—not on labels alone.
9. Neither approach is universally superior.
10. Modern applications can combine rendering approaches rather than choosing only one forever.
