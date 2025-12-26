import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Gem, Gauge, Plus, Trash2, Clock3, ChevronDown, ChevronUp } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { PrimaryButton } from '../buttons/PrimaryButton'
import { SecondaryButton } from '../buttons/SecondaryButton'
import { DangerButton } from '../buttons/DangerButton'
import {
  PageContainer,
  Header,
  HeaderText,
  Title,
  Subtitle,
  MainGrid,
  LeftColumn,
  SectionCard,
  SectionTitle,
  SectionHeader,
  ActionsRow,
  ButtonsRow,
  PriceGrid,
  Label,
  Input,
  SubsectionTitle,
  RadioOptions,
  RadioOption,
  RadioInput,
  ColorDot,
  OptionLabel,
  PreviewCard,
  PreviewValue,
  SmallText,
  HelperText,
  StatusChip,
  ValuesGrid,
  Divider,
  StoneList,
  StoneCard,
  StoneHeader,
  InlineActions,
  FormRow,
  StoneMetricsGrid,
  Metric,
  MetricLabel,
  MetricValue,
  Tag,
  SummaryCard,
  SummaryGroup,
  SummaryLine,
  SummaryLabel,
  SummaryValue,
  HighlightValue,
  Pill,
  Formula,
  ToggleButton,
  TableWrapper,
  ConversionGrid,
  TableCol,
  TableHeader,
  TableRow,
  TitleRow,
  HeaderActions,
  ValueSection
} from './styles'
import {
  StonePriceTiers,
  stoneConversionTable,
  mmToCt,
  getStonePricePerCt,
  getStoneTierName
} from './stoneConversionTable'

type GoldType = 'yellow' | 'white' | 'rose'

interface GoldPrices {
  yellow: number
  white: number
  rose: number
}

export interface Stone {
  id: string
  quantity: number
  sizeMm: number
  ctPerStone: number
  totalCt: number
  pricePerCt: number
  totalPrice: number
  tierName: string
}

interface ProductStoneInput {
  quantity?: number | string
  quilates?: number | string
  pts?: number | string
}

interface ProductData {
  weight?: number | string
  material?: string
  stones?: ProductStoneInput[]
  reference_name?: string
  category?: string
  client_name?: string
  rota?: string
}

const goldOptions: Array<{ value: GoldType; label: string; color: string }> = [
  { value: 'yellow', label: 'Ouro Amarelo', color: '#c08a3f' },
  { value: 'white', label: 'Ouro Branco', color: '#d7d7d7' },
  { value: 'rose', label: 'Ouro Rosé', color: '#d48c7b' }
]

const stoneTierOptions: Array<{ key: keyof StonePriceTiers; description: string }> = [
  { key: 'tier1', description: 'Pedras Até 0.07 ct' },
  { key: 'tier2', description: 'Pedras 0.08 a 0.725 ct' },
  { key: 'tier3', description: 'Pedras Acima de 0.725 ct' }
]

const mapMaterialToGoldType = (material?: string): GoldType => {
  const normalized = (material || '').toLowerCase()
  if (normalized.includes('branco')) return 'white'
  if (normalized.includes('rose') || normalized.includes('rosé')) return 'rose'
  return 'yellow'
}

const ctToMm = (ct: number): number => {
  if (!ct || ct <= 0) return 0
  const sorted = [...stoneConversionTable].sort((a, b) => a.ct - b.ct)

  if (ct <= sorted[0].ct) return sorted[0].mm
  if (ct >= sorted[sorted.length - 1].ct) return sorted[sorted.length - 1].mm

  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i]
    const next = sorted[i + 1]
    if (ct >= current.ct && ct <= next.ct) {
      const ratio = (ct - current.ct) / (next.ct - current.ct)
      return current.mm + ratio * (next.mm - current.mm)
    }
  }

  return sorted[sorted.length - 1].mm
}

const generateId = () => Math.random().toString(36).substring(2, 9)

const createEmptyStone = (): Stone => ({
  id: generateId(),
  quantity: 1,
  sizeMm: 0,
  ctPerStone: 0,
  totalCt: 0,
  pricePerCt: 0,
  totalPrice: 0,
  tierName: ''
})

