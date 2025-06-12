
import React from 'react';
import { MinusCircle } from 'lucide-react';
import { PedidoStone } from '../types';

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
  const tiposDePedra = [
    'Diamante', 'Safira', 'Rubi', 'Esmeralda', 'Topázio', 'Ametista', 
    'Turmalina', 'Opala', 'Pérola', 'Granada', 'Água-marinha', 'Citrino',
    'Alexandrita', 'Tanzanita', 'Lápis-lazúli', 'Quartzo Rosa', 'Pedra da Lua',
    'Malaquita', 'Ônix', 'Coral', 'Zircônia', 'Zircão'
  ];

  const handleChange = (field: keyof PedidoStone, value: string | number) => {
    onChange(index, { ...stone, [field]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-medium">Pedra {index + 1}</h4>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700"
        >
          <MinusCircle size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Onde *
          </label>
          <input
            type="text"
            value={stone.onde}
            onChange={(e) => handleChange('onde', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo *
          </label>
          <select
            value={stone.tipo}
            onChange={(e) => handleChange('tipo', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Selecione</option>
            {tiposDePedra.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lapidação *
          </label>
          <select
            value={stone.lapidacao}
            onChange={(e) => handleChange('lapidacao', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Selecione</option>
            <option value="Redonda">Redonda</option>
            <option value="Quadrada">Quadrada</option>
            <option value="Oval">Oval</option>
            <option value="Gota">Gota</option>
            <option value="Navete">Navete</option>
            <option value="Esmeralda">Esmeralda</option>
            <option value="Princesa">Princesa</option>
            <option value="Almofada">Esmeralda quadrada</option>
            <option value="Coração">Coração</option>
            <option value="Outra">Outra</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantidade *
          </label>
          <input
            type="number"
            min="1"
            value={stone.quantidade}
            onChange={(e) => handleChange('quantidade', Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Largura (mm) *
          </label>
          <input
            type="number"
            step="0.1"
            value={stone.largura}
            onChange={(e) => handleChange('largura', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Altura (mm)
          </label>
          <input
            type="number"
            step="0.1"
            value={stone.altura}
            onChange={(e) => handleChange('altura', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comprimento (mm) *
          </label>
          <input
            type="number"
            step="0.1"
            value={stone.comprimento}
            onChange={(e) => handleChange('comprimento', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PTS
          </label>
          <input
            type="number"
            step="0.01"
            value={stone.pts}
            onChange={(e) => handleChange('pts', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default PedidoStoneComponent;
