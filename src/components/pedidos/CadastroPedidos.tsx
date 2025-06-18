import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Upload } from 'lucide-react';
import { Pedido, PedidoStone, ReferenciaModelo } from './types';
import PedidoStoneComponent from './components/PedidoStone';
import { categoryOptions } from '../form/formOptions';
import { SecondaryButton, PrimaryButton, SuccessButton } from '../buttons';

const CadastroPedidos: React.FC = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string>('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [descricao, setDescricao] = useState('');
  const [aramado, setAramado] = useState(false);
  const [galeria, setGaleria] = useState(false);
  const [paraRender, setParaRender] = useState(false);
  const [dataPrevistaEntrega, setDataPrevistaEntrega] = useState('');
  const [stones, setStones] = useState<PedidoStone[]>([]);
  const [referenciaModelo, setReferenciaModelo] = useState<ReferenciaModelo>({
    rota: '',
    cliente: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addStone = () => {
    const newStone: PedidoStone = {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Obter pedidos existentes para calcular a próxima prioridade
    const pedidosExistentes = JSON.parse(localStorage.getItem('pedidos') || '[]');
    const proximaPrioridade = pedidosExistentes.length + 1;
    
    const novoPedido: Pedido = {
      id: Date.now().toString(),
      imagem: imagePreview,
      nomeCliente,
      categoria,
      tamanho,
      descricao,
      aramado,
      galeria,
      paraRender,
      dataCreated: new Date(),
      dataPrevistaEntrega: dataPrevistaEntrega ? new Date(dataPrevistaEntrega) : undefined,
      stones,
      referenciaModelo,
      riscado: false,
      prioridade: proximaPrioridade
    };

    // Salvar no localStorage por enquanto
    pedidosExistentes.push(novoPedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidosExistentes));

    alert('Pedido cadastrado com sucesso!');
    navigate('/lista-pedidos');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Cadastro de Pedidos</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Upload de Imagem */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Imagem do Pedido</h2>
          <div className="flex items-center gap-4">
            {imagePreview && (
              <div className="w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <SecondaryButton as="div" className="flex items-center gap-2">
                <Upload size={20} />
                {imagePreview ? 'Trocar Imagem' : 'Adicionar Imagem'}
              </SecondaryButton>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Informações Básicas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Informações do Pedido</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Cliente *
              </label>
              <input
                type="text"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria *
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tamanho *
              </label>
              <input
                type="text"
                value={tamanho}
                onChange={(e) => setTamanho(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Prevista de Entrega
              </label>
              <input
                type="date"
                value={dataPrevistaEntrega}
                onChange={(e) => setDataPrevistaEntrega(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição *
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          {/* Checkboxes */}
          <div className="mt-4 flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={aramado}
                onChange={(e) => setAramado(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700">Aramado</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={galeria}
                onChange={(e) => setGaleria(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700">Galeria</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={paraRender}
                onChange={(e) => setParaRender(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700">Para Render</span>
            </label>
          </div>
        </div>

        {/* Pedras */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Pedras</h2>
            <SuccessButton type="button" onClick={addStone} className="flex items-center gap-2">
              <PlusCircle size={16} />
              Adicionar Pedra
            </SuccessButton>
          </div>
          
          {stones.map((stone, index) => (
            <PedidoStoneComponent
              key={index}
              index={index}
              stone={stone}
              onRemove={removeStone}
              onChange={updateStone}
            />
          ))}
        </div>

        {/* Referência do Modelo */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Referência do Modelo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rota
              </label>
              <input
                type="text"
                value={referenciaModelo.rota}
                onChange={(e) => setReferenciaModelo({
                  ...referenciaModelo,
                  rota: e.target.value
                })}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cliente
              </label>
              <input
                type="text"
                value={referenciaModelo.cliente}
                onChange={(e) => setReferenciaModelo({
                  ...referenciaModelo,
                  cliente: e.target.value
                })}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4">
          <SecondaryButton
            type="button"
            onClick={() => navigate('/lista-pedidos')}
          >
            Cancelar
          </SecondaryButton>
          <PrimaryButton type="submit">
            Salvar Pedido
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default CadastroPedidos;