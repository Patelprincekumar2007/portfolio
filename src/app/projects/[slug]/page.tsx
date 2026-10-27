import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ArrowLeft, Code, ExternalLink, Cpu, CheckCircle2, FileText, Layers, Award } from "lucide-react";

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.id,
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
    <div className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto w-full">
      <Link 
        href="/projects" 
        className="inline-flex items-center text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-12 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1.5 transition-transform" />
        Back to All Projects
      </Link>

      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-xs font-mono tracking-widest uppercase px-3 py-1 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded text-[var(--text-meta)]">
            {project.category}
          </span>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-meta)]">
            YEAR {project.year}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-[var(--text-primary)]">
          {project.title}
        </h1>
        
        <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light leading-relaxed mb-8 max-w-3xl">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[var(--pill-bg)] text-[var(--pill-text)] text-xs font-mono font-bold tracking-widest uppercase rounded hover:opacity-90 transition-opacity"
            >
              <Code className="w-4 h-4 mr-2" />
              View Source Repository
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-mono font-medium tracking-widest uppercase rounded hover:bg-[var(--glass-bg)] transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demonstration
            </a>
          )}
        </div>
      </div>

      <div className="glass-panel rounded-lg p-8 md:p-12 space-y-12 border border-[var(--border-subtle)]">
        
        {/* Technologies Grid */}
        <div>
          <h2 className="text-xs font-mono tracking-widest text-[var(--text-meta)] uppercase mb-4 flex items-center">
            <Cpu className="w-4 h-4 mr-2 text-green-500" />
            TECHNOLOGY STACK
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span 
                key={tech} 
                className="px-3.5 py-1.5 text-xs font-mono bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded text-[var(--text-primary)] font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Contribution */}
        {project.contribution && (
          <div className="border-t border-[var(--border-subtle)] pt-8">
            <h2 className="text-xs font-mono tracking-widest text-[var(--text-meta)] uppercase mb-3 flex items-center">
              <Award className="w-4 h-4 mr-2 text-amber-400" />
              ROLE & CONTRIBUTION
            </h2>
            <p className="text-[var(--text-primary)] leading-relaxed font-light text-base md:text-lg">
              {project.contribution}
            </p>
          </div>
        )}

        {/* Problem Statement */}
        {project.problem && (
          <div className="border-t border-[var(--border-subtle)] pt-8">
            <h2 className="text-xs font-mono tracking-widest text-[var(--text-meta)] uppercase mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-blue-400" />
              THE CHALLENGE
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed font-light text-base md:text-lg">
              {project.problem}
            </p>
          </div>
        )}
        
        {/* Engineering Approach */}
        {project.approach && (
          <div className="border-t border-[var(--border-subtle)] pt-8">
            <h2 className="text-xs font-mono tracking-widest text-[var(--text-meta)] uppercase mb-3 flex items-center">
              <Layers className="w-4 h-4 mr-2 text-purple-400" />
              METHODOLOGY & ARCHITECTURE
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed font-light text-base md:text-lg">
              {project.approach}
            </p>
          </div>
        )}

        {/* Results & Key Findings */}
        {project.results && (
          <div className="border-t border-[var(--border-subtle)] pt-8">
            <h2 className="text-xs font-mono tracking-widest text-[var(--text-meta)] uppercase mb-3 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
              MEASURABLE RESULTS & FINDINGS
            </h2>
            <div className="p-6 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-lg">
              <p className="text-[var(--text-primary)] font-mono text-sm md:text-base leading-relaxed">
                {project.results}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
