"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import Preloader from "./Preloader";
import Marquee from "./Marquee";
import Reveal from "./Reveal";
import ProjectRow from "./ProjectRow";
import { profile, projects } from "@/lib/content";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

export default function HomeClient() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleDone = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (!loaded || !heroRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = heroRef.current.querySelectorAll("[data-hero]");
    gsap.fromTo(
      items,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.09, ease: "power3.out" }
    );
  }, [loaded]);

  return (
    <>
      <Preloader onDone={handleDone} />

      {/* HERO */}
      <section className="gridlines relative flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-90">
          <Hero3D />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_35%_55%,rgba(13,13,18,0.88)_0%,rgba(13,13,18,0.45)_55%,transparent_100%)]" />
        <div ref={heroRef} className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl px-5 pt-20">
          <p data-hero className="hero-copy font-mono text-xs uppercase tracking-widest text-accent">
            {profile.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-[17vw] font-black leading-[0.85] md:text-[9.5rem]">
            <span data-hero className="block">PATEL</span>
            <span data-hero className="outline-text block">PRINCE</span>
          </h1>
          <p data-hero className="hero-copy mt-6 font-mono text-sm uppercase tracking-widest text-paper/85">
            {profile.role}
          </p>
          <p data-hero className="hero-copy mt-4 max-w-md text-base leading-relaxed text-paper/80">
            {profile.tagline}
          </p>
          <div data-hero className="pointer-events-auto mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-paper px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105"
            >
              See my work
            </Link>
            <Link
              href="/cv"
              className="rounded-full border border-accent px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-ink"
            >
              Print my CV
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-0 right-0 z-10 mx-auto flex max-w-6xl items-center justify-between px-5 font-mono text-[11px] uppercase tracking-widest text-paper/40">
          <span>{profile.education}</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulseDot rounded-full bg-green-400" />
            Open to internships
          </span>
        </div>
      </section>

      <Marquee />

      {/* FEATURED WORK */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">01 / Selected work</p>
              <h2 className="mt-2 font-display text-4xl font-black md:text-6xl">
                Things I&apos;ve<br />built<span className="text-accent">.</span>
              </h2>
            </div>
            <Link href="/projects" className="link-underline hidden font-mono text-xs uppercase tracking-widest text-paper/60 md:block">
              All projects ↗
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 border-b border-paper/10">
          {projects.slice(0, 2).map((p) => (
            <Reveal key={p.index}>
              <ProjectRow project={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 md:hidden">
          <Link href="/projects" className="font-mono text-xs uppercase tracking-widest text-accent">
            All projects ↗
          </Link>
        </Reveal>
      </section>

      {/* ABOUT TEASER */}
      <section className="border-t border-paper/10 bg-ink2">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-24 md:grid-cols-2">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">02 / Who</p>
            <h2 className="mt-2 font-display text-4xl font-black leading-tight md:text-5xl">
              Messy data in.<br />Clear answers out<span className="text-accent">.</span>
            </h2>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-base leading-relaxed text-paper/70">
                I&apos;m Patel Princekumar, a Computer Science &amp; Engineering student at CSPIT, CHARUSAT
                University, focused on data science, analytics and applied machine learning. My way of working
                is simple: understand a dataset properly, build a clean model, and explain the result in plain
                language. No black boxes I can&apos;t defend.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { n: "7.90", l: "CGPA / 10 · Sem 5" },
                  { n: "85%", l: "Class 12 · 2024" },
                  { n: "90%", l: "Class 10 · 2022" },
                  { n: "2028", l: "Graduating" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-paper/10 p-5">
                    <p className="font-display text-3xl font-black text-accent">{s.n}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper/50">{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <Link href="/about" className="link-underline mt-8 inline-block font-mono text-xs uppercase tracking-widest text-paper/70">
                More about me ↗
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CV CTA BAND */}
      <section className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-24 text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">The party trick</p>
            <h2 className="mt-3 font-display text-4xl font-black md:text-6xl">
              My resume prints itself<span className="text-accent">.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-paper/60">
              A tiny print station with mechanical sound and real-time 3D paper extraction. Recruiters remember it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/cv"
              className="rounded-full bg-accent px-9 py-4 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105"
            >
              Run the printer
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
