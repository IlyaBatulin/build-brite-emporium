
import React from 'react';
import { Card } from '@/components/ui/card';
import { HousePart } from './types';

interface HousePartInfoProps {
  selectedPart: HousePart | null;
  currentMaterial: string | null;
}

export const HousePartInfo: React.FC<HousePartInfoProps> = ({
  selectedPart,
  currentMaterial,
}) => {
  if (!selectedPart) {
    return (
      <Card className="p-4">
        <p className="text-muted-foreground">Select a part of the house to customize</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold capitalize mb-2">{selectedPart}</h3>
      <p className="text-sm text-muted-foreground">
        Current material: {currentMaterial || 'None selected'}
      </p>
    </Card>
  );
};
