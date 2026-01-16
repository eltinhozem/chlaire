import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { PrimaryButton, SecondaryButton, DangerButton } from '../buttons'
import type { Cliente } from './types'
import { categoryOptions } from '../form/formOptions'
import { Stone as JewelryStone } from '../pedra/types'
import { formatDateLabel, formatDateString, calculateAge } from '../../lib/dateUtils'
import { normalizeStones } from '../../lib/jewelryUtils'
import { fingerLabels, handLabels } from './constants'
import { hasFingerSizing, normalizeSpecialDates, parseFingerSizes } from './utils'
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

const formatCategory = (category?: string) => CATEGORY_LABEL_MAP[category || ''] || category || '-'

export default function ClienteInfo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [conjuge, setConjuge] = useState<Cliente | null>(null)
  const [joias, setJoias] = useState<Jewelry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  const fingerSizes = useMemo(() => parseFingerSizes(cliente?.numeracao_dedos), [cliente])
  const hasFingerData = hasFingerSizing(fingerSizes)
  const birth = formatDateLabel(cliente?.data_nascimento)
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
              const formatted = formatDateLabel(item.data)?.label || item.data
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
                  {normalizeStones<JewelryStone>(joia.stones)
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
                  {joia.created_at && <span>Criado em: {formatDateString(joia.created_at)}</span>}
                </JewelryMeta>
              </JewelryCard>
            ))}
          </JewelryGrid>
        )}
      </FormSection>
    </ClienteContainer>
  )
}
