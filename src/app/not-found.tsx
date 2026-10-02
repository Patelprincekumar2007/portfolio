"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_60%)] pointer-events-none"></div>
      
      <div className="relative z-10">
        <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 mb-6">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium tracking-wide text-white mb-4">
          Signal lost.
        </h2>
        <p className="text-gray-400 font-light text-lg mb-12 max-w-sm mx-auto">
          The requested data node does not exist in this environment.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white text-sm font-medium tracking-wider rounded-sm hover:bg-[rgba(255,255,255,0.1)] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Return to Portfolio
        </Link>
      </div>
    </div>
  );
}
