import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ClienteContainer,
  ClienteTitle,
  PageHeader,
  PageActions,
  HeaderButtonPrimary,
  HeaderButtonSecondary
} from './styles';
import { 
  Cliente, 
  ClienteFormData,
  NumeracaoDedos,
  FingerKey,
  HandSide,
  SpecialDate
} from './types';
import { supabase } from '../../lib/supabase';
import { useClientes } from './hooks/useClientes';
import { getBirthMonth } from '../../lib/dateUtils';
import { birthMonthOptions } from './constants';
import {
  coerceFingerSizes,
  createEmptyFingerSizes,
  formatCPF,
  formatPhone,
  hasFingerSizing,
  normalizeSpecialDates
} from './utils';
import CadastroClientesForm from './components/CadastroClientesForm';
import ClientesListView from './components/ClientesListView';
type FormData = ClienteFormData;

const initialFormData: FormData = {
  nome: '',
  endereco: '',
  telefone: '',
  celular: '',
  data_nascimento: '',
  email: '',
  cpf: '',
  instagram: '',
  facebook: '',
  site_empresa: '',
  genero: 'nao_informado',
  estado_civil: 'solteiro',
  profissao: '',
  nacionalidade: 'Brasileira',
  tipo_pessoa: 'fisica',
  origem_cadastro: 'loja_fisica',
  indicado_por: '',
  observacao: '',
  numeracao_dedos: null,
  conjuge_id: null,
  datas_especiais: []
};

