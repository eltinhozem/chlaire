
import { useState } from 'react';
import { PedidoStone } from '../types';
import { convertPtsToSize } from '../utils/ptsToSize';

export const useStoneForm = (
  stone: PedidoStone,
  onChange: (index: number, stone: PedidoStone) => void,
  index: number
) => {
  const [savedStone, setSavedStone] = useState<PedidoStone | null>(null);
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (field: keyof PedidoStone, value: string | number | boolean) => {
    const updatedStone = { ...stone, [field]: value };

    // Se mudou para tipo 'livre', zerar a quantidade
    if (field === 'tipoQuantidade' && value === 'livre') {
      updatedStone.quantidade = 0;
    }

    // Se o campo alterado foi PTS e a lapidação é redonda, calcular largura e comprimento automaticamente
    if (field === 'pts' && updatedStone.lapidacao === 'Redonda' && value) {
      const ptsValue = parseFloat(value.toString());
      if (!isNaN(ptsValue) && ptsValue > 0) {
        const calculatedSize = convertPtsToSize(ptsValue);
        if (calculatedSize !== null) {
          updatedStone.largura = calculatedSize.toString();
          updatedStone.comprimento = calculatedSize.toString();
        }
      }
    }

    // Se a lapidação mudou para redonda e já tem PTS, recalcular largura e comprimento
    if (field === 'lapidacao' && value === 'Redonda' && updatedStone.pts) {
      const ptsValue = parseFloat(updatedStone.pts.toString());
      if (!isNaN(ptsValue) && ptsValue > 0) {
        const calculatedSize = convertPtsToSize(ptsValue);
        if (calculatedSize !== null) {
          updatedStone.largura = calculatedSize.toString();
          updatedStone.comprimento = calculatedSize.toString();
        }
      }
    }

    // Se a lapidação é redonda, sincronizar largura e comprimento
    if (updatedStone.lapidacao === 'Redonda') {
      if (field === 'largura') {
        updatedStone.comprimento = value.toString();
      } else if (field === 'comprimento') {
        updatedStone.largura = value.toString();
      }
    }

    onChange(index, updatedStone);
  };

  const handleSaveStone = () => {
    // Salvar a pedra atual
    setSavedStone({ ...stone });
    setIsEditing(false);
   
  };

  const handleEditStone = () => {
    if (savedStone) {
      onChange(index, savedStone);
      setIsEditing(true);
    }
  };

  return {
    savedStone,
    isEditing,
    handleChange,
    handleSaveStone,
    handleEditStone
  };
};
