"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import type { PrintState } from "./PrinterScene";
import { profile } from "@/lib/content";

const PrinterScene = dynamic(() => import("./PrinterScene"), { ssr: false });

export default function CvClient() {
  const [state, setState] = useState<PrintState>("standby");
  const [muted, setMuted] = useState(false);
  const [pct, setPct] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const progressRef = useRef({ value: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/printer.mp3");
    audioRef.current.preload = "auto";
    return () => {
      tweenRef.current?.kill();
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  const finish = () => {
    tweenRef.current?.kill();
    progressRef.current.value = 1;
    setPct(100);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setState("done");
  };

  const startPrint = () => {
    if (state !== "standby") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      finish();
      return;
    }
    setState("printing");
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.muted = muted;
      audioRef.current.play().catch(() => {});
    }
    tweenRef.current = gsap.to(progressRef.current, {
      value: 1,
      duration: 4.2,
      ease: "power1.inOut",
      onUpdate: () => setPct(Math.round(progressRef.current.value * 100)),
      onComplete: finish,
    });
  };

  const reset = () => {
    tweenRef.current?.kill();
    progressRef.current.value = 0;
    setPct(0);
    setShowPreview(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setState("standby");
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 md:pt-32">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">System unit</p>
          <h1 className="mt-2 font-display text-5xl font-black leading-none md:text-7xl">
            The Print
            <br />
            Station<span className="text-accent">.</span>
          </h1>
        </div>
        <p className="max-w-xs text-sm text-paper/60">
          One click. The machine spins up, feeds a fresh sheet and prints my resume - generated
          mechanical sound synced to the real-time 3D extraction.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-paper/10 bg-ink2 gridlines">
        <div className="flex items-center justify-between border-b border-paper/10 px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-paper/50">
          <span>PP-2000<span className="hidden sm:inline"> · Precision output</span></span>
          <span className="flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                state === "done" ? "bg-green-400" : state === "printing" ? "bg-accent animate-pulseDot" : "bg-amber"
              }`}
            />
            {state === "standby" ? "Standby" : state === "printing" ? `Printing — ${pct}%` : "Complete"}
          </span>
          <span className="hidden sm:inline">PDF · A4</span>
        </div>

        <div className="h-[400px] md:h-[520px]">
          <PrinterScene progress={progressRef.current} state={state} />
        </div>

        <div className="border-t border-paper/10 px-5 py-6">
          {state === "standby" && (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={startPrint}
                className="rounded-full bg-accent px-10 py-4 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105 active:scale-95"
              >
                Print my CV
              </button>
              <p className="font-mono text-[11px] uppercase tracking-widest text-paper/40">
                auto-rotating - drag the printer to look around · sound on for the full effect · or{" "}
                <a href={profile.cvPdf} download className="underline hover:text-accent">
                  download directly
                </a>
              </p>
            </div>
          )}

          {state === "printing" && (
            <div className="flex flex-col items-center gap-4">
              <div className="h-1 w-full max-w-md overflow-hidden rounded-full bg-paper/10">
                <div className="h-full bg-accent transition-[width] duration-150" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={finish}
                  className="rounded-full border border-paper/25 px-6 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
                >
                  Skip
                </button>
                <button
                  onClick={() => setMuted(!muted)}
                  className="rounded-full border border-paper/25 px-6 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
                >
                  {muted ? "Unmute" : "Mute"}
                </button>
              </div>
            </div>
          )}

          {state === "done" && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setShowPreview(true)}
                  className="rounded-full bg-paper px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105"
                >
                  Preview CV
                </button>
                <a
                  href={profile.cvPdf}
                  download="Patel_Princekumar_Resume.pdf"
                  className="rounded-full bg-accent px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105"
                >
                  Download PDF
                </a>
              </div>
              <button
                onClick={reset}
                className="font-mono text-[11px] uppercase tracking-widest text-paper/40 underline hover:text-accent"
              >
                Print again
              </button>
            </div>
          )}
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm" onClick={() => setShowPreview(false)}>
          <div
            className="flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-paper/15 bg-ink2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-paper/10 px-4 py-3">
              <span className="font-mono text-xs uppercase tracking-widest text-paper/60">
                Patel_Princekumar_Resume.pdf
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={profile.cvPdf}
                  download="Patel_Princekumar_Resume.pdf"
                  className="font-mono text-xs uppercase tracking-widest text-accent hover:underline"
                >
                  Download
                </a>
                <button
                  onClick={() => setShowPreview(false)}
                  className="font-mono text-xs uppercase tracking-widest text-paper/60 hover:text-paper"
                  aria-label="Close preview"
                >
                  Close ✕
                </button>
              </div>
            </div>
            <iframe src={profile.cvPdf} className="h-full w-full bg-white" title="Resume preview" />
          </div>
        </div>
      )}
    </div>
  );
}
