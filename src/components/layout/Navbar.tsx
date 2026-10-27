"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { Sun, Moon, Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // On home page, wait for intro to finish. On sub-pages, always show.
  if (pathname === "/" && !introFinished) return null;
  if (pathname === "/resume") return null;

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 h-20 flex items-center bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors duration-500">
        <nav className="w-full px-6 md:px-12 flex items-center justify-between">
          
          {/* Left: Branding */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-xs md:text-sm font-mono tracking-[0.2em] font-semibold text-[var(--text-primary)] uppercase hover:opacity-75 transition-opacity"
            >
              PATEL PRINCE
            </Link>
          </div>

          {/* Center: Main Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={cn(
                    "group flex items-center text-xs font-mono tracking-[0.2em] uppercase transition-colors relative py-1",
                    isActive 
                      ? "text-[var(--text-primary)] font-bold" 
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  <span className="text-[var(--text-meta)] mr-2 group-hover:text-[var(--text-secondary)] transition-colors text-[10px]">{link.id}</span>
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--text-primary)]"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Controls & CV (Desktop) */}
          <div className="hidden md:flex items-center space-x-6 text-xs font-mono tracking-[0.15em] text-[var(--text-secondary)] uppercase">
            
            {/* Audio Toggle */}
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute audio effects" : "Enable audio effects"}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-sm hover:bg-[var(--glass-bg)]"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-green-500" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Dark / Light Toggle */}
            <button 
              onClick={toggleTheme} 
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
              className="flex items-center space-x-2 px-3 py-1.5 border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors text-[11px] rounded-sm hover:bg-[var(--glass-bg)]"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>LIGHT</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-500" />
                  <span>DARK</span>
                </>
              )}
            </button>

            {/* CV Chamber CTA */}
            <Link
              href="/resume"
              className="group relative flex items-center justify-center px-4 py-2 bg-[var(--pill-bg)] text-[var(--pill-text)] font-mono font-bold tracking-[0.15em] text-xs transition-transform hover:scale-105"
            >
              <span className="relative z-10">CV</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button 
              onClick={toggleTheme}
              className="p-2 text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-sm"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-500" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-sm"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--bg-primary)]/98 backdrop-blur-xl pt-24 px-6 pb-12 flex flex-col justify-between md:hidden animate-[fadeIn_0.2s_ease-out]">
          <div className="flex flex-col space-y-6 pt-6">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--text-meta)]">NAVIGATION</p>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between text-2xl font-mono tracking-widest uppercase py-3 border-b border-[var(--border-subtle)]",
                    isActive ? "text-[var(--text-primary)] font-bold" : "text-[var(--text-secondary)]"
                  )}
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-[var(--text-meta)]">{link.id}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col space-y-4 pt-8">
            <Link
              href="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 bg-[var(--pill-bg)] text-[var(--pill-text)] text-center font-mono font-bold tracking-[0.2em] text-sm uppercase flex items-center justify-center space-x-2"
            >
              <span>ACCESS 3D CV CHAMBER</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-between pt-4 text-xs font-mono tracking-widest text-[var(--text-secondary)] uppercase">
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="flex items-center space-x-2 py-2"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-green-500" /> : <VolumeX className="w-4 h-4" />}
                <span>SOUND: {soundEnabled ? "ON" : "OFF"}</span>
              </button>
              
              <button 
                onClick={toggleTheme}
                className="flex items-center space-x-2 py-2"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-500" />}
                <span>THEME: {theme.toUpperCase()}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
