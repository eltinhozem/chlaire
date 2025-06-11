
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
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

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleString('pt-BR');
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
              <div className="flex justify-between items-start">
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Categoria:</span>
                      <span className={`ml-2 ${pedido.riscado ? 'line-through' : ''}`}>
                        {pedido.categoria}
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
                  
                  <div className="mt-2">
                    <span className="font-medium text-gray-700">Descrição:</span>
                    <p className={`text-sm text-gray-600 mt-1 ${
                      pedido.riscado ? 'line-through' : ''
                    }`}>
                      {pedido.descricao}
                    </p>
                  </div>
                  
                  <div className="mt-3 flex gap-4">
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
                    <div className="mt-3 text-sm">
                      <span className="font-medium text-gray-700">Referência:</span>
                      <span className={`ml-2 ${pedido.riscado ? 'line-through' : ''}`}>
                        {pedido.referenciaModelo.rota && `Rota: ${pedido.referenciaModelo.rota}`}
                        {pedido.referenciaModelo.rota && pedido.referenciaModelo.cliente && ' | '}
                        {pedido.referenciaModelo.cliente && `Cliente: ${pedido.referenciaModelo.cliente}`}
                      </span>
                    </div>
                  )}
                </div>
                
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListaPedidos;
