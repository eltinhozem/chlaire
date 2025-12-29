import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, Calendar, Circle, Square, Egg, Droplet, Diamond, Gem, Heart, Hexagon, Loader2, Edit } from 'lucide-react';
import { getDeliveryStatusColor, getDeliveryStatusText } from './utils/dateUtils';
import { usePedidos } from './hooks/usePedidos';
import PositionModal from './components/PositionModal';
import type { Pedido, PedidoStone } from './types';
import { PrimaryButton, DangerButton, SecondaryButton } from '../buttons';

const getLapidacaoIcon = (lapidacao: string) => {
  const props = { size: 20, className: "text-neutral-500" };
  switch (lapidacao?.toLowerCase()) {
    case 'redonda': return <Circle {...props} />;
    case 'quadrada': return <Square {...props} />;
    case 'oval': return <Egg {...props} />;
    case 'gota': return <Droplet {...props} />;
    case 'navete': return <Diamond {...props} />;
    case 'esmeralda': return <Hexagon {...props} />;
    case 'princesa': return <Square {...props} />;
    case 'coração': return <Heart {...props} />;
    default: return <Gem {...props} />;
  }
};

const Tag: React.FC<{ children: React.ReactNode, color: string }> = ({ children, color }) => (
  <span className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}>
    {children}
  </span>
);

