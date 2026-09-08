# Intercepting Routes

The goal of this lesson is to understand Intercepting Routes in the Next.js App Router. Some navigation should preserve the user’s current UI context instead of always replacing the whole view. Intercepting Routes let destination content appear inside that context, while direct visits can still use the destination’s normal page.

This lesson focuses only on Intercepting Routes.

## Overview

Some navigation experiences should preserve the user’s current UI context.

Example:

```text
Gallery
↓
User selects a photo
↓
Photo appears as a modal over the gallery
```

But:

```text
User directly visits the photo URL
↓
Photo appears as a full page
```

**Intercepting Routes** allow an application to show route content from another location while preserving the context of the current navigation. The destination can stay the same. The presentation can depend on how the user arrived.

This explanation stays introductory. Conventions and examples follow below.

## The Problem Intercepting Routes Solve

Normal navigation often replaces the current view with the destination route.

Example:

```text
/gallery
↓
click photo
↓
/photos/123
```

Without a context-preserving routing pattern, the gallery may disappear completely. The user leaves the list and lands on a standalone photo page.

Some interfaces instead want:

```text
Gallery
↓
click photo
↓
Photo modal appears
↓
Gallery remains visible behind it
```

That is where Intercepting Routes can be useful. The photo is still a real destination. In-app navigation can show it without discarding the gallery.

## Internal Navigation vs Direct Navigation

Keep this distinction careful.

**Internal navigation:**

The user is already on:

```text
/gallery
```

Then selects:

```text
/photos/123
```

Desired UI:

- Gallery remains visible
- Photo appears as an overlay

**Direct navigation:**

The user opens:

```text
/photos/123
```

Desired UI:

- Photo full page

The URL can represent the **same destination** while the presentation depends on **navigation context**. Internal navigation has a surrounding screen to keep. Direct navigation does not.

## What Is an Intercepting Route?

An **Intercepting Route** is a routing pattern that allows a route to be rendered from within another route context instead of always using its normal full-page presentation.

```text
Current route
↓
Navigation toward another route
↓
Navigation is intercepted
↓
Destination content is rendered within current UI context
```

Direct navigation can still use the destination’s normal route. Interception does not delete the standalone page. It provides a contextual presentation when navigation starts from the matching source route.

## Intercepting Route Conventions

Intercepting Routes use these conventions:

- `(.)`
- `(..)`
- `(..)(..)`
- `(...)`

They describe **route-segment relationships**. They are not ordinary filesystem traversal operators such as “go up one folder on disk.” Next.js matches interception against **route segments**.

These conventions are based on route segments, not necessarily raw filesystem directory depth. The next sections introduce each convention at an introductory level.

## (.) Convention

`(.)` means intercept a route at the **same route-segment level**.

Conceptual example:

```text
app/
├── feed/
│   ├── page.tsx
│   └── (.)photo/
│       └── [id]/
│           └── page.tsx
└── photo/
    └── [id]/
        └── page.tsx
```

The intercepted `(.)photo` folder targets content associated with a `photo` route at the same routing level as `feed`. From `feed`, navigating toward that photo route can be intercepted. The standalone `photo/[id]/page.tsx` remains the normal destination.

This filesystem diagram is only a sketch. Real placement depends on where the source and target segments live.

## (..) Convention

`(..)` means intercept a route **one route-segment level above**.

Conceptual diagram:

```text
Current segment
└── child
    └── (..)target   → intercepts target one segment above
```

This is similar to moving upward conceptually in **route segments**, not necessarily “one physical directory on disk.” The important unit is the route segment.

## (..)(..) Convention

`(..)(..)` means intercept a route **two route-segment levels above**.

It is the same idea as `(..)`, one more segment up. Keep the mapping simple: two `(..)` pairs, two segment levels above. Nested examples beyond that are not needed here.

## (...) Convention

`(...)` means intercept a route **relative to the app root**.

The interception is described from the root of the App Router tree, not from the current segment’s immediate neighbor. This lesson does not introduce unrelated root routing concepts. The useful idea is: `(...)` reaches toward a root-level relationship.

## Route Segments vs Filesystem Depth

Intercepting route conventions reason about **route segments**.

That distinction matters because Next.js route structure can contain directories that do not necessarily correspond directly to URL segments. Filesystem structure and route-segment structure are not always identical.

This lesson does not introduce Route Groups as a new topic. Remember only that counting physical folders is not the same as counting route segments.

## Modal Navigation Example

