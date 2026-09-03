# Error States

The goal of this lesson is to understand how Next.js App Router handles errors associated with route segments. Applications can fail while rendering or processing route content. Users should receive meaningful fallback UI instead of a completely broken interface.

This lesson focuses only on Error States. It does not teach `not-found.tsx` or later routing topics.

## Overview

Applications can fail while rendering or processing route content.

Examples include:

- unexpected application errors;
- unavailable data;
- invalid internal assumptions;
- failures inside a route section.

When that happens, users should receive meaningful fallback UI instead of a completely broken interface.

This lesson introduces:

- `error.tsx`
- error boundaries
- `reset()`

`not-found.tsx` is mentioned only as a distinction. It is not taught in depth.

## What Is an Error State?

An **error state** is UI shown when application content cannot be rendered or processed successfully.

Conceptual flow:

```text
Route begins rendering
↓
Unexpected error occurs
↓
Normal route content cannot complete
↓
Error fallback UI is displayed
```

Error UI is different from loading UI. Loading means the content is not ready yet. An error state means producing the content failed.

## Loading State vs Error State

| State | Meaning |
| --- | --- |
| Loading | Content is not ready yet |
| Error | Something failed while producing the content |

In short:

- **Loading:** “Please wait.”
- **Error:** “Something went wrong.”

Loading and Streaming already covered waiting. This lesson covers failure. The two states answer different questions and should not be mixed.

## error.tsx

`error.tsx` is a special App Router file used to provide error fallback UI for a route segment.

Conceptual structure:

```text
app/
└── dashboard/
    ├── error.tsx
    └── page.tsx
```

If appropriate errors occur within that segment’s rendered content, the error UI can be displayed instead of the failed page content. This is an introduction to the file’s role, not a catalog of every error type.

## Basic error.tsx Example

```tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <h1>Something went wrong</h1>
      <button onClick={reset}>Try again</button>
    </main>
  );
}
```

`"use client"` is required at a high level because the error component needs client-side behavior for recovery interaction, such as handling a “Try again” click. This lesson does not turn that directive into a Client Components topic.

## Error Boundary

An **error boundary** catches failures in part of the rendered UI and replaces that content with fallback UI.

Normal structure:

```text
Application
├── Header
├── Dashboard
│   ├── Error Boundary
│   │   └── Dashboard Content
└── Footer
```

If Dashboard Content fails:

```text
Application
├── Header
├── Dashboard Error UI
└── Footer
```

Isolation is useful because one failing section does not have to take down every surrounding piece of UI. Header and footer can remain visible while the dashboard shows fallback UI.

This lesson does not teach React class error boundaries.

## Route Segment Isolation

Error boundaries can be associated with parts of the route hierarchy.

```text
app/
├── layout.tsx
└── dashboard/
    ├── error.tsx
    ├── page.tsx
    └── reports/
        └── page.tsx
```

An error associated with dashboard content may be handled at the dashboard boundary instead of necessarily replacing the entire application. Placement matters. Exact propagation rules are later detail; the idea here is scoped handling.

## Fallback UI

Error UI should provide a useful **fallback**.

Good fallback content may include:

- a clear message;
- a recovery action;
- a navigation option;
- guidance on what the user can do next.

Avoid displaying technical implementation details to end users. A heading such as “Something went wrong” plus a retry action is more useful than an internal exception dump.

## The error Parameter

`error.tsx` receives an `error` value representing the failure.

That value exists so the application can know a failure occurred. Production-facing UI should generally avoid exposing internal error details. Do not render `error.stack` or other sensitive internal information directly to users.

The example in this lesson keeps `error` available to the component but does not display its contents in the UI.

## reset()

`error.tsx` can receive a **`reset`** function.

Conceptual flow:

```text
Error occurs
↓
Error fallback appears
↓
User selects "Try again"
↓
reset()
↓
Next.js attempts to render the affected content again
```

`reset()` does not guarantee success. If the underlying problem still exists, the error may occur again. Retry asks the framework to try rendering once more. It does not fix a bug by itself.

## Recovery

Some errors may succeed on retry.

Conceptual examples:

- temporary dependency failure;
- transient processing failure.

Other errors may require:

- code changes;
- different input;
- another user action.

This lesson does not introduce network retry strategies. Recovery is possible for some failures and not for others.

## Error Isolation

Isolating errors can improve resilience.

Without isolation:

```text
One failure
↓
Large portion of UI becomes unusable
```

With an appropriate boundary:

```text
One section fails
↓
Fallback shown for that section
↓
Other UI can remain usable
```

Exact behavior depends on boundary placement. Isolation is a design choice, not an automatic guarantee that every surrounding layout always survives.

## Boundary Placement

Where an error boundary exists influences the scope of fallback UI.

```text
Root
└── Dashboard
    ├── Reports
    └── Settings
```

A boundary around Dashboard covers a broader area than one associated with a deeper section. A dashboard-level `error.tsx` can replace dashboard content. A more nested boundary can replace only a smaller section.

This lesson does not teach detailed routing architecture. The point is scope: broader boundary, broader fallback.

## Parent and Child Error Boundaries

An application can have error boundaries at different route levels.

```text
Root
└── Dashboard boundary
    └── Reports boundary
```

More specific boundaries can provide more localized error experiences. A reports failure can be handled near reports instead of replacing the whole dashboard, if a reports-level boundary exists.

