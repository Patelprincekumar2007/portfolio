import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProjectRow from "@/components/ProjectRow";
import Footer from "@/components/Footer";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Patel Prince",
  description: "Selected projects by Patel Princekumar: machine learning, data pipelines and full-stack systems.",
};

export default function ProjectsPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 md:pt-36">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Selected archive</p>
          <h1 className="mt-2 font-display text-5xl font-black leading-none md:text-8xl">
            Featured<br />
            <span className="outline-text">Works</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-paper/60">
            Machine-learning systems, prediction pipelines and full-stack platforms built for real people -
            each one designed, built and shipped end to end.
          </p>
        </Reveal>
        <div className="mt-12 border-b border-paper/10">
          {projects.map((p) => (
            <Reveal key={p.index}>
              <ProjectRow project={p} />
            </Reveal>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
