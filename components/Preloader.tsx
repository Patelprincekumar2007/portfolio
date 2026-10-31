"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [gone, setGone] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      onDone();
      return;
    }
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setGone(true);
        onDone();
      },
    });
    tl.to(counter, {
      v: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        if (barRef.current) barRef.current.style.width = `${counter.v}%`;
      },
    }).to(wrapRef.current, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "+=0.15");
    return () => {
      tl.kill();
    };
  }, [onDone]);

  if (gone) return null;
  return (
    <div ref={wrapRef} className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Initializing</p>
      <p className="mt-3 font-display text-5xl font-black md:text-7xl">PATEL PRINCE</p>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-paper/50">Portfolio · v2.0</p>
      <div className="mt-8 h-px w-64 bg-paper/15">
        <div ref={barRef} className="h-full w-0 bg-accent" />
      </div>
      <span ref={countRef} className="mt-3 font-mono text-sm text-paper/60">
        000
      </span>
    </div>
  );
}
