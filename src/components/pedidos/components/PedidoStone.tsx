
import React from 'react';
import { MinusCircle, Save, Edit } from 'lucide-react';
import { PedidoStone } from '../types';
import { useStoneForm } from '../hooks/useStoneForm';
import { isStoneFormValid } from '../utils/stoneValidation';
import StonePreview from './StonePreview';
import StoneFormFields from './StoneFormFields';
import { lightTheme } from '../../Styles';
import {
  StoneContainer,
  StoneHeader,
  StoneTitle,
  StoneActions,
  StoneActionButton
} from '../styles/StoneStyles';

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
  const currentTheme = lightTheme; // This could be dynamic based on your theme context

  const {
    savedStone,
    isEditing,
    handleChange,
    handleSaveStone,
    handleEditStone
  } = useStoneForm(stone, onChange, index);

  return (
    <StoneContainer theme={currentTheme}>
      <StoneHeader>
        <StoneTitle theme={currentTheme}>Pedra {index + 1}</StoneTitle>
        <StoneActions>
          {!isEditing && (
            <StoneActionButton
              theme={currentTheme}
              variant="edit"
              type="button"
              onClick={handleEditStone}
            >
              <Edit size={16} />
              Editar
            </StoneActionButton>
          )}
          {isEditing && (
            <StoneActionButton
              theme={currentTheme}
              variant="save"
              type="button"
              onClick={handleSaveStone}
              disabled={!isStoneFormValid(stone)}
            >
              <Save size={16} />
              Salvar Pedra
            </StoneActionButton>
          )}
          <StoneActionButton
            theme={currentTheme}
            variant="remove"
            type="button"
            onClick={() => onRemove(index)}
          >
            <MinusCircle size={20} />
          </StoneActionButton>
        </StoneActions>
      </StoneHeader>

      {/* Preview da pedra salva */}
      {!isEditing && savedStone && (
        <StonePreview savedStone={savedStone} onEdit={handleEditStone} />
      )}
      
      {/* Formulário de edição */}
      {isEditing && (
        <StoneFormFields stone={stone} index={index} onChange={handleChange} />
      )}
    </StoneContainer>
  );
};

export default PedidoStoneComponent;