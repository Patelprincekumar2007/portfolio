"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroSequence from "@/components/ui/IntroSequence";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { introFinished, theme } = useApp();

  useEffect(() => {
    if (!introFinished) return;
    
    gsap.registerPlugin(ScrollTrigger);

    // Initial reveal animation after intro
    gsap.fromTo(
      ".reveal-text",
      { opacity: 0, y: 100, rotationX: -90 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1.5, stagger: 0.1, ease: "expo.out" }
    );

    gsap.fromTo(
      ".reveal-fade",
      { opacity: 0 },
      { opacity: 1, duration: 2, delay: 0.5, ease: "power2.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [introFinished]);

  return (
    <main ref={containerRef} className="relative w-full min-h-screen font-sans selection:bg-white selection:text-black overflow-hidden">
      
      {/* Intro Sequence Overlay */}
      {!introFinished && <IntroSequence />}

      {/* 
        ==================================================
        HERO SECTION
        ==================================================
      */}
      <section className="relative w-full h-screen flex flex-col justify-center px-6 md:px-12 pt-20">
        
        <div className="z-10 flex flex-col items-start w-full max-w-7xl mx-auto mix-blend-difference pointer-events-none">
          <div className="overflow-hidden mb-2">
            <h1 className="reveal-text text-white text-[15vw] md:text-[12vw] font-bold tracking-tighter uppercase leading-[0.8] origin-bottom hover-expand transition-transform duration-700">
              PATEL
            </h1>
          </div>
          <div className="overflow-hidden mb-8 md:mb-12">
            <h1 className="reveal-text text-white text-[15vw] md:text-[12vw] font-bold tracking-tighter uppercase leading-[0.8] origin-bottom hover-expand transition-transform duration-700 ml-12 md:ml-32">
              PRINCE
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full mt-12 md:mt-24 space-y-8 md:space-y-0">
            <div className="overflow-hidden">
              <h2 className="reveal-text text-white text-lg md:text-3xl font-mono tracking-[0.2em] uppercase max-w-md">
                DATA SCIENCE<br />& ANALYTICS
              </h2>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-6 md:left-12 flex flex-col z-20 max-w-sm reveal-fade">
          <p className="text-sm md:text-lg font-light tracking-tight leading-snug">
            I turn messy data into models, insights, and intelligent systems.
          </p>
        </div>

        <div className="absolute bottom-12 right-6 md:right-12 flex flex-col z-20 text-right space-y-1 reveal-fade">
          <p className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">BASED IN GUJARAT, INDIA</p>
          <p className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">OPEN TO INTERNSHIPS</p>
          <p className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">2026</p>
        </div>
      </section>

      {/* 
        ==================================================
        ENTER CTA
        ==================================================
      */}
      <section className="w-full px-6 md:px-12 py-32 border-t border-[var(--border-subtle)] flex items-center justify-center reveal-fade">
        <a 
          href="/projects" 
          className="group relative flex items-center justify-center px-12 py-6 border border-[var(--border-subtle)] hover:border-[var(--text-primary)] transition-colors overflow-hidden"
        >
          <span className="relative z-10 text-xl md:text-3xl font-mono tracking-[0.2em] uppercase group-hover:text-[var(--bg-primary)] transition-colors duration-500">
            ENTER PORTFOLIO
          </span>
          <div className="absolute inset-0 bg-[var(--text-primary)] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
        </a>
      </section>

    </main>
  );
}
