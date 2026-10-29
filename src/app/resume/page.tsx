"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, Download, ExternalLink, Printer } from "lucide-react";

const PrinterScene = dynamic(() => import("@/components/3d/PrinterScene"), { ssr: false });

type PrintState = "idle" | "printing" | "complete";

export default function ResumeChamberPage() {
  const [printState, setPrintState] = useState<PrintState>("idle");
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);

    window.addEventListener("resize", handleResize);
    mediaQuery.addEventListener("change", handleMotionChange);

    // Preload audio and link ended event
    const audio = new Audio("/audio/printer.mp3");
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSoundSequence = () => {
    if (!audioRef.current) return;
    try {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      // Synchronize exact completion to audio ending as well
      audioRef.current.onended = () => {
        handleComplete();
      };
    } catch {
      // Audio playback fallback
    }
  };

  const handleStartPrint = () => {
    if (reducedMotion) {
      handleComplete();
      return;
    }
    setPrintState("printing");
    playSoundSequence();
  };

  const handleComplete = () => {
    setPrintState("complete");
    setTimeout(() => {
      triggerDownload();
    }, 600);
  };

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume/patel-prince-resume.pdf";
    link.download = "Patel_Prince_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openCV = () => {
    window.open("/resume/patel-prince-resume.pdf", "_blank");
  };

  const printCV = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0d10] text-[#f5f5f5] flex flex-col font-sans overflow-hidden select-none">
      
      {/* Precision UI Header */}
      <header className="absolute top-0 inset-x-0 p-6 md:p-8 flex justify-between items-start z-20 pointer-events-none">
        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-mono tracking-[0.25em] text-[#888888] mb-1">SYSTEM UNIT</p>
            <p className="text-xs md:text-sm tracking-[0.1em] font-mono font-semibold">PATEL PRINCE · PRECISION OUTPUT</p>
          </div>
          
          <div className="flex items-center space-x-8 md:space-x-12">
            <div>
              <p className="text-[10px] font-mono tracking-[0.2em] text-[#888888] mb-1">STATUS</p>
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${printState === 'idle' ? 'bg-[#e2e2e2]' : printState === 'printing' ? 'bg-green-400 animate-ping' : 'bg-green-500'}`}></span>
                <p className="text-xs font-mono tracking-[0.1em] uppercase font-medium">
                  {printState === 'idle' ? 'STANDBY' : printState === 'printing' ? 'PRINTING DOCUMENT...' : 'OUTPUT COMPLETE'}
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-[10px] font-mono tracking-[0.2em] text-[#888888] mb-1">FORMAT</p>
              <p className="text-xs font-mono tracking-[0.1em]">PDF / ARCH-A4</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-6 pointer-events-auto">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-[10px] md:text-xs font-mono tracking-[0.2em] text-[#999999] hover:text-[#f3f3f3] transition-colors uppercase px-3 py-1.5 border border-[#333333] hover:border-[#666666] rounded-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-2" />
            RETURN
          </button>
        </div>
      </header>

      {/* 3D Scene Area */}
      <div className="flex-1 relative w-full h-full bg-[radial-gradient(ellipse_at_center,_#18181c_0%,_#09090b_100%)]">
        <PrinterScene 
          printState={printState} 
          onComplete={handleComplete} 
          isMobile={isMobile} 
          reducedMotion={reducedMotion} 
        />

        {/* Action Controls */}
        <div className="absolute bottom-12 md:bottom-16 inset-x-0 z-20 flex flex-col items-center pointer-events-none px-6">
          
          {printState === "idle" && (
            <div className="pointer-events-auto opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] flex flex-col items-center">
              <button 
                onClick={handleStartPrint}
                className="group px-10 py-4 bg-[#f5f5f5] text-[#0a0a0c] text-xs font-mono font-bold tracking-[0.2em] hover:bg-[#ffffff] transition-all hover:scale-105 shadow-2xl flex items-center space-x-3 cursor-pointer"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>COMMENCE PRINT & DOWNLOAD</span>
              </button>
              <p className="text-[10px] font-mono tracking-widest text-[#777777] uppercase mt-4">
                SYNCHRONIZED MECHANICAL AUDIO & REAL-TIME 3D EXTRACTION
              </p>
            </div>
          )}

          {printState === "printing" && (
            <div className="pointer-events-auto flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-3 bg-[#111114]/80 backdrop-blur-md px-6 py-3 rounded border border-[#26262a]">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                <p className="text-xs font-mono tracking-widest text-[#cccccc] uppercase">
                  FABRICATING DOCUMENT · PLEASE WAIT
                </p>
              </div>
            </div>
          )}

          {printState === "complete" && (
            <div className="pointer-events-auto flex flex-col items-center space-y-4 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
              <div className="flex flex-wrap items-center justify-center gap-3 bg-[#111114]/90 backdrop-blur-xl p-2.5 rounded-lg border border-[#333338] shadow-2xl">
                <button 
                  onClick={openCV}
                  className="flex items-center px-5 py-3 text-xs font-mono font-medium tracking-[0.15em] text-[#f5f5f5] hover:bg-[#222228] rounded transition-colors uppercase cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2" />
                  OPEN PDF
                </button>
                <div className="hidden sm:block w-px h-6 bg-[#333338]"></div>
                <button 
                  onClick={triggerDownload}
                  className="flex items-center px-5 py-3 text-xs font-mono font-medium tracking-[0.15em] text-[#f5f5f5] hover:bg-[#222228] rounded transition-colors uppercase cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 mr-2" />
                  DOWNLOAD AGAIN
                </button>
                <div className="hidden sm:block w-px h-6 bg-[#333338]"></div>
                <button 
                  onClick={printCV}
                  className="flex items-center px-5 py-3 text-xs font-mono font-medium tracking-[0.15em] text-[#f5f5f5] hover:bg-[#222228] rounded transition-colors uppercase cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 mr-2" />
                  PRINT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
