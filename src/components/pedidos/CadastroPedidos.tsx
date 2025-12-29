import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Loader2 } from 'lucide-react';
import { PedidoStone, ReferenciaModelo } from './types';
import PedidoStoneComponent from './components/PedidoStone';
import AroConfigSection, { AroConfig } from './components/AroConfigSection';
import ClienteAutocomplete from '../common/ClienteAutocomplete';
import { categoryOptions, categoriesWithAro } from '../form/formOptions';
import { SecondaryButton, PrimaryButton, SuccessButton } from '../buttons';
import { usePedidos } from './hooks/usePedidos';
import FormField from '../form/components/FormField';

const CadastroPedidos: React.FC = () => {
  const navigate = useNavigate();
  const { savePedido, loading } = usePedidos();
  
  const [nomeCliente, setNomeCliente] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [descricao, setDescricao] = useState('');
  const [aramado, setAramado] = useState(false);
  const [galeria, setGaleria] = useState(false);
  const [paraRender, setParaRender] = useState(false);
  const [dataPrevistaEntrega, setDataPrevistaEntrega] = useState('');
  const [semDataEntrega, setSemDataEntrega] = useState(false);
  const [stones, setStones] = useState<PedidoStone[]>([]);
  const [referenciaModelo, setReferenciaModelo] = useState<ReferenciaModelo>({
    rota: '',
    cliente: ''
  });
  const [aroConfig, setAroConfig] = useState<AroConfig>({
    tipoAro: '',
    alturaAro: '',
    comprimentoAro: '',
    proporcional: false,
    estrutura: 'macico',
    comPedra: false,
    tipoCravacao: '',
    quantidadeFileiras: 1
  });

  const showAroConfig = categoriesWithAro.includes(categoria);

  const addStone = () => {
    const newStone: PedidoStone = {
      onde: '', tipo: 'Diamante', lapidacao: 'Redonda', quantidade: 0,
      largura: '', altura: '', comprimento: '', pts: '',
      quantidadeMaxima: undefined, quantidadeMinima: undefined,
      tipoQuantidade: 'exata', tipoCravacao: ''
    };
    setStones([...stones, newStone]);
  };

  const removeStone = (index: number) => {
    setStones(stones.filter((_, i) => i !== index));
  };

  const updateStone = (index: number, updatedStone: PedidoStone) => {
    const newStones = [...stones];
    newStones[index] = updatedStone;
    setStones(newStones);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeCliente || !categoria || !descricao) {
      alert('Por favor, preencha todos os campos obrigatórios: Cliente, Categoria e Descrição.');
      return;
    }
    
    try {
      await savePedido({
        nomeCliente, categoria, tamanho, descricao, aramado, galeria, paraRender,
        dataCreated: new Date(),
        dataPrevistaEntrega: semDataEntrega ? undefined : (dataPrevistaEntrega ? new Date(dataPrevistaEntrega) : undefined),
        stones, referenciaModelo, riscado: false, prioridade: 1, aroConfig: showAroConfig ? aroConfig : undefined
      });
      alert('Pedido cadastrado com sucesso!');
      navigate('/lista-pedidos');
    } catch (err) {
      console.error('Erro ao cadastrar pedido:', err);
      alert('Erro ao cadastrar pedido. Tente novamente.');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Cadastro de Pedidos</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card de Informações Principais */}
        <div className="bg-white dark:bg-neutral-800/50 shadow-sm rounded-lg border border-neutral-200 dark:border-neutral-700/50">
          <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-700/50">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Informações do Pedido</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Nome Cliente <span className="text-danger-light">*</span>
                </label>
                <ClienteAutocomplete value={nomeCliente} onChange={setNomeCliente} required />
              </div>
              
              <FormField label="Categoria" id="categoria" name="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} required options={categoryOptions} />
              {showAroConfig && (
                <div className="sm:col-span-2">
                  <AroConfigSection
                    config={aroConfig}
                    onChange={setAroConfig}
                    className="mt-2"
                  />
                </div>
              )}
              <FormField label="Tamanho" id="tamanho" name="tamanho" type="text" value={tamanho} onChange={(e) => setTamanho(e.target.value)} />
              
              <div className="sm:col-span-2">
                <FormField label="Data Prevista de Entrega" id="dataPrevistaEntrega" name="dataPrevistaEntrega" type="date" value={dataPrevistaEntrega} onChange={(e) => setDataPrevistaEntrega(e.target.value)} readOnly={semDataEntrega} />
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="semData" checked={semDataEntrega} onChange={(e) => { setSemDataEntrega(e.target.checked); if (e.target.checked) setDataPrevistaEntrega(''); }} className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary-light" />
                  <label htmlFor="semData" className="text-sm text-neutral-600 dark:text-neutral-300">Sem data definida</label>
                </div>
              </div>

              <div className="sm:col-span-2">
                <FormField label="Descrição" id="descricao" name="descricao" isTextArea rows={4} value={descricao} onChange={(e) => setDescricao(e.target.value)} required placeholder="Detalhes do pedido, medidas, etc." />
              </div>

              <div className="sm:col-span-2 flex items-center gap-6 pt-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <input id="aramado" type="checkbox" checked={aramado} onChange={(e) => setAramado(e.target.checked)} className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary-light" />
                    <label htmlFor="aramado" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Aramado</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="galeria" type="checkbox" checked={galeria} onChange={(e) => setGaleria(e.target.checked)} className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary-light" />
                    <label htmlFor="galeria" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Galeria</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="paraRender" type="checkbox" checked={paraRender} onChange={(e) => setParaRender(e.target.checked)} className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary-light" />
                    <label htmlFor="paraRender" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Para Render</label>
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Pedras */}
        <div className="bg-white dark:bg-neutral-800/50 shadow-sm rounded-lg border border-neutral-200 dark:border-neutral-700/50">
          <div className="p-4 sm:p-6 flex justify-between items-center border-b border-neutral-200 dark:border-neutral-700/50">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Pedras</h2>
            <SuccessButton type="button" onClick={addStone} size="sm" className="flex items-center gap-2">
              <PlusCircle size={16} /> Adicionar
            </SuccessButton>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {stones.length > 0 ? stones.map((stone, index) => (
              <PedidoStoneComponent key={index} index={index} stone={stone} onRemove={removeStone} onChange={updateStone} />
            )) : <p className="text-sm text-center text-neutral-500 py-4">Nenhuma pedra adicionada.</p>}
          </div>
        </div>

        {/* Card de Referência */}
        <div className="bg-white dark:bg-neutral-800/50 shadow-sm rounded-lg border border-neutral-200 dark:border-neutral-700/50">
          <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-700/50">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Referência do Modelo (Opcional)</h2>
          </div>
          <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField label="Rota" id="refRota" name="refRota" type="text" value={referenciaModelo.rota} onChange={(e) => setReferenciaModelo({ ...referenciaModelo, rota: e.target.value })} placeholder="Ex: /joias/AN-001"/>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Cliente</label>
              <ClienteAutocomplete value={referenciaModelo.cliente} onChange={(value) => setReferenciaModelo({ ...referenciaModelo, cliente: value })} placeholder="Cliente de referência" />
            </div>
          </div>
        </div>

        {/* Ações do Formulário */}
        <div className="flex justify-end gap-4 pt-4">
          <SecondaryButton type="button" onClick={() => navigate('/lista-pedidos')} disabled={loading}>
            Cancelar
          </SecondaryButton>
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</> : 'Salvar Pedido'}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default CadastroPedidos;
