
import React from 'react';
import { PlusCircle } from 'lucide-react';
import Pedra from '../../pedra/pedra';
import { StoneHeader, StoneTitle, AddStoneButton, StoneSection } from '../styles';
import { Stone } from '../../pedra/types';

interface StonesListProps {
  stones: Stone[];
  onAddStone: () => void;
  onRemoveStone: (index: number) => void;
  onStoneChange: (index: number, stone: Stone) => void;
  saveSignal?: number;
}

const StonesList: React.FC<StonesListProps> = ({ 
  stones, 
  onAddStone, 
  onRemoveStone, 
  onStoneChange,
  saveSignal = 0
}) => {
  return (
    <>
      <StoneHeader>
        <StoneTitle>Pedras</StoneTitle>
        <AddStoneButton type="button" onClick={onAddStone}>
          <PlusCircle size={16} style={{ marginRight: '0.5rem' }} />
          Adicionar Pedra
        </AddStoneButton>
      </StoneHeader>
      <StoneSection>
        {stones.map((stone, index) => (
          <Pedra
            key={index}
            index={index}
            stone={stone}
            onRemove={onRemoveStone}
            onChange={(updatedStone) => onStoneChange(index, updatedStone)}
            onSave={(updatedStone) => onStoneChange(index, updatedStone)}
            saveSignal={saveSignal}
          />
        ))}
      </StoneSection>
    </>
  );
};

export default StonesList;
