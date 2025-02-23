import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

/** Objeto com classes de estilo para o componente */
export const classes = {
  container: 'bg-gray-50 p-4 rounded-md mb-4',
  header: 'flex justify-between items-center mb-4',
  headerTitle: 'text-sm font-medium text-gray-900',
  removeButton: 'text-red-600 hover:text-red-700',
  gridMain: 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4',
  label: 'block text-sm font-medium text-gray-700',
  input:
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
  gridPTS: 'mt-4 grid grid-cols-1 gap-4 md:grid-cols-2',
  gridDimensions: 'mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
  halfWidth: 'w-1/2',
  viewMode: 'space-y-2', // Adicionado para o modo de visualização 
};
export const EditButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 15px;
  font-size: 14px;
  color: brown;
  background: linear-gradient(to right, #fad2a4, #f6cda0, #ca9674);
  border: none;
  border-radius: 7px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px rgba(250, 210, 164, 0.5);
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    transform: skewX(-45deg);
    transition: left 0.5s ease;
    z-index: -1;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(250, 210, 164, 0.7);
  }

  &:hover::before {
    left: 100%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(202, 150, 116, 0.5);
  }
`;

export const SaveButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 15px;
  font-size: 14px;
  color: brown;
  background: linear-gradient(to right, #fad2a4, #f6cda0, #ca9674);
  border: none;
  border-radius: 7px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px rgba(250, 210, 164, 0.5);
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    transform: skewX(-45deg);
    transition: left 0.5s ease;
    z-index: -1;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(250, 210, 164, 0.7);
  }

  &:hover::before {
    left: 100%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(202, 150, 116, 0.5);
  }
`;

export interface Stone {
  stone_type: string;
  cut: string;
  quantity: number;
  quilates?: number;
  pts?: number;
  largura?: string;
  altura?: string;
  comprimento?: string;
}

/** Interface para o hook com toda a lógica do componente Pedra */
export interface PedraLogic {
  tipo: string;
  lapidacao: string;
  quantidade: number;
  quilates: string;
  largura: string;
  altura: string;
  comprimento: string;
  pts: string;
  saved: boolean;
  isViewMode: boolean; // Adicionado para controlar o modo de visualização
  handleTipoChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleLapidacaoChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleQuantidadeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleQuilatesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePtsChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLarguraChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleComprimentoChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAlturaChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  handleEdit: () => void; // Adicionado para alternar para o modo de edição
  dimensionsWithUnit: string;
}

/**
 * Hook que encapsula toda a lógica e os _handlers_ do componente Pedra.
 * Aqui ficam os estados e as funções que manipulam os campos.
 */
export const usePedraLogic = (initialStone?: Stone ): PedraLogic => {
  const [tipo, setTipo] = useState(initialStone?.stone_type || 'Diamante');
  const [lapidacao, setLapidacao] = useState(initialStone?.cut || 'Redonda');
  const [quantidade, setQuantidade] = useState(initialStone?.quantity || 1);
  const [quilates, setQuilates] = useState(initialStone?.quilates?.toString() || '');
  const [largura, setLargura] = useState(initialStone?.largura || '');
  const [altura, setAltura] = useState(initialStone?.altura || '');
  const [comprimento, setComprimento] = useState(initialStone?.comprimento || '');
  const [pts, setPts] = useState(initialStone?.pts?.toString() || '');
  const [saved, setSaved] = useState(false);
  const [isViewMode, setIsViewMode] = useState(!!initialStone); // Inicia no modo de visualização se houver dados iniciais

  const tiposDePedra = [
    'Diamante',
    'Safira',
    'Rubi',
    'Esmeralda',
    'Topázio',
    'Ametista',
    'Turmalina',
    'Opala',
    'Pérola',
    'Granada',
    'Água-marinha',
    'Citrino',
    'Alexandrita',
    'Tanzanita',
    'Lápis-lazúli',
    'Quartzo Rosa',
    'Pedra da Lua',
    'Malaquita',
    'Ônix',
    'Coral',
    'Zircônia',
    'Zircão',
  ];

  const formatQuilates = (value: string): string => {
    const number = parseFloat(value);
    if (isNaN(number)) return '';
    return number.toFixed(2);
  };

  const handleTipoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTipo(e.target.value);
  };

  const handleLapidacaoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const novoValor = e.target.value;
    setLapidacao(novoValor);
    if (novoValor === 'Redonda' || novoValor === 'Quadrada') {
      if (largura) {
        setComprimento(largura);
      } else if (comprimento) {
        setLargura(comprimento);
      }
    }
  };

  const handleQuantidadeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantidade = Number(e.target.value);
    setQuantidade(newQuantidade);
    if (pts) {
      const quilatesValue = ((parseFloat(pts) / 100) * newQuantidade).toString();
      setQuilates(formatQuilates(quilatesValue));
    }
  };

  const handleQuilatesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuilates(formatQuilates(value));
  };

  const handlePtsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPts(value);
    if (value) {
      const quilatesValue = ((parseFloat(value) / 100) * quantidade).toString();
      setQuilates(formatQuilates(quilatesValue));
    } else {
      setQuilates('');
    }
  };

  const handleLarguraChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLargura(value);
    if (lapidacao === 'Redonda' || lapidacao === 'Quadrada') {
      setComprimento(value);
    }
  };

  const handleComprimentoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setComprimento(value);
    if (lapidacao === 'Redonda' || lapidacao === 'Quadrada') {
      setLargura(value);
    }
  };

  const handleAlturaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAltura(e.target.value);
  };

  const handleSave = () => {
    setSaved(true);
    setIsViewMode(true); // Alternar para o modo de visualização após salvar
  };

  const handleEdit = () => {
    setIsViewMode(false); // Alternar para o modo de edição
  };

  const dimensionsArray = [largura, comprimento, altura].filter(
    (val) => val.trim() !== ''
  );
  const dimensionsWithUnit =
    dimensionsArray.length > 0 ? dimensionsArray.join(' x ') + ' mm' : '';

  return {
    tipo,
    lapidacao,
    quantidade,
    quilates,
    largura,
    altura,
    comprimento,
    pts,
    saved,
    isViewMode, // Adicionado ao retorno
    handleTipoChange,
    handleLapidacaoChange,
    handleQuantidadeChange,
    handleQuilatesChange,
    handlePtsChange,
    handleLarguraChange,
    handleComprimentoChange,
    handleAlturaChange,
    handleSave,
    handleEdit, // Adicionado ao retorno
    dimensionsWithUnit,
  };
};