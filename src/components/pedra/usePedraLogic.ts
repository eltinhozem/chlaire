
import { useState, ChangeEvent, useEffect } from 'react';
import { Stone, PedraLogic } from './types';

// Constantes para cálculo de peso
const LAPIDACAO_CONSTANTS = {
  'Redonda': 0.0061,
  'Quadrada': 0.0080,
  'Oval': 0.0061,
  'Gota': 0.0059,
  'Navete': 0.0057,
  'Esmeralda': 0.0075,
  'Princesa': 0.0080,
  'Almofada': 0.0080, // Esmeralda quadrada
};

const GRAVIDADE_ESPECIFICA = {
  'Diamante': 3.52,
  'Safira': 4.00,
  'Rubi': 4.00,
  'Esmeralda': 2.72,
  'Topázio': 3.53,
  'Ametista': 2.65,
  'Turmalina': 3.10,
  'Opala': 2.10,
  'Pérola': 2.70,
  'Granada': 3.95,
  'Água-marinha': 2.72,
  'Citrino': 2.65,
  'Alexandrita': 3.73,
  'Tanzanita': 3.35,
  'Lápis-lazúli': 2.80,
  'Quartzo Rosa': 2.65,
  'Pedra da Lua': 2.58,
  'Malaquita': 3.80,
  'Ônix': 2.65,
  'Coral': 2.60,
  'Zircônia': 5.65,
  'Zircão': 4.65,
};