This lesson does not explain exact Next.js bubbling rules in depth.

## Errors and Layouts

Error handling participates in the route hierarchy alongside layouts and pages. Layouts wrap shared UI. Pages expose route content. `error.tsx` provides fallback when that content fails.

This is not a repeat of Layouts and Templates. Do not assume that every layout always survives every possible error. Survival depends on where the failure happens and where the boundary sits. Keep that relationship high level.

## Errors During Rendering

Error boundaries are relevant when an unexpected problem prevents content from rendering correctly.

Simple conceptual function:

```tsx
function buildReport(shouldFail: boolean) {
  if (shouldFail) {
    throw new Error("Report generation failed");
  }

  return "Report ready";
}
```

Throwing an `Error` represents failure. The function cannot produce a report, so it stops with an error. This lesson does not teach JavaScript exception handling generally.

## Throwing Errors

Application code may throw an `Error` when it cannot continue correctly.

```tsx
throw new Error("Unable to render report");
```

Deliberately throwing errors is only appropriate when the application genuinely cannot continue that operation correctly. Do not use thrown errors for normal application flow, such as expected empty results that should be modeled as ordinary UI states.

## Expected vs Unexpected Problems

Keep this distinction basic.

**Unexpected error:**  
Something failed unexpectedly during execution.

**Expected condition:**  
A known application outcome that should usually be modeled explicitly.

Error boundaries are primarily intended for unexpected failures rather than replacing all validation and normal application states. This lesson does not introduce form validation.

## User-Friendly Error Messages

Users usually need actionable messages.

Prefer:

```text
Something went wrong while loading this section.
```

over:

```text
TypeError at internalModule.ts line 182...
```

Internal diagnostics belong in logging and monitoring systems rather than user-facing UI. This lesson does not introduce monitoring tools.

## Sensitive Information

Error messages must not expose:

- secrets;
- credentials;
- environment variables;
- internal stack traces;
- private database details;
- implementation-specific sensitive data.

Keep user-facing copy generic and safe. Investigation happens elsewhere.

## Error States Do Not Replace Logging

Two different jobs:

- **User-facing fallback UI** → helps the user
- **Application logging/observability** → helps developers investigate

Showing “Something went wrong” does not tell developers why it happened. Logging is still needed. This lesson does not teach logging or observability tools.

## Common Error State Flow

```text
Page starts rendering
       |
       v
Unexpected error
       |
       v
Nearest applicable error boundary
       |
       v
error.tsx fallback
       |
       +---- User leaves
       |
       +---- User selects retry
                    |
                    v
                  reset()
                    |
                    v
              Render attempted again
```

This is a simplified model. The nearest applicable boundary shows fallback UI. The user can leave or retry. Retry calls `reset()` and rendering is attempted again.

## Error States vs Not Found

Keep only this distinction:

- **Error:** Something unexpectedly failed.
- **Not found:** The requested resource or route content does not exist.

Those are different outcomes. `not-found` behavior is outside this lesson and is not taught here.

## Trade-offs

Error handling introduces decisions such as:

- boundary placement;
- fallback design;
- recovery behavior;
- user messaging;
- observability.

Too broad a boundary can replace more UI than necessary. Too many highly granular boundaries can increase complexity. Place boundaries where a localized fallback helps the user without scattering error files everywhere.

## Common Misconceptions

**"`error.tsx` prevents errors from happening."**  
False. It provides fallback UI after a failure. It does not stop the failure from occurring.

**"`reset()` fixes the underlying bug."**  
False. It asks Next.js to attempt rendering again. If the problem remains, the error can happen again.

**"Loading and error states are the same thing."**  
False. Loading means content is not ready yet. An error state means producing the content failed.

**"Every error should display its technical message to the user."**  
False. Users need a clear, safe message. Technical details belong in logging, not in the UI.

**"An error boundary means the entire application must crash."**  
False. A well-placed boundary can isolate the failure to a section of the UI.

**"Every component needs its own `error.tsx`."**  
False. `error.tsx` is a route-segment file. Not every component needs its own error file.

**"Error UI replaces the need for logging."**  
False. Fallback UI helps the user. Logging helps developers investigate.

**"404 and application errors are exactly the same."**  
False. Not found means the resource or route content does not exist. An error state means something unexpectedly failed. `not-found` is outside this lesson.

## What We Are Not Learning Yet

These topics appear later in the roadmap:

- `not-found.tsx` in depth
- Routing Patterns
- Structuring Routes
- Parallel Routes
- Intercepting Routes
- API Endpoints
- advanced data fetching
- caching
- revalidation
- Server Actions
- middleware

## Key Takeaways

1. An **error state** is UI shown when content cannot be rendered or processed successfully.
2. It differs from a **loading state**: waiting versus failure.
3. `error.tsx` provides error fallback UI for a route segment.
4. An **error boundary** catches failures in part of the UI and shows fallback instead.
5. Route-level isolation can keep other UI usable when one section fails.
6. **Fallback UI** should be clear, useful, and safe for users.
7. **`reset()`** asks Next.js to attempt rendering the affected content again.
8. `reset()` does **not** guarantee recovery if the underlying problem remains.
9. Technical and sensitive error information should not be shown to users.
10. Expected application states should not automatically be modeled as exceptions.
11. Error UI and developer logging solve different problems.
12. Routing patterns are a separate later topic.