export default function CadastroClientes() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clientes, loading, saveCliente, updateCliente, deleteCliente, searchClientes } = useClientes();
  
  const [activeTab, setActiveTab] = useState<'cadastro' | 'lista'>('lista');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [birthMonthFilter, setBirthMonthFilter] = useState('');
  const [estadoCivilFilter, setEstadoCivilFilter] = useState<'' | 'casado' | 'solteiro'>('');
  const [collectionFilter, setCollectionFilter] = useState('');
  const [collections, setCollections] = useState<{ id: string; name: string }[]>([]);
  const [collectionClientNames, setCollectionClientNames] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showFingerSizing, setShowFingerSizing] = useState(false);
  const [fingerSizes, setFingerSizes] = useState<NumeracaoDedos>(createEmptyFingerSizes());
  const [specialDates, setSpecialDates] = useState<SpecialDate[]>([]);

  useEffect(() => {
    const clienteId = searchParams.get('edit');
    if (clienteId) {
      const cliente = clientes.find(c => c.id === clienteId);
      if (cliente) {
        const normalizedFingerSizes = coerceFingerSizes(cliente.numeracao_dedos);
        const shouldShowFingerSizing = hasFingerSizing(normalizedFingerSizes);
        setFormData({
          nome: cliente.nome,
          endereco: cliente.endereco || '',
          telefone: cliente.telefone || '',
          celular: cliente.celular || '',
          data_nascimento: cliente.data_nascimento || '',
          email: cliente.email || '',
          cpf: cliente.cpf || '',
          instagram: cliente.instagram || '',
          facebook: cliente.facebook || '',
          site_empresa: cliente.site_empresa || '',
          genero: cliente.genero || 'nao_informado',
          estado_civil: cliente.estado_civil || 'solteiro',
          profissao: cliente.profissao || '',
          nacionalidade: cliente.nacionalidade || 'Brasileira',
          tipo_pessoa: cliente.tipo_pessoa || 'fisica',
          origem_cadastro: cliente.origem_cadastro || 'loja_fisica',
          indicado_por: cliente.indicado_por || '',
          observacao: cliente.observacao || '',
          numeracao_dedos: shouldShowFingerSizing ? normalizedFingerSizes : null,
          conjuge_id: cliente.conjuge_id || null,
          datas_especiais: normalizeSpecialDates(cliente.datas_especiais)
        });
        setFingerSizes(shouldShowFingerSizing ? normalizedFingerSizes : createEmptyFingerSizes());
        setShowFingerSizing(shouldShowFingerSizing);
        setSpecialDates(normalizeSpecialDates(cliente.datas_especiais));
        setEditingId(clienteId);
        setActiveTab('cadastro');
      }
    }
  }, [searchParams, clientes]);

  useEffect(() => {
    setFilteredClientes(clientes);
  }, [clientes]);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const { data, error } = await supabase
          .from('collections')
          .select('id,name')
          .order('name', { ascending: true });

        if (error) throw error;
        setCollections((data || []) as { id: string; name: string }[]);
      } catch (error) {
        console.error('Erro ao carregar coleções:', error);
      }
    };

    loadCollections();
  }, []);

  useEffect(() => {
    const loadCollectionClients = async () => {
      if (!collectionFilter) {
        setCollectionClientNames(new Set());
        return;
      }

      try {
        const { data, error } = await supabase
          .from('jewelry')
          .select('client_name')
          .eq('collection_id', collectionFilter);

        if (error) throw error;
        const names = (data || [])
          .map((item) => (item?.client_name || '').trim().toLowerCase())
          .filter(Boolean);
        setCollectionClientNames(new Set(names));
      } catch (error) {
        console.error('Erro ao filtrar coleção:', error);
        setCollectionClientNames(new Set());
      }
    };

    loadCollectionClients();
  }, [collectionFilter]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const isCasado = formData.estado_civil === 'casado' || formData.estado_civil === 'uniao_estavel';
  const spouseOptions = clientes
    .filter((c) => !editingId || c.id !== editingId)
    .map((c) => ({ value: c.id, label: c.nome }));

  const addSpecialDate = () => {
    setSpecialDates((prev) => [...prev, { data: '', descricao: '' }]);
  };

  const updateSpecialDate = (index: number, field: keyof SpecialDate, value: string) => {
    setSpecialDates((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removeSpecialDate = (index: number) => {
    setSpecialDates((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = await searchClientes(query);
      setFilteredClientes(results);
    } else {
      setFilteredClientes(clientes);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.nome.trim();
    if (!trimmedName) {
      alert('Nome do cliente é obrigatório.');
      return;
    }
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        nome: trimmedName,
        numeracao_dedos: showFingerSizing ? fingerSizes : null,
        datas_especiais: specialDates.length ? specialDates : null
      };
      const result = editingId
        ? await updateCliente(editingId, payload)
        : await saveCliente(payload);
      if (result?.error) {
        throw result.error;
      }
      setFormData(initialFormData);
      setFingerSizes(createEmptyFingerSizes());
      setShowFingerSizing(false);
      setSpecialDates([]);
      setEditingId(null);
      setActiveTab('lista');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar cliente.';
      console.error('Erro ao salvar cliente:', error);
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenDetails = (cliente: Cliente) => {
    navigate(`/clientes/${cliente.id}`);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setFingerSizes(createEmptyFingerSizes());
    setShowFingerSizing(false);
    setEditingId(null);
    setActiveTab('lista');
    navigate('/cadastro-clientes');
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormData(prev => ({ ...prev, cpf: formatted }));
  };

  const handlePhoneChange = (field: 'telefone' | 'celular') => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, [field]: formatted }));
  };

  const handleFingerToggle = (checked: boolean) => {
    setShowFingerSizing(checked);
    if (!checked) {
      setFingerSizes(createEmptyFingerSizes());
      setFormData(prev => ({ ...prev, numeracao_dedos: null }));
      return;
    }
    setFormData(prev => ({ ...prev, numeracao_dedos: fingerSizes }));
  };

  const handleFingerSizeChange = (hand: HandSide, finger: FingerKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFingerSizes((prev) => {
      const updated = {
        ...prev,
        [hand]: {
          ...prev[hand],
          [finger]: value
        }
      };
      setFormData(prevForm => ({ ...prevForm, numeracao_dedos: updated }));
      return updated;
    });
  };

  const handleNewCliente = () => {
    setFormData(initialFormData);
    setFingerSizes(createEmptyFingerSizes());
    setShowFingerSizing(false);
    setEditingId(null);
    setActiveTab('cadastro');
    navigate('/cadastro-clientes');
  };

  const filteredByCriteria = filteredClientes.filter((cliente) => {
    if (birthMonthFilter) {
      const birthMonth = getBirthMonth(cliente.data_nascimento);
      if (birthMonth !== birthMonthFilter) return false;
    }
    if (estadoCivilFilter) {
      if ((cliente.estado_civil || '') !== estadoCivilFilter) return false;
    }
    if (collectionFilter) {
      const name = cliente.nome.trim().toLowerCase();
      if (!collectionClientNames.has(name)) return false;
    }
    return true;
  });
  const estadoCivilLabel = estadoCivilFilter === 'casado'
    ? 'Casado'
    : estadoCivilFilter === 'solteiro'
      ? 'Solteiro'
      : 'Estado civil';
  const estadoCivilState = estadoCivilFilter || 'none';
  const cycleEstadoCivil = () => {
    setEstadoCivilFilter((prev) => {
      if (!prev) return 'casado';
      if (prev === 'casado') return 'solteiro';
      return '';
    });
  };
  const selectedMonthLabel = birthMonthOptions.find((month) => month.value === birthMonthFilter)?.label;
  const clearFilters = () => {
    setBirthMonthFilter('');
    setEstadoCivilFilter('');
    setCollectionFilter('');
    setShowMonthPicker(false);
  };

  return (
    <ClienteContainer>
      <PageHeader>
        <ClienteTitle>
          {activeTab === 'cadastro'
            ? editingId
              ? 'Editar Cliente'
              : 'Cadastro de Clientes'
            : 'Gestão de Clientes'}
        </ClienteTitle>
        <PageActions>
          {activeTab === 'lista' ? (
            <>
              <HeaderButtonSecondary
                type="button"
                onClick={() => setShowFilters((prev) => {
                  const next = !prev;
                  if (!next) setShowMonthPicker(false);
                  return next;
                })}
              >
                {showFilters ? 'Ocultar filtros' : 'Filtrar'}
              </HeaderButtonSecondary>
              <HeaderButtonPrimary type="button" onClick={handleNewCliente}>
                + Adicionar Cliente
              </HeaderButtonPrimary>
            </>
          ) : (
            <HeaderButtonSecondary type="button" onClick={() => setActiveTab('lista')}>
              Lista de Clientes
            </HeaderButtonSecondary>
          )}
        </PageActions>
      </PageHeader>

      {activeTab === 'cadastro' ? (
        <CadastroClientesForm
          formData={formData}
          submitting={submitting}
          isEditing={Boolean(editingId)}
          isCasado={isCasado}
          spouseOptions={spouseOptions}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onSpouseChange={(value) => setFormData((prev) => ({ ...prev, conjuge_id: value || null }))}
          onViewSpouse={(id) => navigate(`/clientes/${id}`)}
          specialDates={specialDates}
          onAddSpecialDate={addSpecialDate}
          onUpdateSpecialDate={updateSpecialDate}
          onRemoveSpecialDate={removeSpecialDate}
          showFingerSizing={showFingerSizing}
          fingerSizes={fingerSizes}
          onToggleFingerSizing={handleFingerToggle}
          onFingerSizeChange={handleFingerSizeChange}
          onCPFChange={handleCPFChange}
          onPhoneChange={handlePhoneChange}
        />
      ) : (
        <ClientesListView
          showFilters={showFilters}
          showMonthPicker={showMonthPicker}
          selectedMonthLabel={selectedMonthLabel}
          birthMonthFilter={birthMonthFilter}
          collectionFilter={collectionFilter}
          collections={collections}
          estadoCivilLabel={estadoCivilLabel}
          estadoCivilState={estadoCivilState}
          searchQuery={searchQuery}
          loading={loading}
          clientes={filteredByCriteria}
          onToggleMonthPicker={() => setShowMonthPicker((prev) => !prev)}
          onSelectMonth={(value) => {
            setBirthMonthFilter((prev) => (prev === value ? '' : value));
            setShowMonthPicker(false);
          }}
          onCollectionFilterChange={setCollectionFilter}
          onCycleEstadoCivil={cycleEstadoCivil}
          onClearFilters={clearFilters}
          onSearch={handleSearch}
          onOpenDetails={handleOpenDetails}
        />
      )}
    </ClienteContainer>
  );
}
