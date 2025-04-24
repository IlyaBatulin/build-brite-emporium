
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HousePart } from './types';

interface MaterialSelectorProps {
  selectedPart: HousePart | null;
  onMaterialSelect: (material: string) => void;
  availableMaterials: string[];
}

export const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  selectedPart,
  onMaterialSelect,
  availableMaterials,
}) => {
  if (!selectedPart) return null;

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-2">Select Material</h3>
      <div className="grid grid-cols-2 gap-2">
        {availableMaterials.map((material) => (
          <Button
            key={material}
            variant="outline"
            onClick={() => onMaterialSelect(material)}
            className="w-full"
          >
            {material}
          </Button>
        ))}
      </div>
    </Card>
  );
};
