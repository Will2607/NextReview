# Structuring Routes

The goal of this lesson is to understand how to organize routes in a Next.js App Router application so that the routing structure remains understandable and maintainable as the application grows. Next.js maps folders to URLs. As the project grows, that mapping becomes an architectural concern, not only a naming habit.

This lesson focuses only on route organization. Middleware, cookies, headers, and later roadmap topics are out of scope.

## Overview

Next.js uses **filesystem-based routing**.

Conceptually:

```text
app/
├── page.tsx
├── about/
│   └── page.tsx
└── products/
    └── page.tsx
```

maps to:

```text
/
/about
/products
```

A small tree is easy to read. As an application grows, route organization becomes an architectural concern rather than only a folder-naming concern. The questions become: where does this URL live, what belongs next to it, and what is shared?

## Route Segments

A **route segment** is one part of a URL path represented by a folder in the App Router.

```text
app/
└── products/
    └── shoes/
        └── page.tsx
```

URL:

```text
/products/shoes
```

- `products` → route segment
- `shoes` → nested route segment
- `page.tsx` → route UI

Each folder that participates in the path is a segment. The page file exposes UI for that location.

## Nested Routes

Nesting folders creates nested route paths.

```text
app/
└── dashboard/
    ├── page.tsx
    ├── users/
    │   └── page.tsx
    └── settings/
        └── page.tsx
```

Result:

```text
/dashboard
/dashboard/users
/dashboard/settings
```

The filesystem provides a visual representation of the route hierarchy. Looking at `app/dashboard/` should suggest the dashboard family of URLs.

## URL Structure and Folder Structure

The basic relationship:

```text
app/products/page.tsx
→ /products

app/products/[id]/page.tsx
→ /products/:id

app/dashboard/settings/page.tsx
→ /dashboard/settings
```

Not every organizational folder necessarily appears in the URL. Next.js provides organizational mechanisms such as **Route Groups**. A folder can exist to group related routes without becoming a path segment.

## Structuring by Route Hierarchy

A simple hierarchy that follows the public URL:

```text
app/
├── page.tsx
├── products/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
└── account/
    ├── page.tsx
    └── settings/
        └── page.tsx
```

This organization follows the public URL hierarchy: home, products, a product, account, settings. A developer can guess the URL from the folders and the folders from the URL.

## Colocation

Next.js allows project files to be **colocated** inside the `app` directory.

Conceptual example:

```text
app/
└── products/
    ├── page.tsx
    ├── product-card.tsx
    ├── product-types.ts
    └── product-utils.ts
```

Not every file placed inside a route folder automatically becomes a publicly accessible route.

A route becomes publicly reachable through special routing files such as `page.tsx` or `route.ts`. Extra files next to those special files are implementation details unless they follow a routing convention.

This stays conceptual. This lesson does not enumerate every special file convention again.

## Why Colocation Can Be Useful

Potential benefits:

- related files stay close together;
- easier feature navigation;
- clearer ownership;
- fewer distant imports;
- easier refactoring.

Colocation is an **organizational strategy**, not a requirement. A tiny app may not need local helpers. A products area with several local components often benefits from keeping them nearby.

## Global vs Local Files

**Local, route-specific code:**

```text
app/
└── dashboard/
    ├── page.tsx
    └── dashboard-card.tsx
```

**Shared application code:**

```text
components/
lib/
shared/
```

Code should generally live near the **narrowest scope** where it is actually used. A card used only on the dashboard can live with the dashboard. A button used everywhere belongs in a shared place.

This lesson does not prescribe one universal project architecture. `components/` and `lib/` are common names, not Next.js requirements.

## Route Groups

Wrapping a folder name in **parentheses** creates an organizational **Route Group**.

Example:

```text
app/
├── (marketing)/
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── pricing/
│       └── page.tsx
└── (dashboard)/
    └── dashboard/
        └── page.tsx
```

The group names `(marketing)` and `(dashboard)` are **not** included in the URL. They organize the tree. They do not add `/marketing` or `/dashboard` merely because of the parentheses. (A nested `dashboard/` folder still can, because that folder is a normal segment.)

## Route Groups Do Not Affect the URL

```text
app/
└── (marketing)/
    └── about/
        └── page.tsx
```

URL:

```text
/about
```

**Not:**

```text
/marketing/about
```

Parentheses identify organizational groups rather than URL segments. `(marketing)` is a label for humans and for layout grouping, not a path part.

