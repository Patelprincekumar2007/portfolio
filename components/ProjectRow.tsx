import type { Project } from "@/lib/content";

export default function ProjectRow({ project }: { project: Project }) {
  const inner = (
    <article className="project-row group grid grid-cols-[auto_1fr] items-start gap-5 border-t border-paper/10 px-4 py-8 md:grid-cols-[80px_1fr_auto] md:px-6">
      <span className="font-mono text-sm text-accent">{project.index}</span>
      <div>
        <h3 className="font-display text-2xl font-black leading-tight md:text-4xl">
          {project.title}
          {project.badge && (
            <span className="ml-3 inline-block rounded-full border border-accent/50 px-3 py-1 align-middle font-mono text-[10px] font-normal uppercase tracking-widest text-accent">
              {project.badge}
            </span>
          )}
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-paper/40">{project.tagline}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/65">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full border border-paper/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-paper/55">
              {t}
            </span>
          ))}
        </div>
      </div>
      <span className="arrow hidden font-display text-3xl text-accent md:block">↗</span>
    </article>
  );
  if (project.link) {
    return (
      <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="block" aria-label={`${project.title} on ${project.link.label}`}>
        {inner}
      </a>
    );
  }
  return inner;
}
