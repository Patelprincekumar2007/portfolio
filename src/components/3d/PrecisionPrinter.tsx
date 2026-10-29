"use client";

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface PrecisionPrinterProps {
  printState: "idle" | "printing" | "complete";
  onComplete: () => void;
  isMobile: boolean;
  reducedMotion: boolean;
}

const TOTAL_PRINT_DURATION = 8.0; // Exact match to printer.mp3

// Physical coordinates:
// Slot mouth is at Z = 0.80
// Paper length is 1.9 (half-length 0.95, local y from -0.95 to +0.95)
// When rotation=[-PI/2, 0, 0]:
//   World Z = paper.position.z - local_y
//   Front edge is at local_y = -0.95  => World Z = paper.position.z + 0.95
//   Back edge is at local_y = +0.95   => World Z = paper.position.z - 0.95
//
// START Z: -0.15  => Front edge is at -0.15 + 0.95 = 0.80 (just at slot mouth, tray completely empty)
// END Z:   1.65   => Front edge is at 1.65 + 0.95 = 2.60 (front lip of tray)
//                   Back edge is at 1.65 - 0.95 = 0.70 (just inside slot)
const PAPER_START_Z = -0.15;
const PAPER_END_Z = 1.65;

export default function PrecisionPrinter({ printState, onComplete, isMobile, reducedMotion }: PrecisionPrinterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const paperRef = useRef<THREE.Group>(null);
  const statusLightRef = useRef<THREE.MeshBasicMaterial>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const printHeadRef = useRef<THREE.Mesh>(null);
  const laserBeamRef = useRef<THREE.MeshBasicMaterial>(null);
  
  const clockStartRef = useRef<number | null>(null);

  // Section refs for smooth 60fps real-time emergence without React re-render overhead
  const sec0Ref = useRef<THREE.Group>(null);
  const sec1Ref = useRef<THREE.Group>(null);
  const sec2Ref = useRef<THREE.Group>(null);
  const sec3Ref = useRef<THREE.Group>(null);
  const sec4Ref = useRef<THREE.Group>(null);

  const updateSections = (z: number, forceAll: boolean) => {
    if (sec0Ref.current) sec0Ref.current.visible = forceAll || (z - (-0.74) >= 0.76);
    if (sec1Ref.current) sec1Ref.current.visible = forceAll || (z - (-0.42) >= 0.76);
    if (sec2Ref.current) sec2Ref.current.visible = forceAll || (z - (-0.10) >= 0.76);
    if (sec3Ref.current) sec3Ref.current.visible = forceAll || (z - 0.24 >= 0.76);
    if (sec4Ref.current) sec4Ref.current.visible = forceAll || (z - 0.58 >= 0.76);
  };

  useEffect(() => {
    if (printState === "idle") {
      clockStartRef.current = null;
      if (paperRef.current) {
        paperRef.current.position.z = PAPER_START_Z;
      }
      updateSections(PAPER_START_Z, false);
    } else if (printState === "complete") {
      if (paperRef.current) {
        paperRef.current.position.z = PAPER_END_Z;
      }
      updateSections(PAPER_END_Z, true);
    }
  }, [printState]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const cam = cameraRef.current;

    // Status LED logic
    if (statusLightRef.current) {
      if (printState === "printing") {
        statusLightRef.current.color.setHex(Math.sin(time * 24) > 0 ? 0x00ff55 : 0x003311);
      } else if (printState === "complete") {
        statusLightRef.current.color.setHex(0x00ff55); // Solid green
      } else {
        statusLightRef.current.color.setHex(0x22c55e); // Standby
      }
    }

    // Laser print line pulse at slot mouth
    if (laserBeamRef.current) {
      if (printState === "printing") {
        laserBeamRef.current.opacity = 0.65 + Math.sin(time * 30) * 0.35;
      } else {
        laserBeamRef.current.opacity = 0;
      }
    }

    if (printState === "printing") {
      if (clockStartRef.current === null) {
        clockStartRef.current = time;
      }

      const elapsed = time - clockStartRef.current;

      if (reducedMotion) {
        if (elapsed >= TOTAL_PRINT_DURATION) {
          onComplete();
        }
        return;
      }

      const lookTarget = new THREE.Vector3(0, 0, 1.2);
      const camTargetPos = new THREE.Vector3();

      if (elapsed < 1.0) {
        // Phase 1 (0s - 1.0s): Spool gear engages, camera moves into view
        const p = elapsed / 1.0;
        camTargetPos.set(isMobile ? 0 : 1.7 - p * 0.2, 1.5 - p * 0.1, 3.5 - p * 0.3);
        lookTarget.set(0, 0, 1.0 + p * 0.2);
        
        if (paperRef.current) {
          paperRef.current.position.z = PAPER_START_Z;
        }
        updateSections(PAPER_START_Z, false);
      } else if (elapsed < 7.0) {
        // Phase 2 (1.0s - 7.0s, duration 6.0s):
        // Real-time printing! As paper exits the slot, text is printed directly onto it!
        const progress = Math.min((elapsed - 1.0) / 6.0, 1.0);
        
        // Paper moves forward out of the slot onto the tray
        const currentZ = PAPER_START_Z + progress * (PAPER_END_Z - PAPER_START_Z);
        if (paperRef.current) {
          paperRef.current.position.z = currentZ;
        }

        // Live update each section as it clears the slot opening
        updateSections(currentZ, false);

        // Print head carriage sweeps back and forth rapidly across the slot
        if (printHeadRef.current) {
          printHeadRef.current.position.x = Math.sin(progress * Math.PI * 32) * 0.72;
        }

        // Camera tracks the page as it emerges and fills the tray
        camTargetPos.set(
          isMobile ? 0 : 1.5 - progress * 0.15, 
          1.4 + progress * 0.2, 
          3.2 + progress * 0.3
        );
        lookTarget.set(0, 0, 1.2 + progress * 0.3);
      } else if (elapsed < 7.8) {
        // Phase 3 (7.0s - 7.8s): Document settles completely into tray
        const settleProgress = (elapsed - 7.0) / 0.8;
        camTargetPos.set(isMobile ? 0 : 1.4 + settleProgress * 0.2, 1.6 + settleProgress * 0.1, 3.5 + settleProgress * 0.1);
        lookTarget.set(0, 0, 1.5);

        if (paperRef.current) {
          paperRef.current.position.z = PAPER_END_Z;
        }
        updateSections(PAPER_END_Z, true);
      } else {
        // Phase 4 (8.0s): Print job finished in exact sync with audio
        camTargetPos.set(isMobile ? 0 : 1.6, 1.7, 3.6);
        lookTarget.set(0, 0, 1.5);
        if (paperRef.current) {
          paperRef.current.position.z = PAPER_END_Z;
        }
        updateSections(PAPER_END_Z, true);
        onComplete();
      }

      // Smooth camera interpolation
      if (cam) {
        cam.position.lerp(camTargetPos, 0.05);
        cam.lookAt(lookTarget);
      }
    } else if (cam && printState === "complete") {
      cam.position.lerp(new THREE.Vector3(isMobile ? 0 : 1.6, 1.7, 3.6), 0.05);
      cam.lookAt(0, 0, 1.5);
    } else if (cam && printState === "idle") {
      cam.position.lerp(new THREE.Vector3(isMobile ? 0 : 1.6, 1.6, 3.5), 0.05);
      cam.lookAt(0, 0, 1.2);
    }
  });

  const printerMaterial = new THREE.MeshStandardMaterial({
    color: "#1c1c1f",
    roughness: 0.7,
    metalness: 0.25,
  });

  const detailMaterial = new THREE.MeshStandardMaterial({
    color: "#0d0d0f",
    roughness: 0.4,
    metalness: 0.5,
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={reducedMotion ? [0, 2, 3.5] : [1.6, 1.6, 3.5]}
        fov={isMobile ? 55 : 45}
      />
      
      {/* Studio Lighting */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 2]} intensity={1.7} color="#ffffff" castShadow shadow-bias={-0.001} />
      <directionalLight position={[-4, 2, 4]} intensity={0.65} color="#9999bb" />

      <group ref={groupRef} position={[0, -0.4, 0]}>
        
        {/* Main Printer Chassis */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow material={printerMaterial}>
          <boxGeometry args={[2.8, 0.8, 1.6]} />
        </mesh>

        {/* Top Cover / Scanner Bed */}
        <mesh position={[0, 0.95, 0]} castShadow receiveShadow material={detailMaterial}>
          <boxGeometry args={[2.7, 0.1, 1.5]} />
        </mesh>

        {/* Angled Control Panel */}
        <group position={[1.1, 0.9, 0.75]} rotation={[-0.2, 0, 0]}>
          <mesh material={detailMaterial}>
            <boxGeometry args={[0.4, 0.1, 0.3]} />
          </mesh>
          <mesh position={[0, 0.051, 0]}>
            <planeGeometry args={[0.25, 0.15]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          <Text 
            position={[0, 0.052, 0]} 
            fontSize={0.03} 
            color="#ffffff" 
            anchorX="center" 
            anchorY="middle" 
            rotation={[-Math.PI / 2, 0, 0]}
          >
            {printState === 'idle' ? 'STANDBY' : printState === 'printing' ? 'PRINTING...' : 'FINISHED'}
          </Text>
          <mesh position={[-0.15, 0.051, 0]}>
            <circleGeometry args={[0.015, 16]} />
            <meshBasicMaterial ref={statusLightRef} color="#22c55e" />
          </mesh>
        </group>

        {/* Front Output Slot */}
        <mesh position={[0, 0.2, 0.75]} material={detailMaterial}>
          <boxGeometry args={[2.2, 0.08, 0.15]} />
        </mesh>

        {/* Rapidly Traversing Print Head */}
        <mesh ref={printHeadRef} position={[0, 0.22, 0.74]}>
          <boxGeometry args={[0.28, 0.04, 0.05]} />
          <meshBasicMaterial color={printState === "printing" ? "#00ff88" : "#333333"} />
        </mesh>

        {/* Active Laser Print Line at Slot Exit */}
        {printState === "printing" && (
          <mesh position={[0, 0.205, 0.81]}>
            <boxGeometry args={[1.65, 0.008, 0.015]} />
            <meshBasicMaterial ref={laserBeamRef} color="#00ff88" transparent opacity={0.8} />
          </mesh>
        )}

        {/* Extended Output Tray to Support Complete Sheet */}
        <mesh position={[0, 0.1, 1.7]} castShadow receiveShadow material={printerMaterial}>
          <boxGeometry args={[2.0, 0.04, 1.8]} />
        </mesh>
        <mesh position={[0, 0.13, 2.58]} castShadow receiveShadow material={detailMaterial}>
          <boxGeometry args={[2.0, 0.02, 0.08]} />
        </mesh>

        {/* Side Vents */}
        <mesh position={[1.41, 0.5, 0]} material={detailMaterial}>
          <boxGeometry args={[0.02, 0.4, 0.8]} />
        </mesh>
        <mesh position={[-1.41, 0.5, 0]} material={detailMaterial}>
          <boxGeometry args={[0.02, 0.4, 0.8]} />
        </mesh>

        {/* Physical Paper Document */}
        {(printState === "printing" || printState === "complete") && (
          <group 
            ref={paperRef} 
            position={[0, 0.135, printState === "complete" ? PAPER_END_Z : PAPER_START_Z]} 
            rotation={[-Math.PI / 2, 0, 0]}
          >
            {/* White Paper Sheet: 1.5m wide, 1.9m long */}
            <mesh castShadow receiveShadow>
              <planeGeometry args={[1.5, 1.9]} />
              <meshStandardMaterial 
                color="#ffffff" 
                side={THREE.DoubleSide} 
                roughness={0.85} 
                metalness={0.0} 
              />
            </mesh>
            
            {/* 
              Real-time Printed CV Content:
              Sections emerge top-first from the slot (Z = 0.80).
              Each section becomes visible as its position clears the slot opening,
              perfectly simulating real printing where every millimetre that emerges
              comes out freshly printed with zero blank paper.
            */}

            {/* Header: PATEL PRINCE */}
            <group ref={sec0Ref} position={[-0.68, -0.74, 0.005]}>
              <Text
                color="#0a0a0f"
                fontSize={0.058}
                anchorX="left"
                anchorY="top"
              >
                PATEL PRINCE
              </Text>
              <Text
                position={[0, -0.07, 0]}
                color="#2563eb"
                fontSize={0.038}
                anchorX="left"
                anchorY="top"
              >
                Data Science & Analytics Engineer
              </Text>
              <Text
                position={[0, -0.12, 0]}
                color="#888899"
                fontSize={0.032}
                anchorX="left"
                anchorY="top"
              >
                ─────────────────────────────────────────
              </Text>
            </group>

            {/* Section 1: EDUCATION */}
            <group ref={sec1Ref} position={[-0.68, -0.42, 0.005]}>
              <Text
                color="#111118"
                fontSize={0.044}
                anchorX="left"
                anchorY="top"
              >
                EDUCATION
              </Text>
              <Text
                position={[0, -0.055, 0]}
                color="#222228"
                fontSize={0.034}
                anchorX="left"
                anchorY="top"
                maxWidth={1.36}
                lineHeight={1.3}
              >
                B.Tech CSE · CSPIT, CHARUSAT (2024 - 2028){"\n"}
                Current: Semester 5 · CGPA: 7.95 / 10{"\n"}
                Academic Record: 10th: 90% | 12th: 85%
              </Text>
              <Text
                position={[0, -0.175, 0]}
                color="#888899"
                fontSize={0.032}
                anchorX="left"
                anchorY="top"
              >
                ─────────────────────────────────────────
              </Text>
            </group>

            {/* Section 2: PROFESSIONAL EXPERIENCE */}
            <group ref={sec2Ref} position={[-0.68, -0.10, 0.005]}>
              <Text
                color="#111118"
                fontSize={0.044}
                anchorX="left"
                anchorY="top"
              >
                PROFESSIONAL EXPERIENCE
              </Text>
              <Text
                position={[0, -0.055, 0]}
                color="#222228"
                fontSize={0.034}
                anchorX="left"
                anchorY="top"
                maxWidth={1.36}
                lineHeight={1.3}
              >
                Data Science Intern · Sparks To Ideas (May - June 2026){"\n"}
                • Built exploratory data analysis pipelines for statistical anomaly detection{"\n"}
                • Developed data preprocessing and missing value imputation across tables{"\n"}
                • Evaluated supervised machine learning classification models
              </Text>
              <Text
                position={[0, -0.19, 0]}
                color="#888899"
                fontSize={0.032}
                anchorX="left"
                anchorY="top"
              >
                ─────────────────────────────────────────
              </Text>
            </group>

            {/* Section 3: FEATURED PROJECTS */}
            <group ref={sec3Ref} position={[-0.68, 0.24, 0.005]}>
              <Text
                color="#111118"
                fontSize={0.044}
                anchorX="left"
                anchorY="top"
              >
                FEATURED PROJECTS
              </Text>
              <Text
                position={[0, -0.055, 0]}
                color="#222228"
                fontSize={0.034}
                anchorX="left"
                anchorY="top"
                maxWidth={1.36}
                lineHeight={1.3}
              >
                • WeatherSense AI: Atmospheric forecast & meteorology model{"\n"}
                • Student Placement Prediction: Supervised classifier (88.5% acc){"\n"}
                • CodePilot (IBM Bob AI Hackathon): AI / RAG system
              </Text>
              <Text
                position={[0, -0.175, 0]}
                color="#888899"
                fontSize={0.032}
                anchorX="left"
                anchorY="top"
              >
                ─────────────────────────────────────────
              </Text>
            </group>

            {/* Section 4: CORE TECHNICAL SKILLS */}
            <group ref={sec4Ref} position={[-0.68, 0.58, 0.005]}>
              <Text
                color="#111118"
                fontSize={0.044}
                anchorX="left"
                anchorY="top"
              >
                CORE TECHNICAL SKILLS
              </Text>
              <Text
                position={[0, -0.055, 0]}
                color="#222228"
                fontSize={0.034}
                anchorX="left"
                anchorY="top"
                maxWidth={1.36}
                lineHeight={1.3}
              >
                Python, C++, SQL, Pandas, NumPy, Scikit-Learn, RAG, Generative AI
              </Text>
            </group>
          </group>
        )}
      </group>

      <ContactShadows position={[0, -0.41, 0]} opacity={0.65} scale={15} blur={2.5} far={4} color="#000000" />
    </>
  );
}
