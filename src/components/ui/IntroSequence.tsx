"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useApp } from "@/context/AppContext";
import { FastForward } from "lucide-react";

export default function IntroSequence() {
  const pathname = usePathname();
  const { introFinished, setIntroFinished } = useApp();
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const signatureStartedRef = useRef(false);
  const isSkippingRef = useRef(false);

  // Instantly bypass on any sub-page
  useEffect(() => {
    if (pathname !== "/" && !introFinished) {
      setIntroFinished(true);
    }
  }, [pathname, introFinished, setIntroFinished]);

  // Respect prefers-reduced-motion: immediately finish intro
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches && !introFinished) {
        setIntroFinished(true);
      }
    }
  }, [introFinished, setIntroFinished]);

  // Draw signature animation (silent, smooth entry without audio)
  const handleStartSignature = useCallback(() => {
    if (signatureStartedRef.current || isSkippingRef.current) return;
    signatureStartedRef.current = true;

    // Animate loader fade and signature drawing
    try {
      const tl = gsap.timeline({
        onComplete: () => {
          setIntroFinished(true);
        },
      });

      // Quick fade of loader counter
      tl.to(".intro-loader", { opacity: 0, duration: 0.25, ease: "power2.out" })
        .to(".signature-container", { opacity: 1, duration: 0.15 }, "-=0.1");

      // Draw Signature paths smoothly
      const paths = svgRef.current?.querySelectorAll("path");
      if (paths && paths.length > 0) {
        tl.fromTo(
          paths,
          { strokeDasharray: 1000, strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.inOut",
            stagger: 0.15,
          }
        );
      }

      // Exit transition: gentle scale and fade
      tl.to(
        ".signature-container",
        { scale: 1.08, opacity: 0, duration: 0.45, ease: "power2.inOut" },
        "+=0.15"
      ).to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      );
    } catch {
      // If GSAP fails for any reason, finish immediately
      setIntroFinished(true);
    }
  }, [setIntroFinished]);

  // Instant skip for ESC or skip button (silent)
  const handleInstantSkip = useCallback(() => {
    if (isSkippingRef.current) return;
    isSkippingRef.current = true;

    if (containerRef.current) {
      try {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            setIntroFinished(true);
          },
        });
      } catch {
        setIntroFinished(true);
      }
    } else {
      setIntroFinished(true);
    }
  }, [setIntroFinished]);

  // Fast, responsive loading progression (0-100% in ~400ms)
  useEffect(() => {
    if (introFinished || pathname !== "/") return;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 25) + 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setProgress(100);
        handleStartSignature();
      } else {
        setProgress(currentProgress);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [introFinished, pathname, handleStartSignature]);

  // Click on screen: start signature immediately (silent)
  const handleScreenClick = useCallback(() => {
    if (!signatureStartedRef.current) {
      handleStartSignature();
    }
  }, [handleStartSignature]);

  // Keyboard accessibility: Escape to skip immediately, Enter / Space to advance
  useEffect(() => {
    if (introFinished || pathname !== "/") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleInstantSkip();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleStartSignature();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [introFinished, pathname, handleInstantSkip, handleStartSignature]);

  // Safe fallback timer: never leave visitor stuck
  useEffect(() => {
    if (introFinished || pathname !== "/") return;

    const safetyTimer = setTimeout(() => {
      setIntroFinished(true);
    }, 4500);

    return () => clearTimeout(safetyTimer);
  }, [introFinished, pathname, setIntroFinished]);

  if (introFinished || pathname !== "/") return null;

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label="Skip intro and enter portfolio"
      onClick={handleScreenClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleStartSignature();
        }
      }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0c] text-[#f5f5f5] flex flex-col items-center justify-center overflow-hidden font-sans cursor-pointer select-none will-change-[opacity]"
    >
      {/* Skip Hint */}
      <div className="absolute top-8 right-8 flex items-center text-[10px] font-mono tracking-widest text-[#777] uppercase">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleInstantSkip();
          }}
          className="flex items-center space-x-1 text-[#888] hover:text-white transition-colors cursor-pointer pointer-events-auto"
        >
          <span>SKIP [ESC]</span>
          <FastForward className="w-3.5 h-3.5 ml-1" />
        </button>
      </div>

      {/* 1. Loader */}
      <div className="intro-loader flex flex-col items-center text-center absolute px-6 will-change-[opacity]">
        <p className="text-[10px] font-mono tracking-[0.3em] text-[#666] mb-3 uppercase">
          INITIALIZING ARCHITECTURE
        </p>
        <p className="text-base font-mono tracking-[0.25em] uppercase font-semibold">
          PATEL PRINCE
        </p>
        <p className="text-[10px] font-mono tracking-widest text-[#888] mt-1.5">
          DATA SCIENCE & ANALYTICS
        </p>

        <p className="text-5xl font-light mt-6 font-mono tracking-tighter text-white">
          {progress}%
        </p>

        <p className="text-[10px] font-mono tracking-widest text-[#666] mt-4 uppercase">
          CALIBRATING MODELS...
        </p>
      </div>

      {/* 2. Signature */}
      <div className="signature-container absolute flex flex-col items-center justify-center w-full max-w-xl px-6 pointer-events-none opacity-0 will-change-[transform,opacity]">
        <svg
          ref={svgRef}
          viewBox="0 0 500 150"
          className="w-full h-auto"
          fill="none"
          stroke="#f5f5f5"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Abstract 'P' and 'atel' scribble */}
          <path d="M 100,100 C 105,60 110,20 110,20 C 160,10 160,70 110,70 C 90,75 80,110 130,110 C 140,90 150,110 160,100 C 170,90 180,110 190,100" />
          {/* Abstract 'P' and 'rince' scribble */}
          <path d="M 220,100 C 225,60 230,20 230,20 C 280,10 280,70 230,70 C 210,75 200,110 250,110 C 260,90 270,110 280,100 C 290,90 300,110 310,100" />
          {/* Sharp underline slash */}
          <path d="M 80,130 C 150,140 250,120 350,110" strokeWidth="1.8" opacity="0.7" />
        </svg>
      </div>
    </div>
  );
}
