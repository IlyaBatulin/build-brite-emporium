
import React from 'react';
import * as THREE from 'three';
import { HousePart } from './types';

interface HouseGeometryProps {
  selectedPart: HousePart | null;
  onPartClick: (part: HousePart) => void;
  materials: Record<string, THREE.Material>;
}

export const HouseGeometry: React.FC<HouseGeometryProps> = ({
  selectedPart,
  onPartClick,
  materials,
}) => {
  const walls = React.useRef<THREE.Mesh>(null);
  const roof = React.useRef<THREE.Mesh>(null);
  const foundation = React.useRef<THREE.Mesh>(null);

  return (
    <group>
      <mesh
        ref={walls}
        onClick={() => onPartClick('walls')}
        material={materials.walls}
        position={[0, 1, 0]}
      >
        <boxGeometry args={[2, 2, 2]} />
      </mesh>
      <mesh
        ref={roof}
        onClick={() => onPartClick('roof')}
        material={materials.roof}
        position={[0, 2.5, 0]}
      >
        <coneGeometry args={[1.5, 1, 4]} />
      </mesh>
      <mesh
        ref={foundation}
        onClick={() => onPartClick('foundation')}
        material={materials.foundation}
        position={[0, -0.1, 0]}
      >
        <boxGeometry args={[2.2, 0.2, 2.2]} />
      </mesh>
    </group>
  );
};
