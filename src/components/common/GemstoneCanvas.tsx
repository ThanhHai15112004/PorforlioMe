import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GemstoneMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Ambient rotation
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.08;

      // Mouse interactive parallax tilt and movement
      const targetX = state.pointer.x * 0.6;
      const targetY = state.pointer.y * 0.6;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
      
      // Rotate mesh slightly towards mouse
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -targetX * 0.3, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {/* Multi-faceted crystal shape */}
      <icosahedronGeometry args={[2.0, 0]} />
      {/* Realistic glass gemstone material */}
      <meshPhysicalMaterial
        color="#18181b"
        roughness={0.05}
        metalness={0.1}
        transmission={0.9}
        thickness={2.0}
        ior={1.75}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        attenuationDistance={1.0}
        attenuationColor="#22C55E"
        flatShading={true} // Creates sharp reflections on polygonal facets
      />
    </mesh>
  );
}

export default function GemstoneCanvas() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        {/* Ambient illumination */}
        <ambientLight intensity={0.4} />
        
        {/* Core lighting highlights */}
        <directionalLight 
          position={[-5, 5, 3]} 
          intensity={2.5} 
          color="#22C55E" // Accent green
        />
        <directionalLight 
          position={[5, -5, 2]} 
          intensity={2.0} 
          color="#38BDF8" // Accent blue
        />
        <pointLight 
          position={[0, 4, 4]} 
          intensity={3.0} 
          color="#A855F7" // Accent purple
        />
        <pointLight 
          position={[2, 2, -2]} 
          intensity={1.5} 
          color="#ffffff" 
        />

        {/* 3D Mesh */}
        <GemstoneMesh />
      </Canvas>
    </div>
  );
}
