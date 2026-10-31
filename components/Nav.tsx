"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/projects", label: "Work", num: "01" },
  { href: "/about", label: "About", num: "02" },
  { href: "/journey", label: "Journey", num: "03" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-paper/10 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="font-display text-lg font-black tracking-tight"
          onClick={() => setOpen(false)}
        >
          PP<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`link-underline font-mono text-xs uppercase tracking-widest transition-colors ${
                pathname === l.href ? "text-accent" : "text-paper/70 hover:text-paper"
              }`}
            >
              <span className="mr-1 text-accent/70">{l.num}</span>
              {l.label}
            </Link>
          ))}
          <Link
            href="/cv"
            className="rounded-full bg-accent px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105"
          >
            Print CV
          </Link>
        </nav>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`h-px w-6 bg-paper transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-paper transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-paper/10 bg-ink px-5 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`font-mono text-sm uppercase tracking-widest ${
                  pathname === l.href ? "text-accent" : "text-paper/80"
                }`}
              >
                <span className="mr-2 text-accent/70">{l.num}</span>
                {l.label}
              </Link>
            ))}
            <Link
              href="/cv"
              onClick={() => setOpen(false)}
              className="mt-2 w-fit rounded-full bg-accent px-6 py-2.5 font-mono text-sm font-bold uppercase tracking-widest text-ink"
            >
              Print CV
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
