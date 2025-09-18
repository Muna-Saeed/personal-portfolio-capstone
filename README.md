# Personal Portfolio — Capstone Plan

**Project:** Personal Portfolio App  
**Owner:** Muna Mohammed  
**Repo:** `personal-portfolio-capstone`

---

## Project summary
A modern, responsive personal portfolio built with Next.js + TypeScript and Tailwind CSS that showcases projects, skills, an about section, and a contact form. Designed for recruiters, collaborators, and clients to learn about my work and contact me.

**Why it matters:**  
A personal portfolio is an essential tool for standing out in the tech industry. It acts as a dynamic resume and central hub for projects and achievements.

---

## Tech stack
- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts (for skills / progress visuals)
- **Testing:** Vitest + @testing-library/react
- **Hosting:** Vercel
- **Version Control:** Git + GitHub  
- **AI-Enhanced IDE:** Cursor  

---

## Features

<!-- AUTO-FEATURES:START -->

- Responsive Navbar with mobile menu
- Animated Hero section (Framer Motion)
- About section with skill chart
- Contact form with a11y validation
- ProjectCard component with badges and links
- Projects page (App Router)
- Projects API (GET/POST)
- Project item API (GET/PUT/DELETE)
- Contact API endpoint
- Mongoose + Mongo integration
- Vitest tests for ProjectCard
- Vitest tests for ContactForm

<!-- AUTO-FEATURES:END -->

---

## MVP features (minimum for capstone)
1. Landing / Hero section with CTA
2. Projects page/grid using a typed `Project` list (local data file)
3. About section + skill chart
4. Contact form
5. Deployed on Vercel
6. README with AI integration plan (this file)

---

## Data model (client-side)
```ts
interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  image?: string;
}
```
---

## 🧠 AI Integration Strategy

### 1. 🧱 Code or Feature Generation
- Use **Cursor** to scaffold React components (Navbar, About, Projects, Contact forms).  
- Ask AI to generate **responsive Tailwind CSS layouts**.  
- Use prompts for reusable utility functions (e.g., form validation).  

## Prompt Strategy
1. **For code generation**  
**used Prompts:** 

> “Generate a responsive Next.js portfolio landing page hero component.
File: components/Hero.tsx
- Client component
- Use Tailwind CSS + Framer Motion for animations
- Props: none (hardcode name + short bio for now)
- Include accessible semantics (role="banner", h1 for name, p for bio, button with aria-label)”

> “Create a Next.js App Router projects page.
File: app/projects/page.tsx
- Server component
- Import Project[] data from data/projects.ts
- Render responsive grid of ProjectCard components
- Use Tailwind responsive grid classes”


> “Create a ProjectCard component.
File: components/ProjectCard.tsx
Props: 
interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  image?: string;
}
Requirements:
- Render title, description, tech badges
- Display repoUrl and liveUrl as accessible links
- Use Tailwind CSS for styling, include placeholder image if image is missing
- Accessible markup (aria-labels on links)”

---

### 2. 🧪 Testing Support
- Used **Jest + React Testing Library** for component testing.  

**Used Prompts:**  
> “Write a Vitest + Testing Library test for ProjectCard.
File: components/ProjectCard.test.tsx
- Render component with mocked Project props
- Assert title, description, and tech badges render correctly
- Assert repoUrl and liveUrl render if provided
- Use screen.getByText / getByRole”

> “Write tests for ContactForm component.
File: components/ContactForm.test.tsx
- Check required fields validation (name, email, message)
- Mock global.fetch
- Assert successful submission calls fetch with correct body
- Use Vitest + @testing-library/react”

3. **For documentation**  
- Use AI to generate docstrings and inline comments explaining intent and edge cases.
**Used Prompts:**  
   > “Add JSDoc-style comments
- Document each prop and its purpose
- Describe edge cases and assumptions
- Keep comments concise but clear”  

---

### 3. 📡 Schema-Aware or API-Aware Generation
- Context-aware scaffolding
When adding server/API code, provided the AI with file context (anchors like #File or @file) so outputs match codebase conventions.
  - Use AI to generate CRUD routes for projects.  
  - Feed schema definitions into Cursor for context-aware generation.  

**used Prompt:**  
> “Based on this Mongoose schema for a project model, generate CRUD endpoints.”

---

### 4. 🔍 In-Editor/PR Review Tooling
- Use CodeRabbit and built-in Cursor review to review diffs.
- Use AI to generate clear commit messages and PR summaries.
  - Suggest better commit messages.  
  - Generate PR summaries.  
  - Catch redundant code or unused imports.  
  - Improve documentation in real-time.  
---





