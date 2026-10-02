"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function ContactPage() {
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
      <section className="w-full px-6 md:px-12 flex flex-col items-center text-center max-w-4xl mx-auto space-y-12">
        <h2 className="text-[12vw] md:text-[8vw] font-bold tracking-tighter uppercase leading-[0.8] hover-expand">
          LET'S BUILD<br/>SOMETHING.
        </h2>
        
        <p className="text-xl md:text-2xl font-light text-[var(--text-secondary)]">
          Looking for data-driven insights or intelligent system design? My inbox is open for internships and collaborations.
        </p>

        <a 
          href="mailto:24cs073@charusat.edu.in" 
          className="inline-flex items-center text-lg md:text-2xl font-mono tracking-widest border-b border-[var(--text-primary)] pb-2 hover:text-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-colors hover-expand"
        >
          [24cs073@charusat.edu.in]     [jnpatel3366@gmail.com] <ArrowUpRight className="ml-4 w-6 h-6" />
        </a>

        <div className="flex space-x-8 pt-12">
          <a href="https://github.com/Patelprincekumar2007" target="_blank" rel="noopener noreferrer" className="text-sm font-mono tracking-widest text-[var(--text-meta)] hover:text-white transition-colors">GITHUB</a>
          <a href="https://www.linkedin.com/in/princekumar-patel-b61038318" target="_blank" rel="noopener noreferrer" className="text-sm font-mono tracking-widest text-[var(--text-meta)] hover:text-white transition-colors">LINKEDIN</a>
        </div>
      </section>
    </div>
  );
}
