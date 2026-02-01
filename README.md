# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
pnpm dlx sv create --template minimal --types ts --add prettier eslint sveltekit-adapter="adapter:auto" devtools-json mcp="ide:vscode+setup:local" --install pnpm tests
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

You’re right to be unsure. The list is not bad, but it mixes learning levels, concepts, and use-cases in a way that will confuse beginners and bore advanced readers. It also leaks React mental models in a few places.

Below is a clear, opinionated restructuring, followed by why your current version feels off, and then a polished replacement outline you can adopt directly.

⸻

What’s wrong with the current structure (honest critique)

1. Conceptual levels are mixed

You jump like this:
	•	“What is Context API?” (concept)
	•	“Providing / Consuming Context” (mechanics)
	•	“Class-Based Context” (implementation detail)
	•	“Shopping Cart” (real app)
	•	“Multi-Tenant SaaS” (architecture)

A beginner doesn’t know why they’re learning each step.

⸻

2. “Reactive Context Fundamentals / Patterns” is vague

These titles don’t tell the reader:
	•	What problem is being solved
	•	What they’ll be able to build after

Good learning paths are outcome-driven.

⸻

3. “Class-Based Context” is misleading in Svelte 5

Context is not class-oriented by default, and emphasizing this early risks teaching the wrong abstraction.

Classes are an advanced technique, not a foundation.

⸻

4. Use cases appear too early

Shopping cart, auth, SaaS should come after mental models are locked in.

⸻

What a strong Context API learning path should do

Each section should answer one of these questions:
	1.	What problem does this solve?
	2.	When should I use it?
	3.	How does this change how I design components?

⸻

Recommended Structure (Beginner → Expert)

This keeps Svelte-native thinking, avoids React terminology, and scales cleanly.

⸻

Level 1 — Foundations (Beginner)

1. What Problem Does Context Solve?

Why prop drilling breaks down
When context is the right tool
Context vs props (mentally, not code-heavy)

⸻

2. Providing Shared Data to Child Components

setContext explained simply
Where context should live
What makes a good context value

Mini example: theme or config

⸻

3. Reading Context in Nested Components

getContext rules
Why context is hierarchical
What happens if context is missing

Mini example: consuming config

⸻

Level 2 — Core Mechanics (Intermediate)

4. Context Scope and Component Trees

Deep nesting explained visually
Why siblings cannot see each other
Multiple contexts in one tree

Diagram strongly recommended here

⸻

5. Making Context Reactive (Svelte 5 Way)

Using $state() inside context
Why reactivity belongs in the provider
Avoiding overuse of $effect()

Mini example: reactive counter or form state

⸻

6. Updating Shared State Through Context

Read-only vs read-write context
Passing actions instead of raw state
Stability and API design

This is where beginners usually get confused — explain slowly.

⸻

Level 3 — Design Patterns (Advanced)

7. Context as a Feature Boundary

Encapsulating logic + state
Public vs private context shape
Replacing “global stores” with scoped context

⸻

8. Compound Components Without Slots

Tabs, accordions, menus
Coordination through context
Why this scales better than props

Very Svelte-specific and very valuable.

⸻

9. Context Performance and Stability

Why context is cheap
What actually causes rerenders
When context becomes a smell

Short, sharp, opinionated section.

⸻

Level 4 — Real Systems (Expert)

10. Theme Management with Context

Multiple themes
Overrides
Server + client considerations

⸻

11. Authentication State with Context

User identity vs permissions
Layout-based context
Avoiding “auth store hell”

⸻

12. Multi-Step Forms and Wizards

Shared form state
Step validation
Navigation control

This is a perfect context use case.

⸻

13. Shopping Cart as a Scoped System

Why context beats global stores here
Isolation per page or checkout flow
Extensibility

⸻

14. Multi-Tenant SaaS Context Architecture

Tenant isolation
Per-request context
Why this matters for correctness

Expert-level, clearly marked as such.

⸻

Final Sections (Polish & Authority)

15. Context Best Practices

When NOT to use context
Naming conventions
Context keys and stability

⸻

16. Context vs Other Patterns in Svelte

Context vs props
Context vs stores
Context vs module state

This should be comparative, not defensive.

⸻

What I strongly recommend you change immediately
	•	Rename “Reactive Context Fundamentals” → “Making Context Reactive”
	•	Move class-based context into advanced patterns or remove entirely
	•	Push shopping cart / SaaS into expert-only territory
	•	Add diagrams around scope and hierarchy

⸻

If you want next steps

I can:
	•	Rewrite this into a final table of contents ready for publishing
	•	Start writing section 1–3 fully in Markdown
	•	Add ASCII diagrams that export cleanly to Markdown
	•	Convert this into a course-style progression with checkpoints

Just tell me how far you want to take it.