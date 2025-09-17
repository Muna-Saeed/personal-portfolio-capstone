/**
 * Shared Project type for portfolio items.
 * Assumptions:
 * - `techStack` is a small array (<= ~10 items) of human-readable labels.
 * - `image` may be a local path under `/public` or an absolute URL.
 * - `repoUrl`/`liveUrl` are optional and validated client-side when present.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  image?: string;
}

/**
 * Example projects displayed on the Projects page.
 * Edge cases covered:
 * - Some items omit `image` or `liveUrl` to exercise optional-link rendering.
 */
export const projects: Project[] = [
  {
    id: "p1",
    title: "Personal Portfolio",
    description:
      "A fast, accessible portfolio built with Next.js App Router, Tailwind CSS, and Framer Motion.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    repoUrl: "https://github.com/youruser/portfolio",
    liveUrl: "https://yourdomain.com",
    image: "/images/projects/portfolio.jpg"
  },
  {
    id: "p2",
    title: "E-commerce Storefront",
    description:
      "Headless e-commerce UI with product search, cart, and checkout using Stripe.",
    techStack: ["Next.js", "Stripe", "SWR", "Zustand"],
    repoUrl: "https://github.com/youruser/storefront",
    liveUrl: "https://storefront.example.com",
    image: "/images/projects/storefront.jpg"
  },
  {
    id: "p3",
    title: "Realtime Chat App",
    description:
      "A realtime chat application with rooms, typing indicators, and optimistic updates.",
    techStack: ["Next.js", "Socket.IO", "Redis", "TailwindCSS"],
    repoUrl: "https://github.com/youruser/realtime-chat",
    liveUrl: "https://chat.example.com"
  },
  {
    id: "p4",
    title: "Blog Platform",
    description:
      "Markdown-powered blog with MDX components, RSS, and SEO-friendly routes.",
    techStack: ["Next.js", "MDX", "Contentlayer", "SEO"],
    repoUrl: "https://github.com/youruser/next-mdx-blog",
    image: "/images/projects/blog.jpg"
  },
  {
    id: "p5",
    title: "Design System",
    description:
      "A reusable component library with Radix UI primitives and dark mode support.",
    techStack: ["React", "TypeScript", "Radix UI", "TailwindCSS"],
    repoUrl: "https://github.com/youruser/design-system"
  },
  {
    id: "p6",
    title: "Analytics Dashboard",
    description:
      "Interactive dashboard with charts, filters, and server-side data fetching.",
    techStack: ["Next.js", "React Query", "D3.js", "TailwindCSS"],
    liveUrl: "https://dashboard.example.com",
    image: "/images/projects/dashboard.jpg"
  }
];


