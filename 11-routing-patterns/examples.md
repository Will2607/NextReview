# Routing Pattern Examples

Documentation-only examples. These diagrams and scenarios are for recognizing routing requirements. They are not executable application code.

## Example 1 — Simple Routing

```text
/
├── about
├── products
└── contact
```

Each location maps to a straightforward page: `/` is Home, `/about` is About, `/products` is Products, `/contact` is Contact.

No advanced routing pattern is needed. One path, one page, full view replacement is enough.

## Example 2 — Dashboard

```text
Dashboard
├── Main Analytics
├── Activity Feed
└── Notifications
```

Several UI regions may be meaningful at the same time. The user can stay in the dashboard while analytics, activity, and notifications all remain relevant parts of the screen.

Later routing patterns can model simultaneous route-driven regions. This example only identifies the requirement: more than one region may be route-driven at once.

## Example 3 — Gallery Modal

```text
Gallery
├── Photo A
├── Photo B
└── Photo C
```

In-app navigation:

```text
Gallery
↓
Open Photo B
↓
Photo B appears over Gallery
```

Direct navigation:

```text
/photos/b
↓
Photo B full view
```

This is a **context-preserving** navigation pattern. From the gallery, the photo appears without discarding the gallery. Visiting the photo URL directly can still show a full view. Arrival path can change presentation. This example does not teach intercepting folder conventions.

## Example 4 — Master Detail

```text
Messages
├── Conversation List
└── Selected Conversation
```

Both regions may be important simultaneously. The list shows where the user is in the inbox. The selected conversation shows the current thread. Replacing the entire screen with only the conversation would lose list context. Routing-aware composition can keep list and detail together with a meaningful location. This example does not introduce slots.

## Example 5 — Route State

UI-only state:

```text
selectedProduct = 123
```

Routing state:

```text
/products/123
```

URL-based state can support:

- direct links;
- refresh;
- browser history;
- sharing.

Local state can still be the right tool for temporary UI. Not all state belongs in the URL. Product identity is a good candidate for a location. A tooltip open/closed flag usually is not.

## Recognition Exercises

### Exercise 1

Scenario: A documentation site has Home, Guides, and About pages.

Question: Does this clearly require an advanced routing pattern?

**Answer:** No. Straightforward routing is sufficient.

### Exercise 2

Scenario: A dashboard needs three independently changing regions visible at the same time.

Question: What kind of routing requirement does this represent?

**Answer:** Simultaneous route-driven UI regions.

### Exercise 3

Scenario: A user opens a product from a list and the details appear as an overlay while the list remains visible.

Question: What requirement is being demonstrated?

**Answer:** Context-preserving navigation.

### Exercise 4

Scenario: A marketing site needs a Contact page that replaces the previous page entirely.

Question: Should this use an advanced routing pattern?

**Answer:** No. A simple route-to-page mapping is enough.

### Exercise 5

Scenario: Opening `/settings/profile` should restore the profile section after refresh, and the URL should be shareable.

Question: What is being represented in the URL?

**Answer:** Meaningful routing state (a shareable, restorable application location), not only local UI state.
