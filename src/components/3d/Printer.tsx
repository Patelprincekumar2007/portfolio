"use client";

import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, MeshTransmissionMaterial, Text } from "@react-three/drei";
import * as THREE from "three";

interface PrinterProps {
  isPrinting: boolean;
  onComplete: () => void;
  isMobile: boolean;
}

export default function Printer({ isPrinting, onComplete, isMobile }: PrinterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const paperRef = useRef<THREE.Mesh>(null);
  const printHeadRef = useRef<THREE.Mesh>(null);
  const indicatorLightRef = useRef<THREE.PointLight>(null);
  const indicatorMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  const [printProgress, setPrintProgress] = useState(0); // 0 to 1
  const [status, setStatus] = useState<"idle" | "startup" | "printing" | "done">("idle");
  const [startTime, setStartTime] = useState(0);

  const DURATION_STARTUP = 0.5;
  const DURATION_PRINT = 3.0;

  useEffect(() => {
    if (isPrinting && status === "idle") {
      setStatus("startup");
      setStartTime(performance.now() / 1000);
    }
  }, [isPrinting, status]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      // Subtle float effect for the whole printer
      groupRef.current.position.y = Math.sin(time * 2) * 0.02;
    }

    if (status === "startup") {
      const elapsed = time - startTime;
      if (indicatorMaterialRef.current) {
        indicatorMaterialRef.current.color.setHex(0x00ff00); // Green on
      }
      if (elapsed > DURATION_STARTUP) {
        setStatus("printing");
        setStartTime(time);
      }
    }

    if (status === "printing") {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / DURATION_PRINT, 1.0);
      setPrintProgress(progress);

      // Print head sweeps left to right rapidly
      if (printHeadRef.current) {
        printHeadRef.current.position.x = Math.sin(progress * Math.PI * 20) * 0.8;
      }

      // Paper feeds out
      if (paperRef.current) {
        paperRef.current.position.z = 0.2 + progress * 1.5;
      }

      if (indicatorMaterialRef.current) {
        // Blinking green light while printing
        const blink = Math.sin(progress * Math.PI * 40) > 0 ? 0x00ff00 : 0x004400;
        indicatorMaterialRef.current.color.setHex(blink);
      }

      if (progress >= 1.0) {
        setStatus("done");
        if (indicatorMaterialRef.current) {
          indicatorMaterialRef.current.color.setHex(0x00ff00); // Solid green
        }
        setTimeout(() => onComplete(), 500); // small delay before UI updates
      }
    }
  });

  // Scale down for mobile
  const scale = isMobile ? 0.7 : 1;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -0.5, 0]}>
      {/* Printer Body (Graphite) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.8, 1.5]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Printer Top Bevel */}
      <mesh position={[0, 0.45, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[2.9, 0.1, 1.3]} />
        <meshStandardMaterial color="#121214" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Glass Output Tray Cover */}
      <mesh position={[0, 0.5, 0.4]}>
        <boxGeometry args={[2.6, 0.05, 0.6]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.1}
          roughness={0.1}
          chromaticAberration={0.03}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.0}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#aaddff"
        />
      </mesh>

      {/* Print Head Track */}
      <mesh position={[0, 0.2, 0.4]}>
        <boxGeometry args={[2.4, 0.05, 0.05]} />
        <meshStandardMaterial color="#0a0a0c" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Print Head */}
      <mesh ref={printHeadRef} position={[-0.8, 0.2, 0.45]}>
        <boxGeometry args={[0.2, 0.15, 0.15]} />
        <meshStandardMaterial color="#3a3a40" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Status Indicator Light */}
      <mesh position={[1.3, 0.5, 0.6]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02]} />
        <meshBasicMaterial ref={indicatorMaterialRef} color="#004400" />
      </mesh>
      <pointLight ref={indicatorLightRef} position={[1.3, 0.55, 0.6]} distance={1} intensity={0.5} color="#00ff00" />

      {/* Paper Slot */}
      <mesh position={[0, -0.1, 0.75]}>
        <boxGeometry args={[2.2, 0.05, 0.1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Paper (CV Document) */}
      <mesh ref={paperRef} position={[0, -0.08, 0.2]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <planeGeometry args={[1.8, 2.5]} />
        <meshStandardMaterial color="#ffffff" side={THREE.DoubleSide} roughness={1} metalness={0} />
      </mesh>

      {/* Simulated CV Content appearing on Paper */}
      {printProgress > 0 && (
        <group position={[0, -0.07, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <Text
            position={[-0.7, 1.0 - (printProgress * 2.5), 0.01]}
            color="#171717"
            fontSize={0.12}
            maxWidth={1.6}
            lineHeight={1.5}
            anchorX="left"
            anchorY="top"
            clipRect={[0, -2.5, 1.8, (printProgress * 2.5)]}
          >
            PATEL PRINCE{"\n"}
            Data Science & Analytics{"\n"}
            {"\n"}
            EDUCATION{"\n"}
            B.Tech CSE - CHARUSAT{"\n"}
            {"\n"}
            EXPERIENCE{"\n"}
            Data Science Intern - Sparks To Ideas
          </Text>
        </group>
      )}
    </group>
  );
}
