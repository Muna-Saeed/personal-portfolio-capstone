/**
 * About section with short bio and simple skill bar chart.
 * Assumptions: skill levels are 0-100 integers used for width percentages.
 */
export default function About() {
  const skills: { name: string; level: number }[] = [
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "React", level: 90 },
    { name: "TailwindCSS", level: 88 },
    { name: "Testing", level: 80 }
  ];

  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 id="about-heading" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          About Me
        </h2>
        <p className="mt-4 text-slate-700 dark:text-slate-300">
          I’m a full-stack engineer passionate about building robust, scalable web applications from database to UI. I enjoy working across the stack, from backend APIs to frontend interfaces, with a focus on clean code, accessibility, and thoughtful design.
        </p>

        <div className="mt-8 space-y-4" aria-label="Skill levels">
          {skills.map((skill) => (
            <div key={skill.name} className="">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{skill.name}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400" aria-hidden>
                  {skill.level}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={skill.level} aria-label={`${skill.name} proficiency`}>
                <div className="h-full rounded-full bg-indigo-600" style={{ width: `${skill.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


