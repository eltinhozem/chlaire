import { useState, ChangeEvent, useEffect } from 'react';
import { Stone, PedraLogic } from './types';

export const usePedraLogic = (initialStone?: Stone): PedraLogic => {
  const [tipo, setTipo] = useState(initialStone?.stone_type || 'Diamante');
  const [lapidacao, setLapidacao] = useState(initialStone?.cut || 'Redonda');
  const [quantidade, setQuantidade] = useState(initialStone?.quantity || 1);
  const [quilates, setQuilates] = useState(initialStone?.quilates?.toString() || '');
  const [largura, setLargura] = useState(initialStone?.largura || '');
  const [altura, setAltura] = useState(initialStone?.altura || '');
  const [comprimento, setComprimento] = useState(initialStone?.comprimento || '');
  const [pts, setPts] = useState(initialStone?.pts?.toString() || '');
  const [isViewMode, setIsViewMode] = useState(!!initialStone);

  const handleTipoChange = (e: ChangeEvent<HTMLSelectElement>) => setTipo(e.target.value);

  const handleLapidacaoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const novaLapidacao = e.target.value;
    setLapidacao(novaLapidacao);
    
    if (novaLapidacao === 'Redonda' || novaLapidacao === 'Quadrada') {
      // Se já houver uma largura definida, sincronize o comprimento imediatamente
      if (largura) setComprimento(largura);
    }
  };

  const handleQuantidadeChange = (e: ChangeEvent<HTMLInputElement>) => setQuantidade(Number(e.target.value));

  const handleQuilatesChange = (e: ChangeEvent<HTMLInputElement>) => setQuilates(e.target.value);

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
  };

  const handleComprimentoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const novoComprimento = e.target.value;
    setComprimento(novoComprimento);

    // Sincroniza largura automaticamente
    if (lapidacao === 'Redonda' || lapidacao === 'Quadrada') {
      setLargura(novoComprimento);
    }
  };

  const handleAlturaChange = (e: ChangeEvent<HTMLInputElement>) => setAltura(e.target.value);

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
