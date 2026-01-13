import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { usePedidos } from '../pedidos/hooks/usePedidos';
import type { Cliente } from '../clientes/types';
import { getDeliveryStatusText } from '../pedidos/utils/dateUtils';

type SpecialDateItem = {
  data: string;
  descricao: string;
  cliente: string;
};

const monthLabels = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

const parseDateParts = (value?: string | null) => {
  if (!value) return null;
  const parts = value.split('-');
  if (parts.length < 3) return null;
  const [year, month, day] = parts;
  if (!month || !day) return null;
  return { year, month, day };
};

const getMonthNumber = (value?: string | null) => {
  const parts = parseDateParts(value);
  if (!parts) return null;
  return Number(parts.month);
};

const getDayNumber = (value?: string | null) => {
  const parts = parseDateParts(value);
  if (!parts) return null;
  return Number(parts.day);
};

const formatDayMonth = (value?: string | null) => {
  const parts = parseDateParts(value);
  if (!parts) return '';
  return `${parts.day}/${parts.month}`;
};

const normalizeSpecialDates = (value: unknown, cliente: string): SpecialDateItem[] => {
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      return normalizeSpecialDates(JSON.parse(value), cliente);
    } catch {
      return [];
    }
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => ({
        data: item?.data || '',
        descricao: item?.descricao || '',
        cliente
      }))
      .filter((item) => item.data || item.descricao);
  }
  return [];
};

