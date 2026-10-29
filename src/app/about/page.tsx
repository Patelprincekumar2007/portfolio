"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { GraduationCap, Terminal, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const SKILLS = [
  { category: "Core Languages", items: ["Python", "C++", "C", "SQL"] },
  { category: "Data & ML", items: ["Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Seaborn"] },
  { category: "AI & Architecture", items: ["Generative AI", "RAG Systems", "Prompt Engineering", "Predictive Modeling"] },
  { category: "Tools & Workflow", items: ["Git", "GitHub", "Jupyter", "VS Code", "Data Pipelines"] },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24 flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 w-full">
      <div className="mb-16">
        <p className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--text-meta)] mb-3">BIOGRAPHY & BACKGROUND</p>
        <h1 className="text-[12vw] lg:text-[7vw] font-bold tracking-tighter uppercase leading-[0.85] text-[var(--text-primary)] hover-expand">
          WHO IS<br/>PATEL PRINCE?
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Summary & Education */}
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-6 text-lg md:text-2xl font-light text-[var(--text-primary)] leading-relaxed">
            <p>
              I am a Computer Science & Engineering student specializing in <strong className="font-semibold">Data Science, Analytics, and Applied Machine Learning</strong>.
            </p>
            <p className="text-[var(--text-secondary)]">
              My engineering philosophy revolves around clarity: demystifying large datasets, architecting clean mathematical models, and transforming complex signals into clear, actionable intelligence.
            </p>
          </div>

          {/* Education Card */}
          <div className="glass-panel p-8 rounded-lg space-y-4 border border-[var(--border-subtle)]">
            <div className="flex items-center space-x-3 text-[var(--text-primary)]">
              <GraduationCap className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-mono font-semibold tracking-wider uppercase">ACADEMIC BACKGROUND</h3>
            </div>
            
            <div className="pt-2">
              <h4 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
                B.Tech in Computer Science & Engineering
              </h4>
              <p className="text-sm md:text-base text-[var(--text-secondary)] mt-1">
                CSPIT, CHARUSAT University (2024 - 2028)
              </p>
              <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono tracking-widest uppercase">
                <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded text-[var(--text-primary)]">
                  Current: Sem 5 · CGPA 7.95 / 10
                </span>
                <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded text-[var(--text-secondary)]">
                  Class 10th: 90%
                </span>
                <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded text-[var(--text-secondary)]">
                  Class 12th: 85%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Technical Matrix */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-panel p-8 rounded-lg border border-[var(--border-subtle)]">
            <div className="flex items-center space-x-3 text-[var(--text-primary)] mb-6">
              <Terminal className="w-5 h-5 text-green-400" />
              <h3 className="text-sm font-mono tracking-[0.2em] font-semibold uppercase">TECHNICAL ARSENAL</h3>
            </div>

            <div className="space-y-6">
              {SKILLS.map((grp) => (
                <div key={grp.category}>
                  <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-meta)] mb-2.5">
                    {grp.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {grp.items.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-mono rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CTA */}
          <div className="p-6 border border-dashed border-[var(--border-subtle)] rounded-lg text-center space-y-4">
            <p className="text-xs font-mono tracking-widest uppercase text-[var(--text-meta)]">CAREER OBJECTIVE</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
              Seeking rigorous Data Science & Machine Learning internships where I can contribute to predictive model pipelines and real-world data engineering.
            </p>
            <Link 
              href="/resume"
              className="inline-flex items-center text-xs font-mono font-bold tracking-widest uppercase text-[var(--text-primary)] hover:underline pt-2"
            >
              INSPECT FULL RESUME / CV <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
