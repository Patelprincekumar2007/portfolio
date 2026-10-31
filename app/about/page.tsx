import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { profile, skills } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — Patel Prince",
  description: "Who is Patel Princekumar - background, academics and technical arsenal.",
};

export default function AboutPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 md:pt-36">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Biography &amp; background</p>
          <h1 className="mt-2 font-display text-5xl font-black leading-none md:text-8xl">
            Who is<br />
            <span className="outline-text">Patel?</span>
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-14 md:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-paper/80">
                I&apos;m a Computer Science &amp; Engineering student specializing in{" "}
                <span className="text-accent">data science, analytics and applied machine learning</span>.
              </p>
              <p className="mt-5 text-base leading-relaxed text-paper/65">
                My engineering philosophy revolves around clarity: demystifying large datasets, architecting
                clean mathematical models, and transforming complex signals into clear, actionable intelligence.
              </p>
              <p className="mt-5 text-base leading-relaxed text-paper/65">
                Right now I&apos;m looking for data science and machine learning internships where I can work
                on real prediction pipelines and data engineering problems.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-14 font-mono text-xs uppercase tracking-widest text-accent">Academic background</h2>
              <div className="mt-5 flex flex-col gap-4">
                <div className="rounded-xl border border-paper/10 p-5">
                  <p className="font-display text-xl font-bold">B.Tech, Computer Science &amp; Engineering</p>
                  <p className="mt-1 text-sm text-paper/60">CSPIT, CHARUSAT University · 2024 - 2028</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-accent">Sem 5 · CGPA 7.90 / 10</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-paper/10 p-5">
                    <p className="font-display text-2xl font-black">85%</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper/50">Class 12 · Gujarat Board · 2024</p>
                  </div>
                  <div className="rounded-xl border border-paper/10 p-5">
                    <p className="font-display text-2xl font-black">90%</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper/50">Class 10 · Gujarat Board · 2022</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent">Technical arsenal</h2>
            </Reveal>
            <div className="mt-5 flex flex-col gap-4">
              {skills.map((group, gi) => (
                <Reveal key={group.label} delay={gi * 0.06}>
                  <div className="rounded-xl border border-paper/10 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-paper/45">{group.label}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-full bg-paper/5 px-3.5 py-1.5 text-sm text-paper/85">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15}>
              <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">Currently</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/75">
                  {profile.education}. Databricks Fundamentals accredited, working toward the next proctored
                  certification - and open to data science / ML internships.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
