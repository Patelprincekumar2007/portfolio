"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, ContactShadows, useTexture } from "@react-three/drei";
import * as THREE from "three";

export type PrintState = "standby" | "printing" | "done";

const SLOT_Y = 0.78;
const PAPER_W = 0.92;
const PAPER_H = 1.3;

function Paper({ progress, state }: { progress: { value: number }; state: PrintState }) {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useTexture("/cv/resume-preview-1.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m) return;
    const p = Math.max(progress.value, 0.0001);
    m.visible = progress.value > 0.004;
    m.scale.y = p;
    m.position.y = SLOT_Y + (PAPER_H * p) / 2;
    m.rotation.z = state === "printing" ? Math.sin(clock.elapsedTime * 7) * 0.012 : 0;
  });

  return (
    <mesh ref={mesh} visible={false} castShadow>
      <planeGeometry args={[PAPER_W, PAPER_H]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} roughness={0.9} metalness={0} />
    </mesh>
  );
}

function Roller({ x, progress }: { x: number; progress: { value: number } }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      const speed = progress.value > 0.004 && progress.value < 1 ? 7 : 0.4;
      ref.current.rotation.x += delta * speed;
    }
  });
  return (
    <mesh ref={ref} position={[x, SLOT_Y, 0.09]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.045, 0.045, 0.28, 20]} />
      <meshStandardMaterial color="#2a2a33" roughness={0.4} metalness={0.6} />
    </mesh>
  );
}

function StatusLight({ state }: { state: PrintState }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (!mat.current) return;
    if (state === "standby") {
      mat.current.emissive.set("#ffb347");
      mat.current.emissiveIntensity = 0.9;
    } else if (state === "printing") {
      mat.current.emissive.set("#ff5a1f");
      mat.current.emissiveIntensity = 1.2 + Math.sin(clock.elapsedTime * 10) * 0.8;
    } else {
      mat.current.emissive.set("#4ade80");
      mat.current.emissiveIntensity = 1.4;
    }
  });
  return (
    <mesh position={[0.62, 0.42, 0.51]}>
      <sphereGeometry args={[0.035, 16, 16]} />
      <meshStandardMaterial ref={mat} color="#111" emissive="#ffb347" emissiveIntensity={0.9} />
    </mesh>
  );
}

function Printer({ progress, state }: { progress: { value: number }; state: PrintState }) {
  return (
    <group position={[0, -0.35, 0]}>
      {/* table */}
      <RoundedBox args={[5, 0.12, 3.4]} radius={0.03} position={[0, -0.06, 0]} receiveShadow>
        <meshStandardMaterial color="#17171f" roughness={0.85} />
      </RoundedBox>
      <ContactShadows position={[0, 0.01, 0]} opacity={0.55} scale={6} blur={2.2} far={2} color="#000000" />

      {/* printer body */}
      <RoundedBox args={[1.7, 0.72, 1.05]} radius={0.06} position={[0, 0.36, 0]} castShadow>
        <meshStandardMaterial color="#23232e" roughness={0.55} metalness={0.25} />
      </RoundedBox>
      {/* top cover */}
      <RoundedBox args={[1.5, 0.14, 0.9]} radius={0.04} position={[0, 0.75, 0]} castShadow>
        <meshStandardMaterial color="#2e2e3b" roughness={0.5} metalness={0.3} />
      </RoundedBox>
      {/* paper slot */}
      <mesh position={[0, SLOT_Y + 0.005, 0.09]}>
        <boxGeometry args={[1.05, 0.025, 0.16]} />
        <meshStandardMaterial color="#08080c" roughness={0.9} />
      </mesh>
      {/* front accent strip */}
      <mesh position={[0, 0.58, 0.528]}>
        <boxGeometry args={[1.5, 0.035, 0.005]} />
        <meshStandardMaterial color="#ff5a1f" emissive="#ff5a1f" emissiveIntensity={0.35} />
      </mesh>
      {/* front vents */}
      {[-0.45, -0.35, -0.25].map((x) => (
        <mesh key={x} position={[x, 0.42, 0.526]}>
          <boxGeometry args={[0.05, 0.16, 0.005]} />
          <meshStandardMaterial color="#101016" />
        </mesh>
      ))}
      {/* side seams + vents (both sides) */}
      {[0.851, -0.851].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.36, 0]}>
            <boxGeometry args={[0.004, 0.5, 0.9]} />
            <meshStandardMaterial color="#1c1c26" roughness={0.6} />
          </mesh>
          {[-0.25, -0.15, -0.05, 0.05, 0.15].map((z) => (
            <mesh key={z} position={[x + Math.sign(x) * 0.002, 0.52, z]}>
              <boxGeometry args={[0.004, 0.02, 0.06]} />
              <meshStandardMaterial color="#0d0d13" />
            </mesh>
          ))}
        </group>
      ))}
      {/* rear input tray */}
      <mesh position={[0, 0.98, -0.5]} rotation={[-0.42, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.52, 0.025]} />
        <meshStandardMaterial color="#2e2e3b" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* tray paper guides */}
      {[-0.42, 0.42].map((x) => (
        <mesh key={x} position={[x, 0.99, -0.49]} rotation={[-0.42, 0, 0]}>
          <boxGeometry args={[0.03, 0.4, 0.05]} />
          <meshStandardMaterial color="#3a3a48" roughness={0.5} />
        </mesh>
      ))}
      {/* blank sheets waiting in tray */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0.965 + i * 0.012, -0.478 - i * 0.005]} rotation={[-0.42, 0, 0]}>
          <boxGeometry args={[0.86, 0.42, 0.008]} />
          <meshStandardMaterial color="#f3ede3" roughness={0.85} />
        </mesh>
      ))}
      {/* back panel: power + usb + vents */}
      <mesh position={[0.55, 0.28, -0.528]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.02, 16]} />
        <meshStandardMaterial color="#0d0d13" roughness={0.8} />
      </mesh>
      <mesh position={[0.32, 0.28, -0.528]}>
        <boxGeometry args={[0.09, 0.04, 0.02]} />
        <meshStandardMaterial color="#0d0d13" roughness={0.8} />
      </mesh>
      {[-0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0.0].map((x) => (
        <mesh key={x} position={[x, 0.5, -0.526]}>
          <boxGeometry args={[0.05, 0.14, 0.005]} />
          <meshStandardMaterial color="#101016" />
        </mesh>
      ))}
      {/* rear brand plate */}
      <mesh position={[0.45, 0.62, -0.527]}>
        <boxGeometry args={[0.34, 0.09, 0.004]} />
        <meshStandardMaterial color="#ff5a1f" emissive="#ff5a1f" emissiveIntensity={0.25} roughness={0.5} />
      </mesh>
      {/* rubber feet */}
      {[-0.6, 0.6].map((x) =>
        [-0.35, 0.35].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.015, z]}>
            <cylinderGeometry args={[0.05, 0.06, 0.05, 12]} />
            <meshStandardMaterial color="#0a0a10" roughness={0.95} />
          </mesh>
        )),
      )}

      <Roller x={-0.32} progress={progress} />
      <Roller x={0.32} progress={progress} />
      <StatusLight state={state} />
      <Paper progress={progress} state={state} />
    </group>
  );
}