const PainelGestao: React.FC = () => {
  const { pedidos, loading: pedidosLoading } = usePedidos();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesLoading, setClientesLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadClientes = async () => {
      try {
        setClientesLoading(true);
        const { data, error: clientesError } = await supabase
          .from('clientes')
          .select('id,nome,data_nascimento,datas_especiais');

        if (clientesError) throw clientesError;
        setClientes((data || []) as Cliente[]);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao carregar clientes';
        setError(message);
      } finally {
        setClientesLoading(false);
      }
    };

    loadClientes();
  }, []);

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const currentMonthLabel = monthLabels[currentMonth - 1];
  const nextMonthLabel = monthLabels[nextMonth - 1];

  const birthdaysThisMonth = useMemo(() => {
    return clientes
      .filter((cliente) => getMonthNumber(cliente.data_nascimento) === currentMonth)
      .map((cliente) => ({
        id: cliente.id,
        nome: cliente.nome,
        label: formatDayMonth(cliente.data_nascimento),
        day: getDayNumber(cliente.data_nascimento) || 0
      }))
      .sort((a, b) => a.day - b.day);
  }, [clientes, currentMonth]);

  const birthdaysNextMonth = useMemo(() => {
    return clientes
      .filter((cliente) => getMonthNumber(cliente.data_nascimento) === nextMonth)
      .map((cliente) => ({
        id: cliente.id,
        nome: cliente.nome,
        label: formatDayMonth(cliente.data_nascimento),
        day: getDayNumber(cliente.data_nascimento) || 0
      }))
      .sort((a, b) => a.day - b.day);
  }, [clientes, nextMonth]);

  const specialDates = useMemo(() => {
    return clientes.flatMap((cliente) =>
      normalizeSpecialDates(cliente.datas_especiais, cliente.nome).map((item) => ({
        ...item,
        month: getMonthNumber(item.data),
        day: getDayNumber(item.data) || 0,
        label: formatDayMonth(item.data)
      }))
    );
  }, [clientes]);

  const specialThisMonth = useMemo(() => {
    return specialDates
      .filter((item) => item.month === currentMonth)
      .sort((a, b) => a.day - b.day);
  }, [specialDates, currentMonth]);

  const specialNextMonth = useMemo(() => {
    return specialDates
      .filter((item) => item.month === nextMonth)
      .sort((a, b) => a.day - b.day);
  }, [specialDates, nextMonth]);

  const dueSoonPedidos = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return pedidos
      .filter((pedido) => pedido.dataPrevistaEntrega && !pedido.riscado)
      .map((pedido) => {
        const date = new Date(pedido.dataPrevistaEntrega as Date);
        date.setHours(0, 0, 0, 0);
        const diffTime = date.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { pedido, diffDays };
      })
      .filter(({ diffDays }) => diffDays >= 0 && diffDays <= 9)
      .sort((a, b) => a.diffDays - b.diffDays);
  }, [pedidos]);

  const loading = pedidosLoading || clientesLoading;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Painel de gestão</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Visão rápida do mês atual e do próximo mês.</p>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-3 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-white dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700/50 p-6 text-sm text-neutral-500">
          Carregando painel...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700/50 shadow-sm">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-700/50">
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                  Aniversariantes - {currentMonthLabel}
                </h2>
              </div>
              <div className="p-4">
                {birthdaysThisMonth.length === 0 ? (
                  <p className="text-sm text-neutral-500">Nenhum aniversariante este mês.</p>
                ) : (
                  <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
                    {birthdaysThisMonth.map((item) => (
                      <li key={item.id} className="flex items-center justify-between">
                        <span className="font-medium">{item.nome}</span>
                        <span className="text-xs text-neutral-500">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700/50 shadow-sm">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-700/50">
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                  Aniversariantes - {nextMonthLabel}
                </h2>
              </div>
              <div className="p-4">
                {birthdaysNextMonth.length === 0 ? (
                  <p className="text-sm text-neutral-500">Nenhum aniversariante no próximo mês.</p>
                ) : (
                  <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
                    {birthdaysNextMonth.map((item) => (
                      <li key={item.id} className="flex items-center justify-between">
                        <span className="font-medium">{item.nome}</span>
                        <span className="text-xs text-neutral-500">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700/50 shadow-sm">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-700/50">
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                  Datas especiais - {currentMonthLabel}
                </h2>
              </div>
              <div className="p-4">
                {specialThisMonth.length === 0 ? (
                  <p className="text-sm text-neutral-500">Nenhuma data especial este mês.</p>
                ) : (
                  <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
                    {specialThisMonth.map((item, index) => (
                      <li key={`${item.cliente}-${item.data}-${index}`} className="flex flex-col">
                        <span className="font-medium">{item.cliente}</span>
                        <span className="text-xs text-neutral-500">
                          {item.label || item.data}{item.descricao ? ` • ${item.descricao}` : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700/50 shadow-sm">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-700/50">
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                  Datas especiais - {nextMonthLabel}
                </h2>
              </div>
              <div className="p-4">
                {specialNextMonth.length === 0 ? (
                  <p className="text-sm text-neutral-500">Nenhuma data especial no próximo mês.</p>
                ) : (
                  <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
                    {specialNextMonth.map((item, index) => (
                      <li key={`${item.cliente}-${item.data}-${index}`} className="flex flex-col">
                        <span className="font-medium">{item.cliente}</span>
                        <span className="text-xs text-neutral-500">
                          {item.label || item.data}{item.descricao ? ` • ${item.descricao}` : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700/50 shadow-sm">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700/50">
              <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                Pedidos vencendo (próximos 9 dias)
              </h2>
            </div>
            <div className="p-4">
              {dueSoonPedidos.length === 0 ? (
                <p className="text-sm text-neutral-500">Nenhum pedido vencendo nos próximos dias.</p>
              ) : (
                <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
                  {dueSoonPedidos.map(({ pedido, diffDays }) => (
                    <li key={pedido.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <span className="font-medium">
                        {pedido.nomeCliente} {pedido.codigo ? `(${pedido.codigo})` : ''}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {pedido.dataPrevistaEntrega
                          ? `${new Date(pedido.dataPrevistaEntrega).toLocaleDateString('pt-BR')} • ${getDeliveryStatusText(pedido.dataPrevistaEntrega)}`
                          : diffDays === 0
                            ? 'Vence hoje'
                            : `${diffDays} dias restantes`}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PainelGestao;
