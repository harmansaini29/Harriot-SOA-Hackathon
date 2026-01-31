'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. Core Globe - NOW GLOWING BRIGHTER
function CoreGlobe() {
  return (
    <Sphere args={[14, 64, 64]}>
      <MeshDistortMaterial
        color="#000000"
        emissive="#D4AF37"      // The Gold Color
        emissiveIntensity={0.8} // INCREASED: Makes it glow heavily
        roughness={0.1}
        metalness={1}
        distort={0.4}
        speed={2}
        wireframe={true}
      />
    </Sphere>
  );
}

// 2. Atmosphere - INCREASED VISIBILITY
function Atmosphere() {
  return (
    <Sphere args={[14.5, 64, 64]}>
      <meshPhysicalMaterial
        color="#D4AF37"
        transparent
        opacity={0.15} // INCREASED: More visible golden halo
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </Sphere>
  );
}

// 3. Particle Field
function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  
  const particles = useMemo(() => {
    const count = 3000;
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 14.5 + Math.random() * 2.5;
      temp[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      temp[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      temp[i * 3 + 2] = r * Math.cos(phi);
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta / 20;
    }
  });

  return (
    <group>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#F3E5AB"
          size={0.06} // Slightly larger stars
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8} // Brighter stars
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// 4. Data Arcs
function DataArcs() {
  const ref = useRef<THREE.Group>(null!);
  
  const { positions } = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 12; i++) {
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3((Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25, 15),
        new THREE.Vector3(10, 0, 10),
        new THREE.Vector3(0, 10, 10),
        new THREE.Vector3((Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25, -15)
      );
      const points = curve.getPoints(40);
      positions.push(new Float32Array(points.flatMap(p => [p.x, p.y, p.z])));
    }
    return { positions };
  }, []);

  useFrame((state, delta) => {
     if (ref.current) {
        ref.current.rotation.y -= delta / 10;
     }
  });

  return (
    <group ref={ref}>
      {positions.map((pos, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={pos.length / 3}
              args={[pos, 3]} 
            />
          </bufferGeometry>
          <lineBasicMaterial color="#D4AF37" transparent opacity={0.4} linewidth={1} />
        </line>
      ))}
    </group>
  )
}

export default function WorldBrainScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 35], fov: 40 }} gl={{ antialias: true, alpha: true }}>
        {/* Adjusted Fog to let the center shine through */}
        <fog attach="fog" args={['#02040a', 25, 60]} />
        
        {/* INCREASED LIGHTING INTENSITY */}
        <ambientLight intensity={1.5} /> 
        <pointLight position={[50, 50, 50]} intensity={5} color="#D4AF37" />
        <pointLight position={[-50, -50, -50]} intensity={5} color="#F3E5AB" />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <CoreGlobe />
          <Atmosphere />
          <ParticleField />
          <DataArcs />
        </Float>
      </Canvas>
    </div>
  );
}