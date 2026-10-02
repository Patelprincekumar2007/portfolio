"use client";

import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface PrecisionPrinterProps {
  printState: "idle" | "printing" | "complete";
  onComplete: () => void;
  isMobile: boolean;
  reducedMotion: boolean;
}

export default function PrecisionPrinter({ printState, onComplete, isMobile, reducedMotion }: PrecisionPrinterProps) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const paperRef = useRef<THREE.Group>(null);
  const statusLightRef = useRef<THREE.MeshBasicMaterial>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (printState === "printing" && !startTime) {
      setStartTime(performance.now() / 1000);
    } else if (printState === "idle") {
      setStartTime(null);
    }
  }, [printState, startTime]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const cam = cameraRef.current;
    
    // Status light blinks during printing, solid green when done, dim when idle
    if (statusLightRef.current) {
      if (printState === "printing") {
        statusLightRef.current.color.setHex(Math.sin(time * 10) > 0 ? 0x00ff00 : 0x003300);
      } else if (printState === "complete") {
        statusLightRef.current.color.setHex(0x00ff00);
      } else {
        statusLightRef.current.color.setHex(0x00aa00);
      }
    }

    if (printState === "printing" && startTime && cam && !reducedMotion) {
      const t = time - startTime;
      
      const lookTarget = new THREE.Vector3(0, 0, 0);
      const camTargetPos = new THREE.Vector3();

      if (t < 0.3) {
        // Idle / Wake up
        camTargetPos.set(isMobile ? 0 : 2, 1.2, 3);
        lookTarget.set(0, 0, 0.5);
      } else if (t < 0.5) {
        // Init - Slight push in
        camTargetPos.set(isMobile ? 0 : 1.5, 1.0, 2.8);
        lookTarget.set(0, 0, 0.6);
      } else if (t < 0.7) {
        // Roller starts - Camera focuses on slot
        camTargetPos.set(isMobile ? 0 : 1.2, 0.8, 2.5);
        lookTarget.set(0, -0.2, 0.8);
      } else if (t < 1.7) {
        // Paper emerging
        const progress = (t - 0.7) / 1.0;
        camTargetPos.set(isMobile ? 0 : 1.2 - progress * 0.2, 0.8 + progress * 0.2, 2.5 + progress * 0.2);
        lookTarget.set(0, -0.2, 0.8 + progress * 0.6);
        
        if (paperRef.current) {
          // Paper slides out of the front slot horizontally
          paperRef.current.position.z = 0.5 + progress * 1.5;
        }
      } else if (t < 2.0) {
        // Complete reveal
        camTargetPos.set(isMobile ? 0 : 1.0, 1.2, 3.2);
        lookTarget.set(0, 0, 1.2);
      } else if (t < 2.2) {
        // Settle output tray
        camTargetPos.set(isMobile ? 0 : 1.5, 1.5, 3.5);
        lookTarget.set(0, 0, 1.0);
      } else {
        onComplete();
      }

      // Smooth camera lerp
      cam.position.lerp(camTargetPos, 0.05);
      const targetRotation = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(cam.position, lookTarget, new THREE.Vector3(0, 1, 0))
      );
      cam.quaternion.slerp(targetRotation, 0.05);
    }
  });

  // Calculate mask progress for CV text
  let maskProgress = 0;
  if (printState === "complete") {
    maskProgress = 1;
  } else if (printState === "printing" && startTime) {
    const t = (performance.now() / 1000) - startTime;
    if (t > 0.7) {
      maskProgress = Math.min((t - 0.7) / 1.0, 1.0);
    }
  }

  // Pre-position paper for reduced motion or complete state
  if ((reducedMotion && printState === "complete") || (printState === "complete" && !startTime)) {
    if (paperRef.current) {
      paperRef.current.position.z = 2.0;
    }
  } else if (printState === "idle" && paperRef.current) {
    paperRef.current.position.z = 0.5;
  }

  const printerMaterial = new THREE.MeshStandardMaterial({
    color: "#1c1c1e",
    roughness: 0.8,
    metalness: 0.2,
  });

  const detailMaterial = new THREE.MeshStandardMaterial({
    color: "#0a0a0c",
    roughness: 0.5,
    metalness: 0.4,
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={reducedMotion ? [0, 2, 3.5] : [1.5, 1.5, 3.5]}
        fov={isMobile ? 55 : 45}
      />
      
      {/* Studio Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 2]} intensity={1.5} color="#ffffff" castShadow shadow-bias={-0.001} />
      <directionalLight position={[-4, 2, 4]} intensity={0.5} color="#8888aa" />

      <group ref={groupRef} position={[0, -0.4, 0]}>
        
        {/* Main Printer Body */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow material={printerMaterial}>
          <boxGeometry args={[2.8, 0.8, 1.6]} />
        </mesh>

        {/* Top Cover / Scanner Bed Area */}
        <mesh position={[0, 0.95, 0]} castShadow receiveShadow material={detailMaterial}>
          <boxGeometry args={[2.7, 0.1, 1.5]} />
        </mesh>

        {/* Control Panel (Angled) */}
        <group position={[1.1, 0.9, 0.75]} rotation={[-0.2, 0, 0]}>
          <mesh material={detailMaterial}>
            <boxGeometry args={[0.4, 0.1, 0.3]} />
          </mesh>
          {/* Status Display Screen */}
          <mesh position={[0, 0.051, 0]}>
            <planeGeometry args={[0.25, 0.15]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          <Text position={[0, 0.052, 0]} fontSize={0.03} color="#ffffff" anchorX="center" anchorY="middle" rotation={[-Math.PI/2, 0, 0]}>
            {printState === 'idle' ? 'READY' : printState === 'printing' ? 'PRINTING...' : 'COMPLETE'}
          </Text>
          {/* Status Light */}
          <mesh position={[-0.15, 0.051, 0]}>
            <circleGeometry args={[0.015, 16]} />
            <meshBasicMaterial ref={statusLightRef} color="#00aa00" />
          </mesh>
        </group>

        {/* Paper Output Slot (Front) */}
        <mesh position={[0, 0.2, 0.75]} material={detailMaterial}>
          <boxGeometry args={[2.2, 0.08, 0.15]} />
        </mesh>

        {/* Output Tray Extension */}
        <mesh position={[0, 0.1, 1.4]} castShadow receiveShadow material={printerMaterial}>
          <boxGeometry args={[2.0, 0.04, 1.2]} />
        </mesh>
        <mesh position={[0, 0.13, 1.95]} castShadow receiveShadow material={detailMaterial}>
          <boxGeometry args={[2.0, 0.02, 0.1]} />
        </mesh>

        {/* Side Vents */}
        <mesh position={[1.41, 0.5, 0]} material={detailMaterial}>
          <boxGeometry args={[0.02, 0.4, 0.8]} />
        </mesh>
        <mesh position={[-1.41, 0.5, 0]} material={detailMaterial}>
          <boxGeometry args={[0.02, 0.4, 0.8]} />
        </mesh>

        {/* Physical Paper */}
        {(printState === "printing" || printState === "complete") && (
          <group ref={paperRef} position={[0, 0.13, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh castShadow receiveShadow>
              <planeGeometry args={[1.6, 2.2]} />
              <meshStandardMaterial color="#fcfcfc" side={THREE.DoubleSide} roughness={1} metalness={0} />
            </mesh>
            
            {/* CV Document Content */}
            <Text
              position={[-0.7, 1.0, 0.005]}
              color="#111111"
              fontSize={0.06}
              maxWidth={1.4}
              lineHeight={1.5}
              anchorX="left"
              anchorY="top"
              font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
              clipRect={[0, -2.2, 1.6, (maskProgress * 2.2)]}
            >
              PATEL PRINCE{"\n"}
              Data Science & Analytics{"\n"}
              {"\n"}
              EDUCATION{"\n"}
              B.Tech CSE - CSPIT, CHARUSAT (2024-2028){"\n"}
              Current: 3rd year, Sem 5 | CGPA: 7.95/10{"\n"}
              {"\n"}
              EXPERIENCE{"\n"}
              Data Science Intern - Sparks To Ideas (May 2026 - Jun 2026){"\n"}
              {"\n"}
              PROJECTS{"\n"}
              - WeatherSense AI: AI-powered forecasting{"\n"}
              - Student Placement Prediction: ML modeling{"\n"}
              - CodePilot (IBM Bob Hackathon): AI-assisted RAG tool{"\n"}
              {"\n"}
              SKILLS{"\n"}
              Python, C++, Pandas, NumPy, SQL, Machine Learning, RAG
            </Text>
          </group>
        )}
      </group>

      <ContactShadows position={[0, -0.41, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000000" />
    </>
  );
}
