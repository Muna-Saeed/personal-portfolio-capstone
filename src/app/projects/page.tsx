import ProjectCard from "../../components/ProjectCard";
import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <section aria-labelledby="projects-heading" className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h1 id="projects-heading" className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Projects
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          A selection of work showcasing design, code quality, and product sense.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}