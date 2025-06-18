import React from 'react';
import { PedidoStone } from '../types';

interface StoneFormFieldsProps {
  stone: PedidoStone;
  index: number;
  onChange: (field: keyof PedidoStone, value: string | number | boolean) => void;
}

const tiposDePedra = [
  'Diamante', 'Safira', 'Rubi', 'Esmeralda', 'Topázio', 'Ametista', 
  'Turmalina', 'Opala', 'Pérola', 'Granada', 'Água-marinha', 'Citrino',
  'Alexandrita', 'Tanzanita', 'Lápis-lazúli', 'Quartzo Rosa', 'Pedra da Lua',
  'Malaquita', 'Ônix', 'Coral', 'Zircônia', 'Zircão'
];

const StoneFormFields: React.FC<StoneFormFieldsProps> = ({ stone, index, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Onde *
        </label>
        <input
          type="text"
          value={stone.onde}
          onChange={(e) => onChange('onde', e.target.value)}
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
          onChange={(e) => onChange('tipo', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
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
          onChange={(e) => onChange('lapidacao', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
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
          Tipo de Quantidade
        </label>
        <div className="flex flex-col gap-2 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name={`tipoQuantidade-${index}`}
              checked={stone.tipoQuantidade === 'exata'}
              onChange={() => onChange('tipoQuantidade', 'exata')}
              className="w-4 h-4"
            />
            <span className="text-sm">Quantidade exata</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name={`tipoQuantidade-${index}`}
              checked={stone.tipoQuantidade === 'maximo'}
              onChange={() => onChange('tipoQuantidade', 'maximo')}
              className="w-4 h-4"
            />
            <span className="text-sm">No máximo</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name={`tipoQuantidade-${index}`}
              checked={stone.tipoQuantidade === 'minimo'}
              onChange={() => onChange('tipoQuantidade', 'minimo')}
              className="w-4 h-4"
            />
            <span className="text-sm">No mínimo</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name={`tipoQuantidade-${index}`}
              checked={stone.tipoQuantidade === 'livre'}
              onChange={() => onChange('tipoQuantidade', 'livre')}
              className="w-4 h-4"
            />
            <span className="text-sm">Livre</span>
          </label>
        </div>
        
        {stone.tipoQuantidade !== 'livre' && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade *
            </label>
            <input
              type="number"
              min="1"
              value={stone.quantidade === 0 ? '' : stone.quantidade}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  onChange('quantidade', 0);
                } else {
                  const numValue = Number(value);
                  if (!isNaN(numValue)) {
                    onChange('quantidade', numValue);
                  }
                }
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Digite a quantidade"
              required
            />
          </>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          PTS {stone.lapidacao === 'Redonda' && ''}
        </label>
        <input
          type="number"
          step="0.01"
          value={stone.pts}
          onChange={(e) => onChange('pts', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder={stone.lapidacao === 'Redonda' ? 'Digite PTS' : 'PTS'}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {stone.lapidacao === 'Redonda' ? 'Diâmetro (mm) *' : 'Largura (mm) *'}
        </label>
        <input
          type="number"
          step="0.1"
          value={stone.largura}
          onChange={(e) => onChange('largura', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
          placeholder={stone.lapidacao === 'Redonda' ? '' : 'Largura'}
          readOnly={stone.lapidacao === 'Redonda' && !!stone.pts}
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
          onChange={(e) => onChange('comprimento', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
          readOnly={stone.lapidacao === 'Redonda'}
          placeholder={stone.lapidacao === 'Redonda' ? '' : 'Comprimento'}
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
          onChange={(e) => onChange('altura', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default StoneFormFields;