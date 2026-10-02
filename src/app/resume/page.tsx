"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";

const PrinterScene = dynamic(() => import("@/components/3d/PrinterScene"), { ssr: false });

type PrintState = "idle" | "printing" | "complete";

export default function ResumeChamberPage() {
  const [printState, setPrintState] = useState<PrintState>("idle");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPdfAvailable, setIsPdfAvailable] = useState<boolean | null>(null);
  
  // Audio ref for the real printer sound
  const audioRef = useRef<HTMLAudioElement | null>(null);
  

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    
    // Check if PDF actually exists
    fetch("/resume/patel-prince-resume.pdf", { method: "HEAD" })
      .then(res => setIsPdfAvailable(res.ok))
      .catch(() => setIsPdfAvailable(false));
      
    // Preload audio
    audioRef.current = new Audio("/audio/printer.mp3");

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const playSoundSequence = () => {
    if (!audioRef.current) return;
    try {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
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
    stopSound();
    setTimeout(() => {
      triggerDownload();
    }, 500);
  };

  const triggerDownload = () => {
    if (!isPdfAvailable) {
      alert("CV file unavailable. Please place your PDF in the public/resume folder.");
      return;
    }
    const link = document.createElement("a");
    link.href = "/resume/patel-prince-resume.pdf";
    link.download = "patel-prince-resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openCV = () => {
    if (!isPdfAvailable) {
      alert("CV file unavailable. Please place your PDF in the public/resume folder.");
      return;
    }
    window.open("/resume/patel-prince-resume.pdf", "_blank");
  };

  const printCV = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#121214] text-[#f3f3f3] flex flex-col font-sans overflow-hidden">
      
      {/* Precision UI Header */}
      <header className="absolute top-0 inset-x-0 p-8 flex justify-between items-start z-20 pointer-events-none">
        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-mono tracking-[0.2em] text-[#888888] mb-1">SYSTEM</p>
            <p className="text-xs tracking-[0.1em] font-medium">CV / DOCUMENT OUTPUT</p>
          </div>
          
          <div className="flex items-center space-x-12">
            <div>
              <p className="text-[10px] font-mono tracking-[0.2em] text-[#888888] mb-1">STATUS</p>
              <div className="flex items-center">
                <span className={`w-1 h-1 rounded-full mr-2 ${printState === 'idle' ? 'bg-[#e2e2e2]' : printState === 'printing' ? 'bg-green-500 animate-pulse' : 'bg-green-500'}`}></span>
                <p className="text-xs font-mono tracking-[0.1em] uppercase">
                  {printState === 'idle' ? 'READY' : printState === 'printing' ? 'PRINTING' : 'DOCUMENT READY'}
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-[10px] font-mono tracking-[0.2em] text-[#888888] mb-1">FORMAT</p>
              <p className="text-xs font-mono tracking-[0.1em]">PDF / A4</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-6 pointer-events-auto">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-[10px] font-mono tracking-[0.2em] text-[#888888] hover:text-[#f3f3f3] transition-colors uppercase"
          >
            <ArrowLeft className="w-3 h-3 mr-2" />
            EXIT
          </button>
        </div>
      </header>

      {/* 3D Scene Area */}
      <div className="flex-1 relative w-full h-full bg-[radial-gradient(ellipse_at_center,_#1a1a1c_0%,_#0a0a0c_100%)]">
        <PrinterScene printState={printState} onComplete={handleComplete} isMobile={isMobile} reducedMotion={reducedMotion} />

        {/* Action Controls */}
        <div className="absolute bottom-16 inset-x-0 z-20 flex flex-col items-center pointer-events-none">
          
          {printState === "idle" && (
            <div className="pointer-events-auto opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
              <button 
                onClick={handleStartPrint}
                className="px-8 py-3 bg-[#f3f3f3] text-[#0a0a0c] text-[11px] font-mono tracking-[0.15em] hover:bg-[#e2e2e2] transition-colors"
              >
                DOWNLOAD CV
              </button>
            </div>
          )}

          {printState === "complete" && (
            <div className="pointer-events-auto flex flex-col items-center space-y-4 opacity-0 animate-[fadeIn_0.5s_ease-out_0.5s_forwards]">
              {!isPdfAvailable && (
                <p className="text-red-400 text-xs font-mono tracking-[0.1em] mb-2 uppercase border border-red-500/30 bg-red-500/10 px-4 py-2">
                  CV FILE NOT AVAILABLE YET
                </p>
              )}
              <div className="flex items-center space-x-4 bg-[#111111] p-2 rounded-lg border border-[#333333] shadow-xl">
                <button 
                  onClick={openCV}
                  className="px-6 py-3 text-[11px] font-mono tracking-[0.15em] text-[#f3f3f3] hover:bg-[#222222] rounded transition-colors uppercase"
                >
                  OPEN CV
                </button>
                <div className="w-px h-6 bg-[#333333]"></div>
                <button 
                  onClick={triggerDownload}
                  className="px-6 py-3 text-[11px] font-mono tracking-[0.15em] text-[#f3f3f3] hover:bg-[#222222] rounded transition-colors uppercase"
                >
                  DOWNLOAD AGAIN
                </button>
                <div className="w-px h-6 bg-[#333333]"></div>
                <button 
                  onClick={printCV}
                  className="px-6 py-3 text-[11px] font-mono tracking-[0.15em] text-[#f3f3f3] hover:bg-[#222222] rounded transition-colors uppercase"
                >
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
