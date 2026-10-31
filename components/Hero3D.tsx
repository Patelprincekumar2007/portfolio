"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function DataCloud() {
  const group = useRef<THREE.Group>(null);
  const wire = useRef<THREE.Mesh>(null);

  const { positions, colors } = useMemo(() => {
    const count = 2600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const paper = new THREE.Color("#f3ede3");
    const accent = new THREE.Color("#ff5a1f");
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const jitter = 1 + (Math.random() - 0.5) * 0.22;
      positions[i * 3] = Math.cos(theta) * radius * jitter * 1.6;
      positions[i * 3 + 1] = y * jitter * 1.6;
      positions[i * 3 + 2] = Math.sin(theta) * radius * jitter * 1.6;
      const c = Math.random() < 0.16 ? accent : paper;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      const px = state.pointer.x * 0.25;
      const py = state.pointer.y * 0.18;
      group.current.rotation.x += (py - group.current.rotation.x) * 0.04;
      group.current.rotation.z += (px * 0.4 - group.current.rotation.z) * 0.04;
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.05;
      wire.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <>
      <group ref={group}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.022} vertexColors sizeAttenuation transparent opacity={0.55} />
        </points>
      </group>
      <mesh ref={wire}>
        <icosahedronGeometry args={[2.3, 1]} />
        <meshBasicMaterial color="#f3ede3" wireframe transparent opacity={0.05} />
      </mesh>
    </>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <DataCloud />
      </Float>
    </Canvas>
  );
}
