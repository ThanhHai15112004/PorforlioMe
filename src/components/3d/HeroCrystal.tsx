import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Khối pha lê xoay chậm với distortion nhẹ
function CrystalMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, mouse }) => {
    if (!meshRef.current) return;

    // Xoay ambient cực chậm
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.06;

    // Mouse parallax — nghiêng nhẹ theo chuột (Lerp)
    meshRef.current.rotation.y += (mouse.x * 0.3 - meshRef.current.rotation.y) * 0.03;
    meshRef.current.rotation.x += (mouse.y * -0.2 - meshRef.current.rotation.x) * 0.03;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} castShadow>
        {/* Icosahedron = khối 20 mặt tam giác đều, trông như viên ngọc */}
        <icosahedronGeometry args={[1.6, 1]} />
        <MeshDistortMaterial
          color="#ffffff"
          envMapIntensity={1.8}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.1}
          roughness={0}
          distort={0.08}   // Distortion rất nhẹ, tạo cảm giác sống động
          speed={1.2}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Vòng tròn bao quanh khối */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.4, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#2563EB"
          transparent
          opacity={0.2}
          roughness={0.3}
        />
      </mesh>

      {/* Vòng tròn thứ 2 nghiêng 45 độ */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.1, 0.008, 16, 100]} />
        <meshStandardMaterial
          color="#93C5FD"
          transparent
          opacity={0.15}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

export default function HeroCrystal() {
  return (
    <div className="w-full h-full min-h-[420px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]} // Max 2x pixel ratio để tối ưu hiệu năng
      >
        {/* Ánh sáng */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#93C5FD" />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#DBEAFE" />

        {/* HDR Environment map để tạo reflection cao cấp */}
        <Environment preset="city" />

        <CrystalMesh />
      </Canvas>
    </div>
  );
}
