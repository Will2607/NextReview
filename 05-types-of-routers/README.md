# Types of Routers

## Overview

Routing determines how URLs map to application content. Next.js has two major routing approaches:

- **Pages Router**
- **App Router**

Both belong to Next.js, but they represent different generations and architectural models. This lesson introduces them at a high level. It does not teach either router in depth.

## What Is a Router?

A router coordinates which application content corresponds to a URL. Conceptually:

- `/` → Home
- `/about` → About
- `/products` → Products

The previous Routing Basics lesson showed that relationship in practice. Here the focus is recognizing that Next.js offers two routing models for organizing that mapping.

## Pages Router

The Pages Router is based around the `pages/` directory. Files under `pages/` define routes.

Minimal conceptual tree:

```text
pages/
├── index.tsx
├── about.tsx
└── contact.tsx
```

Route mapping:

- `pages/index.tsx` → `/`
- `pages/about.tsx` → `/about`
- `pages/contact.tsx` → `/contact`

This is only an introduction. Pages Router data-fetching APIs, special files, and advanced route forms are outside this lesson.

## App Router

The App Router is based around the `app/` directory. Folders and `page` files under `app/` define routes.

Minimal conceptual tree:

```text
app/
├── page.tsx
├── about/
│   └── page.tsx
└── contact/
    └── page.tsx
```

Route mapping:

- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/contact/page.tsx` → `/contact`

This is only an introduction. Layouts, templates, loading and error files, route handlers, and nested routing patterns are outside this lesson.

## Same Goal, Different Model

Both routers solve the same fundamental problem:

```text
URL
↓
Route matching
↓
Page content
```

They organize applications differently. The shared goal is mapping URLs to content; the models diverge in structure and capabilities.

## Directory-Based Difference

The simplest visible distinction:

- Pages Router → `pages/`
- App Router → `app/`

Directory choice reflects different routing systems and capabilities. The folder name is the most obvious signal, but it is not the only architectural distinction between the two models.

## Historical Context

The Pages Router existed first. The App Router was introduced later as a newer routing model. That historical order explains why both appear in documentation, tutorials, and real codebases.

## Current Direction

Modern Next.js development generally uses the App Router for new applications. The Pages Router remains supported.

This section only establishes the framework’s current direction. Detailed reasons to prefer one model belong to a later “Why use App Router?” topic.

## Coexistence

Next.js projects can encounter both routing models, especially in existing applications or migrations. Developers may need to recognize which model a project uses before applying router-specific patterns.

This lesson does not teach migration and does not show both routers serving the same route path.

## Basic Comparison

| Aspect | Pages Router | App Router |
| ------ | ------------ | ---------- |
| Main directory | `pages/` | `app/` |
| Generation | Earlier routing model | Newer routing model |
| Route definition | Files in `pages/` | Folders plus page files in `app/` |
| Status | Supported | Current primary direction for new applications |
| Detailed study | Later lesson | Later lesson |

Advanced feature comparisons are intentionally omitted.

## Why Both Matter

A Next.js developer should recognize both models because:

- existing codebases may use Pages Router;
- newer projects commonly use App Router;
- documentation and examples may use either model;
- developers need to know which router a project uses before applying router-specific patterns.

Recognizing the model avoids mixing patterns that belong to different systems.

## What This Lesson Does Not Cover

These topics appear later in the roadmap:

- detailed Pages Router behavior;
- detailed App Router behavior;
- why App Router may be preferred;
- data fetching;
- layouts;
- templates;
- loading states;
- error states;
- Server Components;
- Client Components;
- route handlers;
- dynamic routes;
- routing patterns.

## Common Misconceptions

**"Pages Router and App Router are two different frameworks."**  
False. They are two routing models inside Next.js.

**"Pages Router is immediately unusable because App Router exists."**  
False. Pages Router remains supported and appears in many existing projects.

**"App Router means every file inside app/ automatically becomes a route."**  
False. Route creation follows App Router conventions; not every file defines a URL.

**"The only difference between the routers is the folder name."**  
False. The directory is the clearest signal, but the models also differ architecturally.

**"Developers never need to understand Pages Router anymore."**  
False. Existing codebases and older examples still use it.

## Key Takeaways

1. Next.js has two major routing models.
2. They are called Pages Router and App Router.
3. Pages Router uses the `pages/` directory.
4. App Router uses the `app/` directory.
5. Both map URLs to application content.
6. Pages Router is the older model.
7. App Router is the newer model and the current direction for new applications.
8. Pages Router remains relevant in existing projects.
9. Detailed router behavior is intentionally outside this lesson.
10. Later roadmap subtopics study the routers individually.