Canonical conceptual scenario:

```text
Gallery
├── Photo 1
├── Photo 2
└── Photo 3
```

The user starts at `/gallery`, then selects Photo 2. The URL becomes conceptually `/photo/2`.

UI:

```text
┌─────────────────────────────┐
│ Gallery                     │
│                             │
│   ┌─────────────────────┐   │
│   │ Photo 2 Modal       │   │
│   └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

Directly visiting `/photo/2` renders:

```text
┌─────────────────────────────┐
│ Photo 2 Full Page           │
└─────────────────────────────┘
```

Contextual navigation keeps the gallery as the user’s place in the application. The photo appears without throwing that place away. Direct visits still get a complete photo page. That combination improves contextual navigation without losing a real destination.

## Why the URL Still Matters

The destination can still have a meaningful URL.

Potential benefits:

- browser history;
- direct linking;
- refresh behavior;
- sharing;
- Back button behavior.

Not every modal requires a URL. Temporary confirmations and tooltips often stay local. When the opened item is a shareable place, a route-backed destination can help.

## Preserving Context

Intercepting Routes can preserve the UI the user was previously interacting with.

Example:

- Gallery remains visible
- while
- selected photo is presented

Another conceptual example:

```text
Product list
+
Product details overlay
```

The list stays. Details appear in context. These examples stay conceptual.

## Navigation Context

Presentation can depend on **how** the user reached a route.

In-app navigation:

```text
List
→ Details overlay
```

Direct navigation:

```text
Details full page
```

That is one of the main ideas behind Intercepting Routes. Same destination, different presentation, based on navigation context.

## Hard Navigation vs Client Navigation

Introduce only the conceptual difference.

**Client-side navigation:**  
The application already has navigation context. The user is inside the app, moving from the current route toward another. Interception can use that context.

**Direct/full navigation:**  
The destination is loaded independently. There may be no surrounding gallery or list to keep. The normal full-page route is the natural presentation.

This difference is relevant to intercepted route behavior. This lesson does not teach router internals or specific browser APIs.

## Intercepting Routes and Modals

Modals are a common use case. Intercepting Routes are fundamentally about **routing behavior**, not about visual modal styling.

Important distinction:

- **Intercepting Route** → determines routing/presentation context
- **Modal component** → determines UI presentation

A modal is one way to show intercepted content. The intercepting pattern is not CSS. This lesson does not include styling.

## Intercepting Routes Are Not Just Modals

Modal navigation is the most recognizable example. The concept can apply to other contextual presentations.

Examples may include:

- previews;
- detail overlays;
- contextual panels.

The shared idea is context-preserving presentation of another route, not a specific overlay style.

## Relationship to Parallel Routes

Intercepting Routes and Parallel Routes can be used together.

- **Parallel Routes:** allow multiple route-driven regions to exist simultaneously.
- **Intercepting Routes:** allow route content to be presented within the current navigation context.

Conceptually:

```text
Gallery page
+
modal slot
+
intercepted photo route
```

A parallel slot can hold the intercepted photo while the gallery remains the default content. This lesson does not re-teach Parallel Routes and does not create a full combined implementation.

## Example Conceptual Structure

Simplified conceptual structure:

```text
app/
├── photo/
│   └── [id]/
│       └── page.tsx
└── gallery/
    ├── page.tsx
    └── (.)photo/
        └── [id]/
            └── page.tsx
