import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface BrassHandleModelProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
}

const BrassHandleModel: React.FC<BrassHandleModelProps> = ({ scrollProgress, mousePos }) => {
  const groupRef = useRef<THREE.Group>(null);
  const sweepLightRef = useRef<THREE.PointLight>(null);

  // Create Lathe Geometry points for ornate collars/finials
  const collarPoints = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const radius = 0.24 + Math.sin(t * Math.PI) * 0.11 + (t === 0.5 ? 0.04 : 0);
      const y = (t - 0.5) * 0.42;
      pts.push(new THREE.Vector2(radius, y));
    }
    return pts;
  }, []);

  // Shared luxury PBR materials
  const polishedBrassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D8B467'),
        metalness: 0.94,
        roughness: 0.16,
        envMapIntensity: 1.6,
      }),
    []
  );

  const knurledBronzeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#9E7531'),
        metalness: 0.88,
        roughness: 0.34,
        envMapIntensity: 1.2,
      }),
    []
  );

  const obsidianEscutcheonMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#18181C'),
        metalness: 0.82,
        roughness: 0.24,
      }),
    []
  );

  const copperAccentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F26A21'),
        metalness: 0.85,
        roughness: 0.2,
        emissive: new THREE.Color('#F26A21'),
        emissiveIntensity: 0.15,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Base slow rotation + mouse parallax + scroll rotation
    const targetRotY = t * 0.22 + mousePos.x * 0.55 + scrollProgress * Math.PI * 1.3;
    const targetRotX = 0.18 + mousePos.y * 0.35 + scrollProgress * 0.45;
    const targetRotZ = -0.22 + Math.sin(t * 0.5) * 0.05;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      delta * 3.5
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      delta * 3.5
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotZ,
      delta * 3.5
    );

    // Move handle toward the camera on scroll for cinematic transition
    const targetZ = scrollProgress * 2.2;
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      delta * 4
    );

    // Sweeping studio highlight light
    if (sweepLightRef.current) {
      sweepLightRef.current.position.x = Math.sin(t * 0.8) * 4.5;
      sweepLightRef.current.position.y = Math.cos(t * 0.6) * 3.0;
    }
  });

  return (
    <>
      <pointLight
        ref={sweepLightRef}
        position={[3, 2, 4]}
        intensity={28}
        color="#F3E2A9"
        distance={14}
      />

      <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.35}>
        <group ref={groupRef} scale={1.08} position={[0.4, 0, 0]}>
          {/* Back Architectural Escutcheon Plate */}
          <mesh position={[-0.55, 0, -0.35]} material={obsidianEscutcheonMat} castShadow receiveShadow>
            <boxGeometry args={[0.72, 3.8, 0.14]} />
          </mesh>

          {/* Champagne Gold Inner Bezel Plate */}
          <mesh position={[-0.55, 0, -0.26]} material={polishedBrassMat}>
            <boxGeometry args={[0.56, 3.55, 0.06]} />
          </mesh>

          {/* Top & Bottom Standoff Mounts connecting Escutcheon to Main Pull Bar */}
          {[-1.15, 1.15].map((yPos, idx) => (
            <group key={idx} position={[0, yPos, 0]}>
              {/* Horizontal Standoff Post */}
              <mesh
                position={[-0.25, 0, -0.02]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
                material={polishedBrassMat}
              >
                <cylinderGeometry args={[0.13, 0.13, 0.62, 32]} />
              </mesh>
              {/* Ornate Turned Lathe Collar */}
              <mesh position={[0.1, 0, 0.18]} material={polishedBrassMat}>
                <latheGeometry args={[collarPoints, 36]} />
              </mesh>
              {/* Signature MAKA Orange Precision Ring */}
              <mesh
                position={[0.1, 0, 0.18]}
                rotation={[Math.PI / 2, 0, 0]}
                material={copperAccentMat}
              >
                <torusGeometry args={[0.36, 0.018, 16, 48]} />
              </mesh>
            </group>
          ))}

          {/* Main Vertical Architectural Pull Cylinder */}
          <mesh position={[0.1, 0, 0.18]} material={polishedBrassMat} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 3.3, 48]} />
          </mesh>

          {/* Central Knurled Grip Section (Simulated with dense geometric rings) */}
          <mesh position={[0.1, 0, 0.18]} material={knurledBronzeMat}>
            <cylinderGeometry args={[0.225, 0.225, 1.45, 36, 12]} />
          </mesh>

          {/* Decorative Torus Rings framing the grip */}
          {[-0.75, -0.7, 0.7, 0.75].map((rY, i) => (
            <mesh
              key={i}
              position={[0.1, rY, 0.18]}
              rotation={[Math.PI / 2, 0, 0]}
              material={polishedBrassMat}
            >
              <torusGeometry args={[0.23, 0.022, 16, 48]} />
            </mesh>
          ))}

          {/* Top & Bottom Sculpted Crown Finials */}
          {[-1.72, 1.72].map((fY, idx) => (
            <group key={idx} position={[0.1, fY, 0.18]}>
              <mesh material={polishedBrassMat}>
                <cylinderGeometry args={[0.24, 0.24, 0.16, 36]} />
              </mesh>
              <mesh position={[0, idx === 0 ? -0.14 : 0.14, 0]} material={polishedBrassMat}>
                <sphereGeometry args={[0.18, 32, 32]} />
              </mesh>
            </group>
          ))}

          {/* Horizontal Lever Handle Extending Right */}
          <group position={[-0.55, 0.25, -0.15]}>
            {/* Rose / Spindle Base */}
            <mesh rotation={[Math.PI / 2, 0, 0]} material={polishedBrassMat}>
              <cylinderGeometry args={[0.24, 0.26, 0.16, 36]} />
            </mesh>
            {/* Neck */}
            <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]} material={polishedBrassMat}>
              <cylinderGeometry args={[0.11, 0.14, 0.28, 32]} />
            </mesh>
            {/* Sculpted Lever Arm */}
            <mesh
              position={[-0.58, 0, 0.28]}
              rotation={[0, 0, Math.PI / 2]}
              material={polishedBrassMat}
            >
              <cylinderGeometry args={[0.09, 0.12, 1.25, 32]} />
            </mesh>
          </group>

          {/* Mortise Lock Keyhole Escutcheon Detail */}
          <group position={[-0.55, -0.55, -0.21]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={polishedBrassMat}>
              <cylinderGeometry args={[0.16, 0.16, 0.05, 32]} />
            </mesh>
            <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]} material={obsidianEscutcheonMat}>
              <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
            </mesh>
          </group>
        </group>
      </Float>
    </>
  );
};

interface HeroCanvas3DProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
}

export const HeroCanvas3D: React.FC<HeroCanvas3DProps> = ({ scrollProgress, mousePos }) => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="w-full h-full"
    >
      {/* Studio Three-Point Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 5]} intensity={2.2} color="#F3E2A9" />
      <directionalLight position={[-5, -3, -2]} intensity={1.1} color="#F26A21" />
      <spotLight
        position={[0, 7, 3]}
        angle={0.45}
        penumbra={0.9}
        intensity={2.4}
        color="#FFF5D6"
      />

      {/* Studio Reflections */}
      <Environment preset="city" />

      {/* Centerpiece Procedural Luxury Door Handle */}
      <BrassHandleModel scrollProgress={scrollProgress} mousePos={mousePos} />

      {/* Golden Particle Dust */}
      <Sparkles
        count={48}
        scale={[9, 6, 5]}
        size={1.6}
        speed={0.28}
        opacity={0.45}
        color="#F3E2A9"
      />

      <ContactShadows
        position={[0, -2.35, 0]}
        opacity={0.45}
        scale={8}
        blur={2.6}
        far={4}
        color="#000000"
      />
    </Canvas>
  );
};

export default HeroCanvas3D;
