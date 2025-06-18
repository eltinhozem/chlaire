import React from 'react';
import { MinusCircle, Save, Edit } from 'lucide-react';
import { PedidoStone } from '../types';
import { useStoneForm } from '../hooks/useStoneForm';
import { isStoneFormValid } from '../utils/stoneValidation';
import StonePreview from './StonePreview';
import StoneFormFields from './StoneFormFields';

interface PedidoStoneProps {
  index: number;
  stone: PedidoStone;
  onRemove: (index: number) => void;
  onChange: (index: number, stone: PedidoStone) => void;
}

const PedidoStoneComponent: React.FC<PedidoStoneProps> = ({
  index,
  stone,
  onRemove,
  onChange,
}) => {
  const {
    savedStone,
    isEditing,
    handleChange,
    handleSaveStone,
    handleEditStone
  } = useStoneForm(stone, onChange, index);

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-medium">Pedra {index + 1}</h4>
        <div className="flex gap-2">
          {!isEditing && (
            <button
              type="button"
              onClick={handleEditStone}
              className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
            >
              <Edit size={16} />
              Editar
            </button>
          )}
          {isEditing && (
            <button
              type="button"
              onClick={handleSaveStone}
              disabled={!isStoneFormValid(stone)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <Save size={16} />
              Salvar Pedra
            </button>
          )}
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700"
          >
            <MinusCircle size={20} />
          </button>
        </div>
      </div>

      {/* Preview da pedra salva */}
      {!isEditing && savedStone && (
        <StonePreview savedStone={savedStone} onEdit={handleEditStone} />
      )}
      
      {/* Formulário de edição */}
      {isEditing && (
        <StoneFormFields stone={stone} index={index} onChange={handleChange} />
      )}
    </div>
  );
};

export default PedidoStoneComponent;
