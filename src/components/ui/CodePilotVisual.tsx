import React from "react";

export default function CodePilotVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#050505] overflow-hidden perspective-[1000px]">
      
      {/* Central Core Glow */}
      <div className="absolute w-32 h-32 bg-white opacity-0 rounded-full blur-[80px] group-hover:opacity-60 transition-opacity duration-[2s] ease-in-out"></div>
      
      {/* 3D Wireframe AI Brain */}
      <div className="relative w-64 h-64 md:w-96 md:h-96 transform-style-3d group-hover:scale-110 transition-transform duration-[2s] ease-[cubic-bezier(0.19,1,0.22,1)]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="absolute inset-0 transform-style-3d"
            style={{ transform: `rotateX(${i * 22.5}deg) rotateY(${i * 45}deg)` }}
          >
            <div 
              className="w-full h-full border border-[#222] rounded-full group-hover:border-white transition-colors duration-[1.5s]"
              style={{
                animation: `spin-ring ${10 + i * 1.5}s linear infinite`,
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute top-[20%] left-[10%] text-xs font-mono text-gray-500 animate-pulse">{"import { AI } from 'codepilot';"}</div>
        <div className="absolute bottom-[20%] right-[10%] text-xs font-mono text-gray-500 animate-pulse" style={{ animationDelay: '0.5s' }}>model.train(data);</div>
        <div className="absolute top-[70%] left-[15%] text-xs font-mono text-gray-500 animate-pulse" style={{ animationDelay: '1s' }}>optimizing_logistics...</div>
      </div>

      <p className="text-white font-mono text-[10px] md:text-xs z-10 absolute bottom-6 right-6 md:bottom-12 md:right-12 group-hover:text-green-400 transition-colors duration-1000">
        System.Ready()
      </p>

      <style>{`
        .perspective-[1000px] { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        @keyframes spin-ring {
          100% { transform: rotateZ(360deg); }
        }
      `}</style>
    </div>
  );
}
