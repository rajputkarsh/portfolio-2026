"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, OrbitControls, useGLTF } from "@react-three/drei";

const MODEL = "/models/utkarsh.glb";

function Model() {
  const { scene } = useGLTF(MODEL);
  return <primitive object={scene} />;
}

export default function Avatar() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5], fov: 35 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      className="!touch-none"
    >
      <hemisphereLight intensity={0.6} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} />
      <directionalLight
        position={[-4, 2, -4]}
        intensity={0.5}
        color="#8b5cf6"
      />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.15}>
          <Center>
            <Model />
          </Center>
        </Bounds>
      </Suspense>
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.4}
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}

useGLTF.preload(MODEL);
