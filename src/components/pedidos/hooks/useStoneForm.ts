import { useState } from 'react';
import { PedidoStone } from '../types';
import { findDiamondDataBySize } from '../utils/diamondConversionTable';


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

    // Se a lapidação é redonda, sincronizar largura e comprimento
    if (updatedStone.lapidacao === 'Redonda') {
      if (field === 'largura') {
        updatedStone.comprimento = value.toString();
      } else if (field === 'comprimento') {
        updatedStone.largura = value.toString();
      }

      // Autocompletar PTS e quilates para pedras redondas baseado no tamanho
      if ((field === 'largura' || field === 'comprimento') && value) {
        const size = parseFloat(value.toString());
        if (!isNaN(size) && size > 0) {
          const diamondData = findDiamondDataBySize(size);
          if (diamondData) {
            updatedStone.pts = diamondData.pts.toString();
            updatedStone.quilates = diamondData.carats.toString();
          }
        }
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