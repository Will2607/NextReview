# Loading and Streaming

The goal of this lesson is to understand how Next.js can display loading UI and progressively reveal route content. Some route content takes time to become available. Loading UI and streaming give the user feedback and useful pieces of the page before everything is ready.

This lesson focuses only on Loading and Streaming. It does not teach error handling.

## Overview

Some route content may take time to become available. Without loading UI, users may wait without useful feedback.

Next.js provides mechanisms for:

- displaying immediate loading feedback;
- dividing UI into boundaries;
- progressively revealing content.

This lesson introduces:

- `loading.tsx`
- Suspense
- Streaming

Error handling is a later topic.

## The Problem: Waiting for Content

A simplified waiting flow:

```text
Request
↓
Application prepares content
↓
Some work is slow
↓
User waits
↓
Complete page becomes available
```

If the application waits for the entire route before showing anything, the user sees a blank or stalled screen until every part is ready. One slow section can hold back content that was already prepared. That waiting model can create a poor perceived loading experience.

This lesson does not make numeric performance claims. The point is the experience of waiting with no useful UI.

## Loading UI

**Loading UI** is temporary UI displayed while route content is being prepared.

Conceptual examples:

- `Loading...`
- skeleton interface;
- placeholder;
- progress feedback.

The goal is to communicate that work is in progress. This lesson does not add a skeleton library.

## loading.tsx

`loading.tsx` is a special App Router file.

Conceptual structure:

```text
app/
└── dashboard/
    ├── loading.tsx
    └── page.tsx
```

The loading file provides fallback UI associated with that route segment. While the dashboard page is being prepared, the loading UI can appear in its place.

Minimal example:

```tsx
export default function Loading() {
  return <p>Loading dashboard...</p>;
}
```

`error.tsx` is not part of this lesson.

## Route Segment Loading

Loading UI can be associated with a route segment.

Conceptually:

```text
app/
└── dashboard/
    ├── loading.tsx
    ├── page.tsx
    └── reports/
        └── page.tsx
```

`app/dashboard/loading.tsx` belongs to the dashboard segment. Loading behavior can participate in the route hierarchy the same way layouts and pages do: it is scoped to a segment rather than to the entire application.

This lesson does not build a complex nested loading architecture. The useful idea is that loading UI can sit next to a segment’s `page.tsx`.

## Immediate Feedback

Showing loading feedback quickly can improve **perceived responsiveness**. The user sees that navigation started and that content is on the way.

Loading UI does not make slow work disappear. It gives the user useful feedback while work is occurring.

## What Is Suspense?

**React Suspense** creates a boundary around content that may not be ready immediately. This lesson uses Suspense only as far as streaming requires.

```tsx
<Suspense fallback={<p>Loading...</p>}>
  <SlowContent />
</Suspense>
```

What happens:

- `SlowContent` is not ready.
- The **fallback** is shown temporarily.
- When `SlowContent` is ready, it replaces the fallback.

Suspense is not taught here as a general React topic. It is the boundary that makes progressive reveal possible inside a page.

## Suspense Boundary

A **Suspense boundary** is the wrapper that separates immediate UI from content that may still be preparing.

Conceptual structure:

```text
Page
├── Immediate Content
└── Suspense Boundary
    ├── Loading Fallback
    └── Slow Content
```

Only the content inside the boundary needs to wait. Immediate content outside the boundary can render without waiting for the slow section.

## What Is Streaming?

**Streaming** allows parts of a rendered response to become available progressively instead of waiting for every part of the page before sending useful UI.

Example:

```text
Page
├── Header             → available
├── Product Summary    → available
└── Recommendations    → still loading
```

Then, over time:

1. Header appears
2. Product Summary appears
3. Loading fallback appears
4. Recommendations become available later

The user does not have to wait for recommendations before seeing the header and product summary. This lesson does not explain transport protocol internals.

## Blocking Rendering

A simplified **blocking** model:

```text
Prepare Header
Prepare Main Content
Prepare Slow Content
Wait
Wait
Wait
Everything ready
↓
Send/display complete UI
```

One slow section can conceptually delay the complete result. Useful UI stays hidden until the slowest work finishes.

## Progressive Rendering

Contrast with a **progressive** model:

```text
Prepare immediate content
↓
Reveal immediate content

Slow section
↓
Fallback displayed
↓
Slow section becomes ready
↓
Replace fallback
```

Immediate content can appear first. The slow section shows a fallback, then replaces it when ready. This is the fundamental mental model behind streaming.

## loading.tsx and Suspense

`loading.tsx` integrates loading UI with route navigation and uses Suspense-related behavior provided by the framework.

At a high level: navigating to a segment can show that segment’s loading file while the page is preparing. The framework connects that file to a loading boundary. This lesson does not explain Next.js internals.

## loading.tsx vs Explicit Suspense