export const usePedraLogic = (initialStone?: Stone): PedraLogic => {
  const [tipo, setTipo] = useState(initialStone?.stone_type || 'Diamante');
  const [lapidacao, setLapidacao] = useState(initialStone?.cut || 'Redonda');
  const [quantidade, setQuantidade] = useState(initialStone?.quantity || 1);
  const [quilates, setQuilates] = useState(initialStone?.quilates?.toString() || '');
  const [largura, setLargura] = useState(initialStone?.largura || '');
  const [altura, setAltura] = useState(initialStone?.altura || '');
  const [comprimento, setComprimento] = useState(initialStone?.comprimento || '');
  const [pts, setPts] = useState(initialStone?.pts?.toString() || '');
  const [isViewMode, setIsViewMode] = useState(false); // Sempre começa em modo de edição

  // Função para calcular quilates baseado nas dimensões
  const calcularQuilates = (comp: string, larg: string, alt: string, tipoPedra: string, tipoLapidacao: string) => {
    if (!comp || !larg || !tipoPedra || !tipoLapidacao) return '';
    
    // Para lapidação redonda, a altura é opcional - se não informada, usa uma estimativa padrão
    if (tipoLapidacao === 'Redonda' && !alt) {
      // Para diamantes redondos, a altura é tipicamente 60% do diâmetro
      const diametro = parseFloat(larg);
      if (!isNaN(diametro)) {
        alt = (diametro * 0.6).toString();
      } else {
        return '';
      }
    } else if (tipoLapidacao !== 'Redonda' && !alt) {
      return '';
    }
    
    const comprimentoNum = parseFloat(comp);
    const larguraNum = parseFloat(larg);
    const alturaNum = parseFloat(alt);
    
    if (isNaN(comprimentoNum) || isNaN(larguraNum) || isNaN(alturaNum)) return '';
    
    const constante = LAPIDACAO_CONSTANTS[tipoLapidacao as keyof typeof LAPIDACAO_CONSTANTS];
    const gravidadeEspecifica = GRAVIDADE_ESPECIFICA[tipoPedra as keyof typeof GRAVIDADE_ESPECIFICA];
    
    if (!constante || !gravidadeEspecifica) return '';
    
    const peso = comprimentoNum * larguraNum * alturaNum * constante * gravidadeEspecifica;
    return peso.toFixed(3);
  };

  const handleTipoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const novoTipo = e.target.value;
    setTipo(novoTipo);
    
    // Recalcular quilates se houver dimensões
    if (largura && comprimento && (altura || lapidacao === 'Redonda')) {
      const novosQuilates = calcularQuilates(comprimento, largura, altura, novoTipo, lapidacao);
      setQuilates(novosQuilates);
      if (novosQuilates) {
        setPts((parseFloat(novosQuilates) * 100).toFixed(2));
      }
    }
  };

  const handleLapidacaoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const novaLapidacao = e.target.value;
    setLapidacao(novaLapidacao);
    
    if (novaLapidacao === 'Redonda' || novaLapidacao === 'Quadrada') {
      // Se já houver uma largura definida, sincronize o comprimento imediatamente
      if (largura) setComprimento(largura);
    }
    
    // Recalcular quilates se houver dimensões
    if (largura && comprimento && (altura || novaLapidacao === 'Redonda')) {
      const novosQuilates = calcularQuilates(comprimento, largura, altura, tipo, novaLapidacao);
      setQuilates(novosQuilates);
      if (novosQuilates) {
        setPts((parseFloat(novosQuilates) * 100).toFixed(2));
      }
    }
  };

  const handleQuantidadeChange = (e: ChangeEvent<HTMLInputElement>) => setQuantidade(Number(e.target.value));

  const handleQuilatesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const novosQuilates = e.target.value;
    setQuilates(novosQuilates);
    
    // Calcular PTS automaticamente (quilates × 100)
    if (novosQuilates) {
      setPts((parseFloat(novosQuilates) * 100).toFixed(2));
    } else {
      setPts('');
    }
  };

  const handlePtsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const novoPts = e.target.value;
    setPts(novoPts);

    // Cálculo automático do quilates (pts ÷ 100)
    if (novoPts) {
      const quilatesCalculados = (parseFloat(novoPts) / 100).toFixed(3);
      setQuilates(quilatesCalculados);
    } else {
      setQuilates('');
    }
  };

  const handleLarguraChange = (e: ChangeEvent<HTMLInputElement>) => {
    const novaLargura = e.target.value;
    setLargura(novaLargura);

    // Sincroniza comprimento automaticamente
    if (lapidacao === 'Redonda' || lapidacao === 'Quadrada') {
      setComprimento(novaLargura);
    }
    
    // Recalcular quilates se houver todas as dimensões necessárias
    if (novaLargura && (comprimento || lapidacao === 'Redonda' || lapidacao === 'Quadrada') && (altura || lapidacao === 'Redonda')) {
      const compFinal = (lapidacao === 'Redonda' || lapidacao === 'Quadrada') ? novaLargura : comprimento;
      const novosQuilates = calcularQuilates(compFinal, novaLargura, altura, tipo, lapidacao);
      setQuilates(novosQuilates);
      if (novosQuilates) {
        setPts((parseFloat(novosQuilates) * 100).toFixed(2));
      }
    }
  };

  const handleComprimentoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const novoComprimento = e.target.value;
    setComprimento(novoComprimento);

    // Sincroniza largura automaticamente
    if (lapidacao === 'Redonda' || lapidacao === 'Quadrada') {
      setLargura(novoComprimento);
    }
    
    // Recalcular quilates se houver todas as dimensões necessárias
    if (novoComprimento && (largura || lapidacao === 'Redonda' || lapidacao === 'Quadrada') && (altura || lapidacao === 'Redonda')) {
      const largFinal = (lapidacao === 'Redonda' || lapidacao === 'Quadrada') ? novoComprimento : largura;
      const novosQuilates = calcularQuilates(novoComprimento, largFinal, altura, tipo, lapidacao);
      setQuilates(novosQuilates);
      if (novosQuilates) {
        setPts((parseFloat(novosQuilates) * 100).toFixed(2));
      }
    }
  };

  const handleAlturaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const novaAltura = e.target.value;
    setAltura(novaAltura);
    
    // Recalcular quilates se houver todas as dimensões necessárias
    if (largura && comprimento && (novaAltura || lapidacao === 'Redonda')) {
      const novosQuilates = calcularQuilates(comprimento, largura, novaAltura, tipo, lapidacao);
      setQuilates(novosQuilates);
      if (novosQuilates) {
        setPts((parseFloat(novosQuilates) * 100).toFixed(2));
      }
    }
  };

  const handleSave = () => setIsViewMode(true);
  const handleEdit = () => setIsViewMode(false);

  // Mantém campos sincronizados se lapidação mudar depois dos valores definidos:
  useEffect(() => {
    if (lapidacao === 'Redonda' || lapidacao === 'Quadrada') {
      if (largura && comprimento !== largura) {
        setComprimento(largura);
      }
    }
  }, [lapidacao, largura, comprimento]);

  return {
    tipo,
    lapidacao,
    quantidade,
    quilates,
    largura,
    altura,
    comprimento,
    pts,
    isViewMode,
    handleTipoChange,
    handleLapidacaoChange,
    handleQuantidadeChange,
    handleQuilatesChange,
    handlePtsChange,
    handleLarguraChange,
    handleComprimentoChange,
    handleAlturaChange,
    handleSave,
    handleEdit,
  };
};