## Why Use Route Groups?

Common organizational reasons:

- separate application sections;
- separate marketing and application routes;
- organize routes by team;
- apply different layout organization;
- keep related route sets together.

This lesson does not teach multiple root layouts in depth. The useful idea is grouping routes without changing public URLs.

## Route Group Example

```text
app/
├── (public)/
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── pricing/
│       └── page.tsx
└── (app)/
    ├── dashboard/
    │   └── page.tsx
    └── settings/
        └── page.tsx
```

URLs:

```text
/
/about
/pricing
/dashboard
/settings
```

`(public)` and `(app)` exist for organization only. The public path does not contain those names.

## Organizing by Domain

A **domain-oriented** route structure groups by business area:

```text
app/
├── products/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── orders/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
└── account/
    └── page.tsx
```

Each business or domain area owns its related routes. Products live together. Orders live together. Account lives together. That mapping often matches how teams and URLs already think.

## Organizing by Application Area

```text
app/
├── (marketing)/
├── (customer)/
└── (admin)/
```

Large applications may benefit from grouping routes by application area or audience. Marketing pages, customer app pages, and admin pages can sit in different groups without stuffing those labels into every URL.

This lesson does not introduce permissions or authentication implementation.

## Feature-Oriented Organization

Route-specific components, helpers, and types may be grouped near the feature that uses them.

Conceptual example:

```text
app/
└── products/
    ├── page.tsx
    ├── _components/
    │   ├── product-card.tsx
    │   └── product-list.tsx
    └── _lib/
        └── format-product.ts
```

This is an **organizational convention**. Next.js does **not** require `_components` or `_lib`. Those names are one way to keep local UI and local helpers next to the products routes.

## Private Folders as an Organizational Convention

Underscore-prefixed folders can mark implementation details:

```text
app/
└── dashboard/
    ├── page.tsx
    ├── _components/
    └── _lib/
```

Private folders can communicate that their contents are implementation details rather than route segments. They are an organizational signal. They are not presented here as mandatory.

## Route Groups vs Private Folders

| Mechanism | Purpose |
| --- | --- |
| `(group)` | Organize route segments without adding the group name to the URL |
| `_folder` | Keep implementation files clearly separate from routing concerns |

They solve different organizational problems. A Route Group rearranges **routes**. A private folder holds **code that is not a route**.

## Feature-Specific Components

A component used only by one route area may reasonably live close to that route.

```text
app/
└── dashboard/
    ├── page.tsx
    └── _components/
        └── stats-card.tsx
```

If the same component becomes broadly reusable, moving it to a shared area may make more sense. Exact folder names are not prescribed.

## Shared Components

Conceptual structure:

```text
app/
components/
lib/
```

- `app/` → route hierarchy and route-local code
- `components/` → broadly reused UI
- `lib/` → broadly reused non-UI utilities

This is **one possible** project organization and not a Next.js requirement. Other names and placements can work if they stay consistent and discoverable.

## Avoiding Over-Nesting

Deeply nested directories can make route structures difficult to understand.

```text
app/
└── platform/
    └── application/
        └── management/
            └── users/
                └── settings/
                    └── page.tsx
```

Deep nesting may be correct when the URL genuinely requires that hierarchy. Unnecessary organizational nesting should be avoided. If the public URL is `/users/settings`, the extra `platform/application/management` layers may be internal noise unless they are real segments or Route Groups with a purpose.

## URL Design Should Drive Route Structure

Desired URL:

```text
/products/42/reviews
```

A natural route structure:

```text
app/
└── products/
    └── [id]/
        └── reviews/
            └── page.tsx
```

Routing folders should primarily represent the application’s **navigation model**. Start from the URL people use, then place folders to match.

## Do Not Encode Every Code Concern into the URL

Internal organization does not always belong in the route path.

Incorrect conceptual thinking:

```text
/marketing/pages/about
```

when the intended public URL is:

```text
/about
```

Route Groups can help separate internal organization from URL structure. `(marketing)/about` can still be `/about`.

## Naming Route Segments

Use clear, URL-oriented names:

- `products`
- `orders`
- `settings`
- `account`

Avoid unnecessarily implementation-specific names such as:

- `product-page-container`
- `order-feature-wrapper`

Route segment names become part of public URLs unless a special organizational convention (Route Group or private folder) prevents it. Name segments as you would want them to appear in the address bar.

