import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Phone, Instagram } from 'lucide-react';
import { 
  ClienteContainer,
  ClienteTitle,
  PageHeader,
  PageActions,
  HeaderButtonPrimary,
  HeaderButtonSecondary,
  FormGrid,
  FormSection,
  SectionTitle,
  ClientesList,
  ClienteCard,
  ClienteHeader,
  ClienteAvatar,
  ClienteInfo,
  ClienteInfoHeader,
  ClienteNome,
  ClienteEmail,
  ClienteDetails,
  ClienteDetailItem,
  ClienteDetailLabel,
  ClienteDetailValue,
  InstaButton,
  SearchContainer,
  SearchInput,
  SearchIcon,
  FingerToggle,
  FingerToggleInput,
  HandsGrid,
  HandCard,
  HandTitle,
  HandImage,
  FingerInputs,
  FingerField,
  FingerLabel,
  FingerInput
} from './styles';
import { 
  Cliente, 
  generoOptions, 
  estadoCivilOptions, 
  tipoPessoaOptions, 
  origemCadastroOptions,
  NumeracaoDedos,
  FingerKey,
  HandSide,
  SpecialDate
} from './types';
import { useClientes } from './hooks/useClientes';
import FormField from '../form/components/FormField';
import { PrimaryButton, SecondaryButton } from '../buttons';
import MaoDireita from '../ReferenciasVisuais/dedos/maodi.svg';
import MaoEsquerda from '../ReferenciasVisuais/dedos/maoes.svg';

type FormData = Omit<Cliente, 'id' | 'created_at' | 'updated_at'>;

const fingerLabels: { key: FingerKey; label: string }[] = [
  { key: 'polegar', label: 'Polegar' },
  { key: 'indicador', label: 'Indicador' },
  { key: 'medio', label: 'Médio' },
  { key: 'anelar', label: 'Anelar' },
  { key: 'minimo', label: 'Mindinho' }
];

const handOptions: { key: HandSide; label: string; image: string }[] = [
  { key: 'direita', label: 'Mão direita', image: MaoDireita },
  { key: 'esquerda', label: 'Mão esquerda', image: MaoEsquerda }
];

const createEmptyFingerSizes = (): NumeracaoDedos => ({
  direita: {
    polegar: '',
    indicador: '',
    medio: '',
    anelar: '',
    minimo: ''
  },
  esquerda: {
    polegar: '',
    indicador: '',
    medio: '',
    anelar: '',
    minimo: ''
  }
});

const normalizeFingerSizes = (value: unknown): NumeracaoDedos => {
  if (!value) return createEmptyFingerSizes();
  if (typeof value === 'string') {
    try {
      return normalizeFingerSizes(JSON.parse(value));
    } catch {
      return createEmptyFingerSizes();
    }
  }
  if (typeof value === 'object') {
    const record = value as Partial<NumeracaoDedos>;
    const empty = createEmptyFingerSizes();
    return {
      direita: { ...empty.direita, ...(record.direita || {}) },
      esquerda: { ...empty.esquerda, ...(record.esquerda || {}) }
    };
  }
  return createEmptyFingerSizes();
};

const hasFingerSizing = (sizes: NumeracaoDedos) =>
  Object.values(sizes).some((hand) => Object.values(hand).some((value) => String(value).trim().length > 0));

