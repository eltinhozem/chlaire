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

  const Item: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div>
      <strong className="font-medium text-neutral-500 dark:text-neutral-400">{label}:</strong>
      <span className="text-neutral-800 dark:text-neutral-200 ml-1">{value}</span>
    </div>
  );

  return (
    <div
      className="mb-4 p-4 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
      onClick={onEdit}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-sm">
        <Item label="Onde" value={savedStone.onde} />
        <Item label="Tipo" value={savedStone.tipo} />
        <Item label="Lapidação" value={savedStone.lapidacao} />
        <Item label="Quantidade" value={getQuantidadeDisplay()} />
        <Item label="Largura" value={`${savedStone.largura}mm`} />
        <Item label="Altura" value={savedStone.altura || 'N/A'} />
        <Item label="Comprimento" value={`${savedStone.comprimento}mm`} />
        <Item label="PTS" value={savedStone.pts || 'N/A'} />
      </div>
      <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">- Clique para editar</div>
    </div>
  );
};

export default StonePreview;
