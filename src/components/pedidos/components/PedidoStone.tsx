import React, { useState } from 'react';
import { MinusCircle, Save, Edit } from 'lucide-react';
import { PedidoStone } from '../types';
import { convertPtsToSize } from '../utils/ptsToSize';

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
  const [savedStone, setSavedStone] = useState<PedidoStone | null>(null);
  const [isEditing, setIsEditing] = useState(true);

  const tiposDePedra = [
    'Diamante', 'Safira', 'Rubi', 'Esmeralda', 'Topázio', 'Ametista', 
    'Turmalina', 'Opala', 'Pérola', 'Granada', 'Água-marinha', 'Citrino',
    'Alexandrita', 'Tanzanita', 'Lápis-lazúli', 'Quartzo Rosa', 'Pedra da Lua',
    'Malaquita', 'Ônix', 'Coral', 'Zircônia', 'Zircão'
  ];

  const handleChange = (field: keyof PedidoStone, value: string | number | boolean) => {
    const updatedStone = { ...stone, [field]: value };

    // Se o campo alterado foi PTS e a lapidação é redonda, calcular largura automaticamente
    if (field === 'pts' && stone.lapidacao === 'Redonda' && value) {
      const ptsValue = parseFloat(value.toString());
      if (!isNaN(ptsValue) && ptsValue > 0) {
        const calculatedSize = convertPtsToSize(ptsValue);
        if (calculatedSize !== null) {
          updatedStone.largura = calculatedSize.toString();
          updatedStone.comprimento = calculatedSize.toString();
        }
      }
    }

    // Se a lapidação mudou para redonda e já tem PTS, recalcular largura
    if (field === 'lapidacao' && value === 'Redonda' && stone.pts) {
      const ptsValue = parseFloat(stone.pts.toString());
      if (!isNaN(ptsValue) && ptsValue > 0) {
        const calculatedSize = convertPtsToSize(ptsValue);
        if (calculatedSize !== null) {
          updatedStone.largura = calculatedSize.toString();
          updatedStone.comprimento = calculatedSize.toString();
        }
      }
    }

    // Se a lapidação é redonda, sincronizar largura e comprimento
    if (stone.lapidacao === 'Redonda' || value === 'Redonda') {
      if (field === 'largura') {
        updatedStone.comprimento = value.toString();
      } else if (field === 'comprimento') {
        updatedStone.largura = value.toString();
      }
    }

    onChange(index, updatedStone);
  };

  const handleSaveStone = () => {
    setSavedStone({ ...stone });
    setIsEditing(false);
    
    // Limpar campos e definir valores padrão
    const clearedStone: PedidoStone = {
      onde: '',
      tipo: 'Diamante',
      lapidacao: 'Redonda',
      quantidade: 0,
      largura: '',
      altura: '',
      comprimento: '',
      pts: '',
      quantidadeMaxima: undefined,
      noMaximo: false
    };
    
    onChange(index, clearedStone);
    alert('Pedra salva com sucesso!');
  };

  const handleEditStone = () => {
    if (savedStone) {
      onChange(index, savedStone);
      setIsEditing(true);
    }
  };

  // Validação corrigida: apenas campos obrigatórios, quantidade pode ser 0 (livre)
  const isFormValid = stone.onde.trim() && stone.tipo && stone.lapidacao && stone.largura && stone.comprimento;

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-medium">Pedra {index + 1}</h4>
        <div className="flex gap-2">
          {!isEditing && (
            <button
              type="button"
              onClick={handleEditStone}
              className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
            >
              <Edit size={16} />
              Editar
            </button>
          )}
          {isEditing && (
            <button
              type="button"
              onClick={handleSaveStone}
              disabled={!isFormValid}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <Save size={16} />
              Salvar Pedra
            </button>
          )}
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700"
          >
            <MinusCircle size={20} />
          </button>
        </div>
      </div>

      {/* Preview da pedra salva */}
      {!isEditing && savedStone && (
        <div 
          className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={handleEditStone}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div><strong>Onde:</strong> {savedStone.onde}</div>
            <div><strong>Tipo:</strong> {savedStone.tipo}</div>
            <div><strong>Lapidação:</strong> {savedStone.lapidacao}</div>
            <div><strong>Quantidade:</strong> {savedStone.quantidade === 0 ? 'Livre' : savedStone.quantidade}</div>
            <div><strong>Largura:</strong> {savedStone.largura}mm</div>
            <div><strong>Altura:</strong> {savedStone.altura || 'N/A'}</div>
            <div><strong>Comprimento:</strong> {savedStone.comprimento}mm</div>
            <div><strong>PTS:</strong> {savedStone.pts || 'N/A'}</div>
          </div>
          <div className="text-xs text-gray-500 mt-2">- Clique para editar</div>
        </div>
      )}
      
      {/* Formulário de edição */}
      {isEditing && (
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
            <div className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                id={`noMaximo-${index}`}
                checked={stone.noMaximo || false}
                onChange={(e) => handleChange('noMaximo', e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor={`noMaximo-${index}`} className="text-sm font-medium text-gray-700">
                No máximo
              </label>
            </div>
            {stone.noMaximo && (
              <input
                type="number"
                min="1"
                value={stone.quantidadeMaxima || ''}
                onChange={(e) => handleChange('quantidadeMaxima', Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                placeholder="Quantidade máxima"
              />
            )}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade
            </label>
            <input
              type="text"
              value={stone.quantidade === 0 ? 'Livre' : stone.quantidade}
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'Livre' || value === '') {
                  handleChange('quantidade', 0);
                } else {
                  const numValue = Number(value);
                  if (!isNaN(numValue)) {
                    handleChange('quantidade', numValue);
                  }
                }
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Livre"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PTS {stone.lapidacao === 'Redonda' && '(auto-calcula largura)'}
            </label>
            <input
              type="number"
              step="0.01"
              value={stone.pts}
              onChange={(e) => handleChange('pts', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder={stone.lapidacao === 'Redonda' ? 'Digite PTS para calcular largura' : 'PTS'}
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
              onChange={(e) => handleChange('largura', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              placeholder={stone.lapidacao === 'Redonda' ? 'Auto-calculado via PTS' : 'Largura'}
              readOnly={stone.lapidacao === 'Redonda' && !!stone.pts}
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
              readOnly={stone.lapidacao === 'Redonda'}
              placeholder={stone.lapidacao === 'Redonda' ? 'Igual ao diâmetro' : 'Comprimento'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PedidoStoneComponent;
