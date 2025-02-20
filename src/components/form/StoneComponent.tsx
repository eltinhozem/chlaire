import React from 'react';
import { PlusCircle } from 'lucide-react';
import {
  stoneHeader,
  stoneTitle,
  addStoneButton,
  stoneSection
} from './styles';

interface StoneProps {
  stones: any[];
  handleStoneChange: (index: number, updatedStone: any) => void;
  addStone: () => void;
}

const StoneComponent: React.FC<StoneProps> = ({ stones, handleStoneChange, addStone }) => {
  return (
    <div className={stoneSection}>
      <div className={stoneHeader}>
        <h2 className={stoneTitle}>Pedras</h2>
        <button onClick={addStone} className={addStoneButton}>
          <PlusCircle /> Adicionar Pedra
        </button>
      </div>
      {stones.map((stone, index) => (
        <div key={index}>
          {/* Implementar a lógica para editar pedras */}
        </div>
      ))}
    </div>
  );
};

export default StoneComponent;