```

Purpose of each part:

- `photo/[id]/page.tsx` → normal destination page
- intercepted photo route (`gallery/(.)photo/...`) → contextual presentation when navigation originates from the appropriate route

Real route structure depends on where the source and target route segments are located. `(.)` is correct here only when those segments sit at the same routing level. Other conventions apply when the relationship is one level up, two levels up, or relative to the app root.

## Browser Back Behavior

Conceptual flow:

```text
Gallery
↓
Open photo overlay
↓
Back
↓
Return to gallery state
```

Route-aware overlays can integrate more naturally with browser navigation than purely local UI state. The destination is part of navigation history. Back can leave the overlay and restore the previous route context. This lesson does not teach history APIs.

## Refresh Behavior

Refreshing or directly loading a destination can result in its **normal route presentation** because the previous navigation context may no longer be present.

If the user refreshes on the photo URL, the gallery context from the earlier in-app click may be gone. The standalone photo page is then the expected result. This stays high level. Internal router implementation is out of scope.

## Deep Linking

A destination represented by a real route can be linked directly.

Example:

```text
/photo/42
```

A shared link can open the standalone destination even if in-app navigation normally presents it contextually. Interception does not remove that linkable page.

## When Intercepting Routes May Be Useful

Intercepting Routes **may** help for:

- photo galleries;
- product previews;
- item detail overlays;
- contextual dashboards;
- message previews;
- content previews.

They **can** preserve surrounding UI while still giving the destination a real URL.

## When Intercepting Routes May Be Unnecessary

They **may** be unnecessary for:

- simple page-to-page navigation;
- dialogs with no meaningful navigation state;
- temporary UI interactions that do not need URLs;
- simple informational websites.

Advanced routing should solve a real navigation requirement. A confirm dialog that is not a shareable place usually does not need interception.

## Intercepting Route Conventions Summary

| Convention | Meaning |
| --- | --- |
| `(.)` | Same route-segment level |
| `(..)` | One route-segment level above |
| `(..)(..)` | Two route-segment levels above |
| `(...)` | From the app root |

These descriptions refer to **routing segment relationships**, not ordinary filesystem folder counting.

## Intercepting Routes vs Local Modal State

**Local modal state:**

```text
selectedPhoto = 42
```

Potential characteristics:

- may not create meaningful browser history;
- may not provide a directly shareable route;
- presentation is controlled only by component state.

**Routing-aware contextual navigation:**

```text
/photo/42
```

Potential characteristics:

- URL represents the destination;
- browser navigation can participate;
- direct navigation can still exist;
- in-app presentation can preserve context.

Routing is not always the correct choice. Local state remains appropriate when the interaction is temporary and does not need a location.

## Advantages

Potential advantages include:

- preserves navigation context;
- supports route-backed overlays;
- enables direct destinations;
- integrates with browser history;
- allows contextual and standalone presentation of related content.

These are possible outcomes when the pattern matches the navigation problem. This lesson makes no absolute performance claims.

## Trade-offs

Costs include:

- route structure becomes harder to understand;
- contextual and direct navigation both require testing;
- browser navigation behavior must be considered;
- developers must understand route segment relationships;
- combining multiple advanced routing patterns can increase complexity.

Intercepting Routes add a second presentation path. That path must stay consistent with the standalone destination.

## Common Misconceptions

**"Intercepting Routes are only a modal feature."**  
False. Modals are a common presentation. The pattern is about routing context, not overlay styling.

**"`(.)` means one filesystem folder."**  
False. `(.)` means the same **route-segment** level.

**"`(..)` always means one physical directory upward."**  
False. `(..)` means one **route-segment** level above. Filesystem depth is not always identical to route segments.

**"Intercepting a route changes the destination URL into a different route."**  
False. The destination can remain the same. Interception changes presentation context, not the idea of a different unrelated URL.

**"Every modal should use Intercepting Routes."**  
False. Many dialogs have no meaningful navigation state and should stay local.

**"Intercepting Routes and Parallel Routes are the same feature."**  
False. Parallel Routes compose simultaneous regions. Intercepting Routes present another route within current navigation context. They can be combined; they are not the same.

**"Direct navigation and in-app navigation must always render exactly the same UI."**  
False. Different presentation based on navigation context is a primary reason this pattern exists.

**"Intercepting Routes replace normal routes."**  
False. The normal destination route still exists. Interception adds a contextual presentation of that destination.

## What We Are Not Learning Yet

These topics appear later in the roadmap:

- Structuring Routes
- API Endpoints
- Middleware
- data fetching
- caching
- revalidation
- Server Actions

## Key Takeaways

1. **Intercepting Routes** render a destination within another route’s UI context instead of always using the full-page presentation.
2. They solve **context-preserving navigation**: keep the current screen while showing related content.
3. Context-preserving navigation means the surrounding UI can remain while the destination appears.
4. **Internal** and **direct** navigation can present the same destination differently.
5. `(.)` intercepts at the **same** route-segment level.
6. `(..)` intercepts **one** route-segment level above.
7. `(..)(..)` intercepts **two** route-segment levels above.
8. `(...)` intercepts relative to the **app root**.
9. These conventions reason about **route segments**, not raw filesystem depth.
10. **Modals** are a common use case for this pattern.
11. Intercepting Routes are **not limited to modals**; previews and panels can use the same idea.
12. They can work with **Parallel Routes** (simultaneous regions vs contextual presentation) without being the same feature.
13. Use the pattern when contextual and standalone presentations are a real requirement; skip it for simple page swaps and temporary local dialogs.
