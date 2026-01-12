import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, Calendar, Circle, Square, Egg, Droplet, Diamond, Gem, Heart, Hexagon, Loader2, Edit, Copy, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { getDeliveryStatusColor, getDeliveryStatusText } from './utils/dateUtils';
import { usePedidos } from './hooks/usePedidos';
import PositionModal from './components/PositionModal';
import type { Pedido } from './types';
import { PrimaryButton, DangerButton, SecondaryButton } from '../buttons';
import { categoryOptions } from '../form/formOptions';

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

const categoryLabelMap = categoryOptions.reduce<Record<string, string>>((acc, curr) => {
  acc[curr.value] = curr.label;
  return acc;
}, {});

const ouroLabels: Record<string, string> = {
  branco: 'Branco',
  rose: 'Rosé',
  amarelo: 'Amarelo'
};

const formatBool = (v: boolean) => (v ? 'Sim' : 'Não');

const getPedidoImages = (pedido: Pedido) => {
  if (pedido.imagens && pedido.imagens.length > 0) return pedido.imagens;
  if (pedido.imagem) return [pedido.imagem];
  return [];
};

const fetchImageDataUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();
    const format = blob.type === 'image/png' ? 'PNG' : 'JPEG';
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('Falha ao ler imagem'));
      reader.readAsDataURL(blob);
    });
    return { dataUrl, format };
  } catch (error) {
    console.error('Erro ao carregar imagem:', error);
    return null;
  }
};

const buildPedidoPdf = async (pedido: Pedido) => {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const marginX = 40;
  const lineHeight = 16;
  const maxWidth = 515;
  let y = 40;

  const addText = (text: string, size = 12, spacing = 8) => {
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, marginX, y);
    y += lines.length * lineHeight + spacing;
  };

  const categoriaLabel = categoryLabelMap[pedido.categoria] || pedido.categoria;
  addText(`Pedido ${pedido.codigo || ''}`.trim(), 16, 10);
  addText(`Cliente: ${pedido.nomeCliente}`, 12, 4);
  addText(`Categoria: ${categoriaLabel}`, 12, 4);
  if (pedido.tamanho) addText(`Tamanho: ${pedido.tamanho}`, 12, 4);
  if (pedido.descricao) addText(`Descrição: ${pedido.descricao}`, 12, 6);
  addText(`Aramado: ${formatBool(pedido.aramado)} | Galeria: ${formatBool(pedido.galeria)} | Para Render: ${formatBool(pedido.paraRender)}${pedido.paraRender && pedido.tipoOuroRender ? ` (${ouroLabels[pedido.tipoOuroRender] || pedido.tipoOuroRender})` : ''}`, 11, 8);

  if (pedido.dataPrevistaEntrega) {
    addText(`Entrega: ${new Date(pedido.dataPrevistaEntrega).toLocaleDateString('pt-BR')} (${getDeliveryStatusText(pedido.dataPrevistaEntrega)})`, 11, 8);
  }

  if (pedido.referenciaModelo?.rota || pedido.referenciaModelo?.cliente) {
    addText(`Ref. modelo: ${pedido.referenciaModelo?.rota || '-'} | Cliente ref.: ${pedido.referenciaModelo?.cliente || '-'}`, 11, 8);
  }

  if (pedido.stones && pedido.stones.length > 0) {
    addText('Pedras:', 13, 6);
    pedido.stones.forEach((stone, index) => {
      const dims = [stone.largura, stone.comprimento, stone.altura].filter(Boolean).join(' x ');
      addText(
        `${index + 1}) ${stone.tipo} - ${stone.lapidacao} | Qtd: ${stone.quantidade || 'Livre'}${stone.tipoQuantidade ? ` (${stone.tipoQuantidade})` : ''} | Onde: ${stone.onde}${dims ? ` | Dimensões: ${dims} mm` : ''}${stone.pts ? ` | PTS: ${stone.pts}` : ''}${stone.tipoCravacao ? ` | Cravação: ${stone.tipoCravacao}` : ''}`,
        10,
        4
      );
    });
    y += 6;
  }

  const images = getPedidoImages(pedido);
  if (images.length > 0) {
    addText('Imagens:', 13, 6);
    const maxImageWidth = 160;
    const maxImageHeight = 120;
    let x = marginX;
    let rowHeight = 0;

    for (const url of images) {
      const imageData = await fetchImageDataUrl(url);
      if (!imageData) continue;
      if (y + maxImageHeight > 780) {
        doc.addPage();
        y = 40;
        x = marginX;
        rowHeight = 0;
      }
      doc.addImage(imageData.dataUrl, imageData.format, x, y, maxImageWidth, maxImageHeight);
      rowHeight = Math.max(rowHeight, maxImageHeight);
      x += maxImageWidth + 10;
      if (x + maxImageWidth > 555) {
        x = marginX;
        y += rowHeight + 10;
        rowHeight = 0;
      }
    }
  }

  return doc.output('blob');
};

