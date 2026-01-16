import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import type { AroConfig, Pedido, PedidoStone, ReferenciaModelo } from '../types';

type PedidoDbRow = {
  id: string;
  codigo?: string | null;
  imagem?: string | null;
  imagens?: unknown;
  nome_cliente?: string | null;
  categoria?: string | null;
  tamanho?: string | null;
  descricao?: string | null;
  aramado?: boolean | null;
  galeria?: boolean | null;
  para_render?: boolean | null;
  tipo_ouro_render?: 'branco' | 'rose' | 'amarelo' | null;
  data_created?: string | null;
  data_prevista_entrega?: string | null;
  stones?: PedidoStone[] | null;
  referencia_modelo?: ReferenciaModelo | null;
  aro_config?: AroConfig | null;
  riscado?: boolean | null;
  prioridade?: number | null;
};

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(false);

  const normalizeImagens = (value: unknown, fallback?: string): string[] => {
    if (Array.isArray(value)) {
      return value.map((item) => String(item)).filter((item) => item.trim().length > 0);
    }
    if (typeof value === 'string' && value.trim().length > 0) {
      return [value.trim()];
    }
    if (fallback && fallback.trim().length > 0) {
      return [fallback.trim()];
    }
    return [];
  };

  const mapFromDb = (pedido: PedidoDbRow): Pedido => ({
    id: pedido.id,
    codigo: pedido.codigo ?? undefined,
    imagem: pedido.imagem ?? undefined,
    imagens: normalizeImagens(pedido.imagens, pedido.imagem ?? undefined),
    nomeCliente: pedido.nome_cliente ?? '',
    categoria: pedido.categoria ?? '',
    tamanho: pedido.tamanho ?? '',
    descricao: pedido.descricao ?? '',
    aramado: Boolean(pedido.aramado),
    galeria: Boolean(pedido.galeria),
    paraRender: Boolean(pedido.para_render),
    tipoOuroRender: pedido.tipo_ouro_render ?? null,
    dataCreated: pedido.data_created ? new Date(pedido.data_created) : new Date(),
    dataPrevistaEntrega: pedido.data_prevista_entrega ? new Date(pedido.data_prevista_entrega) : undefined,
    stones: pedido.stones ?? [],
    referenciaModelo: pedido.referencia_modelo ?? { rota: '', cliente: '' },
    aroConfig: pedido.aro_config ?? undefined,
    riscado: Boolean(pedido.riscado),
    prioridade: pedido.prioridade ?? 0
  });

  const buildDbPayload = (
    pedido: Omit<Pedido, 'id'>,
    extras?: { codigo?: string; prioridade?: number; userId?: string }
  ) => {
    const imagens = Array.isArray(pedido.imagens)
      ? pedido.imagens
      : pedido.imagem
        ? [pedido.imagem]
        : [];
    const payload: Record<string, unknown> = {
      imagem: imagens[0] ?? pedido.imagem ?? null,
      imagens,
      nome_cliente: pedido.nomeCliente,
      categoria: pedido.categoria,
      tamanho: pedido.tamanho,
      descricao: pedido.descricao,
      aramado: pedido.aramado,
      galeria: pedido.galeria,
      para_render: pedido.paraRender,
      tipo_ouro_render: pedido.paraRender ? pedido.tipoOuroRender || null : null,
      data_created: pedido.dataCreated.toISOString(),
      data_prevista_entrega: pedido.dataPrevistaEntrega ? pedido.dataPrevistaEntrega.toISOString() : null,
      stones: pedido.stones,
      referencia_modelo: pedido.referenciaModelo,
      aro_config: pedido.aroConfig ?? null,
      riscado: pedido.riscado,
      prioridade: extras?.prioridade ?? pedido.prioridade
    };

    if (extras?.codigo !== undefined) payload.codigo = extras.codigo;
    if (extras?.prioridade !== undefined) payload.prioridade = extras.prioridade;
    if (extras?.userId) payload.user_id = extras.userId;

    return payload;
  };

  const generateCodigo = () => String(Math.floor(Math.random() * 10000)).padStart(4, '0');

  const ensureUniqueCodigo = async (): Promise<string> => {
    for (let i = 0; i < 5; i++) {
      const codigo = generateCodigo();
      const { data, error } = await supabase
        .from('pedidos')
        .select('id')
        .eq('codigo', codigo)
        .limit(1);

      if (error) {
        console.error('Erro ao verificar código do pedido:', error);
        break;
      }

      if (!data || data.length === 0) {
        return codigo;
      }
    }
    throw new Error('Não foi possível gerar um ID único para o pedido.');
  };

  const getPedidoById = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data ? mapFromDb(data) : null;
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const loadPedidos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .order('prioridade', { ascending: true });

      if (error) throw error;

      const pedidosFormatted = data?.map(mapFromDb) || [];

      setPedidos(pedidosFormatted);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      alert('Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  };

  const savePedido = async (pedido: Omit<Pedido, 'id'>) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Usuário não autenticado');
      const codigo = await ensureUniqueCodigo();

      // Buscar a próxima prioridade
      const { data: maxPrioridade } = await supabase
        .from('pedidos')
        .select('prioridade')
        .order('prioridade', { ascending: false })
        .limit(1);

      const proximaPrioridade = (maxPrioridade?.[0]?.prioridade || 0) + 1;

      const payload = buildDbPayload(pedido, { codigo, prioridade: proximaPrioridade, userId: user.id });

      const { data, error } = await supabase
        .from('pedidos')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      await loadPedidos();
      return data;
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePedidoData = async (id: string, pedido: Omit<Pedido, 'id'>) => {
    try {
      setLoading(true);
      const payload = buildDbPayload(pedido);
      const { error } = await supabase
        .from('pedidos')
        .update(payload)
        .eq('id', id);

      if (error) throw error;
      await loadPedidos();
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePedido = async (id: string, updates: Partial<Pedido>) => {
    try {
      setLoading(true);
      const dbUpdates: Partial<Pick<Pedido, 'riscado' | 'prioridade'>> = {};

      if (updates.riscado !== undefined) dbUpdates.riscado = updates.riscado;
      if (updates.prioridade !== undefined) dbUpdates.prioridade = updates.prioridade;

      const { data, error } = await supabase
        .from('pedidos')
        .update(dbUpdates)
        .eq('id', id)
        .select('id');

      if (error) throw error;
      if (!data || (Array.isArray(data) && data.length === 0)) {
        throw new Error('Não foi possível atualizar este pedido (sem permissão ou não encontrado).');
      }

      await loadPedidos();
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deletePedido = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pedidos')
        .delete()
        .eq('id', id)
        .select('id');

      if (error) throw error;
      if (!data || (Array.isArray(data) && data.length === 0)) {
        throw new Error('Não foi possível excluir este pedido (sem permissão ou já foi excluído).');
      }

      setPedidos(prev => prev.filter(p => p.id !== id));
      await loadPedidos();
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePrioridades = async (pedidosReordenados: Pedido[]) => {
    try {
      setLoading(true);
      
      const updates = pedidosReordenados.map((pedido, index) => ({
        id: pedido.id,
        prioridade: index + 1
      }));

      for (const update of updates) {
        await supabase
          .from('pedidos')
          .update({ prioridade: update.prioridade })
          .eq('id', update.id);
      }

      await loadPedidos();
    } catch (error) {
      console.error('Erro ao atualizar prioridades:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPedidos();
  }, []);

  return {
    pedidos,
    loading,
    savePedido,
    getPedidoById,
    updatePedidoData,
    updatePedido,
    deletePedido,
    updatePrioridades,
    loadPedidos
  };
};