const FRONT_PHI = 1.18;
const RADIUS = 4.6;
const TARGET = new THREE.Vector3(0, 0.22, 0);

function CameraRig({ state }: { state: PrintState }) {
  const { camera, gl } = useThree();
  const theta = useRef(0);
  const phi = useRef(FRONT_PHI);
  const dragging = useRef(false);
  const last = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const el = gl.domElement;
    const down = (e: PointerEvent) => {
      dragging.current = true;
      last.current = [e.clientX, e.clientY];
      el.setPointerCapture?.(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      const [lx, ly] = last.current;
      theta.current -= (e.clientX - lx) * 0.006;
      phi.current = THREE.MathUtils.clamp(phi.current - (e.clientY - ly) * 0.004, 0.85, 1.42);
      last.current = [e.clientX, e.clientY];
    };
    const up = () => {
      dragging.current = false;
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!dragging.current) {
      if (state === "standby") {
        theta.current += delta * 0.45; // slow auto-orbit tour
      } else {
        // ease back to the front for the actual print
        const targetTheta = Math.round(theta.current / (Math.PI * 2)) * Math.PI * 2;
        theta.current = THREE.MathUtils.damp(theta.current, targetTheta, 3, delta);
        phi.current = THREE.MathUtils.damp(phi.current, FRONT_PHI, 3, delta);
      }
    }
    camera.position.set(
      TARGET.x + RADIUS * Math.sin(phi.current) * Math.sin(theta.current),
      TARGET.y + RADIUS * Math.cos(phi.current),
      TARGET.z + RADIUS * Math.sin(phi.current) * Math.cos(theta.current),
    );
    camera.lookAt(TARGET);
  });
  return null;
}

export default function PrinterScene({
  progress,
  state,
}: {
  progress: { value: number };
  state: PrintState;
}) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.45, 4.7], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent", touchAction: "none" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[-3, 4, 2]} intensity={40} angle={0.5} penumbra={0.8} color="#ffb347" />
      <pointLight position={[0, 3.2, -2]} intensity={22} color="#f3ede3" />
      <directionalLight position={[-2, 3.5, -4]} intensity={0.55} color="#cfd4ff" />
      <pointLight position={[0, 2.0, 3]} intensity={4} color="#f3ede3" />
      <Printer progress={progress} state={state} />
      <CameraRig state={state} />
    </Canvas>
  );
}
