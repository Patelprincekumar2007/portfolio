"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

const NAV_LINKS = [
  { id: "01", name: "WORK", path: "/projects" },
  { id: "02", name: "ABOUT", path: "/about" },
  { id: "03", name: "JOURNEY", path: "/journey" },
  { id: "04", name: "LAB", path: "/data-lab" },
  { id: "05", name: "CONTACT", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { introFinished, theme, toggleTheme, soundEnabled, setSoundEnabled } = useApp();

  // Hide completely during intro or print chamber
  if (!introFinished || pathname === "/resume") return null;

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-24 flex items-center mix-blend-difference pointer-events-none">
      <nav className="w-full px-6 md:px-12 flex items-center justify-between pointer-events-auto">
        
        {/* Left: Branding */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-[10px] md:text-xs font-mono tracking-widest text-white uppercase hover:text-[#aaa] transition-colors hover-expand">
            PATEL PRINCE
          </Link>
        </div>

        {/* Center: Main Links */}
        <div className="hidden lg:flex items-center space-x-12">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={cn(
                  "group flex items-center text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase transition-colors hover-expand",
                  isActive ? "text-white" : "text-[#888] hover:text-white"
                )}
              >
                <span className="text-[#555] mr-2 group-hover:text-[#888] transition-colors">{link.id}</span>
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right: Controls & CV */}
        <div className="flex items-center space-x-8 text-[10px] md:text-xs font-mono tracking-[0.2em] text-[#888] uppercase">
          
          <button onClick={toggleTheme} className="hover:text-white transition-colors hover-expand hidden md:block">
            {theme === "dark" ? "LIGHT" : "DARK"}
          </button>

          <Link
            href="/resume"
            className="group relative flex items-center justify-center px-4 py-2 bg-white text-black font-bold tracking-[0.15em] overflow-hidden hover-expand"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">CV</span>
            <div className="absolute inset-0 bg-[#222] transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          </Link>
        </div>
        
      </nav>
    </header>
  );
}
