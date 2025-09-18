# Reflection

## What I Tried

For this task, I used AI to scaffold and refactor parts of my project. Specifically, I asked it to generate:

* A **responsive Next.js portfolio landing page** with a Hero section.
* A **Projects page** that reads from a typed `projects.ts` file and renders `ProjectCard` components.
* A **ContactForm** with validation and tests using Vitest + Testing Library.
* Unit tests for `ProjectCard` and `ContactForm`.
* JSDoc-style comments to enforce clarity of props and assumptions.

## How It Related to My Rules

From my **`project_rules.mdc`** file, I had rules about **accessibility, typed data models, testing, modularity, and maintainability**.

Here’s how the AI performed against them:

* ✅ **Accessibility:** It included semantic HTML (like `header`, `button`, `section`) in most generated code.
* ✅ **Typed models:** It correctly used TypeScript `interface Project` with optional fields.
* ✅ **Testing:** The AI produced Vitest + Testing Library tests that covered rendering and validation.
* ⚠️ **Maintainability:** Some code was verbose or used repeated pattern (I had to refactor a bit).

## What Worked Well

* Fast scaffolding of repetitive files like `ProjectCard.tsx` and test files.
* Clear, typed props with helpful inline comments.
* Quick iteration allowed me to spot issues and update rules.

## Key Takeaways

* AI is great for **kickstarting scaffolding** but doesn’t always follow framework best practices unless you explicitly prompt for them.
* Writing **rules first** really helps spot mistakes faster and avoid blindly trusting generated code.
* Updating rules is just as important as writing them—because each iteration teaches you new gaps.