## Dynamic Route Organization

```text
app/
└── products/
    ├── page.tsx
    └── [id]/
        └── page.tsx
```

The static parent represents the **collection**. The dynamic child represents an **individual resource**. `/products` lists. `/products/:id` is one product.

This lesson does not re-teach dynamic parameters in depth.

## Nested Dynamic Routes

```text
app/
└── users/
    └── [userId]/
        └── orders/
            └── [orderId]/
                └── page.tsx
```

URL:

```text
/users/42/orders/100
```

Nesting should reflect actual resource and navigation relationships: a user’s orders, then one order. Do not nest `[orderId]` under users unless that relationship is real.

## Layout Boundaries and Organization

Route organization also influences where layouts can apply.

```text
dashboard/
├── layout.tsx
├── users/
└── settings/
```

Grouping related routes can make shared layout boundaries easier to reason about. Dashboard users and settings can share a dashboard layout because they sit under the same segment.

This lesson does not re-teach Layouts and Templates.

## Loading and Error Boundaries

Route structure influences the scope of special files such as `loading.tsx` and `error.tsx`.

A special file placed higher in the route tree can affect a broader route area. A file next to a leaf route affects a narrower area.

This lesson does not re-teach Loading or Error States.

## Route Groups and Boundaries

Route Groups can help organize which sets of routes share certain structural concerns.

```text
app/
├── (marketing)/
└── (dashboard)/
```

Marketing routes can share one organizational (and potentially layout) boundary. Dashboard routes can share another. This is not a new layouts lesson.

## Organizing API Routes

Route Handlers can also be organized by resource or domain.

```text
app/
└── api/
    ├── products/
    │   └── route.ts
    └── orders/
        └── route.ts
```

`app/api/` remains a common convention from the API Endpoints lesson. Products and orders endpoints sit next to their resource names. This lesson does not re-teach API Endpoints.

## Route Code vs Business Logic

Route files should not necessarily contain every piece of business logic.

Conceptual separation:

```text
route/page file
↓
feature/domain logic
↓
shared utility/data layer
```

Keeping route files focused can make the route hierarchy easier to understand. A `page.tsx` that only composes UI is easier to find than a page that also hides every formatter and helper.

This lesson does not introduce service architecture patterns in depth.

## Small Application Structure

```text
app/
├── page.tsx
├── about/
│   └── page.tsx
└── products/
    └── page.tsx
```

A simple project should usually remain simple. Do not add architecture merely for future possibilities.

## Medium Application Structure

```text
app/
├── (marketing)/
│   ├── page.tsx
│   └── pricing/
│       └── page.tsx
├── dashboard/
│   ├── page.tsx
│   ├── users/
│   └── settings/
└── api/
```

Organizational boundaries become more useful as responsibilities increase. Marketing, dashboard, and API can sit apart without inventing a large framework.

## Larger Application Structure

Conceptually:

```text
app/
├── (marketing)/
├── (customer)/
├── (admin)/
└── api/

shared/
features/
lib/
```

Larger systems may combine route organization with feature or domain organization. This structure is **not** prescribed as universal. It is an illustration of more boundaries, not a template every app must copy.

## Organize for Discoverability

A developer should be able to answer quickly:

- Where is the page for this URL?
- Where are components specific to this route?
- Which code is shared?
- Which routes belong to the same application area?

Good organization improves discoverability. If finding `/dashboard/users` requires guessing, the structure is not earning its keep.

## Organize for Change

Code that changes together often benefits from being located near each other.

Example: products route, product-specific component, and product-specific formatter may reasonably be colocated.

This lesson does not introduce formal software architecture theory. The practical idea is: when you change products, you should not hunt five unrelated directories first.

## Avoid Premature Abstraction

```text
Small application
→ simple structure.

Growing application
→ introduce organizational boundaries when needed.
```

Do not create `shared/`, `features/`, `domain/`, `services/`, and `repositories/` merely because they might become useful someday. Extra folders without current need are noise.

## Consistency

Consistency is often more valuable than a theoretically perfect folder structure.

If the project chooses a convention, apply it consistently:

- consistent feature folder naming;
- consistent route grouping;
- consistent placement of shared code.

A slightly imperfect convention used everywhere beats three competing conventions.

## Refactoring Route Structure

Changing route folders **may** change public URLs.

Therefore, route restructuring must distinguish:

