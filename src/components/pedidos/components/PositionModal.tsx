import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PrimaryButton } from '../../buttons';

interface PositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPosition: number;
  totalPedidos: number;
  onSave: (newPosition: number) => void;
  pedidoName: string;
}

const PositionModal: React.FC<PositionModalProps> = ({
  isOpen,
  onClose,
  currentPosition,
  totalPedidos,
  onSave,
  pedidoName
}) => {
  const [newPosition, setNewPosition] = useState(currentPosition);

  if (!isOpen) return null;

  const handleSave = () => {
    if (newPosition >= 1 && newPosition <= totalPedidos) {
      onSave(newPosition);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Alterar Posição na Fila</h3>
          <PrimaryButton
            onClick={onClose}
            className="p-2"
            style={{ minHeight: 'auto' }}
          >
            <X size={20} />
          </PrimaryButton>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Pedido: <strong>{pedidoName}</strong>
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Posição atual: <strong>{currentPosition}</strong>
          </p>
          
          <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
            Nova posição (1 a {totalPedidos}):
          </label>
          <input
            id="position"
            type="number"
            min={1}
            max={totalPedidos}
            value={newPosition}
            onChange={(e) => setNewPosition(parseInt(e.target.value) || 1)}
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <PrimaryButton
            onClick={onClose}
            className="px-4 py-2"
          >
            Cancelar
          </PrimaryButton>
          <PrimaryButton
            onClick={handleSave}
            disabled={newPosition < 1 || newPosition > totalPedidos}
            className="px-4 py-2"
          >
            Salvar
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default PositionModal;
