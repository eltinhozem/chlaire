import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, Calendar, Circle, Square, Egg, Droplet, Diamond, Gem, Heart, Hexagon } from 'lucide-react';
import { getDeliveryStatusColor, getDeliveryStatusText } from './utils/dateUtils';
import { usePedidos } from './hooks/usePedidos';
import PositionModal from './components/PositionModal';

const ListaPedidos: React.FC = () => {
  const navigate = useNavigate();
  const { pedidos, loading, updatePedido, deletePedido, updatePrioridades } = usePedidos();
  const [positionModal, setPositionModal] = useState<{
    isOpen: boolean;
    pedidoId: string;
    currentPosition: number;
    pedidoName: string;
  }>({
    isOpen: false,
    pedidoId: '',
    currentPosition: 0,
    pedidoName: ''
  });

  const getLapidacaoIcon = (lapidacao: string) => {
    switch (lapidacao.toLowerCase()) {
      case 'redonda':
        return <Circle size={32} className="text-blue-500" />;
      case 'quadrada':
        return <Square size={32} className="text-green-500" />;
      case 'oval':
        return <Egg size={32} className="text-purple-500" />;
      case 'gota':
        return <Droplet size={32} className="text-cyan-500" />;
      case 'navete':
        return <Diamond size={32} className="text-amber-500" />;
      case 'esmeralda':
      case 'esmeralda quadrada':
        return <Hexagon size={32} className="text-emerald-500" />;
      case 'princesa':
        return <Square size={32} className="text-pink-500" />;
      case 'coração':
        return <Heart size={32} className="text-red-500" />;
      default:
        return <Gem size={32} className="text-gray-500" />;
    }
  };

  const changePosition = async (pedidoId: string, newPosition: number) => {
    const pedidoIndex = pedidos.findIndex(p => p.id === pedidoId);
    if (pedidoIndex === -1) return;

    const reorderedPedidos = [...pedidos];
    const [movedPedido] = reorderedPedidos.splice(pedidoIndex, 1);
    reorderedPedidos.splice(newPosition - 1, 0, movedPedido);

    try {
      await updatePrioridades(reorderedPedidos);
    } catch (error) {
      console.error('Erro ao alterar posição:', error);
    }
  };

  const riscarPedido = async (id: string) => {
    const index = pedidos.findIndex(p => p.id === id);
    if (index === -1) return;
    const pedido = pedidos[index];

    try {
      if (!pedido.riscado) {
        const maxPrioridade = pedidos.reduce((max, p) => Math.max(max, p.prioridade), 0);
        await updatePedido(id, { riscado: true, prioridade: maxPrioridade + 1 });
      } else {
        await updatePedido(id, { riscado: false });
      }
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
    }
  };

  const excluirPedido = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      try {
        await deletePedido(id);
      } catch (error) {
        console.error('Erro ao excluir pedido:', error);
      }
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleString('pt-BR');
  };

  const getCategoryLabel = (value: string) => {
    const categoryMap: { [key: string]: string } = {
      "": "Não selecionado",
      "ring": "Anel",
      "wedding_ring": "Aliança",
      "meia_alianca": "Meia Aliança",
      "pendant": "Pingente",
      "earring": "Brinco",
      "necklace": "Colar",
      "bracelet": "Pulseira",
      "brooch": "Broche",
      "rivi": "Rivieira"
    };
    return categoryMap[value] || value;
  };

  const getQuantidadeDisplay = (stone: any) => {
    if (stone.tipoQuantidade === 'maximo') {
      return `No máximo ${stone.quantidade}`;
    } else if (stone.tipoQuantidade === 'minimo') {
      return `No mínimo ${stone.quantidade}`;
    } else {
      return stone.quantidade === 0 ? 'Livre' : stone.quantidade;
    }
  };

  const getTamanhoDisplay = (stone: any) => {
    const largura = stone.largura || '0';
    const comprimento = stone.comprimento || '0';
    const altura = stone.altura || '0';
    return `${largura} x ${comprimento} x ${altura}`;
  };

  const handlePositionClick = (pedidoId: string, currentPosition: number, pedidoName: string) => {
    setPositionModal({
      isOpen: true,
      pedidoId,
      currentPosition,
      pedidoName
    });
  };

  const handlePositionSave = (newPosition: number) => {
    changePosition(positionModal.pedidoId, newPosition);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Carregando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Lista de Pedidos</h1>
        <button
          onClick={() => navigate('/cadastro-pedidos')}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <PlusCircle size={16} />
          Novo Pedido
        </button>
      </div>

      {pedidos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum pedido encontrado</p>
          <button
            onClick={() => navigate('/cadastro-pedidos')}
            className="mt-4 text-blue-500 hover:text-blue-600"
          >
            Criar seu primeiro pedido
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {pedidos.map((pedido, index) => (
              <div
                key={pedido.id}
                className={`bg-white rounded-lg shadow border-l-4 ${
                  pedido.riscado 
                    ? 'border-l-red-500 opacity-60' 
                    : getDeliveryStatusColor(pedido.dataPrevistaEntrega)
                } p-4 transition-all duration-200`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3 flex-1">
                    {/* Número da Posição Clicável */}
                    <button
                      onClick={() => handlePositionClick(pedido.id, index + 1, pedido.nomeCliente)}
                      disabled={pedido.riscado}
                      className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                        pedido.riscado 
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                          : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
                      }`}
                    >
                      {index + 1}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {pedido.imagem && (
                          <img
                            src={pedido.imagem}
                            alt="Pedido"
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h3 className={`text-lg font-semibold ${
                            pedido.riscado ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}>
                            {pedido.nomeCliente}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {formatDate(pedido.dataCreated)}
                          </p>
                          {/* Data prevista de entrega */}
                          {pedido.dataPrevistaEntrega && (
                            <div className="flex items-center gap-1 mt-1">
                              <Calendar size={12} className="text-gray-400" />
                              <span className="text-xs text-gray-600">
                                Entrega: {formatDate(pedido.dataPrevistaEntrega)}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                pedido.riscado ? 'bg-gray-100 text-gray-500' : 
                                getDeliveryStatusText(pedido.dataPrevistaEntrega).includes('Vencido') ? 'bg-red-100 text-red-700' :
                                getDeliveryStatusText(pedido.dataPrevistaEntrega).includes('hoje') || 
                                getDeliveryStatusText(pedido.dataPrevistaEntrega).includes('amanhã') ? 'bg-red-100 text-red-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {getDeliveryStatusText(pedido.dataPrevistaEntrega)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm mb-3">
                        <div>
                          <span className="font-medium text-gray-700">Categoria:</span>
                          <span className={`ml-2 ${pedido.riscado ? 'line-through' : ''}`}>
                            {getCategoryLabel(pedido.categoria)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Tamanho:</span>
                          <span className={`ml-2 ${pedido.riscado ? 'line-through' : ''}`}>
                            {pedido.tamanho}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Pedras:</span>
                          <span className={`ml-2 ${pedido.riscado ? 'line-through' : ''}`}>
                            {pedido.stones.length}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <span className="font-medium text-gray-700">Descrição:</span>
                        <p className={`text-sm text-gray-600 mt-1 ${
                          pedido.riscado ? 'line-through' : ''
                        }`}>
                          {pedido.descricao}
                        </p>
                      </div>

                      {/* Informações das Pedras em Colunas */}
                      {pedido.stones.length > 0 && (
                        <div className="mb-3">
                          <span className="font-medium text-gray-700 mb-2 block">Detalhes das Pedras:</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {pedido.stones.map((stone, index) => (
                              <div key={index} className={`bg-gray-50 p-2 rounded-lg border ${
                                pedido.riscado ? 'opacity-60' : ''
                              }`}>
                                <div className="flex items-center gap-2 mb-2">
                                  {getLapidacaoIcon(stone.lapidacao)}
                                  <span className="font-semibold text-base text-gray-800">
                                    Pedra {index + 1}
                                  </span>
                                </div>
                                <div className="space-y-1 text-base">
                                  <div><strong>Onde:</strong> {stone.onde || 'N/A'}</div>
                                  <div><strong>Tipo:</strong> {stone.tipo || 'N/A'}</div>
                                  <div><strong>Lapidação:</strong> {stone.lapidacao}</div>
                                  <div><strong>Qtd:</strong> {getQuantidadeDisplay(stone)}</div>
                                  <div><strong>Tamanho:</strong> {getTamanhoDisplay(stone)}mm</div>
                                  <div><strong>PTS:</strong> {stone.pts || 'N/A'}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-2 mb-2">
                        {pedido.aramado && (
                          <span className={`text-xs px-2 py-1 rounded ${
                            pedido.riscado 
                              ? 'bg-gray-100 text-gray-500' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            Aramado
                          </span>
                        )}
                        {pedido.galeria && (
                          <span className={`text-xs px-2 py-1 rounded ${
                            pedido.riscado 
                              ? 'bg-gray-100 text-gray-500' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            Galeria
                          </span>
                        )}
                        {pedido.paraRender && (
                          <span className={`text-xs px-2 py-1 rounded ${
                            pedido.riscado 
                              ? 'bg-gray-100 text-gray-500' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            Para Render
                          </span>
                        )}
                      </div>

                      {/* Referência do Modelo */}
                      {(pedido.referenciaModelo.rota || pedido.referenciaModelo.cliente) && (
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Referência:</span>
                          <span className={`ml-2 ${pedido.riscado ? 'line-through' : ''}`}>
                            {pedido.referenciaModelo.rota && `Rota: ${pedido.referenciaModelo.rota}`}
                            {pedido.referenciaModelo.rota && pedido.referenciaModelo.cliente && ' | '}
                            {pedido.referenciaModelo.cliente && `Cliente: ${pedido.referenciaModelo.cliente}`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => riscarPedido(pedido.id)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        pedido.riscado
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {pedido.riscado ? 'Restaurar' : 'Concluir'}
                    </button>
                    
                    <button
                      onClick={() => excluirPedido(pedido.id)}
                      className="px-3 py-2 bg-gray-500 text-white rounded-md text-sm font-medium hover:bg-gray-600 flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <PositionModal
            isOpen={positionModal.isOpen}
            onClose={() => setPositionModal(prev => ({ ...prev, isOpen: false }))}
            currentPosition={positionModal.currentPosition}
            totalPedidos={pedidos.length}
            onSave={handlePositionSave}
            pedidoName={positionModal.pedidoName}
          />
        </>
      )}
    </div>
  );
};

export default ListaPedidos;