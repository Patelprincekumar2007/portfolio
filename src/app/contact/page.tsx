"use client";

import React, { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5 1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5m1.37 9.74v-8.37H5.09v8.37h2.74z" />
    </svg>
  );
}

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex flex-col justify-center max-w-5xl mx-auto px-6 md:px-12 w-full">
      <section className="w-full flex flex-col items-center text-center space-y-12">
        <div>
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--text-meta)] mb-3">GET IN TOUCH</p>
          <h1 className="text-[12vw] md:text-[8vw] font-bold tracking-tighter uppercase leading-[0.8] text-[var(--text-primary)] hover-expand">
            LET'S BUILD<br/>SOMETHING.
          </h1>
        </div>
        
        <p className="text-lg md:text-2xl font-light text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          Looking for data-driven insights, predictive machine learning models, or collaborative research? My inbox is open.
        </p>

        {/* Email Channels Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-left">
          
          {/* Email 1: University */}
          <div className="glass-panel p-6 rounded-lg border border-[var(--border-subtle)] space-y-4 hover:border-[var(--text-primary)] transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--text-meta)]">ACADEMIC / CHARUSAT</span>
              <Mail className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-base md:text-lg font-mono font-medium text-[var(--text-primary)] break-all">
                24cs073@charusat.edu.in
              </p>
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="mailto:24cs073@charusat.edu.in"
                className="inline-flex items-center text-xs font-mono tracking-widest uppercase px-3 py-1.5 bg-[var(--pill-bg)] text-[var(--pill-text)] font-semibold rounded hover:opacity-90 transition-opacity"
              >
                Send Email <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => copyToClipboard("24cs073@charusat.edu.in")}
                className="inline-flex items-center text-xs font-mono tracking-widest uppercase px-3 py-1.5 border border-[var(--border-subtle)] text-[var(--text-primary)] rounded hover:bg-[var(--glass-bg)] transition-colors cursor-pointer"
              >
                {copiedEmail === "24cs073@charusat.edu.in" ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1 text-green-500" />
                    COPIED
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    COPY
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Email 2: Direct / Personal */}
          <div className="glass-panel p-6 rounded-lg border border-[var(--border-subtle)] space-y-4 hover:border-[var(--text-primary)] transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--text-meta)]">DIRECT / PERSONAL</span>
              <Mail className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-base md:text-lg font-mono font-medium text-[var(--text-primary)] break-all">
                jnpatel3366@gmail.com
              </p>
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="mailto:jnpatel3366@gmail.com"
                className="inline-flex items-center text-xs font-mono tracking-widest uppercase px-3 py-1.5 bg-[var(--pill-bg)] text-[var(--pill-text)] font-semibold rounded hover:opacity-90 transition-opacity"
              >
                Send Email <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => copyToClipboard("jnpatel3366@gmail.com")}
                className="inline-flex items-center text-xs font-mono tracking-widest uppercase px-3 py-1.5 border border-[var(--border-subtle)] text-[var(--text-primary)] rounded hover:bg-[var(--glass-bg)] transition-colors cursor-pointer"
              >
                {copiedEmail === "jnpatel3366@gmail.com" ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1 text-green-500" />
                    COPIED
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    COPY
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Social Network Profiles */}
        <div className="w-full pt-8 flex flex-wrap items-center justify-center gap-6">
          <a 
            href="https://github.com/Patelprincekumar2007" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center px-6 py-3 border border-[var(--border-subtle)] rounded-full text-xs font-mono tracking-widest uppercase text-[var(--text-primary)] hover:border-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all"
          >
            <GithubIcon className="w-4 h-4 mr-2" />
            GITHUB PROFILE <ArrowUpRight className="ml-1 w-3 h-3 text-[var(--text-meta)]" />
          </a>

          <a 
            href="https://www.linkedin.com/in/princekumar-patel-b61038318" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center px-6 py-3 border border-[var(--border-subtle)] rounded-full text-xs font-mono tracking-widest uppercase text-[var(--text-primary)] hover:border-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all"
          >
            <LinkedinIcon className="w-4 h-4 mr-2 text-blue-500" />
            LINKEDIN NETWORK <ArrowUpRight className="ml-1 w-3 h-3 text-[var(--text-meta)]" />
          </a>
        </div>
      </section>
    </div>
  );
}
