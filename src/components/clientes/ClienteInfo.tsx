import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { PrimaryButton, SecondaryButton, DangerButton } from '../buttons'
import type { Cliente, FingerKey, HandSide, NumeracaoDedos, SpecialDate } from './types'
import { categoryOptions } from '../form/formOptions'
import { Stone as JewelryStone } from '../pedra/types'
import {
  ClienteContainer,
  FormSection,
  SectionTitle,
  DetailHeader,
  DetailActions,
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  JewelryGrid,
  JewelryCard,
  JewelryTitle,
  JewelryMeta,
  EmptyState
} from './styles'

const CATEGORY_LABEL_MAP = categoryOptions.reduce<Record<string, string>>((acc, item) => {
  acc[item.value] = item.label
  return acc
}, {})

type Jewelry = {
  id: string
  reference_name?: string
  category?: string
  rota?: string
  created_at?: string
  image_url?: string | null
  collection_id?: string | null
  collection?: { id: string; name: string } | null
  stones?: unknown
  [key: string]: unknown
}

const fingerLabels: { key: FingerKey; label: string }[] = [
  { key: 'polegar', label: 'Polegar' },
  { key: 'indicador', label: 'Indicador' },
  { key: 'medio', label: 'Médio' },
  { key: 'anelar', label: 'Anelar' },
  { key: 'minimo', label: 'Mindinho' }
]

const handLabels: { key: HandSide; label: string }[] = [
  { key: 'direita', label: 'Mão direita' },
  { key: 'esquerda', label: 'Mão esquerda' }
]

const normalizeFingerSizes = (value: unknown): NumeracaoDedos | null => {
  if (!value) return null
  if (typeof value === 'string') {
    try {
      return normalizeFingerSizes(JSON.parse(value))
    } catch {
      return null
    }
  }
  if (typeof value === 'object') {
    const record = value as Partial<NumeracaoDedos>
    return {
      direita: {
        polegar: record.direita?.polegar || '',
        indicador: record.direita?.indicador || '',
        medio: record.direita?.medio || '',
        anelar: record.direita?.anelar || '',
        minimo: record.direita?.minimo || ''
      },
      esquerda: {
        polegar: record.esquerda?.polegar || '',
        indicador: record.esquerda?.indicador || '',
        medio: record.esquerda?.medio || '',
        anelar: record.esquerda?.anelar || '',
        minimo: record.esquerda?.minimo || ''
      }
    }
  }
  return null
}

const hasFingerSizing = (sizes: NumeracaoDedos | null) => {
  if (!sizes) return false
  return Object.values(sizes).some((hand) =>
    Object.values(hand).some((value) => String(value).trim().length > 0)
  )
}

const formatDate = (value?: string) => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return { date, label: `${day}/${month}/${year}` }
}

const calculateAge = (date: Date) => {
  const today = new Date()
  let age = today.getFullYear() - date.getFullYear()
  const monthDiff = today.getMonth() - date.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age -= 1
  }
  return age
}

const formatJewelryDate = (value?: string) => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const normalizeSpecialDates = (value: unknown): SpecialDate[] => {
  if (!value) return []
  if (typeof value === 'string') {
    try {
      return normalizeSpecialDates(JSON.parse(value))
    } catch {
      return []
    }
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => ({
        data: item?.data || '',
        descricao: item?.descricao || ''
      }))
      .filter((item) => item.data || item.descricao)
  }
  return []
}

const parseStonesField = (value: unknown): JewelryStone[] => {
  if (!value) return []
  if (typeof value === 'string') {
    try {
      return parseStonesField(JSON.parse(value))
    } catch {
      return []
    }
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => item as JewelryStone)
      .filter((item) => item && typeof item === 'object')
  }
  if (typeof value === 'object') {
    return [value as JewelryStone]
  }
  return []
}

const formatCategory = (category?: string) => CATEGORY_LABEL_MAP[category || ''] || category || '-'