const parseNumber = (raw: string): number | null => {
  if (!raw) return null
  const normalized = raw.replace(/\s+/g, '').replace(',', '.')
  const parsed = parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

const guessGoldTypeFromText = (text?: string): GoldType | undefined => {
  if (!text) return undefined
  const upper = text.toUpperCase()
  const idxRose = [upper.indexOf('ROSE'), upper.indexOf('ROSÉ')].filter((i) => i >= 0)
  const idxBranco = upper.indexOf('BRANCO')
  const idxAmarelo = upper.indexOf('AMARELO')

  const candidates: Array<{ type: GoldType; index: number }> = []
  if (idxBranco >= 0) candidates.push({ type: 'white', index: idxBranco })
  if (idxRose.length > 0) candidates.push({ type: 'rose', index: Math.min(...idxRose) })
  if (idxAmarelo >= 0) candidates.push({ type: 'yellow', index: idxAmarelo })

  if (candidates.length === 0) return undefined

  return candidates.sort((a, b) => a.index - b.index)[0].type
}

const parseTxtData = (
  content: string
): {
  goldType?: GoldType
  weight?: number
  stones: Array<{ quantity: number; sizeMm: number }>
} => {
  const normalized = content.replace(/\r/g, '')

  const materialMatch = normalized.match(/MATERIAL\s*:\s*([^\n]+)/i)
  const goldType = guessGoldTypeFromText(materialMatch?.[1])

  const weightMatch = normalized.match(/PESO\s*:\s*([\d.,]+)/i)
  const weight = weightMatch ? parseNumber(weightMatch[1]) || undefined : undefined

  const stones: Array<{ quantity: number; sizeMm: number }> = []
  const diamondMatches = [...normalized.matchAll(/DIAMANTE\s*:\s*([^\n]+)/gi)]

  diamondMatches.forEach((match) => {
    const line = match[1]
    const entries = [...line.matchAll(/(\d+(?:[,.]\d+)?)\s*DE\s*([\d.,]+)\s*mm/gi)]
    entries.forEach((entry) => {
      const qty = parseNumber(entry[1])
      const sizeMm = parseNumber(entry[2])
      if (!qty || !sizeMm) return
      stones.push({ quantity: Math.round(qty), sizeMm })
    })
  })

  return { goldType, weight, stones }
}

interface StoneEntryProps {
  stone: Stone
  stonePrices: StonePriceTiers
  onUpdate: (stone: Stone) => void
  onRemove: (id: string) => void
  canRemove: boolean
}

function StoneEntry({ stone, stonePrices, onUpdate, onRemove, canRemove }: StoneEntryProps) {
  const [quantity, setQuantity] = useState<number>(stone.quantity || 1)
  const [sizeMm, setSizeMm] = useState<number>(stone.sizeMm || 0)

  useEffect(() => {
    const ctPerStone = mmToCt(sizeMm)
    const totalCt = ctPerStone * quantity
    const pricePerCt = getStonePricePerCt(ctPerStone, stonePrices)
    const totalPrice = totalCt * pricePerCt
    const tierName = getStoneTierName(ctPerStone)

    onUpdate({
      ...stone,
      quantity,
      sizeMm,
      ctPerStone,
      totalCt,
      pricePerCt,
      totalPrice,
      tierName
    })
  }, [quantity, sizeMm, stonePrices, onUpdate, stone.id])

  return (
    <StoneCard>
      <StoneHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Gem size={18} />
          <span>Pedra</span>
          {stone.tierName && <Tag>{stone.tierName}</Tag>}
        </div>

        <InlineActions>
          {canRemove && (
            <DangerButton type="button" onClick={() => onRemove(stone.id)}>
              <Trash2 size={16} style={{ marginRight: 6 }} />
              Remover
            </DangerButton>
          )}
        </InlineActions>
      </StoneHeader>

      <FormRow>
        <div>
          <Label>Quantidade</Label>
          <Input
            type="number"
            min="1"
            step="1"
            value={quantity || ''}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          />
        </div>
        <div>
          <Label>Tamanho (mm)</Label>
          <Input
            type="number"
            min="0"
            step="0.1"
            value={sizeMm || ''}
            onChange={(e) => setSizeMm(parseFloat(e.target.value) || 0)}
          />
        </div>
      </FormRow>

      {sizeMm > 0 && (
        <StoneMetricsGrid>
          <Metric>
            <MetricLabel>ct/pedra</MetricLabel>
            <MetricValue>{stone.ctPerStone.toFixed(3)}</MetricValue>
          </Metric>
          <Metric>
            <MetricLabel>Total ct</MetricLabel>
            <MetricValue>{stone.totalCt.toFixed(3)}</MetricValue>
          </Metric>
          <Metric>
            <MetricLabel>Preço/ct</MetricLabel>
            <MetricValue>R$ {stone.pricePerCt.toFixed(2)}</MetricValue>
          </Metric>
          <Metric>
            <MetricLabel>Subtotal</MetricLabel>
            <MetricValue>R$ {stone.totalPrice.toFixed(2)}</MetricValue>
          </Metric>
        </StoneMetricsGrid>
      )}
    </StoneCard>
  )
}

function ConversionTable() {
  const [isOpen, setIsOpen] = useState(false)
  const halfIndex = Math.ceil(stoneConversionTable.length / 2)
  const left = stoneConversionTable.slice(0, halfIndex)
  const right = stoneConversionTable.slice(halfIndex)

  return (
    <SectionCard>
      <ToggleButton type="button" onClick={() => setIsOpen((prev) => !prev)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Gauge size={18} />
          Tabela de Conversão mm → ct
        </span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </ToggleButton>

      {isOpen && (
        <TableWrapper>
          <ConversionGrid>
            {[left, right].map((column, idx) => (
              <TableCol key={idx}>
                <TableHeader>
                  <span>Pontos</span>
                  <span>mm</span>
                  <span>ct</span>
                </TableHeader>
                {column.map((entry) => (
                  <TableRow key={entry.points}>
                    <span>{entry.points}</span>
                    <span>{entry.mm.toFixed(1)}</span>
                    <span>{entry.ct.toFixed(3)}</span>
                  </TableRow>
                ))}
              </TableCol>
            ))}
          </ConversionGrid>
        </TableWrapper>
      )}
    </SectionCard>
  )
}

interface CalculationSummaryProps {
  selectedGold: GoldType
  goldLabel: string
  goldWeight: number
  goldPrice: number
  goldValue: number
  stonesValue: number
  totalValue: number
  totalCt: number
  totalQty: number
  validStones: Stone[]
}

function CalculationSummary({
  selectedGold,
  goldLabel,
  goldWeight,
  goldPrice,
  goldValue,
  stonesValue,
  totalValue,
  totalCt,
  totalQty,
  validStones
}: CalculationSummaryProps) {
  const selectedGoldColor =
    goldOptions.find((g) => g.value === selectedGold)?.color || '#c08a3f'

  return (
    <SummaryCard>
      <SummaryGroup>
        <SummaryLine>
          <SummaryLabel>Tipo de ouro</SummaryLabel>
          <Pill>
            <ColorDot $color={selectedGoldColor} />
            {goldLabel}
          </Pill>
        </SummaryLine>
        <SummaryLine>
          <SummaryLabel>Peso</SummaryLabel>
          <SummaryValue>{goldWeight.toFixed(2)} g</SummaryValue>
        </SummaryLine>
        <SummaryLine>
          <SummaryLabel>Preço/g</SummaryLabel>
          <SummaryValue>R$ {goldPrice.toFixed(2)}</SummaryValue>
        </SummaryLine>
        <SummaryLine>
          <SummaryLabel>Subtotal ouro</SummaryLabel>
          <SummaryValue>R$ {goldValue.toFixed(2)}</SummaryValue>
        </SummaryLine>
      </SummaryGroup>

      <Divider />

      <SummaryGroup>
        <SummaryLine>
          <SummaryLabel>Pedras ({totalQty})</SummaryLabel>
          <SummaryValue>{totalCt.toFixed(3)} ct</SummaryValue>
        </SummaryLine>
        <SummaryLine>
          <SummaryLabel>Subtotal pedras</SummaryLabel>
          <SummaryValue>R$ {stonesValue.toFixed(2)}</SummaryValue>
        </SummaryLine>
      </SummaryGroup>

      <Divider />

      <SummaryGroup>
        <SummaryLabel>Total da joia</SummaryLabel>
        <HighlightValue>R$ {totalValue.toFixed(2)}</HighlightValue>
      </SummaryGroup>

      <Formula>
        <strong>Cálculo:</strong>{' '}
        ({goldWeight.toFixed(2)}g × R$ {goldPrice.toFixed(2)}/g)
        {validStones.length > 0 && (
          <>
            {' + '}
            {validStones.map((s, idx) => (
              <span key={s.id}>
                ({s.totalCt.toFixed(3)}ct × R$ {s.pricePerCt.toFixed(2)}/ct)
                {idx < validStones.length - 1 ? ' + ' : ''}
              </span>
            ))}
          </>
        )}{' '}
        = <strong>R$ {totalValue.toFixed(2)}</strong>
      </Formula>
    </SummaryCard>
  )
}

export default function CalculadoraJoia() {
  const location = useLocation()
  const product = (location.state as { product?: ProductData })?.product
  const [selectedGold, setSelectedGold] = useState<GoldType>('yellow')
  const [goldPrices, setGoldPrices] = useState<GoldPrices>({
    yellow: 0,
    white: 0,
    rose: 0
  })
  const [goldWeight, setGoldWeight] = useState(0)

  const [stonePrices, setStonePrices] = useState<StonePriceTiers>({
    tier1: 0,
    tier2: 0,
    tier3: 0
  })
  const [stones, setStones] = useState<Stone[]>([createEmptyStone()])
  const [isEditingPrices, setIsEditingPrices] = useState(false)
  const [pricingLoading, setPricingLoading] = useState(true)
  const [savingPricing, setSavingPricing] = useState(false)
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null)
  const [savedPricingSnapshot, setSavedPricingSnapshot] = useState<{
    gold: GoldPrices
    stones: StonePriceTiers
  } | null>(null)
  const importInputRef = useRef<HTMLInputElement | null>(null)

  const formatDateTime = useCallback((date: Date | null) => {
    return date
      ? date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
      : 'Nunca atualizado'
  }, [])

  const fetchPricingSettings = useCallback(async () => {
    try {
      setPricingLoading(true)
      const { data, error } = await supabase
        .from('pricing_settings')
        .select(
          'gold_yellow, gold_white, gold_rose, stone_tier1, stone_tier2, stone_tier3, updated_at'
        )
        .eq('id', 'global')
        .maybeSingle()

      if (error) throw error

      const nextGold: GoldPrices = {
        yellow: data?.gold_yellow || 0,
        white: data?.gold_white || 0,
        rose: data?.gold_rose || 0
      }
      const nextStones: StonePriceTiers = {
        tier1: data?.stone_tier1 || 0,
        tier2: data?.stone_tier2 || 0,
        tier3: data?.stone_tier3 || 0
      }

      setGoldPrices(nextGold)
      setStonePrices(nextStones)
      setSavedPricingSnapshot({ gold: nextGold, stones: nextStones })
      setLastUpdatedAt(data?.updated_at ? new Date(data.updated_at) : null)
    } catch (error) {
      console.error('Error fetching pricing settings:', error)
    } finally {
      setPricingLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPricingSettings()
  }, [fetchPricingSettings])

  const handleToggleEdit = useCallback(() => {
    if (pricingLoading || savingPricing) return

    if (isEditingPrices) {
      if (savedPricingSnapshot) {
        setGoldPrices(savedPricingSnapshot.gold)
        setStonePrices(savedPricingSnapshot.stones)
      }
      setIsEditingPrices(false)
      return
    }

    setIsEditingPrices(true)
  }, [isEditingPrices, pricingLoading, savingPricing, savedPricingSnapshot])

  const handleSavePricing = useCallback(async () => {
    if (!isEditingPrices) return

    try {
      setSavingPricing(true)
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) throw new Error('Usuário não autenticado')

      const payload = {
        id: 'global',
        gold_yellow: goldPrices.yellow || 0,
        gold_white: goldPrices.white || 0,
        gold_rose: goldPrices.rose || 0,
        stone_tier1: stonePrices.tier1 || 0,
        stone_tier2: stonePrices.tier2 || 0,
        stone_tier3: stonePrices.tier3 || 0,
        updated_by: user.id,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('pricing_settings')
        .upsert([payload])
        .select(
          'gold_yellow, gold_white, gold_rose, stone_tier1, stone_tier2, stone_tier3, updated_at'
        )
        .single()

      if (error) throw error

      const nextGold: GoldPrices = {
        yellow: data.gold_yellow || 0,
        white: data.gold_white || 0,
        rose: data.gold_rose || 0
      }
      const nextStones: StonePriceTiers = {
        tier1: data.stone_tier1 || 0,
        tier2: data.stone_tier2 || 0,
        tier3: data.stone_tier3 || 0
      }

      setGoldPrices(nextGold)
      setStonePrices(nextStones)
      setSavedPricingSnapshot({ gold: nextGold, stones: nextStones })
      setLastUpdatedAt(data.updated_at ? new Date(data.updated_at) : new Date())
      setIsEditingPrices(false)
    } catch (error) {
      console.error('Error saving pricing settings:', error)
      alert('Não foi possível salvar os valores. Tente novamente.')
    } finally {
      setSavingPricing(false)
    }
  }, [goldPrices, stonePrices, isEditingPrices])

  const handleGoldPriceChange = (type: GoldType, value: number) => {
    setGoldPrices((prev) => ({ ...prev, [type]: value }))
  }

  const handleStonePriceChange = (tier: keyof StonePriceTiers, value: number) => {
    setStonePrices((prev) => ({ ...prev, [tier]: value }))
  }

  const handleAddStone = useCallback(() => {
    setStones((prev) => [...prev, createEmptyStone()])
  }, [])

  const handleUpdateStone = useCallback((updatedStone: Stone) => {
    setStones((prev) => prev.map((s) => (s.id === updatedStone.id ? updatedStone : s)))
  }, [])

  const handleRemoveStone = useCallback((id: string) => {
    setStones((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const handleImportTxtClick = useCallback(() => {
    importInputRef.current?.click()
  }, [])

  const handleImportTxt = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      try {
        const content = await file.text()
        const parsed = parseTxtData(content)

        if (parsed.goldType) {
          setSelectedGold(parsed.goldType)
        }
        if (parsed.weight && parsed.weight > 0) {
          setGoldWeight(parsed.weight)
        }

        if (parsed.stones.length > 0) {
          const importedStones: Stone[] = parsed.stones.map(({ quantity, sizeMm }) => {
            const ctPerStone = mmToCt(sizeMm)
            const totalCt = ctPerStone * quantity
            const pricePerCt = getStonePricePerCt(ctPerStone, stonePrices)
            const totalPrice = totalCt * pricePerCt
            return {
              id: generateId(),
              quantity,
              sizeMm,
              ctPerStone,
              totalCt,
              pricePerCt,
              totalPrice,
              tierName: getStoneTierName(ctPerStone)
            }
          })

          setStones(importedStones)
        }
      } finally {
        event.target.value = ''
      }
    },
    [stonePrices]
  )

  const pricingSummary = useMemo(() => {
    const goldPrice = goldPrices[selectedGold] || 0
    const goldLabel = goldOptions.find((g) => g.value === selectedGold)?.label ?? ''
    const goldValue = goldWeight * goldPrice
    const totalCt = stones.reduce((sum, s) => sum + s.totalCt, 0)
    const totalQty = stones.reduce((sum, s) => sum + s.quantity, 0)
    const stonesValue = stones.reduce((sum, s) => sum + s.totalPrice, 0)
    const totalValue = goldValue + stonesValue
    const validStones = stones.filter((s) => s.sizeMm > 0)
    const averagePricePerCt = totalCt > 0 ? stonesValue / totalCt : 0

    return {
      goldPrice,
      goldLabel,
      goldValue,
      totalCt,
      totalQty,
      stonesValue,
      totalValue,
      validStones,
      averagePricePerCt
    }
  }, [goldPrices, selectedGold, goldWeight, stones])

  const {
    goldPrice: selectedGoldPrice,
    goldLabel: selectedGoldLabel,
    goldValue,
    totalCt,
    totalQty,
    stonesValue,
    totalValue,
    validStones,
    averagePricePerCt
  } = pricingSummary

  useEffect(() => {
    if (!product) return

    const weightNumber = Number(product.weight ?? 0)
    setGoldWeight(Number.isFinite(weightNumber) ? weightNumber : 0)
    setSelectedGold(mapMaterialToGoldType(product.material))

    if (Array.isArray(product.stones) && product.stones.length > 0) {
      const mapped = product.stones
        .map((stone) => {
          const quantity = Number(stone.quantity ?? 1)
          const ct = Number(stone.quilates) || (stone.pts ? Number(stone.pts) / 100 : 0)

          const sizeMm = ctToMm(ct)
          return {
            id: generateId(),
            quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
            sizeMm,
            ctPerStone: 0,
            totalCt: 0,
            pricePerCt: 0,
            totalPrice: 0,
            tierName: ''
          } as Stone
        })
        .filter((stone: Stone) => stone.quantity > 0)

      if (mapped.length > 0) {
        setStones(mapped)
      }
    }
  }, [product])

  const handleExportPdf = useCallback(() => {
    const calculationLine =
      totalCt > 0
        ? `(${goldWeight.toFixed(2)}g × R$ ${selectedGoldPrice.toFixed(2)}/g) + (${totalCt.toFixed(
            3
          )}ct × R$ ${averagePricePerCt.toFixed(2)}/ct) = R$ ${totalValue.toFixed(2)}`
        : `(${goldWeight.toFixed(2)}g × R$ ${selectedGoldPrice.toFixed(2)}/g) = R$ ${goldValue.toFixed(
            2
          )}`

    const printWindow = window.open('', '_blank', 'width=900,height=1200')
    if (!printWindow) return

    const productInfo = `
      <p><strong>Referência:</strong> ${product?.reference_name || '-'}<br/>
      <strong>Categoria:</strong> ${product?.category || '-'}<br/>
      <strong>Cliente:</strong> ${product?.client_name || '-'}<br/>
      <strong>Rota:</strong> ${product?.rota || '-'}</p>
    `

    const stonesHtml =
      stones.length === 0
        ? '<p>Sem pedras.</p>'
        : `<ol>${stones
            .map(
              (s, idx) => `<li>
                <strong>Pedra ${idx + 1}</strong><br/>
                Quantidade: ${s.quantity}<br/>
                Tamanho (mm): ${s.sizeMm.toFixed(2)}<br/>
                ct/pedra: ${s.ctPerStone.toFixed(3)}<br/>
                Total ct: ${s.totalCt.toFixed(3)}<br/>
                Preço/ct: R$ ${s.pricePerCt.toFixed(2)}<br/>
                Subtotal: R$ ${s.totalPrice.toFixed(2)}
              </li>`
            )
            .join('')}</ol>`

    const html = `
      <html>
        <head>
          <title>Calcular Joia - PDF</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #1f2937; }
            h1 { margin: 0 0 8px; }
            h2 { margin: 16px 0 8px; }
            .section { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 14px; }
            ol { padding-left: 18px; }
            li { margin-bottom: 10px; }
            .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px; margin-top: 10px; }
            .summary-item { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px; }
            .summary-label { display: block; font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: #6b7280; margin-bottom: 4px; }
            .summary-value { font-weight: 600; color: #111827; font-size: 14px; }
            .summary-item.total { background: #fff7ed; border-color: #fdba74; }
            .summary-value.total-value { font-size: 16px; color: #b45309; }
            .calc { margin-top: 10px; padding: 10px 12px; border-left: 3px solid #c08457; background: #fffbf5; color: #78350f; line-height: 1.5; }
          </style>
        </head>
        <body>
          <h1>Calcular Joia</h1>
          <p>Gerado em: ${new Date().toLocaleString('pt-BR')}</p>

          <div class="section">
            <h2>Resumo financeiro</h2>
            <div class="summary-grid">
              <div class="summary-item">
                <span class="summary-label">Tipo de ouro</span>
                <span class="summary-value">${selectedGoldLabel}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Peso</span>
                <span class="summary-value">${goldWeight.toFixed(2)} g</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Preço/g</span>
                <span class="summary-value">R$ ${selectedGoldPrice.toFixed(2)}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Subtotal ouro</span>
                <span class="summary-value">R$ ${goldValue.toFixed(2)}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Pedras (${totalQty})</span>
                <span class="summary-value">${totalCt.toFixed(3)} ct</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Preço médio/ct</span>
                <span class="summary-value">R$ ${averagePricePerCt.toFixed(2)}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Subtotal pedras</span>
                <span class="summary-value">R$ ${stonesValue.toFixed(2)}</span>
              </div>
              <div class="summary-item total">
                <span class="summary-label">Total da joia</span>
                <span class="summary-value total-value">R$ ${totalValue.toFixed(2)}</span>
              </div>
            </div>
            <p class="calc"><strong>Cálculo:</strong> ${calculationLine}</p>
          </div>

          <div class="section">
            <h2>Dados da joia</h2>
            ${productInfo}
          </div>

          <div class="section">
            <h2>Ouro</h2>
            <p>
              Tipo: ${selectedGoldLabel}<br/>
              Preço/g: R$ ${selectedGoldPrice.toFixed(2)}<br/>
              Peso: ${goldWeight.toFixed(2)} g<br/>
              Subtotal ouro: R$ ${goldValue.toFixed(2)}
            </p>
          </div>

          <div class="section">
            <h2>Pedras</h2>
            <p>Qtd total: ${totalQty} | Total ct: ${totalCt.toFixed(3)} | Preço médio/ct: R$ ${averagePricePerCt.toFixed(2)} | Subtotal: R$ ${stonesValue.toFixed(2)}</p>
            ${stonesHtml}
          </div>

          <div class="section">
            <h2>Total</h2>
            <p><strong>R$ ${totalValue.toFixed(2)}</strong></p>
          </div>
        </body>
      </html>
    `

    printWindow.document.open()
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 400)
  }, [
    averagePricePerCt,
    goldValue,
    goldWeight,
    product,
    selectedGoldLabel,
    selectedGoldPrice,
    stones,
    stonesValue,
    totalCt,
    totalQty,
    totalValue
  ])

  return (
    <PageContainer>
      <Header>
        <Gem size={32} color="#c08a3f" />
        <HeaderText>
          <Title>Calcular Joia</Title>
          <Subtitle>Precifique ouro e pedras de forma detalhada</Subtitle>
        </HeaderText>
        <HeaderActions>
          <SecondaryButton type="button" onClick={handleImportTxtClick}>
            Importar TXT
          </SecondaryButton>
          <SecondaryButton
            type="button"
            onClick={handleExportPdf}
            disabled={pricingLoading}
          >
            Salvar dados (PDF)
          </SecondaryButton>
          <input
            ref={importInputRef}
            type="file"
            accept=".txt"
            onChange={handleImportTxt}
            style={{ display: 'none' }}
          />
        </HeaderActions>
      </Header>

      <SectionCard>
        <ActionsRow>
          <SectionHeader>
            <TitleRow>
              <SectionTitle>Valores de referência</SectionTitle>
              <StatusChip>
                <Clock3 size={16} />
                {pricingLoading ? 'Carregando valores...' : `Última atualização: ${formatDateTime(lastUpdatedAt)}`}
              </StatusChip>
            </TitleRow>
          </SectionHeader>

          <ButtonsRow>
            <SecondaryButton
              type="button"
              onClick={handleToggleEdit}
              disabled={pricingLoading || savingPricing}
            >
              {isEditingPrices ? 'Cancelar' : 'Alterar valores'}
            </SecondaryButton>
            <PrimaryButton
              type="button"
              onClick={handleSavePricing}
              disabled={!isEditingPrices || savingPricing || pricingLoading}
            >
              {savingPricing ? 'Salvando...' : 'Salvar'}
            </PrimaryButton>
          </ButtonsRow>
        </ActionsRow>

        <ValuesGrid>
          <ValueSection>
            <SubsectionTitle>Preço do ouro (R$/g)</SubsectionTitle>
            <PriceGrid>
              {goldOptions.map((option) => (
                <div key={option.value}>
                  <Label>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ColorDot $color={option.color} />
                      {option.label}
                    </span>
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={goldPrices[option.value] || ''}
                    onChange={(e) =>
                      handleGoldPriceChange(option.value, parseFloat(e.target.value) || 0)
                    }
                    placeholder="0.00"
                    disabled={!isEditingPrices || savingPricing || pricingLoading}
                  />
                </div>
              ))}
            </PriceGrid>
          </ValueSection>

          <ValueSection>
            <SubsectionTitle>Preço das pedras (R$/ct)</SubsectionTitle>
            <PriceGrid>
              {stoneTierOptions.map((tier) => (
                <div key={tier.key}>
                  <Label>{tier.description}</Label>
                  <div style={{ position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'rgba(0,0,0,0.5)',
                        fontSize: '0.9rem'
                      }}
                    >
                      R$
                    </span>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={stonePrices[tier.key] || ''}
                      onChange={(e) =>
                        handleStonePriceChange(tier.key, parseFloat(e.target.value) || 0)
                      }
                      style={{ paddingLeft: '2.25rem' }}
                      disabled={!isEditingPrices || savingPricing || pricingLoading}
                    />
                  </div>
                </div>
              ))}
            </PriceGrid>
          </ValueSection>
        </ValuesGrid>
      </SectionCard>

      <MainGrid>
        <LeftColumn>
          <SectionCard>
            <SectionTitle>Ouro</SectionTitle>
            <HelperText>Valores por grama configurados no topo.</HelperText>
            <SmallText style={{ marginTop: '0.25rem' }}>
              {pricingLoading
                ? 'Carregando valores do ouro...'
                : `Preço selecionado (${selectedGoldLabel}): R$ ${selectedGoldPrice.toFixed(
                    2
                  )} / g`}
            </SmallText>
            <Divider />

            <Label>Tipo de Ouro da Peça</Label>
            <RadioOptions>
              {goldOptions.map((option) => (
                <RadioOption key={option.value} $active={selectedGold === option.value}>
                  <RadioInput
                    type="radio"
                    checked={selectedGold === option.value}
                    onChange={() => setSelectedGold(option.value)}
                  />
                  <ColorDot $color={option.color} />
                  <OptionLabel>{option.label}</OptionLabel>
                </RadioOption>
              ))}
            </RadioOptions>

            <Divider />

            <Label>Peso do Ouro (gramas)</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={goldWeight || ''}
              onChange={(e) => setGoldWeight(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
            />

            {goldWeight > 0 && selectedGoldPrice > 0 && (
              <PreviewCard>
                <SmallText>Valor do Ouro</SmallText>
                <PreviewValue>
                  R$ {goldValue.toFixed(2)}
                </PreviewValue>
                <SmallText>
                  {goldWeight}g × R$ {selectedGoldPrice.toFixed(2)}/g
                </SmallText>
              </PreviewCard>
            )}
          </SectionCard>

          <SectionCard>
            <SectionTitle>Pedras</SectionTitle>

            <InlineActions>
              <PrimaryButton type="button" onClick={handleAddStone}>
                <Plus size={16} style={{ marginRight: 6 }} />
                Adicionar pedra
              </PrimaryButton>
            </InlineActions>

            <Divider />

            <StoneList>
              {stones.map((stone) => (
                <StoneEntry
                  key={stone.id}
                  stone={stone}
                  stonePrices={stonePrices}
                  onUpdate={handleUpdateStone}
                  onRemove={handleRemoveStone}
                  canRemove={stones.length > 1}
                />
              ))}
            </StoneList>

            {stones.some((s) => s.sizeMm > 0) && (
              <PreviewCard style={{ marginTop: '0.75rem' }}>
                <SmallText>Valor total das pedras</SmallText>
                <PreviewValue>R$ {stonesValue.toFixed(2)}</PreviewValue>
                <SmallText>
                  {totalQty} pedra
                  {totalQty !== 1 ? 's' : ''} • {totalCt.toFixed(3)} ct total
                </SmallText>
              </PreviewCard>
            )}
          </SectionCard>

          <ConversionTable />
        </LeftColumn>

        <CalculationSummary
          selectedGold={selectedGold}
          goldLabel={selectedGoldLabel}
          goldWeight={goldWeight}
          goldPrice={selectedGoldPrice}
          goldValue={goldValue}
          stonesValue={stonesValue}
          totalValue={totalValue}
          totalCt={totalCt}
          totalQty={totalQty}
          validStones={validStones}
        />
      </MainGrid>
    </PageContainer>
  )
}
