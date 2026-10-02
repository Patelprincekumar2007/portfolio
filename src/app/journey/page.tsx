"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function JourneyPage() {
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
        <div className="lg:w-1/3">
           <h1 className="text-[10vw] lg:text-[5vw] font-bold tracking-tighter uppercase leading-[0.9]">
             PROFESSIONAL<br/>JOURNEY
           </h1>
        </div>
        <div className="lg:w-2/3 space-y-24">
           <div className="space-y-4">
             <h4 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none hover-expand">DATA SCIENCE<br/>INTERN</h4>
             <p className="text-2xl font-light text-[var(--text-secondary)]">SPARKS TO IDEAS</p>
             <p className="text-sm font-mono tracking-widest text-[var(--text-meta)] uppercase pt-4">11 May 2026 — 12 June 2026</p>
           </div>
           <div className="space-y-4 pt-12 border-t border-[var(--border-subtle)]">
             <h4 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none hover-expand">IBM BOB<br/>AI HACKATHON</h4>
             <p className="text-2xl font-light text-[var(--text-secondary)]">2026</p>
             <ul className="text-sm font-mono tracking-widest text-[var(--text-meta)] uppercase space-y-2 pt-4">
               <li>— ML / AI implementation</li>
               <li>— PPT / presentation development</li>
             </ul>
           </div>
        </div>
      </section>
    </div>
  );
}
