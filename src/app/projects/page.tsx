"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CodePilotVisual from "@/components/ui/CodePilotVisual";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;
    
    const chapters = gsap.utils.toArray<HTMLElement>('.project-chapter');
    
    chapters.forEach((chapter) => {
      gsap.fromTo(chapter, 
        { y: 80, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.0, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: chapter,
            start: "top 85%",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24 flex flex-col">
      <div className="px-6 md:px-12 mb-20 max-w-7xl mx-auto w-full">
        <p className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--text-meta)] mb-4">SELECTED ARCHIVE</p>
        <h1 className="text-[11vw] lg:text-[7vw] font-bold tracking-tighter uppercase leading-[0.85] text-[var(--text-primary)]">
          FEATURED<br/>WORKS
        </h1>
        <p className="text-base md:text-xl font-light text-[var(--text-secondary)] mt-6 max-w-xl">
          A curated selection of machine learning architectures, statistical forecast pipelines, and AI systems built for real-world impact.
        </p>
      </div>

      <section className="w-full border-t border-[var(--border-subtle)] pt-16 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Project 01: WeatherSense AI */}
        <div className="project-chapter mb-36">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
            <div className="flex items-start space-x-6 md:space-x-10">
              <span className="text-xl md:text-3xl font-mono tracking-tighter text-[var(--text-meta)] pt-2">01</span>
              <div>
                <h3 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-none text-[var(--text-primary)] hover-expand">
                  WeatherSense<br/>AI
                </h3>
                <p className="text-xs md:text-sm font-mono tracking-widest text-[var(--text-secondary)] uppercase mt-3">
                  Machine Learning · Python · Predictive Meteorology
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-6 md:mt-0 text-xs font-mono tracking-widest uppercase">
              <Link 
                href="/projects/weather-sense-ai"
                className="flex items-center px-4 py-2 border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors rounded-sm"
              >
                <BookOpen className="w-3.5 h-3.5 mr-2" />
                Case Study
              </Link>
              <a 
                href="https://github.com/Patelprincekumar2007/WeatherSense-AI" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center px-4 py-2 bg-[var(--pill-bg)] text-[var(--pill-text)] font-semibold transition-transform hover:scale-105 rounded-sm"
              >
                <GithubIcon className="w-3.5 h-3.5 mr-2" />
                GitHub <ArrowUpRight className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          <div className="w-full aspect-video md:aspect-[21/9] bg-[#0c0c0e] rounded-lg relative overflow-hidden flex items-center justify-center group border border-[var(--border-subtle)]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-green-900/10"></div>
            <div className="w-full h-full absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #888 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            <div className="relative text-center z-10 p-6">
              <span className="text-xs font-mono tracking-[0.4em] text-blue-400 block mb-2">INTELLIGENT FORECAST ENGINE</span>
              <h4 className="text-4xl md:text-7xl font-bold text-white tracking-tighter uppercase opacity-80 group-hover:scale-105 transition-transform duration-700">
                ATMOSPHERIC MODEL
              </h4>
            </div>
          </div>
        </div>

        {/* Project 02: Student Placement Prediction */}
        <div className="project-chapter mb-36">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
            <div className="flex items-start space-x-6 md:space-x-10">
              <span className="text-xl md:text-3xl font-mono tracking-tighter text-[var(--text-meta)] pt-2">02</span>
              <div>
                <h3 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-none text-[var(--text-primary)] hover-expand">
                  Student<br/>Placement
                </h3>
                <p className="text-xs md:text-sm font-mono tracking-widest text-[var(--text-secondary)] uppercase mt-3">
                  Supervised Classification · Scikit-Learn · Feature Engineering
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-6 md:mt-0 text-xs font-mono tracking-widest uppercase">
              <Link 
                href="/projects/student-placement-prediction"
                className="flex items-center px-4 py-2 border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors rounded-sm"
              >
                <BookOpen className="w-3.5 h-3.5 mr-2" />
                Case Study
              </Link>
              <a 
                href="https://github.com/Patelprincekumar2007/Student-Placement-Prediction" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center px-4 py-2 bg-[var(--pill-bg)] text-[var(--pill-text)] font-semibold transition-transform hover:scale-105 rounded-sm"
              >
                <GithubIcon className="w-3.5 h-3.5 mr-2" />
                GitHub <ArrowUpRight className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          <div className="w-full aspect-video md:aspect-[21/9] bg-[#0c0c0e] rounded-lg relative overflow-hidden flex items-end justify-between p-8 md:p-16 group border border-[var(--border-subtle)]">
            <div className="absolute top-8 left-8 z-10">
              <span className="text-xs font-mono tracking-[0.4em] text-green-400 block mb-1">PROBABILITY DENSITY MATRIX</span>
              <p className="text-sm font-mono text-gray-400">Accuracy Score: 88.5% · ROC-AUC: 0.91</p>
            </div>
            
            <div className="w-full h-32 flex items-end space-x-3 md:space-x-6 z-10">
              <div className="flex-1 bg-green-500/20 border border-green-500/40 rounded-t h-[45%] transition-all duration-700 group-hover:h-[65%]"></div>
              <div className="flex-1 bg-green-500/30 border border-green-500/50 rounded-t h-[60%] transition-all duration-700 group-hover:h-[40%]"></div>
              <div className="flex-1 bg-green-500/50 border border-green-500/70 rounded-t h-[80%] transition-all duration-700 group-hover:h-[95%]"></div>
              <div className="flex-1 bg-green-500/70 border border-green-500/90 rounded-t h-[100%] transition-all duration-700 group-hover:h-[85%]"></div>
            </div>
          </div>
        </div>

        {/* Project 03: IBM Bob CodePilot */}
        <div className="project-chapter mb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
            <div className="flex items-start space-x-6 md:space-x-10">
              <span className="text-xl md:text-3xl font-mono tracking-tighter text-[var(--text-meta)] pt-2">03</span>
              <div>
                <h3 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-none text-[var(--text-primary)] hover-expand">
                  IBM Bob<br/>CodePilot
                </h3>
                <p className="text-xs md:text-sm font-mono tracking-widest text-[var(--text-secondary)] uppercase mt-3">
                  AI / RAG Architecture · Hackathon Finalist · Python & LLMs
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-6 md:mt-0 text-xs font-mono tracking-widest uppercase">
              <Link 
                href="/projects/codepilot-ibm"
                className="flex items-center px-4 py-2 border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors rounded-sm"
              >
                <BookOpen className="w-3.5 h-3.5 mr-2" />
                Case Study
              </Link>
              <a 
                href="https://github.com/Patelprincekumar2007/CodePilot-IBM-Bob-New" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center px-4 py-2 bg-[var(--pill-bg)] text-[var(--pill-text)] font-semibold transition-transform hover:scale-105 rounded-sm"
              >
                <GithubIcon className="w-3.5 h-3.5 mr-2" />
                GitHub <ArrowUpRight className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          <div className="w-full aspect-video md:aspect-[21/9] bg-[#050505] rounded-lg relative overflow-hidden flex items-center justify-center group border border-[var(--border-subtle)]">
             <CodePilotVisual />
          </div>
        </div>

      </section>
    </div>
  );
}
