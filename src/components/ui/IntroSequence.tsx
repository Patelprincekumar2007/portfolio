"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useApp } from "@/context/AppContext";
import { soundEngine } from "@/lib/audio";

export default function IntroSequence() {
  const { introFinished, setIntroFinished, setSoundEnabled } = useApp();
  const [progress, setProgress] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (introFinished) return;

    // 1. Loading Counter Simulation
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);
      if (currentProgress === 100) {
        clearInterval(interval);
        startSignature();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [introFinished]);

  const startSignature = () => {
    const tl = gsap.timeline();
    
    // Hide loader
    tl.to(".intro-loader", { opacity: 0, duration: 0.5 });
    
    // Fade in signature container
    tl.to(".signature-container", { opacity: 1, duration: 0.1 });
    
    // Attempt to play scribble sound (browser might block if no interaction occurred)
    try {
      soundEngine.init();
      soundEngine.playScribble();
    } catch (e) {
      // Silently fail if autoplay is blocked
    }

    // Draw Signature
    const paths = svgRef.current?.querySelectorAll("path");
    if (paths) {
      tl.fromTo(paths, 
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", stagger: 0.3 }
      );
    }
    
    // Physical expanding transition
    tl.to(".signature-container", { scale: 50, opacity: 0, duration: 1.5, ease: "power4.inOut" }, "+=0.5")
      .to(containerRef.current, { opacity: 0, duration: 1, onComplete: () => setIntroFinished(true) }, "-=1");
  };

  if (introFinished) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#0a0a0a] text-[#f0f0f0] flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* 1. Loader */}
      <div className="intro-loader flex flex-col items-center text-center absolute">
        <p className="text-[10px] font-mono tracking-[0.3em] text-[#555] mb-4">INITIALIZING PORTFOLIO</p>
        <p className="text-sm font-mono tracking-widest">PATEL PRINCE</p>
        <p className="text-[10px] font-mono tracking-widest text-[#888] mt-2">DATA SCIENCE & ANALYTICS</p>
        <p className="text-4xl font-light mt-8">{progress}%</p>
      </div>

      {/* 2. Signature */}
      <div className="signature-container absolute flex flex-col items-center justify-center w-full max-w-2xl px-6 pointer-events-none opacity-0">
        <svg ref={svgRef} viewBox="0 0 500 150" className="w-full h-auto drop-shadow-lg overflow-visible" fill="none" stroke="#f0f0f0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Abstract 'P' and 'atel' scribble */}
          <path d="M 100,100 C 105,60 110,20 110,20 C 160,10 160,70 110,70 C 90,75 80,110 130,110 C 140,90 150,110 160,100 C 170,90 180,110 190,100" />
          {/* Abstract 'P' and 'rince' scribble */}
          <path d="M 220,100 C 225,60 230,20 230,20 C 280,10 280,70 230,70 C 210,75 200,110 250,110 C 260,90 270,110 280,100 C 290,90 300,110 310,100" />
          {/* Sharp underline slash */}
          <path d="M 80,130 C 150,140 250,120 350,110" strokeWidth="1.5" opacity="0.6" />
        </svg>
      </div>



    </div>
  );
}
