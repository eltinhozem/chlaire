import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, GripVertical, Calendar } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { getDeliveryStatusColor, getDeliveryStatusText } from './utils/dateUtils';
import { usePedidos } from './hooks/usePedidos';

const ListaPedidos: React.FC = () => {
  const navigate = useNavigate();
  const { pedidos, loading, updatePedido, deletePedido, updatePrioridades } = usePedidos();

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(pedidos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    try {
      await updatePrioridades(items);
    } catch (error) {
      console.error('Erro ao reordenar pedidos:', error);
    }
  };

  const riscarPedido = async (id: string) => {
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return;

    try {
      await updatePedido(id, { riscado: !pedido.riscado });
    } catch (error) {
      console.error('Erro ao riscar pedido:', error);
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="pedidos">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {pedidos.map((pedido, index) => (
                  <Draggable 
                    key={pedido.id} 
                    draggableId={pedido.id} 
                    index={index}
                    isDragDisabled={pedido.riscado}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`bg-white rounded-lg shadow border-l-4 ${
                          pedido.riscado 
                            ? 'border-l-red-500 opacity-60' 
                            : getDeliveryStatusColor(pedido.dataPrevistaEntrega)
                        } p-6 ${
                          snapshot.isDragging ? 'shadow-lg scale-105' : ''
                        } transition-all duration-200`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-start gap-4 flex-1">
                            {/* Número da Prioridade */}
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                              pedido.riscado 
                                ? 'bg-gray-200 text-gray-500' 
                                : 'bg-blue-500 text-white'
                            }`}>
                              {pedido.prioridade}
                            </div>

                            {/* Handle para arrastar */}
                            <div 
                              {...provided.dragHandleProps}
                              className={`flex items-center justify-center p-2 rounded cursor-move ${
                                pedido.riscado 
                                  ? 'text-gray-400 cursor-not-allowed' 
                                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                              }`}
                            >
                              <GripVertical size={20} />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-4">
                                {pedido.imagem && (
                                  <img
                                    src={pedido.imagem}
                                    alt="Pedido"
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                )}
                                <div>
                                  <h3 className={`text-xl font-semibold ${
                                    pedido.riscado ? 'line-through text-gray-500' : 'text-gray-900'
                                  }`}>
                                    {pedido.nomeCliente}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {formatDate(pedido.dataCreated)}
                                  </p>
                                  {/* Data prevista de entrega */}
                                  {pedido.dataPrevistaEntrega && (
                                    <div className="flex items-center gap-1 mt-1">
                                      <Calendar size={14} className="text-gray-400" />
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
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
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
                              
                              <div className="mb-4">
                                <span className="font-medium text-gray-700">Descrição:</span>
                                <p className={`text-sm text-gray-600 mt-1 ${
                                  pedido.riscado ? 'line-through' : ''
                                }`}>
                                  {pedido.descricao}
                                </p>
                              </div>

                              {/* Informações das Pedras */}
                              {pedido.stones.length > 0 && (
                                <div className="mb-4">
                                  <span className="font-medium text-gray-700">Detalhes das Pedras:</span>
                                  <div className="mt-2 space-y-2">
                                    {pedido.stones.map((stone, index) => (
                                      <div key={index} className={`text-xs bg-gray-50 p-3 rounded border ${
                                        pedido.riscado ? 'opacity-60' : ''
                                      }`}>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                          <div><strong>Onde:</strong> {stone.onde || 'N/A'}</div>
                                          <div><strong>Tipo:</strong> {stone.tipo || 'N/A'}</div>
                                          <div><strong>Lapidação:</strong> {stone.lapidacao || 'N/A'}</div>
                                           <div><strong>Qtd:</strong> {getQuantidadeDisplay(stone)}</div>
                                          <div><strong>Largura:</strong> {stone.largura || 'N/A'}</div>                                          
                                          <div><strong>Comprimento:</strong> {stone.comprimento || 'N/A'}</div>
                                          <div><strong>Altura:</strong> {stone.altura || 'N/A'}</div>
                                          <div><strong>PTS:</strong> {stone.pts || 'N/A'}</div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex gap-4 mb-3">
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
                            
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => riscarPedido(pedido.id)}
                                className={`px-4 py-2 rounded-md text-sm font-medium ${
                                  pedido.riscado
                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                    : 'bg-red-500 text-white hover:bg-red-600'
                                }`}
                              >
                                {pedido.riscado ? 'Restaurar' : 'Concluir'}
                              </button>
                              
                              <button
                                onClick={() => excluirPedido(pedido.id)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md text-sm font-medium hover:bg-gray-600 flex items-center gap-1"
                              >
                                <Trash2 size={14} />
                                Excluir
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default ListaPedidos;