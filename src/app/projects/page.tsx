import React from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ArrowUpRight, Code } from "lucide-react";

export const metadata = {
  title: "Work | Patel Prince",
  description: "Explore my data science, machine learning, and AI projects.",
};

export default function ProjectsPage() {
  return (
    <div className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Work & Projects</h1>
        <p className="text-gray-400 max-w-2xl text-lg font-light">
          A selection of projects focusing on data analysis, machine learning models, and practical AI applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id} className="group block">
            <div className="glass-panel p-8 rounded-lg h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-gray-500">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-medium tracking-widest uppercase text-accent-muted mb-2 block">
                    {project.category}
                  </span>
                  <h2 className="text-2xl font-semibold tracking-wide group-hover:text-white transition-colors">
                    {project.title}
                  </h2>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
              </div>
              
              <p className="text-gray-400 font-light leading-relaxed mb-8 flex-1">
                {project.shortDescription}
              </p>
              
              <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-6 border-t border-[rgba(255,255,255,0.05)]">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs bg-[rgba(255,255,255,0.05)] rounded text-gray-300">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs text-gray-500">+{project.technologies.length - 3}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  {project.githubUrl && (
                    <span className="text-gray-400 hover:text-white transition-colors">
                      <Code className="w-5 h-5" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
