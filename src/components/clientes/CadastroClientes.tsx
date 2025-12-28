import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ClienteContainer, 
  ClienteTitle, 
  FormGrid, 
  FormSection, 
  SectionTitle,
  ClientesList,
  ClienteCard,
  ClienteInfo,
  ClienteNome,
  ClienteDetails,
  ClienteActions,
  SearchInput,
  TabContainer,
  Tab
} from './styles';
import { 
  Cliente, 
  generoOptions, 
  estadoCivilOptions, 
  tipoPessoaOptions, 
  origemCadastroOptions 
} from './types';
import { useClientes } from './hooks/useClientes';
import FormField from '../form/components/FormField';
import { PrimaryButton, SecondaryButton, DangerButton } from '../buttons';

type FormData = Omit<Cliente, 'id' | 'created_at' | 'updated_at'>;

const initialFormData: FormData = {
  nome: '',
  endereco: '',
  telefone: '',
  celular: '',
  data_nascimento: '',
  email: '',
  cpf: '',
  genero: 'nao_informado',
  estado_civil: 'solteiro',
  profissao: '',
  nacionalidade: 'Brasileira',
  tipo_pessoa: 'fisica',
  origem_cadastro: 'loja_fisica',
  indicado_por: ''
};

export default function CadastroClientes() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clientes, loading, saveCliente, updateCliente, deleteCliente, searchClientes } = useClientes();
  
  const [activeTab, setActiveTab] = useState<'cadastro' | 'lista'>('cadastro');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const clienteId = searchParams.get('edit');
    if (clienteId) {
      const cliente = clientes.find(c => c.id === clienteId);
      if (cliente) {
        setFormData({
          nome: cliente.nome,
          endereco: cliente.endereco || '',
          telefone: cliente.telefone || '',
          celular: cliente.celular || '',
          data_nascimento: cliente.data_nascimento || '',
          email: cliente.email || '',
          cpf: cliente.cpf || '',
          genero: cliente.genero || 'nao_informado',
          estado_civil: cliente.estado_civil || 'solteiro',
          profissao: cliente.profissao || '',
          nacionalidade: cliente.nacionalidade || 'Brasileira',
          tipo_pessoa: cliente.tipo_pessoa || 'fisica',
          origem_cadastro: cliente.origem_cadastro || 'loja_fisica',
          indicado_por: cliente.indicado_por || ''
        });
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
      if (editingId) {
        await updateCliente(editingId, formData);
      } else {
        await saveCliente(formData);
      }
      setFormData(initialFormData);
      setEditingId(null);
      setActiveTab('lista');
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (cliente: Cliente) => {
    navigate(`/cadastro-clientes?edit=${cliente.id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      await deleteCliente(id);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setEditingId(null);
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

  return (
    <ClienteContainer>
      <ClienteTitle>{editingId ? 'Editar Cliente' : 'Cadastro de Clientes'}</ClienteTitle>

      <TabContainer>
        <Tab $active={activeTab === 'cadastro'} onClick={() => setActiveTab('cadastro')}>
          {editingId ? 'Editar' : 'Novo Cliente'}
        </Tab>
        <Tab $active={activeTab === 'lista'} onClick={() => setActiveTab('lista')}>
          Lista de Clientes
        </Tab>
      </TabContainer>

      {activeTab === 'cadastro' ? (
        <form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Dados Pessoais</SectionTitle>
            <FormGrid>
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
                label="CPF/CNPJ"
                id="cpf"
                name="cpf"
                value={formData.cpf || ''}
                onChange={handleCPFChange}
                placeholder={formData.tipo_pessoa === 'fisica' ? '000.000.000-00' : '00.000.000/0000-00'}
                maxLength={formData.tipo_pessoa === 'fisica' ? 14 : 18}
              />
              <FormField
                label="Data de Nascimento"
                id="data_nascimento"
                name="data_nascimento"
                type="date"
                value={formData.data_nascimento || ''}
                onChange={handleChange}
              />
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
            </FormGrid>
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
            </FormGrid>
          </FormSection>

          <FormSection>
            <SectionTitle>Origem do Cadastro</SectionTitle>
            <FormGrid>
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
          <SearchInput
            type="text"
            placeholder="Buscar por nome, email ou CPF..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />

          {loading ? (
            <p>Carregando...</p>
          ) : filteredClientes.length === 0 ? (
            <p>Nenhum cliente encontrado.</p>
          ) : (
            <ClientesList>
              {filteredClientes.map((cliente) => (
                <ClienteCard key={cliente.id}>
                  <ClienteInfo>
                    <ClienteNome>{cliente.nome}</ClienteNome>
                    <ClienteDetails>
                      {cliente.email && `${cliente.email} • `}
                      {cliente.celular || cliente.telefone}
                      {cliente.cpf && ` • ${cliente.cpf}`}
                    </ClienteDetails>
                  </ClienteInfo>
                  <ClienteActions>
                    <SecondaryButton onClick={() => handleEdit(cliente)}>
                      Editar
                    </SecondaryButton>
                    <DangerButton onClick={() => handleDelete(cliente.id)}>
                      Excluir
                    </DangerButton>
                  </ClienteActions>
                </ClienteCard>
              ))}
            </ClientesList>
          )}
        </>
      )}
    </ClienteContainer>
  );
}

