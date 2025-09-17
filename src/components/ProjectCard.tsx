import Image from "next/image";

/**
 * Project domain model used by `ProjectCard` and `data/projects`.
 * - `techStack`: ordered list of technologies used. Empty array hides badges.
 * - `image`: optional preview image path or URL. When absent a placeholder is shown.
 * - `repoUrl`/`liveUrl`: optional links rendered only when provided.
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
 * Props for `ProjectCard`.
 * - `project`: project details to render. Missing `image` shows a placeholder.
 */
interface ProjectCardProps {
  /** Project details to display. */
  project: Project;
}

/**
 * Renders a single project card with preview image, title, description,
 * technology badges, and optional links to live site and repository.
 *
 * Accessibility: links include descriptive `aria-label`s; placeholder image has
 * visible text. Cards are purely presentational (no interactive role).
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, techStack, repoUrl, liveUrl, image } = project;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {image ? (
          <Image
            src={image}
            alt={`${title} preview`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-100 to-cyan-100 text-indigo-700 dark:from-indigo-900/40 dark:to-cyan-900/40 dark:text-indigo-300">
            <span className="text-sm font-medium">No image available</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {description}
        </p>

        {techStack?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <li key={tech}>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        )}

        {(repoUrl || liveUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live site for ${title} in a new tab`}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
              >
                Live
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-90"
                  aria-hidden="true"
                >
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M21 14v7H3V3h7" />
                </svg>
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open repository for ${title} in a new tab`}
                className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-800/50 dark:focus-visible:ring-offset-slate-900"
              >
                Code
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-90"
                  aria-hidden="true"
                >
                  <path d="m18 16 4-4-4-4" />
                  <path d="m6 8-4 4 4 4" />
                  <path d="m14.5 4-5 16" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}