const normalizeSpecialDates = (value: unknown): SpecialDate[] => {
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      return normalizeSpecialDates(JSON.parse(value));
    } catch {
      return [];
    }
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => ({
        data: item?.data || '',
        descricao: item?.descricao || ''
      }))
      .filter((item) => item.data || item.descricao);
  }
  return [];
};

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
  const [showFingerSizing, setShowFingerSizing] = useState(false);
  const [fingerSizes, setFingerSizes] = useState<NumeracaoDedos>(createEmptyFingerSizes());
  const [specialDates, setSpecialDates] = useState<SpecialDate[]>([]);

  useEffect(() => {
    const clienteId = searchParams.get('edit');
    if (clienteId) {
      const cliente = clientes.find(c => c.id === clienteId);
      if (cliente) {
        const normalizedFingerSizes = normalizeFingerSizes(cliente.numeracao_dedos);
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
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        numeracao_dedos: showFingerSizing ? fingerSizes : null,
        datas_especiais: specialDates.length ? specialDates : null
      };
      if (editingId) {
        await updateCliente(editingId, payload);
      } else {
        await saveCliente(payload);
      }
      setFormData(initialFormData);
      setFingerSizes(createEmptyFingerSizes());
      setShowFingerSizing(false);
      setSpecialDates([]);
      setEditingId(null);
      setActiveTab('lista');
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
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

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2');
    }
    return numbers
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})/, '$1-$2');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormData(prev => ({ ...prev, cpf: formatted }));
  };

  const handlePhoneChange = (field: 'telefone' | 'celular') => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, [field]: formatted }));
  };

  const formatDate = (value?: string) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return { date, label: `${day}/${month}/${year}` };
  };

  const calculateAge = (date: Date) => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      age -= 1;
    }
    return age;
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

  const getInitials = (name: string) => {
    const parts = name.split(' ').filter(Boolean);
    const initials = parts.slice(0, 2).map((part) => part[0]).join('');
    return initials.toUpperCase() || '-';
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
              <HeaderButtonSecondary type="button">Filtrar</HeaderButtonSecondary>
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
        <form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Dados Pessoais</SectionTitle>
            <FormGrid style={{ gridTemplateColumns: '3fr 1fr', marginBottom: '1rem' }}>
              <FormField
                label="Nome Completo"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Nome do cliente"
              />
            <FormField
              label="Data de Nascimento"
              id="data_nascimento"
              name="data_nascimento"
              type="date"
              value={formData.data_nascimento || ''}
              onChange={handleChange}
            />
          </FormGrid>
          <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <button
                type="button"
                onClick={addSpecialDate}
                style={{ padding: '0.35rem 0.75rem', borderRadius: 6, border: '1px solid #d1d5db', background: '#f9fafb', cursor: 'pointer' }}
              >
                + Datas Especiais
              </button>
              <span style={{ color: '#6b7280', fontSize: 14 }}>Cadastre datas importantes e o motivo</span>
            </div>
            {specialDates.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {specialDates.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '160px 1fr 36px',
                      gap: '0.5rem',
                      alignItems: 'center'
                    }}
                  >
                    <input
                      type="date"
                      value={item.data}
                      onChange={(e) => updateSpecialDate(idx, 'data', e.target.value)}
                      style={{ padding: '0.55rem 0.75rem', borderRadius: 8, border: '1px solid #d1d5db' }}
                    />
                    <input
                      type="text"
                      value={item.descricao}
                      placeholder="Ex: Aniversário de casamento"
                      onChange={(e) => updateSpecialDate(idx, 'descricao', e.target.value)}
                      style={{ padding: '0.55rem 0.75rem', borderRadius: 8, border: '1px solid #d1d5db' }}
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecialDate(idx)}
                      style={{ border: '1px solid #ef4444', color: '#ef4444', background: 'white', borderRadius: 8, height: '100%' }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <FormGrid style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '1rem' }}>
            <FormField
              label="Gênero"
              id="genero"
              name="genero"
                value={formData.genero || ''}
                onChange={handleChange}
                options={generoOptions}
              />
              <FormField
                label="Estado Civil"
                id="estado_civil"
                name="estado_civil"
                value={formData.estado_civil || ''}
                onChange={handleChange}
                options={estadoCivilOptions}
              />
            <FormField
              label="Profissão/Ocupação"
              id="profissao"
              name="profissao"
              value={formData.profissao || ''}
              onChange={handleChange}
              placeholder="Ex: Empresário"
            />
          </FormGrid>
            {isCasado && (
              <div style={{ marginBottom: '1rem' }}>
                <FormField
                  label="Cônjuge"
                  id="conjuge_id"
                  name="conjuge_id"
                  value={formData.conjuge_id || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, conjuge_id: e.target.value || null }))}
                  options={spouseOptions}
                />
                {formData.conjuge_id && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <SecondaryButton type="button" onClick={() => navigate(`/clientes/${formData.conjuge_id}`)}>
                      Ver informações do cônjuge
                    </SecondaryButton>
                  </div>
                )}
              </div>
            )}
            <FormGrid style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '1rem' }}>
              <FormField
                label="Nacionalidade"
                id="nacionalidade"
                name="nacionalidade"
                value={formData.nacionalidade || ''}
                onChange={handleChange}
                placeholder="Ex: Brasileira"
              />
              <FormField
                label="Tipo de Pessoa"
                id="tipo_pessoa"
                name="tipo_pessoa"
                value={formData.tipo_pessoa}
                onChange={handleChange}
                options={tipoPessoaOptions}
                required
              />
              <FormField
                label="CPF/CNPJ"
                id="cpf"
                name="cpf"
                value={formData.cpf || ''}
                onChange={handleCPFChange}
                placeholder={formData.tipo_pessoa === 'fisica' ? '000.000.000-00' : '00.000.000/0000-00'}
                maxLength={formData.tipo_pessoa === 'fisica' ? 14 : 18}
              />
            </FormGrid>
            <div style={{ marginTop: '0.5rem' }}>
              <FingerToggle>
                <FingerToggleInput
                  type="checkbox"
                  checked={showFingerSizing}
                  onChange={(e) => handleFingerToggle(e.target.checked)}
                />
                Numeração dos dedos
              </FingerToggle>
              {showFingerSizing && (
                <HandsGrid>
                  {handOptions.map((hand) => (
                    <HandCard key={hand.key}>
                      <HandTitle>{hand.label}</HandTitle>
                      <HandImage src={hand.image} alt={hand.label} />
                      <FingerInputs>
                        {fingerLabels.map((finger) => {
                          const fieldId = `dedos-${hand.key}-${finger.key}`;
                          return (
                            <FingerField key={fieldId}>
                              <FingerLabel htmlFor={fieldId}>{finger.label}</FingerLabel>
                              <FingerInput
                                id={fieldId}
                                type="text"
                                inputMode="decimal"
                                value={fingerSizes[hand.key][finger.key]}
                                onChange={handleFingerSizeChange(hand.key, finger.key)}
                                placeholder="--"
                              />
                            </FingerField>
                          );
                        })}
                      </FingerInputs>
                    </HandCard>
                  ))}
                </HandsGrid>
              )}
            </div>
          </FormSection>

          <FormSection>
            <SectionTitle>Contato</SectionTitle>
            <FormGrid>
              <FormField
                label="Email"
                id="email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="email@exemplo.com"
              />
              <FormField
                label="Telefone Fixo"
                id="telefone"
                name="telefone"
                value={formData.telefone || ''}
                onChange={handlePhoneChange('telefone')}
                placeholder="(00) 0000-0000"
                maxLength={14}
              />
              <FormField
                label="Celular"
                id="celular"
                name="celular"
                value={formData.celular || ''}
                onChange={handlePhoneChange('celular')}
                placeholder="(00) 00000-0000"
                maxLength={15}
              />
              <FormField
                label="Endereço"
                id="endereco"
                name="endereco"
                value={formData.endereco || ''}
                onChange={handleChange}
                placeholder="Rua, número, bairro, cidade - UF"
              />
              <FormField
                label="Instagram"
                id="instagram"
                name="instagram"
                type="url"
                value={formData.instagram || ''}
                onChange={handleChange}
                placeholder="https://instagram.com/usuario"
              />
              <FormField
                label="Facebook"
                id="facebook"
                name="facebook"
                type="url"
                value={formData.facebook || ''}
                onChange={handleChange}
                placeholder="https://facebook.com/usuario"
              />
              <FormField
                label="Site da Empresa"
                id="site_empresa"
                name="site_empresa"
                type="url"
                value={formData.site_empresa || ''}
                onChange={handleChange}
                placeholder="https://www.empresa.com.br"
              />
            </FormGrid>
          </FormSection>

          <FormSection>
            <SectionTitle>Origem do Cadastro</SectionTitle>
            <FormGrid style={{ gridTemplateColumns: '1fr 3fr'}}>
              <FormField
                label="Como conheceu?"
                id="origem_cadastro"
                name="origem_cadastro"
                value={formData.origem_cadastro || ''}
                onChange={handleChange}
                options={origemCadastroOptions}
              />
              <FormField
                label="Indicado por"
                id="indicado_por"
                name="indicado_por"
                value={formData.indicado_por || ''}
                onChange={handleChange}
                placeholder="Nome de quem indicou (se aplicável)"
              />
            </FormGrid>
          </FormSection>

          <FormSection>
            <SectionTitle>Observações</SectionTitle>
            <FormGrid>
              <div style={{ gridColumn: '1 / -1' }}>
                <FormField
                  label="Obs."
                  id="observacao"
                  name="observacao"
                  value={formData.observacao || ''}
                  onChange={handleChange}
                  isTextArea
                  rows={4}
                  placeholder="Observações adicionais sobre o cliente"
                />
              </div>
            </FormGrid>
          </FormSection>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <SecondaryButton type="button" onClick={handleCancel}>
              Cancelar
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={submitting}>
              {submitting ? 'Salvando...' : editingId ? 'Atualizar' : 'Cadastrar'}
            </PrimaryButton>
          </div>
        </form>
      ) : (
        <>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Pesquisar clientes..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <SearchIcon>
              <Search size={16} />
            </SearchIcon>
          </SearchContainer>

          {loading ? (
            <p>Carregando...</p>
          ) : filteredClientes.length === 0 ? (
            <p>Nenhum cliente encontrado.</p>
          ) : (
            <ClientesList>
              {filteredClientes.map((cliente) => {
                const rawPhone = cliente.celular || cliente.telefone || '';
                const phone = rawPhone || '-';
                const instagram = (cliente.instagram || '').trim();
                const instagramLink = instagram
                  ? instagram.startsWith('http')
                    ? instagram
                    : `https://instagram.com/${instagram.replace('@', '')}`
                  : '';
                const email = (cliente.email || '').trim();
                const initials = getInitials(cliente.nome);

                return (
                  <ClienteCard key={cliente.id} onClick={() => handleOpenDetails(cliente)}>
                    <ClienteHeader>
                      <ClienteAvatar>{initials}</ClienteAvatar>
                      <ClienteInfoHeader>
                        <ClienteNome>{cliente.nome}</ClienteNome>
                        {email && <ClienteEmail>{email}</ClienteEmail>}
                      </ClienteInfoHeader>
                    </ClienteHeader>
                    <ClienteInfo>
                      <ClienteDetails>
                        <ClienteDetailItem>
                          <Phone size={16} />
                          <span>
                            <ClienteDetailLabel>Telefone:</ClienteDetailLabel>
                            <ClienteDetailValue>{phone}</ClienteDetailValue>
                          </span>
                        </ClienteDetailItem>
                        {instagramLink && (
                          <ClienteDetailItem>
                            <Instagram size={16} />
                            <InstaButton
                              href={instagramLink}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Instagram
                            </InstaButton>
                          </ClienteDetailItem>
                        )}
                      </ClienteDetails>
                    </ClienteInfo>
                  </ClienteCard>
                );
              })}
            </ClientesList>
          )}
        </>
      )}
    </ClienteContainer>
  );
}