- **organizational changes**
- **URL changes**

Route Groups can reorganize code without necessarily changing URLs. Moving `about/` into `(marketing)/about/` can keep `/about`. Moving `about/` to `pages/about/` would change the URL unless something else compensates.

This lesson does not introduce redirects again.

## Public URL Stability

Public URLs are part of the application’s **external interface**.

Changing:

```text
/products/42
```

to:

```text
/catalog/items/42
```

is not merely an internal folder refactor. It changes the application’s navigation contract: bookmarks, shared links, and other clients.

This stays conceptual.

## Example: Poor Structure

```text
app/
├── components/
├── helpers/
├── things/
├── misc/
├── pages2/
└── dashboard/
    └── random/
```

Problems:

- unclear ownership;
- vague folder names;
- difficult discovery;
- routing and implementation concerns mixed unpredictably.

This example is not claimed to be technically invalid. The problem is **maintainability**. `things/` and `misc/` do not tell a developer where `/about` lives.

## Example: Clearer Structure

```text
app/
├── (marketing)/
│   ├── page.tsx
│   └── pricing/
│       └── page.tsx
├── dashboard/
│   ├── page.tsx
│   ├── users/
│   │   └── page.tsx
│   └── _components/
│       └── user-table.tsx
└── api/
    └── users/
        └── route.ts
```

Responsibilities are easier to locate. Marketing URLs sit in `(marketing)`. Dashboard pages and a local table live together. The users API sits under `api/users`. The URL and the folder still correspond in an obvious way.

## Choosing a Structure

Educational decision model:

```text
Does the folder represent a real URL segment?

Yes
→ normal route folder.

No
↓
Does it group routes without changing the URL?

Yes
→ Route Group may be appropriate.

No
↓
Is it implementation code local to a route?

Yes
→ colocated/private organizational folder may be appropriate.

No
↓
Is it reused broadly?

Yes
→ shared project-level location may be appropriate.
```

This is an educational model, not a strict Next.js rule.

## Common Misconceptions

**"Every folder inside `app` becomes a URL."**  
False. Special files create routes. Route Groups and private organizational folders do not automatically add path segments.

**"Route Groups appear in the URL."**  
False. `(marketing)` does not become `/marketing`.

**"All components must live outside `app`."**  
False. Colocation is allowed. Route-local UI can live next to the route.

**"All route-specific code must be global."**  
False. Narrowly used code can stay local.

**"Every large project should use the same folder structure."**  
False. Organization should match the product. There is no single required tree.

**"More folders always mean better architecture."**  
False. Extra nesting and empty abstraction layers can hide routes.

**"A Route Group and a private folder are the same thing."**  
False. `(group)` organizes routes without a URL segment. `_folder` holds implementation files.

**"Refactoring route folders can never affect URLs."**  
False. Moving a normal segment changes the path. Route Groups can avoid that when the change is only organizational.

**"API routes must use a completely separate architecture."**  
False. Route Handlers still live under `app/` and can follow the same domain-oriented thinking.

**"Every future feature should get its own abstraction immediately."**  
False. Start simple. Add boundaries when they earn their place.

## What We Are Not Learning Yet

These topics appear later in the roadmap:

- Middleware
- Route Matcher
- Using Cookies
- Setting Headers
- Middleware use cases
- Internationalization
- authentication architecture
- authorization architecture
- advanced data fetching
- Server Actions
- deployment architecture

## Key Takeaways

1. **Filesystem-based routing** makes folder layout part of application structure.
2. A **route segment** is one URL part represented by a folder.
3. Nested folders map to **nested URLs**.
4. **Colocation** means keeping related files next to a route without every file becoming a URL.
5. Route-local files can live near their routes when they are not broadly shared.
6. **Route Groups** use `(name)` to organize routes.
7. `(group)` does **not** appear in the URL.
8. **Route organization** and **URL design** are related but not identical; groups can separate them.
9. Route Groups rearrange routes; **private folders** hold implementation details.
10. Route-specific and globally shared code may live in different places, at the narrowest useful scope.
11. Deep nesting should reflect **real navigation**, not leftover folder noise.
12. Organization should **evolve** with application complexity; small apps stay simple.
13. **Consistency** and **discoverability** matter more than a theoretically perfect tree.
14. Reorganizing normal route folders can change **public URLs**; groups can reorganize without that cost.
15. **Middleware** is a separate upcoming roadmap topic.