| Mechanism | Scope |
| --- | --- |
| `loading.tsx` | Route-segment loading UI |
| Suspense | Explicit boundary around specific content |

They are related. Both can show fallback UI while something is not ready. They are not exactly the same abstraction.

- `loading.tsx` is tied to a route segment and navigation into that segment.
- An explicit `<Suspense>` boundary can wrap a specific part of a page, such as one slow section.

A page can use both: route-level loading for navigation, and a Suspense boundary for a slower area inside the page.

## Granular Streaming

A page can contain multiple sections with different readiness times.

Example:

```text
Dashboard
├── Header
├── Account Summary
├── Recent Activity
└── Recommendations
```

Conceptually, slower areas can have their own boundaries. One slow section does not necessarily block all useful content. The header and account summary can appear while recommendations are still loading.

This lesson does not implement multiple advanced boundaries. The idea is granularity: boundaries can be as wide as a route or as narrow as one section.

## Perceived Performance

Distinguish:

- **actual processing time** — how long the work still takes;
- **perceived responsiveness** — how soon the user sees useful UI or feedback.

Streaming may improve perceived responsiveness because useful content or feedback can become visible earlier. Streaming does not automatically make the underlying work faster. The slow section still takes the time it takes.

## Navigation Experience

Route-level loading UI can provide immediate feedback when navigating to a route whose content is not ready. The user leaves the current screen and can see loading UI for the destination segment instead of waiting with no change.

This lesson does not teach `useRouter`, navigation hooks, prefetching, or router events.

## Loading UI Should Be Meaningful

Loading UI should communicate that progress is occurring.

Good examples:

- `Loading account details...`
- a contextual skeleton placeholder that resembles the coming layout.

Less useful:

- a large unrelated animation that does not describe what is loading.

Keep loading UI honest and local to the content that is still preparing.

## Streaming Does Not Mean Everything Must Stream

Developers should decide which content benefits from progressive delivery.

- Some content may be immediately available.
- Some content may be slow.
- Not every UI section needs a separate Suspense boundary.

Streaming is a choice about where waiting should be isolated. Immediate content can stay outside a boundary.

## Trade-offs

Streaming and loading UI add design decisions:

- additional UI states to design (ready vs not ready);
- more boundaries to reason about;
- loading experience design (what the user sees while waiting);
- content may appear at different times, which can feel uneven if overused;
- inappropriate boundary placement can increase complexity without helping the user.

Streaming should be used intentionally. Prefer it where a slow section would otherwise hide useful, already-ready UI.

## Simplified Mental Model

```text
Request
   |
   v
Route begins rendering
   |
   +---- Immediate content --------> User
   |
   +---- Slow content
             |
             v
          Fallback
             |
             v
       Content becomes ready
             |
             v
          User
```

The route starts rendering. Immediate content can reach the user without waiting. Slow content shows a fallback first, then the real UI when it is ready. That split is loading UI plus streaming.

## Common Misconceptions

**"`loading.tsx` makes data load faster."**  
False. It shows fallback UI while work continues. It does not shorten the underlying work.

**"Streaming means the entire page is immediately ready."**  
False. Streaming means parts can become ready at different times. Slow sections can still take time.

**"Suspense and `loading.tsx` are exactly the same thing."**  
False. They are related. `loading.tsx` is route-segment loading UI. Suspense is an explicit boundary around specific content.

**"Streaming removes network latency."**  
False. Network and preparation time still exist. Streaming changes when useful UI can appear, not whether latency exists.

**"Every component needs a Suspense boundary."**  
False. Only content that may not be ready immediately benefits from a boundary. Immediate UI can render without one.

**"Loading UI is only a spinner."**  
False. Loading UI can be text, a placeholder, a skeleton, or other feedback. The requirement is that it communicates progress.

**"Streaming means client-side rendering."**  
False. Streaming is progressive delivery and reveal of UI. It is not another name for CSR.

## What We Are Not Learning Yet

These topics appear later in the roadmap:

- `error.tsx`
- Error States
- `not-found.tsx`
- Parallel Routes
- Intercepting Routes
- Routing Patterns
- advanced data fetching
- caching
- revalidation
- Server Actions

## Key Takeaways

1. **Loading UI** exists so users get feedback while route content is being prepared.
2. `loading.tsx` is the special App Router file for route-segment loading UI.
3. Loading UI can belong to a **route segment**, next to that segment’s `page.tsx`.
4. **Suspense** creates a boundary around content that may not be ready immediately.
5. A **Suspense boundary** isolates waiting: fallback first, then the ready content.
6. **Streaming** means parts of the UI can become available progressively.
7. Streaming can reveal immediate content first and replace fallbacks later.
8. Waiting for everything is different from progressively revealing content.
9. Streaming can improve **perceived responsiveness**. It does not automatically make the underlying work faster.
10. Error States are a separate upcoming topic.
