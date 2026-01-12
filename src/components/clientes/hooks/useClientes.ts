import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { Cliente } from '../types';

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  const syncConjuge = async (clienteId: string, conjugeId?: string | null) => {
    try {
      if (conjugeId) {
        await supabase.from('clientes').update({ conjuge_id: clienteId }).eq('id', conjugeId);
        await supabase
          .from('clientes')
          .update({ conjuge_id: null })
          .eq('conjuge_id', clienteId)
          .neq('id', conjugeId);
      } else {
        await supabase.from('clientes').update({ conjuge_id: null }).eq('conjuge_id', clienteId);
      }
    } catch (error) {
      console.error('Erro ao sincronizar cônjuge:', error);
    }
  };

  const loadClientes = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('nome', { ascending: true });

      if (error) throw error;
      setClientes(data || []);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveCliente = async (cliente: Omit<Cliente, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .insert([cliente])
        .select()
        .single();

      if (error) throw error;
      if (data?.id) {
        await syncConjuge(data.id, cliente.conjuge_id);
      }
      await loadClientes();
      return { data, error: null };
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      return { data: null, error };
    }
  };

  const updateCliente = async (id: string, updates: Partial<Cliente>) => {
    try {
      const { error } = await supabase
        .from('clientes')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      await syncConjuge(id, updates.conjuge_id);
      await loadClientes();
      return { error: null };
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      return { error };
    }
  };

  const deleteCliente = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadClientes();
      return { error: null };
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      return { error };
    }
  };

  const searchClientes = async (query: string) => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .or(`nome.ilike.%${query}%,email.ilike.%${query}%,cpf.ilike.%${query}%`)
        .order('nome', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      return [];
    }
  };

  useEffect(() => {
    loadClientes();
  }, [loadClientes]);

  return {
    clientes,
    loading,
    loadClientes,
    saveCliente,
    updateCliente,
    deleteCliente,
    searchClientes
  };
}