const savePedidoPdf = async (pedido: Pedido) => {
  const blob = await buildPedidoPdf(pedido);
  const fileName = `pedido-${pedido.codigo || pedido.id}.pdf`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
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
  const categoriaLabel = categoryLabelMap[pedido.categoria] || pedido.categoria;
  const imageUrls = getPedidoImages(pedido);
  
  const cardBorderColor = riscado ? 'border-l-danger' : statusColor;
  const copyToClipboard = async () => {
    const linhas = [
      `ID: ${pedido.codigo || '----'}`,
      `Cliente: ${pedido.nomeCliente}`,
      `Categoria: ${categoriaLabel}`,
      pedido.tamanho ? `Tamanho: ${pedido.tamanho}` : null,
      pedido.descricao ? `Descrição: ${pedido.descricao}` : null,
      `Aramado: ${formatBool(pedido.aramado)}`,
      `Galeria: ${formatBool(pedido.galeria)}`,
      `Para Render: ${formatBool(pedido.paraRender)}${pedido.paraRender && pedido.tipoOuroRender ? ` (${ouroLabels[pedido.tipoOuroRender] || pedido.tipoOuroRender})` : ''}`,
      // Prioridade e criado em removidos conforme solicitado
      dataPrevistaEntrega ? `Entrega: ${new Date(dataPrevistaEntrega).toLocaleDateString('pt-BR')} (${getDeliveryStatusText(dataPrevistaEntrega)})` : null,
      pedido.referenciaModelo?.rota ? `Ref. modelo: ${pedido.referenciaModelo.rota}` : null,
      pedido.referenciaModelo?.cliente ? `Cliente ref.: ${pedido.referenciaModelo.cliente}` : null,
      pedido.stones && pedido.stones.length
        ? 'Pedras:'
        : null,
      ...(pedido.stones || []).map((s, idx) => {
        const dims = [s.largura, s.comprimento, s.altura].filter(Boolean).join(' x ');
        return [
          ` ${idx + 1}) Onde: ${s.onde}`,
          `    Tipo: ${s.tipo} | Lapidação: ${s.lapidacao}`,
          `    Quantidade: ${s.quantidade} (${s.tipoQuantidade || 'exata'})`,
          dims ? `    Dimensões: ${dims} mm` : null,
          s.pts ? `    PTS: ${s.pts}` : null,
          // Quilates removido conforme solicitado
          s.tipoCravacao ? `    Cravação: ${s.tipoCravacao}` : null
        ].filter(Boolean).join('\n');
      }),
      ...getPedidoImages(pedido).map((url, idx) => `Imagem ${idx + 1}: ${url}`)
    ].filter(Boolean);
    const texto = linhas.join('\n');
    try {
      await navigator.clipboard.writeText(texto);
      const toast = document.createElement('div');
      toast.textContent = 'Dados do pedido copiados.';
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.right = '20px';
      toast.style.background = '#111827';
      toast.style.color = '#f9fafb';
      toast.style.padding = '10px 14px';
      toast.style.borderRadius = '8px';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
      toast.style.zIndex = '9999';
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
      alert('Não foi possível copiar. Copie manualmente:\n\n' + texto);
    }
  };

  const handleSavePdf = async () => {
    try {
      await savePedidoPdf(pedido);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Não foi possível gerar o PDF do pedido.');
    }
  };

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
            <SecondaryButton size="sm" onClick={() => navigate(`/cadastro-pedidos/${pedido.id}`)} className="w-28 justify-center gap-2">
              <Edit size={14}/>
              Editar
            </SecondaryButton>
            <SecondaryButton size="sm" onClick={copyToClipboard} className="w-28 justify-center gap-2">
              <Copy size={14}/>
              Copiar
            </SecondaryButton>
            <SecondaryButton size="sm" onClick={handleSavePdf} className="w-28 justify-center gap-2">
              <Download size={14}/>
              PDF
            </SecondaryButton>
            <DangerButton size="sm" onClick={() => onDelete(pedido.id)} className="w-28 justify-center gap-2">
              <Trash2 size={14}/>
              Excluir
            </DangerButton>
          </div>
        </div>

        {imageUrls.length > 0 && (
          <div className="mt-3 pl-14 flex flex-wrap gap-2">
            {imageUrls.slice(0, 4).map((url, idx) => (
              <img
                key={`${url}-${idx}`}
                src={url}
                alt={`Imagem do pedido ${idx + 1}`}
                className="h-16 w-16 rounded border border-neutral-200 dark:border-neutral-700 object-cover"
              />
            ))}
          </div>
        )}

        {/* Corpo do Card */}
        <div className="mt-4 pl-14">
          <p className={`text-sm text-neutral-600 dark:text-neutral-300 ${riscado ? 'line-through' : ''}`}>
            {pedido.descricao}
          </p>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <Tag color="bg-primary/10 text-primary-dark dark:bg-primary/20 dark:text-primary-light">{categoriaLabel}</Tag>
            {pedido.tamanho && <Tag color="bg-secondary/10 text-secondary-dark dark:bg-secondary/20 dark:text-secondary-light">Tamanho: {pedido.tamanho}</Tag>}
            {pedido.aramado && <Tag color="bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">Aramado</Tag>}
            {pedido.galeria && <Tag color="bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">Galeria</Tag>}
            {pedido.paraRender && (
              <Tag color="bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
                Para Render{pedido.tipoOuroRender ? ` (${ouroLabels[pedido.tipoOuroRender] || pedido.tipoOuroRender})` : ''}
              </Tag>
            )}
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
  const [search, setSearch] = useState('');

  const sortedPedidos = useMemo(() => {
    return [...pedidos].sort((a, b) => a.prioridade - b.prioridade);
  }, [pedidos]);

  const filteredPedidos = useMemo(() => {
    if (!search.trim()) return sortedPedidos;
    const term = search.toLowerCase();
    return sortedPedidos.filter((p) => 
      p.nomeCliente.toLowerCase().includes(term) ||
      (p.codigo || '').toLowerCase().includes(term)
    );
  }, [sortedPedidos, search]);

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
      const message = error instanceof Error ? error.message : 'Não foi possível atualizar o status do pedido.';
      alert(message);
    }
  };

  const excluirPedido = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      try {
        await deletePedido(id);
      } catch (error) {
        console.error('Erro ao excluir pedido:', error);
        const message = error instanceof Error ? error.message : 'Não foi possível excluir o pedido.';
        alert(message);
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
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Lista de Pedidos</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou ID"
            className="border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100"
          />
          <PrimaryButton onClick={() => navigate('/cadastro-pedidos')} className="flex items-center gap-2">
            <PlusCircle size={16} />
            Novo Pedido
          </PrimaryButton>
        </div>
      </header>

      {filteredPedidos.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-neutral-800/50 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700">
          <p className="text-neutral-600 dark:text-neutral-300 font-semibold">Nenhum pedido na fila.</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Que tal criar o primeiro?</p>
          <PrimaryButton onClick={() => navigate('/cadastro-pedidos')} className="mt-4">
            Criar Pedido
          </PrimaryButton>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPedidos.map((pedido, index) => (
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
        totalPedidos={filteredPedidos.length}
        onSave={handlePositionSave}
        pedidoName={positionModal.pedidoName}
      />
    </div>
  );
};

export default ListaPedidos;
