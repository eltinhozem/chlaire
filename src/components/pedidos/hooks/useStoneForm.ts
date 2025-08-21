import { useState } from 'react';
import { PedidoStone } from '../types';


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