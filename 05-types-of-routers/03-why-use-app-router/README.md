# Why Use App Router?

## Overview

Next.js supports two major routing systems: **Pages Router** and **App Router**.

App Router is the newer routing architecture and the main direction for modern Next.js development. Newer application capabilities are designed to fit this model.

Pages Router remains supported and relevant. Many existing projects use it successfully. App Router is not universally superior. The choice still depends on the project.

This lesson explains *why* teams commonly choose App Router. It does not teach how to implement it.

## Modern Framework Direction

App Router is where newer Next.js application capabilities are designed to integrate most naturally.

That does not mean Pages Router stops working. It means the framework’s current design effort is centered on App Router as the routing model for new applications.

## Application Structure

App Router organizes application behavior around **route segments** inside the `app/` directory.

Grouping route-related concerns by segment can improve organization because related UI and behavior for a URL area can live together. A dashboard section, for example, can keep its page content and related route-level concerns in one place rather than scattering them across unrelated files.

This lesson stays at that conceptual level. Detailed folder conventions are later topics.

## Layout Capabilities

App Router supports **layouts** as part of its routing model.

Persistent shared UI can be useful for:

- navigation that stays visible while the page content changes;
- a shared page structure such as headers, sidebars, or shells;
- nested sections that reuse surrounding interface at different levels of the application.

Layouts and Templates is a later roadmap lesson. This section only explains why the capability exists.

## Loading States

App Router integrates loading behavior into the routing model.

Route-level loading UI can improve user experience because a section of the application can show that work is in progress while content is still being prepared. The rest of the interface does not have to wait without feedback.

Loading and Streaming is a later roadmap topic. This lesson does not teach loading files or streaming internals.

## Error Handling

App Router integrates route-level error handling patterns.

Isolating failures by application section can be useful because one failing area does not have to take down the entire interface. A reports section can fail while account and settings remain usable.

Error States is a later roadmap topic. This lesson does not teach error-file mechanics.

## Server-Oriented Capabilities

App Router is designed around newer React and Next.js **server-oriented** capabilities.

At a conceptual level, **Server Components** are part of that direction: some UI and application logic can remain on the server when that is appropriate. Not every piece of an application needs to run in the browser.

Server Component syntax, Client Components, `"use client"`, server/client composition, and data fetching are later topics. This lesson only notes that App Router is built to work with that model.

## Reduced Client JavaScript Potential

Server-oriented rendering models **can** reduce the amount of JavaScript that needs to be sent to the browser in some cases.

That **may** happen depending on the application: how much work stays on the server, how interactive the UI is, and how the application is structured. App Router does not automatically shrink bundles. This lesson does not teach optimization techniques.

## Route-Level Composition

App Router enables application behavior to be composed around route segments.

At a high level, related concerns for a segment can conceptually include:

- page content;
- shared layout;
- loading behavior;
- error behavior.

Those concerns belong to later lessons as concrete files and APIs. Here they are only a composition model: routing can coordinate more than a single page component.

## Nested UI

Nested application structures can benefit from nested routing and shared UI. Different levels may share interface structure while showing different content.

Conceptual hierarchy:

```text
Dashboard
├── Overview
├── Reports
└── Settings
```

The dashboard shell may stay in place while Overview, Reports, and Settings change. Nested layouts are not implemented in this lesson.

## Advanced Routing Foundation

App Router provides the foundation for more advanced routing capabilities. Later roadmap topics include, by name only:

- route groups;
- parallel routes;
- intercepting routes.

This lesson does not explain how they work.

## Framework Integration

App Router is designed to integrate multiple Next.js application concerns around routing. Conceptually, those concerns include:

- rendering;
- layouts;
- loading;
- errors;
- server/client behavior.

None of these is taught individually here. The motivation is that routing can be the organizing center for several application-level capabilities rather than a separate navigation layer only.

## Why It Can Help Larger Applications

Conceptual benefits for larger applications can include:

- clearer organization around route segments;
- route-level composition of related concerns;
- shared UI structures that reduce duplicated shells;
- framework conventions that teams can follow;
- integration with newer Next.js capabilities.

Architecture quality still depends on good engineering decisions. Choosing App Router does not automatically produce a well-structured application.

## New Projects

For new Next.js applications, App Router is generally the modern starting point.

Developers do not always have to use it. Project requirements, team knowledge, and existing architecture still matter. “Generally the modern starting point” is a default, not a mandate.

## Existing Pages Router Projects

A project using Pages Router does not automatically need to be rewritten.

Continuing with Pages Router may be reasonable because of:

- existing stability;
- project maturity;
- migration cost;
- team familiarity;
- requirements already being met.

This lesson does not teach migration.

## Learning Curve

App Router introduces concepts developers need to learn, for example:

- special route files;
- server and client boundaries;
- nested routing concepts;
- framework conventions.

Those concepts are later lessons. The point here is that App Router is not only a different folder name; it is a different mental model with a learning cost.

## Trade-offs

Choosing App Router also involves trade-offs:

- additional framework concepts to learn;
- a different mental model from Pages Router;
- migration considerations for existing applications;
- evolving framework conventions;
- complexity that may be unnecessary for some simple projects.

The comparison should stay balanced: newer capabilities come with conceptual overhead.

## Pages Router vs App Router Motivation

| Concern | Pages Router | App Router |
| --- | --- | --- |
| Generation | Earlier routing architecture | Newer routing architecture |
| Main directory | `pages/` | `app/` |
| Modern Next.js direction | Supported | Primary direction for new applications |
| Route-level composition | More limited model | Broader integrated model |
| New framework capabilities | Some remain available elsewhere | Designed to integrate newer capabilities |

This table is motivational, not a feature benchmark.

## Why Not Always Use App Router?

App Router may not automatically be the best choice when:

- maintaining an established Pages Router project;
- migration cost outweighs benefits;
- the application is simple;
- the team does not need newer architectural capabilities.

No migration strategy is recommended here. The decision belongs to the project’s constraints.

## Common Misconceptions

**"Pages Router is deprecated and unusable."**  
False. Pages Router remains supported and is still used in many existing projects.

**"App Router automatically makes an application faster."**  
False. Performance depends on how the application is built. App Router does not guarantee speed by itself.

**"App Router means everything runs on the server."**  
False. It is designed around server-oriented capabilities, but applications can still include browser-side behavior where needed.

**"App Router eliminates client-side JavaScript."**  
False. It can reduce client JavaScript in some cases. It does not remove client JavaScript from Next.js applications.

**"App Router is only useful for large applications."**  
False. New projects of many sizes may start with it. Size is not the only reason to choose it.

**"Using App Router automatically creates good architecture."**  
False. The routing model provides structure and conventions. Architecture quality still depends on engineering decisions.

## Key Takeaways

1. App Router is the modern routing direction in Next.js.
2. It integrates newer application-level capabilities around routing.
3. Layouts can provide persistent shared UI across routes and nested sections.
4. Route-level loading and error handling can improve experience and isolate failures.
5. App Router works with newer server-oriented React capabilities.
6. It provides a foundation for more advanced routing patterns studied later.
7. It may help structure larger applications through route-level organization.
8. Pages Router remains supported and relevant.
9. App Router introduces a different mental model and a learning curve.
10. Choosing a router still depends on project requirements.
