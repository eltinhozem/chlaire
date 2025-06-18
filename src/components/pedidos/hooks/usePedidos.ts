import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Pedido } from '../types';

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPedidos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .order('prioridade', { ascending: true });

      if (error) throw error;

      const pedidosFormatted = data?.map(pedido => ({
        id: pedido.id,
        imagem: pedido.imagem,
        nomeCliente: pedido.nome_cliente,
        categoria: pedido.categoria,
        tamanho: pedido.tamanho,
        descricao: pedido.descricao,
        aramado: pedido.aramado,
        galeria: pedido.galeria,
        paraRender: pedido.para_render,
        dataCreated: new Date(pedido.data_created),
        dataPrevistaEntrega: pedido.data_prevista_entrega ? new Date(pedido.data_prevista_entrega) : undefined,
        stones: pedido.stones || [],
        referenciaModelo: pedido.referencia_modelo || { rota: '', cliente: '' },
        riscado: pedido.riscado,
        prioridade: pedido.prioridade
      })) || [];

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

      // Buscar a próxima prioridade
      const { data: maxPrioridade } = await supabase
        .from('pedidos')
        .select('prioridade')
        .order('prioridade', { ascending: false })
        .limit(1);

      const proximaPrioridade = (maxPrioridade?.[0]?.prioridade || 0) + 1;

      const { data, error } = await supabase
        .from('pedidos')
        .insert([{
          imagem: pedido.imagem,
          nome_cliente: pedido.nomeCliente,
          categoria: pedido.categoria,
          tamanho: pedido.tamanho,
          descricao: pedido.descricao,
          aramado: pedido.aramado,
          galeria: pedido.galeria,
          para_render: pedido.paraRender,
          data_prevista_entrega: pedido.dataPrevistaEntrega,
          stones: pedido.stones,
          referencia_modelo: pedido.referenciaModelo,
          prioridade: proximaPrioridade,
          user_id: user.id
        }])
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

  const updatePedido = async (id: string, updates: Partial<Pedido>) => {
    try {
      setLoading(true);
      const dbUpdates: any = {};

      if (updates.riscado !== undefined) dbUpdates.riscado = updates.riscado;
      if (updates.prioridade !== undefined) dbUpdates.prioridade = updates.prioridade;

      const { error } = await supabase
        .from('pedidos')
        .update(dbUpdates)
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

  const deletePedido = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('pedidos')
        .delete()
        .eq('id', id);

      if (error) throw error;

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
    updatePedido,
    deletePedido,
    updatePrioridades,
    loadPedidos
  };
};