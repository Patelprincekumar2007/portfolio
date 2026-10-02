"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
    );
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24 flex flex-col justify-center">
      <section className="w-full px-6 md:px-12 flex flex-col lg:flex-row gap-24">
        <div className="lg:w-1/2">
          <h1 className="text-[10vw] lg:text-[7vw] font-bold tracking-tighter uppercase leading-[0.9] hover-expand transition-transform origin-left">
            WHO<br/>IS<br/>PATEL<br/>PRINCE?
          </h1>
        </div>
        <div className="lg:w-1/2 flex flex-col justify-end space-y-16">
          
          <div className="space-y-4">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--text-meta)]">EDUCATION</p>
            <p className="text-2xl md:text-4xl font-light tracking-tight text-balance">
              B.Tech Computer Science & Engineering<br/>
              <span className="text-[var(--text-secondary)]">CSPIT, CHARUSAT (2024-2028)</span>
            </p>
            <p className="text-sm font-mono tracking-widest uppercase text-[var(--text-secondary)]">Semester 5 — CGPA 7.95/10</p>
            <p className="text-sm font-mono tracking-widest uppercase text-[var(--text-secondary)]">10th: 90% | 12th: 85%</p>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--text-meta)]">FOCUS</p>
            <p className="text-2xl md:text-4xl font-light tracking-tight text-balance">
              Data Science / Analytics<br/>
              Machine Learning / Generative AI
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
