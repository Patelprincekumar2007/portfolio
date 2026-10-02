import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "About | Patel Prince",
  description: "My background in Data Science and Analytics.",
};

export default function AboutPage() {
  return (
    <div className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto w-full">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">About</h1>
        
        <div className="prose prose-invert max-w-none text-gray-300 font-light leading-relaxed space-y-6 text-lg">
          <p>
            I started my journey with programming fundamentals in C and C++, building a strong foundation in how software operates at a lower level.
          </p>
          <p>
            As I transitioned into Python and data ecosystems, I began exploring Pandas, NumPy, and SQL. This naturally evolved into building Machine Learning models and diving into the expanding field of Data Science.
          </p>
          <p>
            Recently, I have been expanding my focus into AI-assisted systems, exploring Retrieval-Augmented Generation (RAG) and LangChain to build applications that don't just process data, but understand and reason with it.
          </p>
          <p>
            I am currently exploring where Data Science and Analytics can take my career, actively seeking internships to apply my academic foundation to real-world problems.
          </p>
        </div>
      </div>

      <div className="space-y-16">
        
        {/* Experience Section */}
        <section>
          <h2 className="text-2xl font-semibold tracking-wide mb-8">Experience</h2>
          <div className="glass-panel p-8 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-white opacity-20"></div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-medium text-white mb-1">Data Science Intern</h3>
                <p className="text-gray-400">Sparks To Ideas</p>
              </div>
              <div className="mt-2 md:mt-0 text-sm text-gray-500 font-mono">
                11 May 2026 - 12 June 2026
              </div>
            </div>
            <p className="text-gray-400 font-light mt-4">
              Detailed responsibilities and project outcomes will be added upon completion of the internship.
            </p>
          </div>
        </section>

        {/* Hackathons */}
        <section>
          <h2 className="text-2xl font-semibold tracking-wide mb-8">Hackathons</h2>
          <div className="glass-panel p-8 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-medium text-white mb-1">IBM Bob AI Hackathon</h3>
                <p className="text-gray-400">Project: SmartRoute AI / CodePilot</p>
              </div>
              <div className="mt-2 md:mt-0 text-sm text-gray-500 font-mono">
                2026
              </div>
            </div>
            <p className="text-gray-300 font-light mt-4 mb-4">
              Focused on ML / AI implementation and presentation development. Built using AI-assisted development tools to accelerate prototyping.
            </p>
            <Link href="/projects/codepilot-ibm" className="inline-flex items-center text-sm text-white hover:text-gray-300 transition-colors">
              View Project <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-semibold tracking-wide mb-8">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="glass-panel p-6 rounded-lg">
              <h3 className="text-sm tracking-widest text-gray-500 uppercase mb-4">Programming</h3>
              <div className="flex flex-wrap gap-2">
                {['C', 'C++', 'Python'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 text-sm bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded text-gray-200">{skill}</span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-lg">
              <h3 className="text-sm tracking-widest text-gray-500 uppercase mb-4">Data</h3>
              <div className="flex flex-wrap gap-2">
                {['Pandas', 'NumPy', 'SQL'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 text-sm bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded text-gray-200">{skill}</span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-lg">
              <h3 className="text-sm tracking-widest text-gray-500 uppercase mb-4">AI / ML</h3>
              <div className="flex flex-wrap gap-2">
                {['Machine Learning', 'RAG', 'LangChain'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 text-sm bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded text-gray-200">{skill}</span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-lg">
              <h3 className="text-sm tracking-widest text-gray-500 uppercase mb-4">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Git', 'GitHub'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 text-sm bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded text-gray-200">{skill}</span>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