export default function ClienteInfo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [conjuge, setConjuge] = useState<Cliente | null>(null)
  const [joias, setJoias] = useState<Jewelry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  const fingerSizes = useMemo(() => normalizeFingerSizes(cliente?.numeracao_dedos), [cliente])
  const hasFingerData = hasFingerSizing(fingerSizes)
  const birth = formatDate(cliente?.data_nascimento)
  const age = birth ? calculateAge(birth.date) : null
  const specialDates = useMemo(() => normalizeSpecialDates(cliente?.datas_especiais), [cliente])
  const sortedJoias = useMemo(() => {
    return [...joias].sort((a, b) => {
      const aHasCollection = Boolean(a.collection_id);
      const bHasCollection = Boolean(b.collection_id);
      if (aHasCollection !== bHasCollection) {
        return aHasCollection ? -1 : 1;
      }
      const aDate = a.created_at ? new Date(a.created_at).getTime() : 0;
      const bDate = b.created_at ? new Date(b.created_at).getTime() : 0;
      return bDate - aDate;
    });
  }, [joias]);

  useEffect(() => {
    const load = async () => {
      if (!id) return
      setLoading(true)
      setError('')
      setConjuge(null)
      try {
        const { data: clienteData, error: clienteError } = await supabase
          .from('clientes')
          .select('*')
          .eq('id', id)
          .single()

        if (clienteError) throw clienteError
        setCliente(clienteData as Cliente)
        if (clienteData?.conjuge_id) {
          const { data: conjugeData } = await supabase
            .from('clientes')
            .select('id,nome,conjuge_id')
            .eq('id', clienteData.conjuge_id)
            .maybeSingle()
          if (conjugeData) {
            setConjuge(conjugeData as Cliente)
          }
        }

        const name = clienteData?.nome?.trim()
        if (!name) {
          setJoias([])
          return
        }

        const { data: joiasData, error: joiasError } = await supabase
          .from('jewelry')
          .select('*, collection:collections(id,name)')
          .ilike('client_name', name)
          .order('created_at', { ascending: false })

        if (joiasError) throw joiasError
        setJoias((joiasData || []) as Jewelry[])
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Erro ao carregar cliente'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  const handleDelete = async () => {
    if (!cliente) return
    if (!window.confirm(`Tem certeza que deseja excluir ${cliente.nome}?`)) return
    const { error: deleteError } = await supabase
      .from('clientes')
      .delete()
      .eq('id', cliente.id)

    if (deleteError) {
      const message = deleteError.message || 'Erro ao excluir cliente.'
      setError(message)
      return
    }

    navigate('/cadastro-clientes')
  }

  if (loading) {
    return (
      <ClienteContainer>
        <EmptyState>Carregando...</EmptyState>
      </ClienteContainer>
    )
  }

  if (!cliente) {
    return (
      <ClienteContainer>
        <EmptyState>{error || 'Cliente não encontrado.'}</EmptyState>
        <SecondaryButton type="button" onClick={() => navigate('/cadastro-clientes')}>
          Voltar
        </SecondaryButton>
      </ClienteContainer>
    )
  }

  return (
    <ClienteContainer>
      <DetailHeader>
        <div>
          <SectionTitle>{cliente.nome}</SectionTitle>
          {birth && (
            <EmptyState>
              Nascimento: {birth.label}
              {age !== null && <span style={{ color: '#2563eb', marginLeft: 6 }}>{age} anos</span>}
            </EmptyState>
          )}
        </div>
        <DetailActions>
          <SecondaryButton type="button" onClick={() => navigate('/cadastro-clientes')}>
            Voltar
          </SecondaryButton>
          <PrimaryButton type="button" onClick={() => navigate(`/cadastro-clientes?edit=${cliente.id}`)}>
            Editar
          </PrimaryButton>
          <DangerButton type="button" onClick={handleDelete}>
            Excluir
          </DangerButton>
        </DetailActions>
      </DetailHeader>

      <FormSection>
        <SectionTitle>Informações Pessoais</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>CPF/CNPJ</DetailLabel>
            <DetailValue>{cliente.cpf || '-'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Gênero</DetailLabel>
            <DetailValue>{cliente.genero || '-'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Estado Civil</DetailLabel>
            <DetailValue>{cliente.estado_civil || '-'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Cônjuge</DetailLabel>
            <DetailValue>
              {cliente.conjuge_id && conjuge ? (
                <button
                  type="button"
                  onClick={() => navigate(`/clientes/${conjuge.id}`)}
                  style={{ color: '#2563eb', textDecoration: 'underline' }}
                >
                  {conjuge.nome}
                </button>
              ) : (
                '-'
              )}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Profissão</DetailLabel>
            <DetailValue>{cliente.profissao || '-'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Nacionalidade</DetailLabel>
            <DetailValue>{cliente.nacionalidade || '-'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Tipo de Pessoa</DetailLabel>
            <DetailValue>{cliente.tipo_pessoa || '-'}</DetailValue>
          </DetailItem>
        </DetailGrid>
      </FormSection>

      <FormSection>
        <SectionTitle>Contato</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>Email</DetailLabel>
            <DetailValue>{cliente.email || '-'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Telefone</DetailLabel>
            <DetailValue>{cliente.telefone || '-'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Celular</DetailLabel>
            <DetailValue>{cliente.celular || '-'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Endereço</DetailLabel>
            <DetailValue>{cliente.endereco || '-'}</DetailValue>
          </DetailItem>
        </DetailGrid>
      </FormSection>

      <FormSection>
        <SectionTitle>Redes Sociais</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>Instagram</DetailLabel>
            <DetailValue>
              {cliente.instagram ? (
                <a href={cliente.instagram} target="_blank" rel="noreferrer">
                  {cliente.instagram}
                </a>
              ) : (
                '-'
              )}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Facebook</DetailLabel>
            <DetailValue>
              {cliente.facebook ? (
                <a href={cliente.facebook} target="_blank" rel="noreferrer">
                  {cliente.facebook}
                </a>
              ) : (
                '-'
              )}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Site</DetailLabel>
            <DetailValue>
              {cliente.site_empresa ? (
                <a href={cliente.site_empresa} target="_blank" rel="noreferrer">
                  {cliente.site_empresa}
                </a>
              ) : (
                '-'
              )}
            </DetailValue>
          </DetailItem>
        </DetailGrid>
      </FormSection>

      <FormSection>
        <SectionTitle>Numeração dos Dedos</SectionTitle>
        {hasFingerData && fingerSizes ? (
          <DetailGrid>
            {handLabels.map((hand) => (
              <DetailItem key={hand.key}>
                <DetailLabel>{hand.label}</DetailLabel>
                <DetailValue>
                  {fingerLabels
                    .map((finger) => {
                      const value = fingerSizes[hand.key][finger.key]
                      return value ? `${finger.label}: ${value}` : null
                    })
                    .filter(Boolean)
                    .join(' • ') || '-'}
                </DetailValue>
              </DetailItem>
            ))}
          </DetailGrid>
        ) : (
          <EmptyState>Sem numeração registrada.</EmptyState>
        )}
      </FormSection>

      <FormSection>
        <SectionTitle>Datas Especiais</SectionTitle>
        {specialDates.length === 0 ? (
          <EmptyState>Sem datas registradas.</EmptyState>
        ) : (
          <DetailGrid>
            {specialDates.map((item, idx) => {
              const formatted = formatDate(item.data)?.label || item.data
              return (
                <DetailItem key={`${item.data}-${idx}`}>
                  <DetailLabel>{formatted || 'Data'}</DetailLabel>
                  <DetailValue>{item.descricao || '-'}</DetailValue>
                </DetailItem>
              )
            })}
          </DetailGrid>
        )}
      </FormSection>

      <FormSection>
        <SectionTitle>Observações</SectionTitle>
        <DetailItem>
          <DetailValue>{cliente.observacao || '-'}</DetailValue>
        </DetailItem>
      </FormSection>

      <FormSection>
        <SectionTitle>Joias Compradas</SectionTitle>
        {joias.length === 0 ? (
          <EmptyState>Sem joias registradas para este cliente.</EmptyState>
        ) : (
          <JewelryGrid>
            {sortedJoias.map((joia) => (
              <JewelryCard
                key={joia.id}
                type="button"
                $highlight={Boolean(joia.collection_id)}
                onClick={() => navigate('/info', { state: { product: joia } })}
              >
                <JewelryTitle>{joia.reference_name || 'Joia'}</JewelryTitle>
                <JewelryMeta>
                  {joia.collection?.name && <span>Coleção: {joia.collection.name}</span>}
                  {joia.category && <span>Categoria: {formatCategory(joia.category)}</span>}
                  {parseStonesField(joia.stones)
                    .map((stone) => stone?.stone_type)
                    .filter(Boolean)
                    .reduce<string[]>((acc, current) => {
                      if (current && !acc.includes(current)) acc.push(current)
                      return acc
                    }, [])
                    .map((stoneType, idx) => (
                      <span key={`${stoneType}-${idx}`}>Pedra: {stoneType}</span>
                    ))}
                  {joia.rota && <span>Rota: {joia.rota}</span>}
                  {joia.created_at && <span>Criado em: {formatJewelryDate(joia.created_at)}</span>}
                </JewelryMeta>
              </JewelryCard>
            ))}
          </JewelryGrid>
        )}
      </FormSection>
    </ClienteContainer>
  )
}
