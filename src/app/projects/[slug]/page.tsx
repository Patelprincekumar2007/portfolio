import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ArrowLeft, Code, ExternalLink } from "lucide-react";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Patel Prince`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto w-full">
      <Link href="/projects" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-12 group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Work
      </Link>

      <div className="mb-12">
        <span className="text-xs font-medium tracking-widest uppercase text-accent-muted mb-4 block">
          {project.category} · {project.year}
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          {project.title}
        </h1>
        <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white text-sm font-medium rounded-sm hover:bg-[rgba(255,255,255,0.1)] transition-colors"
            >
              <Code className="w-4 h-4 mr-2" />
              View Repository
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-black text-sm font-medium rounded-sm hover:bg-gray-200 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </a>
          )}
        </div>
      </div>

      <div className="glass-panel rounded-lg p-8 md:p-12 space-y-12">
        
        <div>
          <h2 className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-4">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-3 py-1.5 text-sm bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded text-gray-300">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.contribution && (
          <div>
            <h2 className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-4">My Contribution</h2>
            <p className="text-gray-300 leading-relaxed font-light">{project.contribution}</p>
          </div>
        )}
        
        {/* Placeholder for detailed case study sections. Data driven architecture allows adding these later. */}
        {(!project.problem && !project.approach && !project.results) && (
          <div className="pt-8 border-t border-[rgba(255,255,255,0.05)]">
            <p className="text-gray-500 italic font-light">Detailed case study coming soon.</p>
          </div>
        )}

        {project.problem && (
          <div>
            <h2 className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-4">The Problem</h2>
            <p className="text-gray-300 leading-relaxed font-light">{project.problem}</p>
          </div>
        )}
        
        {project.approach && (
          <div>
            <h2 className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-4">Approach</h2>
            <p className="text-gray-300 leading-relaxed font-light">{project.approach}</p>
          </div>
        )}

      </div>
    </div>
  );
}
