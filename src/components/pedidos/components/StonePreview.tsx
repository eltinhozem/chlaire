import React from 'react';
import { PedidoStone } from '../types';

interface StonePreviewProps {
  savedStone: PedidoStone;
  onEdit: () => void;
}

const StonePreview: React.FC<StonePreviewProps> = ({ savedStone, onEdit }) => {
  const getQuantidadeDisplay = () => {
    if (savedStone.tipoQuantidade === 'livre') {
      return 'Livre';
    } else if (savedStone.tipoQuantidade === 'maximo') {
      return `No máximo ${savedStone.quantidade}`;
    } else if (savedStone.tipoQuantidade === 'minimo') {
      return `No mínimo ${savedStone.quantidade}`;
    } else {
      return savedStone.quantidade === 0 ? 'Livre' : savedStone.quantidade;
    }
  };

  return (
    <div 
      className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={onEdit}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        <div><strong>Onde:</strong> {savedStone.onde}</div>
        <div><strong>Tipo:</strong> {savedStone.tipo}</div>
        <div><strong>Lapidação:</strong> {savedStone.lapidacao}</div>
        <div><strong>Quantidade:</strong> {getQuantidadeDisplay()}</div>
        <div><strong>Largura:</strong> {savedStone.largura}mm</div>
        <div><strong>Altura:</strong> {savedStone.altura || 'N/A'}</div>
        <div><strong>Comprimento:</strong> {savedStone.comprimento}mm</div>
        <div><strong>PTS:</strong> {savedStone.pts || 'N/A'}</div>
      </div>
      <div className="text-xs text-gray-500 mt-2">- Clique para editar</div>
    </div>
  );
};

export default StonePreview;