
import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { HouseModel } from './HouseModel';
import { MaterialSelector } from './MaterialSelector';
import { HousePartInfo } from './HousePartInfo';
import { HousePart } from './types';

export const HouseVisualizer: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<HousePart | null>(null);
  const [materials, setMaterials] = useState<Record<string, THREE.Material>>({
    walls: new THREE.MeshStandardMaterial({ color: 0xcccccc }),
    roof: new THREE.MeshStandardMaterial({ color: 0x995555 }),
    foundation: new THREE.MeshStandardMaterial({ color: 0x666666 }),
  });
  const [currentMaterials, setCurrentMaterials] = useState<Record<HousePart, string>>({
    walls: 'concrete',
    roof: 'tiles',
    foundation: 'concrete',
  });

  const availableMaterials = ['concrete', 'brick', 'wood', 'tiles', 'metal'];

  const handlePartClick = (part: HousePart) => {
    setSelectedPart(part);
  };

  const handleMaterialSelect = (material: string) => {
    if (!selectedPart) return;

    const newMaterials = { ...materials };
    const color = getMaterialColor(material);
    newMaterials[selectedPart] = new THREE.MeshStandardMaterial({ color });

    setMaterials(newMaterials);
    setCurrentMaterials(prev => ({
      ...prev,
      [selectedPart]: material
    }));
  };

  const getMaterialColor = (material: string): number => {
    const colors: Record<string, number> = {
      concrete: 0xcccccc,
      brick: 0xaa4444,
      wood: 0x885522,
      tiles: 0x995555,
      metal: 0x888888,
    };
    return colors[material] || 0xcccccc;
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <HouseModel
            selectedPart={selectedPart}
            onPartClick={handlePartClick}
            materials={materials}
          />
        </div>
        <div className="space-y-4">
          <HousePartInfo
            selectedPart={selectedPart}
            currentMaterial={selectedPart ? currentMaterials[selectedPart] : null}
          />
          <MaterialSelector
            selectedPart={selectedPart}
            onMaterialSelect={handleMaterialSelect}
            availableMaterials={availableMaterials}
          />
        </div>
      </div>
    </div>
  );
};
