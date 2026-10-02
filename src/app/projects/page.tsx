"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CodePilotVisual from "@/components/ui/CodePilotVisual";

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;
    
    const chapters = gsap.utils.toArray('.project-chapter');
    
    chapters.forEach((chapter: any, i) => {
      gsap.fromTo(chapter, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: chapter,
            start: "top 80%",
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
      <div className="px-6 md:px-12 mb-24">
        <h1 className="text-[10vw] lg:text-[7vw] font-bold tracking-tighter uppercase leading-[0.9]">
          SELECTED<br/>WORK
        </h1>
      </div>

      <section className="w-full border-t border-[var(--border-subtle)] pt-24">
        {/* Project 01 */}
        <div className="project-chapter px-6 md:px-12 mb-48">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="flex items-start space-x-6 md:space-x-12">
              <span className="text-2xl md:text-4xl font-mono tracking-tighter text-[var(--text-secondary)]">01</span>
              <h3 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-none hover-expand">WeatherSense<br/>AI</h3>
            </div>
          </div>
          <div className="w-full aspect-video bg-[#111] relative overflow-hidden flex items-center justify-center group border border-[var(--border-subtle)]">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#222] opacity-50 mix-blend-overlay"></div>
            <div className="w-full h-full absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, var(--text-meta) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.2 }}></div>
            <h4 className="text-[10vw] font-bold text-white opacity-20 rotate-12 scale-150 transform transition-transform duration-[2s] group-hover:scale-100 group-hover:rotate-0">ATMOSPHERE</h4>
          </div>
          <div className="flex justify-between items-center mt-8 text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase">
            <p className="text-[var(--text-secondary)]">Machine Learning / Python / Data</p>
            <a href="https://github.com/Patelprincekumar2007/WeatherSense-AI" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-secondary)] transition-colors flex items-center hover-expand">
              GITHUB <ArrowUpRight className="w-3 h-3 ml-2" />
            </a>
          </div>
        </div>

        {/* Project 02 */}
        <div className="project-chapter px-6 md:px-12 mb-48">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="flex items-start space-x-6 md:space-x-12">
              <span className="text-2xl md:text-4xl font-mono tracking-tighter text-[var(--text-secondary)]">02</span>
              <h3 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-none hover-expand">Student<br/>Placement</h3>
            </div>
          </div>
          <div className="w-full aspect-video bg-[#0f0f11] relative overflow-hidden flex items-end justify-between p-12 md:p-24 group border border-[var(--border-subtle)]">
            <h4 className="text-[8vw] font-bold text-[#fff] opacity-10 absolute top-12 left-12">PROBABILITY</h4>
            <div className="w-1/4 h-[40%] bg-[#222] transition-all duration-[1s] group-hover:h-[60%]"></div>
            <div className="w-1/4 h-[60%] bg-[#333] transition-all duration-[1s] group-hover:h-[30%]"></div>
            <div className="w-1/4 h-[80%] bg-[#555] transition-all duration-[1s] group-hover:h-[90%]"></div>
            <div className="w-1/4 h-[100%] bg-[#888] transition-all duration-[1s] group-hover:h-[70%]"></div>
          </div>
          <div className="flex justify-between items-center mt-8 text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase">
            <p className="text-[var(--text-secondary)]">Data Visualization / Model Prediction</p>
            <a href="https://github.com/Patelprincekumar2007/Student-Placement-Prediction" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-secondary)] transition-colors flex items-center hover-expand">
              GITHUB <ArrowUpRight className="w-3 h-3 ml-2" />
            </a>
          </div>
        </div>

        {/* Project 03 */}
        <div className="project-chapter px-6 md:px-12 mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="flex items-start space-x-6 md:space-x-12">
              <span className="text-2xl md:text-4xl font-mono tracking-tighter text-[var(--text-secondary)]">03</span>
              <h3 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-none hover-expand">IBM Bob<br/>CodePilot</h3>
            </div>
          </div>
          <div className="w-full aspect-video bg-[#050505] relative overflow-hidden flex items-center justify-center group border border-[var(--border-subtle)]">
             <CodePilotVisual />
          </div>
          <div className="flex justify-between items-center mt-8 text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase">
            <p className="text-[var(--text-secondary)]">AI / Logistics / Hackathon</p>
            <a href="https://github.com/Patelprincekumar2007/bob-ai-hackathon-PI-NANT" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-secondary)] transition-colors flex items-center hover-expand">
              GITHUB <ArrowUpRight className="w-3 h-3 ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
