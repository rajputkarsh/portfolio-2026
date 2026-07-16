"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useAnimations,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

const AVATAR = "/models/utkarsh.glb";
const SCANDI = "/models/scandi.glb";
const COFFEE = "/models/coffee.glb";
const LAPTOP = "/models/laptop.glb";
const PLANT = "/models/plant.glb";
const SCREEN = "/models/laptop-screen.webp";

const TEXTURE_SLOTS = [
  "map",
  "normalMap",
  "roughnessMap",
  "metalnessMap",
  "emissiveMap",
  "aoMap",
] as const;

/** Enable shadows + crisp anisotropic texture filtering on every mesh. */
function prepare(obj: THREE.Object3D, maxAnisotropy: number) {
  obj.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];
    for (const material of materials) {
      const mat = material as THREE.MeshStandardMaterial;
      for (const slot of TEXTURE_SLOTS) {
        const tex = mat[slot];
        if (tex) {
          tex.anisotropy = maxAnisotropy;
          tex.needsUpdate = true;
        }
      }
    }
  });
}

function Scene() {
  const avatar = useGLTF(AVATAR);
  const scandi = useGLTF(SCANDI);
  const coffee = useGLTF(COFFEE);
  const laptop = useGLTF(LAPTOP);
  const plant = useGLTF(PLANT);
  const screen = useTexture(SCREEN);

  const avatarRef = useRef<THREE.Group>(null);
  const { actions, names } = useAnimations(avatar.animations, avatarRef);
  const busy = useRef(false);
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();
    [avatar, scandi, coffee, laptop, plant].forEach((g) =>
      prepare(g.scene, maxAnisotropy)
    );
  }, [avatar, scandi, coffee, laptop, plant, gl]);

  useEffect(() => {
    const idle = actions["standing happy"] ?? actions[names[0]];
    idle?.reset().fadeIn(0.4).play();
    return () => {
      idle?.fadeOut(0.3);
    };
  }, [actions, names]);

  function stumble() {
    const idle = actions["standing happy"] ?? actions[names[0]];
    const st = actions["stumble"];
    if (!idle || !st || busy.current) return;
    busy.current = true;
    st.reset().play();
    idle.crossFadeTo(st, 0.3, false);
    setTimeout(() => {
      idle.reset().play();
      st.crossFadeTo(idle, 1, false);
      setTimeout(() => (busy.current = false), 1000);
    }, 3800);
  }

  return (
    <group>
      <group ref={avatarRef} position={[-0.45, 0, 0]}>
        <primitive object={avatar.scene} onClick={stumble} />
      </group>

      <primitive object={scandi.scene} position={[0.45, 0, 0]} />
      <primitive object={coffee.scene} position={[0.75, 0.75, 0]} />
      <primitive
        object={laptop.scene}
        scale={0.15}
        position={[0.35, 0.7, 0.1]}
        rotation={[0, -Math.PI / 16, 0]}
      />
      <mesh
        position={[0.39, 0.94, -0.102]}
        rotation={[-Math.PI / 13, -Math.PI / 16, -Math.PI / 64]}
      >
        <planeGeometry args={[0.45, 0.25]} />
        <meshBasicMaterial
          map={screen}
          map-colorSpace={THREE.SRGBColorSpace}
          map-anisotropy={16}
          toneMapped={false}
        />
      </mesh>
      <primitive object={plant.scene} scale={0.4} position={[-0.8, 0, 0.8]} />

      {/* Contact shadow only (transparent floor). */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0.05, -0.02, 0]}
        receiveShadow
      >
        <planeGeometry args={[2.4, 1.6]} />
        <shadowMaterial opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function Avatar() {
  return (
    <Canvas
      shadows
      camera={{ fov: 43, position: [0.15, 0.75, 2.9] }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      className="!touch-none"
    >
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[3, 5, 4]}
        intensity={3}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.5}
        color="#8b5cf6"
      />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableDamping
        autoRotate
        autoRotateSpeed={0.8}
        target={[0, 0.85, 0]}
        minPolarAngle={Math.PI / 2.3}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}

useGLTF.preload(AVATAR);
useGLTF.preload(SCANDI);
useGLTF.preload(COFFEE);
useGLTF.preload(LAPTOP);
useGLTF.preload(PLANT);
