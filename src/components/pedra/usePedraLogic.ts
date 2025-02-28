import { useState, ChangeEvent } from 'react';
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
  //const [tipo_cravacao, setTipoCravacao] = useState(initialStone?.tipo_cravacao || '');
  const [isViewMode, setIsViewMode] = useState(!!initialStone);

  const handleTipoChange = (e: ChangeEvent<HTMLSelectElement>) => setTipo(e.target.value);
  const handleLapidacaoChange = (e: ChangeEvent<HTMLSelectElement>) => setLapidacao(e.target.value);
  const handleQuantidadeChange = (e: ChangeEvent<HTMLInputElement>) => setQuantidade(Number(e.target.value));
  const handleQuilatesChange = (e: ChangeEvent<HTMLInputElement>) => setQuilates(e.target.value);
  const handlePtsChange = (e: ChangeEvent<HTMLInputElement>) => setPts(e.target.value);
  const handleLarguraChange = (e: ChangeEvent<HTMLInputElement>) => setLargura(e.target.value);
  const handleComprimentoChange = (e: ChangeEvent<HTMLInputElement>) => setComprimento(e.target.value);
  const handleAlturaChange = (e: ChangeEvent<HTMLInputElement>) => setAltura(e.target.value);
 // const handleTipoCravacaoChange = (e: ChangeEvent<HTMLSelectElement>) => setTipoCravacao(e.target.value);

  const handleSave = () => setIsViewMode(true);
  const handleEdit = () => setIsViewMode(false);

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
   // handleTipoCravacaoChange,
    handleSave,
    handleEdit,
  };
};