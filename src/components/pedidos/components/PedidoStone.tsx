import React from 'react';
import { MinusCircle, Save, Edit } from 'lucide-react';
import { PedidoStone } from '../types';
import { useStoneForm } from '../hooks/useStoneForm';
import { isStoneFormValid } from '../utils/stoneValidation';
import StonePreview from './StonePreview';
import StoneFormFields from './StoneFormFields';
import { SecondaryButton, SuccessButton, DangerButton } from '../../buttons';

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

  // Inicia sempre no modo de edição para novas pedras
  React.useEffect(() => {
    if (!savedStone) {
      // Manter em modo de edição
    }
  }, [savedStone]);

  return (
    <div className="bg-white dark:bg-neutral-800/50 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700/50 mb-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Pedra {index + 1}
        </h4>
        <div className="flex items-center gap-2">
          {!isEditing && (
            <SecondaryButton
              size="sm"
              type="button"
              onClick={handleEditStone}
              className="flex items-center gap-2"
            >
              <Edit size={16} />
              Editar
            </SecondaryButton>
          )}
          {isEditing && (
            <SuccessButton
              size="sm"
              type="button"
              onClick={handleSaveStone}
              disabled={!isStoneFormValid(stone)}
              className="flex items-center gap-2"
            >
              <Save size={16} />
              Salvar
            </SuccessButton>
          )}
          <DangerButton
            size="icon"
            type="button"
            onClick={() => onRemove(index)}
          >
            <MinusCircle size={20} />
          </DangerButton>
        </div>
      </div>

      {!isEditing && savedStone ? (
        <StonePreview savedStone={savedStone} onEdit={handleEditStone} />
      ) : (
        <StoneFormFields stone={stone} index={index} onChange={handleChange} />
      )}
    </div>
  );
};

export default PedidoStoneComponent;