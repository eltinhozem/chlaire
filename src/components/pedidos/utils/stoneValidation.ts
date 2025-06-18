import { PedidoStone } from '../types';

export const isStoneFormValid = (stone: PedidoStone): boolean => {
  // Campos sempre obrigatórios - onde deve ter texto
  if (!stone.onde || !stone.onde.trim()) {
    return false;
  }
  
  // Tipo e lapidação - verificar se têm valores válidos (incluindo valores padrão)
  if (!stone.tipo || stone.tipo.trim() === '') {
    return false;
  }
  
  if (!stone.lapidacao || stone.lapidacao.trim() === '') {
    return false;
  }
  
  // Para lapidação redonda, aceitar se PTS está preenchido OU se largura/comprimento estão preenchidos
  if (stone.lapidacao === 'Redonda') {
    const hasPts = stone.pts && stone.pts.toString().trim() !== '';
    const hasDimensions = stone.largura && stone.largura.toString().trim() !== '' && 
                         stone.comprimento && stone.comprimento.toString().trim() !== '';
    return !!(hasPts || hasDimensions);
  }
  
  // Para outras lapidações, largura e comprimento são obrigatórios
  return !!(stone.largura && stone.largura.toString().trim() !== '' && 
           stone.comprimento && stone.comprimento.toString().trim() !== '');
};
