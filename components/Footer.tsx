import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-paper/10">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Contact</p>
        <h2 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">
          Let&apos;s build
          <br />
          something.
        </h2>
        <p className="mt-4 max-w-md text-sm text-paper/60">
          Looking for a data science or ML intern who can own a pipeline end to end? My inbox is open.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <a href={`mailto:${profile.emailCollege}`} className="link-underline w-fit text-lg md:text-xl">
            {profile.emailCollege}
          </a>
          <a href={`mailto:${profile.emailPersonal}`} className="link-underline w-fit text-lg md:text-xl">
            {profile.emailPersonal}
          </a>
        </div>
        <div className="mt-8 flex gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-paper/25 px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
          >
            GitHub ↗
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-paper/25 px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
          >
            LinkedIn ↗
          </a>
        </div>
        <div className="mt-12 flex items-center justify-between border-t border-paper/10 pt-6 font-mono text-[11px] uppercase tracking-widest text-paper/40">
          <span>© 2026 Patel Prince · Gujarat, India</span>
          <span>Next.js · R3F · GSAP</span>
        </div>
      </div>
    </footer>
  );
}
