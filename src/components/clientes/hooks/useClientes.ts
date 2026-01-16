import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { Cliente } from '../types';

type ClientePayload = Omit<Cliente, 'id' | 'created_at' | 'updated_at'> & { user_id?: string };

const describeSupabaseError = (error: unknown) => {
  if (!error || typeof error !== 'object') return 'Erro desconhecido.';
  const maybe = error as { message?: string; details?: string; hint?: string; code?: string };
  const parts = [maybe.message, maybe.details, maybe.hint].filter(Boolean);
  const message = parts.length ? parts.join(' - ') : 'Erro desconhecido.';
  return maybe.code ? `${message} (código ${maybe.code})` : message;
};

const isMissingUserIdColumn = (error: unknown) => {
  if (!error || typeof error !== 'object') return false;
  const maybe = error as { code?: string; message?: string; details?: string; hint?: string };
  if (maybe.code === '42703' || maybe.code === 'PGRST204') {
    return true;
  }
  const combined = [maybe.message, maybe.details, maybe.hint].filter(Boolean).join(' ').toLowerCase();
  return combined.includes('user_id') && combined.includes('schema');
};

const sanitizeClientePayload = (data: Partial<Cliente>) => {
  const payload: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      payload[key] = trimmed.length ? trimmed : null;
      continue;
    }
    payload[key] = value;
  }
  return payload;
};

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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Usuário não autenticado.');
      }

      const sanitized = sanitizeClientePayload(cliente);
      const payload: ClientePayload = { ...sanitized, user_id: user.id };
      let { data, error } = await supabase
        .from('clientes')
        .insert([payload])
        .select()
        .single();

      if (error && isMissingUserIdColumn(error)) {
        ({ data, error } = await supabase
          .from('clientes')
          .insert([sanitized])
          .select()
          .single());
      }

      if (error) throw error;
      if (data?.id) {
        await syncConjuge(data.id, cliente.conjuge_id);
      }
      await loadClientes();
      return { data, error: null };
    } catch (error) {
      const message = describeSupabaseError(error);
      console.error('Erro ao salvar cliente:', message, error);
      return { data: null, error: new Error(message) };
    }
  };

  const updateCliente = async (id: string, updates: Partial<Cliente>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Usuário não autenticado.');
      }

      const payload = sanitizeClientePayload(updates);
      const { error } = await supabase
        .from('clientes')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      await syncConjuge(id, updates.conjuge_id);
      await loadClientes();
      return { error: null };
    } catch (error) {
      const message = describeSupabaseError(error);
      console.error('Erro ao atualizar cliente:', message, error);
      return { error: new Error(message) };
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
      const message = describeSupabaseError(error);
      console.error('Erro ao deletar cliente:', message, error);
      return { error: new Error(message) };
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
      const message = describeSupabaseError(error);
      console.error('Erro ao buscar clientes:', message, error);
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
