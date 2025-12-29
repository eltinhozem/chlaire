import { useState } from 'react';
import { PedidoStone } from '../types';
import { findConversionByMm, findConversionByPoints, findConversionByCt } from '../../calculadora/stoneConversionTable';


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

    // Campos ligados por conversão na lapidação redonda
    if (updatedStone.lapidacao === 'Redonda') {
      const applyConversion = (mm: number, pts?: number, ct?: number) => {
        if (mm) {
          const conversion = findConversionByMm(mm);
          if (conversion) {
            updatedStone.pts = conversion.points.toString();
            updatedStone.quilates = conversion.ct.toString();
            updatedStone.largura = conversion.mm.toString();
            updatedStone.comprimento = conversion.mm.toString();
          }
        } else if (pts) {
          const conversion = findConversionByPoints(pts);
          if (conversion) {
            updatedStone.pts = conversion.points.toString();
            updatedStone.quilates = conversion.ct.toString();
            updatedStone.largura = conversion.mm.toString();
            updatedStone.comprimento = conversion.mm.toString();
          }
        } else if (ct) {
          const conversion = findConversionByCt(ct);
          if (conversion) {
            updatedStone.pts = conversion.points.toString();
            updatedStone.quilates = conversion.ct.toString();
            updatedStone.largura = conversion.mm.toString();
            updatedStone.comprimento = conversion.mm.toString();
          }
        }
      };

      if (field === 'largura' || field === 'comprimento') {
        const size = parseFloat(value.toString());
        if (!value) {
          updatedStone.pts = '';
          updatedStone.quilates = '';
          updatedStone.largura = '';
          updatedStone.comprimento = '';
        } else if (!isNaN(size) && size > 0) {
          applyConversion(size);
        }
      } else if (field === 'pts') {
        const ptsValue = parseFloat(value.toString());
        if (!isNaN(ptsValue) && ptsValue > 0) {
          applyConversion(0, ptsValue);
        }
      } else if (field === 'quilates') {
        const ctValue = parseFloat(value.toString());
        if (!isNaN(ctValue) && ctValue > 0) {
          applyConversion(0, undefined, ctValue);
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
