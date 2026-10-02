"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import PrecisionPrinter from "./PrecisionPrinter";

interface PrinterSceneProps {
  printState: "idle" | "printing" | "complete";
  onComplete: () => void;
  isMobile: boolean;
  reducedMotion: boolean;
}

export default function PrinterScene({ printState, onComplete, isMobile, reducedMotion }: PrinterSceneProps) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 10, 5]} intensity={1} color="#ffffff" castShadow />
          
          <PrecisionPrinter printState={printState} onComplete={onComplete} isMobile={isMobile} reducedMotion={reducedMotion} />
          
          <ContactShadows position={[0, -0.6, 0]} opacity={0.5} scale={12} blur={2.5} far={4} color="#000000" />
        </Suspense>
      </Canvas>
    </div>
  );
}