const PedidoCard: React.FC<{ pedido: Pedido; index: number; onPositionClick: Function; onToggleRiscado: Function; onDelete: Function; }> = ({
  pedido, index, onPositionClick, onToggleRiscado, onDelete
}) => {
  const navigate = useNavigate();
  const { dataPrevistaEntrega, riscado } = pedido;
  const statusColor = getDeliveryStatusColor(dataPrevistaEntrega);
  const statusText = getDeliveryStatusText(dataPrevistaEntrega);
  
  const cardBorderColor = riscado ? 'border-l-danger' : statusColor;

  return (
    <div className={`bg-white dark:bg-neutral-800/50 shadow-sm rounded-lg border-l-4 ${cardBorderColor} transition-opacity duration-300 ${riscado ? 'opacity-60' : ''}`}>
      <div className="p-4">
        {/* Header do Card */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-start gap-4">
            <button
              onClick={() => onPositionClick(pedido.id, index + 1, pedido.nomeCliente)}
              disabled={riscado}
              className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold disabled:bg-neutral-400 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
            >
              {index + 1}
            </button>
            <div className="flex-grow">
              <h3 className={`font-bold text-lg text-neutral-800 dark:text-neutral-100 ${riscado ? 'line-through' : ''}`}>
                {pedido.nomeCliente}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Criado em: {new Date(pedido.dataCreated).toLocaleDateString('pt-BR')}
              </p>
              {dataPrevistaEntrega && !riscado && (
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={14} className="text-neutral-500" />
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    Entrega: {new Date(dataPrevistaEntrega).toLocaleDateString('pt-BR')}
                    <span className={`ml-2 text-xs font-semibold ${statusText.includes('Vencido') ? 'text-danger' : 'text-primary'}`}>
                      ({statusText})
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <SecondaryButton size="sm" onClick={() => navigate(`/cadastro-pedidos/${pedido.id}`)}>
              <Edit size={14}/>
            </SecondaryButton>
            <DangerButton size="sm" onClick={() => onDelete(pedido.id)}>
              <Trash2 size={14}/>
            </DangerButton>
          </div>
        </div>

        {/* Corpo do Card */}
        <div className="mt-4 pl-14">
          <p className={`text-sm text-neutral-600 dark:text-neutral-300 ${riscado ? 'line-through' : ''}`}>
            {pedido.descricao}
          </p>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <Tag color="bg-primary/10 text-primary-dark dark:bg-primary/20 dark:text-primary-light">{pedido.categoria}</Tag>
            {pedido.tamanho && <Tag color="bg-secondary/10 text-secondary-dark dark:bg-secondary/20 dark:text-secondary-light">Tamanho: {pedido.tamanho}</Tag>}
            {pedido.aramado && <Tag color="bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">Aramado</Tag>}
            {pedido.galeria && <Tag color="bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">Galeria</Tag>}
            {pedido.paraRender && <Tag color="bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">Para Render</Tag>}
          </div>
        </div>
        
        {/* Pedras */}
        {pedido.stones && pedido.stones.length > 0 && (
           <div className="mt-4 pl-14">
             <h4 className="font-semibold text-sm text-neutral-700 dark:text-neutral-200 mb-2">Pedras</h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pedido.stones.map((stone, sIndex) => (
                <div key={sIndex} className="text-xs p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center gap-2 mb-2">
                    {getLapidacaoIcon(stone.lapidacao)}
                    <p className="font-bold text-neutral-800 dark:text-neutral-100">{stone.tipo}</p>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300"><strong>Qtd:</strong> {stone.quantidade || 'Livre'}</p>
                  <p className="text-neutral-600 dark:text-neutral-300"><strong>Tamanho:</strong> {stone.largura || 'N/A'}mm</p>
                  <p className="text-neutral-600 dark:text-neutral-300"><strong>Onde:</strong> {stone.onde}</p>
                </div>
              ))}
             </div>
           </div>
        )}

        {/* Footer do Card */}
        <div className="mt-4 pl-14">
          <PrimaryButton onClick={() => onToggleRiscado(pedido.id, !!riscado)} size="sm">
            {riscado ? 'Restaurar Pedido' : 'Marcar como Concluído'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

const ListaPedidos: React.FC = () => {
  const navigate = useNavigate();
  const { pedidos, loading, updatePedido, deletePedido, updatePrioridades } = usePedidos();
  const [positionModal, setPositionModal] = useState({ isOpen: false, pedidoId: '', currentPosition: 0, pedidoName: '' });

  const sortedPedidos = useMemo(() => {
    return [...pedidos].sort((a, b) => a.prioridade - b.prioridade);
  }, [pedidos]);

  const changePosition = async (pedidoId: string, newPosition: number) => {
    const pedidoIndex = sortedPedidos.findIndex(p => p.id === pedidoId);
    if (pedidoIndex === -1) return;

    const reorderedPedidos = [...sortedPedidos];
    const [movedPedido] = reorderedPedidos.splice(pedidoIndex, 1);
    reorderedPedidos.splice(newPosition - 1, 0, movedPedido);
    
    await updatePrioridades(reorderedPedidos);
  };

  const toggleRiscado = async (id: string, currentlyRiscado: boolean) => {
    try {
      await updatePedido(id, { riscado: !currentlyRiscado });
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

  const handlePositionClick = (pedidoId: string, currentPosition: number, pedidoName: string) => {
    setPositionModal({ isOpen: true, pedidoId, currentPosition, pedidoName });
  };

  const handlePositionSave = (newPosition: number) => {
    changePosition(positionModal.pedidoId, newPosition);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-neutral-600 dark:text-neutral-300">Carregando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Lista de Pedidos</h1>
        <PrimaryButton onClick={() => navigate('/cadastro-pedidos')} className="flex items-center gap-2">
          <PlusCircle size={16} />
          Novo Pedido
        </PrimaryButton>
      </header>

      {sortedPedidos.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-neutral-800/50 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700">
          <p className="text-neutral-600 dark:text-neutral-300 font-semibold">Nenhum pedido na fila.</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Que tal criar o primeiro?</p>
          <PrimaryButton onClick={() => navigate('/cadastro-pedidos')} className="mt-4">
            Criar Pedido
          </PrimaryButton>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedPedidos.map((pedido, index) => (
            <PedidoCard 
              key={pedido.id}
              pedido={pedido}
              index={index}
              onPositionClick={handlePositionClick}
              onToggleRiscado={toggleRiscado}
              onDelete={excluirPedido}
            />
          ))}
        </div>
      )}

      <PositionModal
        isOpen={positionModal.isOpen}
        onClose={() => setPositionModal(prev => ({ ...prev, isOpen: false }))}
        currentPosition={positionModal.currentPosition}
        totalPedidos={pedidos.length}
        onSave={handlePositionSave}
        pedidoName={positionModal.pedidoName}
      />
    </div>
  );
};

export default ListaPedidos;
