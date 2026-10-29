"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Calendar, CheckCircle2 } from "lucide-react";

const MILESTONES = [
  {
    role: "Data Science Intern",
    company: "Sparks To Ideas",
    period: "11 May 2026 — 12 June 2026",
    type: "Internship",
    description: "Hands-on experience conducting exploratory data analysis, cleaning high-dimensional unstructured datasets, and evaluating machine learning classification algorithms.",
    highlights: [
      "Built exploratory data analysis pipelines for statistical anomaly detection",
      "Standardized data preprocessing and missing value imputation across diverse tables",
      "Evaluated model performance using precision, recall, and ROC-AUC metrics"
    ]
  },
  {
    role: "IBM Bob AI Hackathon Finalist",
    company: "IBM Hackathon PI-NANT",
    period: "2026",
    type: "Competition",
    description: "Architected CodePilot—an AI-assisted development and logistics optimization tool leveraging Retrieval-Augmented Generation (RAG) and LLMs.",
    highlights: [
      "Engineered prompt pipelines and context retrieval mechanisms",
      "Delivered technical pitch and system architecture demonstration",
      "Integrated machine learning heuristics for fast code search"
    ]
  },
  {
    role: "B.Tech Computer Science & Engineering",
    company: "CSPIT, CHARUSAT",
    period: "2024 — 2028 (Present)",
    type: "Academic Foundation",
    description: "Comprehensive coursework in Data Structures, Algorithms, Object-Oriented Programming (C++), Database Management Systems (SQL), and Machine Learning foundations.",
    highlights: [
      "Maintained strong academic standing: Sem 5 · CGPA 7.95/10",
      "Completed projects in predictive analytics, atmospheric modeling, and core C programming",
      "Active member in developer communities and algorithmic problem solving"
    ]
  }
];

export default function JourneyPage() {
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
      <div className="mb-20">
        <p className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--text-meta)] mb-3">EXPERIENCE TIMELINE</p>
        <h1 className="text-[11vw] lg:text-[7vw] font-bold tracking-tighter uppercase leading-[0.85] text-[var(--text-primary)] hover-expand">
          PROFESSIONAL<br/>JOURNEY
        </h1>
        <p className="text-base md:text-xl font-light text-[var(--text-secondary)] mt-6 max-w-xl">
          Tracking the evolution of technical competencies, professional internships, competitive hackathons, and research milestones.
        </p>
      </div>

      <div className="relative border-l border-[var(--border-subtle)] ml-4 md:ml-8 pl-8 md:pl-16 space-y-20">
        {MILESTONES.map((item) => (
          <div key={item.role} className="relative group">
            {/* Timeline Bullet */}
            <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-4 h-4 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--text-primary)] group-hover:scale-125 transition-transform duration-300"></div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono tracking-widest uppercase px-3 py-1 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded text-[var(--text-primary)] font-semibold">
                  {item.type}
                </span>
                <span className="flex items-center text-xs font-mono tracking-widest text-[var(--text-meta)] uppercase">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  {item.period}
                </span>
              </div>

              <div>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] uppercase">
                  {item.role}
                </h3>
                <p className="text-lg md:text-xl font-light text-[var(--text-secondary)] mt-1">
                  {item.company}
                </p>
              </div>

              <p className="text-base text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl pt-2">
                {item.description}
              </p>

              <div className="pt-2 space-y-2">
                {item.highlights.map((h, i) => (
                  <div key={i} className="flex items-start text-xs md:text-sm font-mono text-[var(--text-secondary)]">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
