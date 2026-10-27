"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { introFinished } = useApp();

  useEffect(() => {
    if (!introFinished) return;
    
    gsap.registerPlugin(ScrollTrigger);

    // High performance GPU-accelerated reveal without 3D rotation layout thrash
    gsap.fromTo(
      ".reveal-text",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.85, stagger: 0.08, ease: "power3.out" }
    );

    gsap.fromTo(
      ".reveal-fade",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.0, delay: 0.25, ease: "power2.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [introFinished]);

  return (
    <main ref={containerRef} className="relative w-full min-h-screen font-sans selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] overflow-hidden">
      
      {/* 
        ==================================================
        HERO SECTION
        ==================================================
      */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center px-6 md:px-12 pt-28 pb-16">
        
        <div className="z-10 flex flex-col items-start w-full max-w-7xl mx-auto">
          <div className="overflow-hidden mb-2">
            <h1 className="reveal-text text-[var(--text-primary)] text-[15vw] md:text-[12vw] font-bold tracking-tighter uppercase leading-[0.8] origin-bottom hover-expand transition-transform duration-500 will-change-[transform,opacity]">
              PATEL
            </h1>
          </div>
          <div className="overflow-hidden mb-8 md:mb-12">
            <h1 className="reveal-text text-[var(--text-primary)] text-[15vw] md:text-[12vw] font-bold tracking-tighter uppercase leading-[0.8] origin-bottom hover-expand transition-transform duration-500 ml-8 md:ml-32 will-change-[transform,opacity]">
              PRINCE
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full mt-8 md:mt-16 space-y-8 md:space-y-0">
            <div className="overflow-hidden">
              <h2 className="reveal-text text-[var(--text-primary)] text-lg md:text-3xl font-mono tracking-[0.2em] uppercase max-w-md font-semibold will-change-[transform,opacity]">
                DATA SCIENCE<br />& ANALYTICS
              </h2>
            </div>
            
            <div className="reveal-fade max-w-md will-change-[transform,opacity]">
              <p className="text-base md:text-xl font-light tracking-tight text-[var(--text-secondary)] leading-relaxed">
                Transforming raw, complex data into accurate predictive models, deep statistical insights, and production-grade intelligent systems.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto mt-16 pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 reveal-fade text-[10px] md:text-xs font-mono tracking-widest uppercase text-[var(--text-meta)] will-change-[transform,opacity]">
          <p>BASED IN GUJARAT, INDIA · CHARUSAT</p>
          <p>B.TECH CSE (2024-2028) · CGPA 7.95</p>
          <p className="text-[var(--text-primary)] font-medium">AVAILABLE FOR INTERNSHIPS</p>
        </div>
      </section>

      {/* 
        ==================================================
        ENTER CTA
        ==================================================
      */}
      <section className="w-full px-6 md:px-12 py-24 border-t border-[var(--border-subtle)] flex items-center justify-center reveal-fade will-change-[transform,opacity]">
        <Link 
          href="/projects" 
          className="group relative flex items-center justify-center px-10 md:px-16 py-6 border border-[var(--border-subtle)] hover:border-[var(--text-primary)] transition-all overflow-hidden"
        >
          <span className="relative z-10 text-lg md:text-2xl font-mono tracking-[0.25em] uppercase text-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-colors duration-500 flex items-center">
            ENTER PORTFOLIO <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 bg-[var(--text-primary)] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
        </Link>
      </section>

    </main>
  );
}
