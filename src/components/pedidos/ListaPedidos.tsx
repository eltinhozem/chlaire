
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Pedido } from './types';

const ListaPedidos: React.FC = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const pedidosStorage = JSON.parse(localStorage.getItem('pedidos') || '[]');
    // Ordenar por data (mais recentes primeiro)
    const pedidosOrdenados = pedidosStorage.sort((a: Pedido, b: Pedido) => {
      const dateA = new Date(a.dataCreated);
      const dateB = new Date(b.dataCreated);
      return dateB.getTime() - dateA.getTime();
    });
    setPedidos(pedidosOrdenados);
  }, []);

  const riscarPedido = (id: string) => {
    const pedidosAtualizados = pedidos.map(pedido => {
      if (pedido.id === id) {
        return { ...pedido, riscado: !pedido.riscado };
      }
      return pedido;
    });

    // Separar pedidos riscados e não riscados
    const naoRiscados = pedidosAtualizados.filter(p => !p.riscado);
    const riscados = pedidosAtualizados.filter(p => p.riscado);
    
    // Reordenar: não riscados primeiro, depois riscados
    const pedidosReordenados = [...naoRiscados, ...riscados];
    
    setPedidos(pedidosReordenados);
    localStorage.setItem('pedidos', JSON.stringify(pedidosReordenados));
  };

  const excluirPedido = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      const pedidosAtualizados = pedidos.filter(pedido => pedido.id !== id);
      setPedidos(pedidosAtualizados);
      localStorage.setItem('pedidos', JSON.stringify(pedidosAtualizados));
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

      <div className="space-y-4">
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
          pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className={`bg-white rounded-lg shadow border-l-4 ${
                pedido.riscado 
                  ? 'border-l-red-500 opacity-60' 
                  : 'border-l-green-500'
              } p-6`}
            >
              <div className="flex justify-between items-start mb-4">
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
                              <div><strong>Qtd:</strong> {stone.quantidade}</div>
                              <div><strong>Largura:</strong> {stone.largura || 'N/A'}</div>
                              <div><strong>Altura:</strong> {stone.altura || 'N/A'}</div>
                              <div><strong>Comprimento:</strong> {stone.comprimento || 'N/A'}</div>
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
          ))
        )}
      </div>
    </div>
  );
};

export default ListaPedidos;
