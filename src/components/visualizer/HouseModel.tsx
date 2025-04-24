
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { HousePart } from './types';
import { HouseGeometry } from './HouseGeometry';
import * as THREE from 'three';

interface HouseModelProps {
  selectedPart: HousePart | null;
  onPartClick: (part: HousePart) => void;
  materials: Record<string, THREE.Material>;
}

export const HouseModel: React.FC<HouseModelProps> = ({
  selectedPart,
  onPartClick,
  materials,
}) => {
  return (
    <div className="w-full h-[400px] bg-gray-100 rounded-lg">
      <Canvas camera={{ position: [5, 5, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <HouseGeometry
          selectedPart={selectedPart}
          onPartClick={onPartClick}
          materials={materials}
        />
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
};
