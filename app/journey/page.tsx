import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { journey } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journey — Patel Prince",
  description: "Experience timeline: internships, hackathons, certifications and education.",
};

export default function JourneyPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 md:pt-36">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Experience timeline</p>
          <h1 className="mt-2 font-display text-5xl font-black leading-none md:text-8xl">
            The road<br />
            <span className="outline-text">so far</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-paper/60">
            Internships, competitive hackathons, certifications and the degree tying it all together.
          </p>
        </Reveal>

        <div className="mt-14 border-l border-paper/15 pl-6 md:pl-10">
          {journey.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="relative pb-14">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-ink md:-left-[47px]" />
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  {item.kind} · {item.date}
                </p>
                <h2 className="mt-2 font-display text-2xl font-black md:text-4xl">{item.title}</h2>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-paper/45">{item.org}</p>
                <ul className="mt-4 flex max-w-2xl flex-col gap-2">
                  {item.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-paper/65">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
