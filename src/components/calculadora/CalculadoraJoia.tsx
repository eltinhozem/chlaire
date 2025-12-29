import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Plus, Clock3, RefreshCw, Check, Edit2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { PrimaryButton } from '../buttons/PrimaryButton'
import { SecondaryButton } from '../buttons/SecondaryButton'
import { DangerButton } from '../buttons/DangerButton'
import { SuccessButton } from '../buttons/SuccessButton'
import { StoneEntry } from './StoneEntry'
import { ConversionTable } from './ConversionTable'
import { suppliers, getStonePriceByMm, getSupplierById, SupplierPriceEntry, Supplier } from './fornecedor'
import { Stone, ProductStoneInput, ProductData } from './types'
import {
  createEmptyStone,
  parseTxtData,
  escapeHtml,
  fetchGoldQuoteInBrlPerGram,
  ctToMm,
  mmToCt
} from './utils'
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
  Label,
  Input,
  SubsectionTitle,
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

interface SupplierPriceTableProps {
  supplier: Supplier
  onUpdatePrices: (prices: SupplierPriceEntry[]) => void
  isEditing: boolean
  onToggleEdit: () => void
  onSave: () => void
}

function SupplierPriceTable({ supplier, onUpdatePrices, isEditing, onToggleEdit, onSave }: SupplierPriceTableProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editPrices, setEditPrices] = useState<SupplierPriceEntry[]>(supplier.prices)

  useEffect(() => {
    setEditPrices(supplier.prices)
  }, [supplier])

  const handleRowChange = (index: number, field: 'mm' | 'price', value: number) => {
    const updated = editPrices.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    setEditPrices(updated)
    onUpdatePrices(updated)
  }

  const handleAddRow = () => {
    const updated = [...editPrices, { mm: 0, price: 0 }]
    setEditPrices(updated)
    onUpdatePrices(updated)
  }

  const handleRemoveRow = (index: number) => {
    const updated = editPrices.filter((_, i) => i !== index)
    setEditPrices(updated)
    onUpdatePrices(updated)
  }

  return (
    <SectionCard>
      <ToggleButton type="button" onClick={() => setIsOpen((prev) => !prev)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Gem size={18} />
          Tabela de Preços - {supplier.name}
        </span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </ToggleButton>

      {isOpen && (
        <>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
            <SecondaryButton type="button" onClick={onToggleEdit}>
              <Edit2 size={16} style={{ marginRight: 6 }} />
              {isEditing ? 'Cancelar' : 'Alterar valores'}
            </SecondaryButton>
            {isEditing && (
              <PrimaryButton type="button" onClick={onSave}>
                <Check size={16} style={{ marginRight: 6 }} />
                Salvar
              </PrimaryButton>
            )}
            {isEditing && (
              <SecondaryButton type="button" onClick={handleAddRow}>
                <Plus size={16} style={{ marginRight: 6 }} />
                Adicionar linha
              </SecondaryButton>
            )}
          </div>
          <TableWrapper>
            <TableHeader>
              <span>Tamanho (mm)</span>
              <span>Preço (R$)</span>
              {isEditing && <span>Ações</span>}
            </TableHeader>
            {editPrices.map((entry, idx) => (
              <TableRow key={`${entry.mm}-${idx}`} style={{ display: 'grid', gridTemplateColumns: isEditing ? '1fr 1fr auto' : '1fr 1fr', gap: '0.5rem', alignItems: 'center' }}>
                {isEditing ? (
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    value={entry.mm || 0}
                    onChange={(e) => handleRowChange(idx, 'mm', parseFloat(e.target.value) || 0)}
                    style={{ padding: '0.3rem 0.5rem', fontSize: '0.85rem' }}
                  />
                ) : (
                  <span>{entry.mm.toFixed(1)}mm</span>
                )}
                {isEditing ? (
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    value={entry.price || 0}
                    onChange={(e) => handleRowChange(idx, 'price', parseFloat(e.target.value) || 0)}
                    style={{ padding: '0.3rem 0.5rem', fontSize: '0.85rem' }}
                  />
                ) : (
                  <span>R$ {entry.price.toFixed(2)}</span>
                )}
                {isEditing && (
                  <DangerButton type="button" onClick={() => handleRemoveRow(idx)}>
                    <Trash2 size={14} style={{ marginRight: 4 }} />
                    Remover
                  </DangerButton>
                )}
              </TableRow>
            ))}
          </TableWrapper>
        </>
      )}
    </SectionCard>
  )
}

interface CalculationSummaryProps {
  goldWeight: number
  goldPrice: number
  goldValue: number
  stonesValue: number
  totalValue: number
  totalQty: number
  validStones: Stone[]
  supplierName: string
}

function CalculationSummary({
  goldWeight,
  goldPrice,
  goldValue,
  stonesValue,
  totalValue,
  totalQty,
  validStones,
  supplierName
}: CalculationSummaryProps) {
  return (
    <SummaryCard>
      <SummaryGroup>
        <SummaryLine>
          <SummaryLabel>Ouro 18K</SummaryLabel>
          <SummaryValue>R$ {goldPrice.toFixed(2)}/g</SummaryValue>
        </SummaryLine>
        <SummaryLine>
          <SummaryLabel>Peso</SummaryLabel>
          <SummaryValue>{goldWeight.toFixed(2)} g</SummaryValue>
        </SummaryLine>
        <SummaryLine>
          <SummaryLabel>Subtotal ouro</SummaryLabel>
          <SummaryValue>R$ {goldValue.toFixed(2)}</SummaryValue>
        </SummaryLine>
      </SummaryGroup>

      <Divider />

      <SummaryGroup>
        <SummaryLine>
          <SummaryLabel>Fornecedor</SummaryLabel>
          <SummaryValue>{supplierName}</SummaryValue>
        </SummaryLine>
        <SummaryLine>
          <SummaryLabel>Pedras ({totalQty})</SummaryLabel>
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
                ({s.quantity} × R$ {s.pricePerUnit.toFixed(2)})
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

  // Ouro 18K único
  const [goldPrice18k, setGoldPrice18k] = useState(0)
  const [goldWeight, setGoldWeight] = useState(0)
  const [margin, setMargin] = useState(1)
  const [dollarStone, setDollarStone] = useState(1)
  const [showBaseCalc, setShowBaseCalc] = useState(false)

  // Cotação do ouro 1000
  const [goldQuote1000, setGoldQuote1000] = useState(0)
  const [isLoadingQuote, setIsLoadingQuote] = useState(false)
  const [quoteError, setQuoteError] = useState<string | null>(null)

  // Fornecedor
  const [selectedSupplierId, setSelectedSupplierId] = useState(suppliers[0].id)
  const [fornecedorMap, setfornecedorMap] = useState<Record<string, SupplierPriceEntry[]>>(() => {
    const map: Record<string, SupplierPriceEntry[]> = {}
    suppliers.forEach((s) => {
      map[s.id] = [...s.prices]
    })
    return map
  })
  const [isEditingfornecedor, setIsEditingfornecedor] = useState(false)

  // Pedras
  const [stones, setStones] = useState<Stone[]>([createEmptyStone()])

  // Controles de edição
  const [pricingLoading, setPricingLoading] = useState(true)
  const [savingPricing, setSavingPricing] = useState(false)
  const [savingBase, setSavingBase] = useState(false)
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null)
  const importInputRef = useRef<HTMLInputElement | null>(null)

  const selectedSupplier = useMemo(() => {
    const supplier = getSupplierById(selectedSupplierId)
    if (!supplier) return suppliers[0]
    return {
      ...supplier,
      prices: fornecedorMap[supplier.id] || supplier.prices
    }
  }, [selectedSupplierId, fornecedorMap])

  const formatDateTime = useCallback((date: Date | null) => {
    return date
      ? date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
      : 'Nunca atualizado'
  }, [])

  // Carregar configurações do banco
  const fetchPricingSettings = useCallback(async () => {
    try {
      setPricingLoading(true)
      const { data, error } = await supabase
        .from('pricing_settings')
        .select('*')
        .eq('id', 'global')
        .maybeSingle()

      if (error) throw error

      const goldFromDb = Number(data?.gold_18k ?? data?.gold_yellow)
      if (Number.isFinite(goldFromDb)) {
        setGoldPrice18k(goldFromDb)
      }

      const marginFromDb = Number(data?.margin ?? 1)
      if (Number.isFinite(marginFromDb) && marginFromDb > 0) {
        setMargin(marginFromDb)
      }

      const dollarFromDb = Number(data?.dollar_stone ?? 1)
      if (Number.isFinite(dollarFromDb) && dollarFromDb > 0) {
        setDollarStone(dollarFromDb)
      }

      if (data && 'supplier_prices' in data && data.supplier_prices) {
        try {
          const parsed = typeof data.supplier_prices === 'string' 
            ? JSON.parse(data.supplier_prices) 
            : data.supplier_prices
          setfornecedorMap(parsed)
        } catch (e) {
          console.error('Error parsing supplier prices:', e)
        }
      }

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

  // Salvar configurações de ouro
  const handleSaveGoldPrice = useCallback(async () => {
    try {
      setSavingPricing(true)
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) throw new Error('Usuário não autenticado')

      const payload = {
        id: 'global',
        gold_yellow: goldPrice18k,
        margin,
        dollar_stone: dollarStone,
        updated_by: user.id,
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase.from('pricing_settings').upsert([payload])

      if (error) {
        const missingColumnCodes = ['42703', 'PGRST204']
        if (missingColumnCodes.includes(error.code)) {
          const fallbackPayload = {
            id: 'global',
            gold_yellow: goldPrice18k,
            updated_by: user.id,
            updated_at: new Date().toISOString()
          }
          await supabase.from('pricing_settings').upsert([fallbackPayload])
          alert('Margem e Dollar pedra não foram salvos porque faltam colunas no banco. Rode o SQL enviado para criar as colunas.')
        } else {
          throw error
        }
      }

      setLastUpdatedAt(new Date())
    } catch (error) {
      console.error('Error saving gold price:', error)
      alert('Não foi possível salvar o valor. Tente novamente.')
    } finally {
      setSavingPricing(false)
    }
  }, [goldPrice18k, margin, dollarStone])

  // Salvar cálculo base (margem e dollar pedra)
  const handleSaveBaseCalc = useCallback(async () => {
    try {
      setSavingBase(true)
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) throw new Error('Usuário não autenticado')

      const payload = {
        id: 'global',
        margin,
        dollar_stone: dollarStone,
        updated_by: user.id,
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase.from('pricing_settings').upsert([payload])

      if (error) {
        const missingColumnCodes = ['42703', 'PGRST204']
        if (missingColumnCodes.includes(error.code)) {
          alert('Margem e Dollar pedra não foram salvos porque faltam colunas no banco. Rode o SQL enviado para criar as colunas.')
          return
        }
        throw error
      }

      setLastUpdatedAt(new Date())
    } catch (error) {
      console.error('Error saving base calc:', error)
      alert('Não foi possível salvar margem/dollar. Tente novamente.')
    } finally {
      setSavingBase(false)
    }
  }, [margin, dollarStone])

  // Salvar preços do fornecedor
  const handleSavefornecedor = useCallback(async () => {
    try {
      setSavingPricing(true)
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) throw new Error('Usuário não autenticado')

      const payload = {
        id: 'global',
        supplier_prices: JSON.stringify(fornecedorMap),
        updated_by: user.id,
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase.from('pricing_settings').upsert([payload])

      if (error) {
        if (error.code === '42703') {
          alert('A tabela pricing_settings não possui a coluna supplier_prices (jsonb). Rode as migrations no Supabase para habilitar o salvamento dos fornecedores.')
          return
        }
        throw error
      }

      setLastUpdatedAt(new Date())
      setIsEditingfornecedor(false)
    } catch (error) {
      console.error('Error saving supplier prices:', error)
      alert('Não foi possível salvar os valores. Tente novamente.')
    } finally {
      setSavingPricing(false)
    }
  }, [fornecedorMap])

  // Atualizar cotação do ouro 1000
  const handleUpdateGoldQuote = useCallback(async () => {
    setIsLoadingQuote(true)
    setQuoteError(null)
    try {
      const goldBrlPerGram = await fetchGoldQuoteInBrlPerGram()
    setGoldQuote1000(goldBrlPerGram)
  } catch (error) {
    console.error('Error fetching gold quote:', error)
    setQuoteError('Não foi possível atualizar a cotação agora. Tente novamente em instantes.')
    // não altera o valor atual para evitar cálculos incorretos
  } finally {
    setIsLoadingQuote(false)
  }
}, [])

  // Usar cotação como referência para 18K
  const handleUseQuoteAsReference = useCallback(() => {
    // Ouro 18K = 75% do ouro 1000
    const gold18kPrice = goldQuote1000 * 0.75
    setGoldPrice18k(Math.round(gold18kPrice * 100) / 100)
  }, [goldQuote1000])

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

        if (parsed.weight && parsed.weight > 0) {
          setGoldWeight(parsed.weight)
        }

        if (parsed.stones.length > 0) {
          const importedStones: Stone[] = parsed.stones.map(({ quantity, sizeMm }) => {
            const ct = mmToCt(sizeMm)
            const basePrice = getStonePriceByMm(sizeMm, selectedSupplier.prices)
            const pricePerUnit = basePrice * (ct || 0) * dollarStone * margin
            const totalPrice = pricePerUnit * quantity
            return {
              id: generateId(),
              quantity,
              sizeMm,
              ct,
              pricePerUnit,
              totalPrice
            }
          })

          setStones(importedStones)
        }
      } finally {
        event.target.value = ''
      }
    },
    [selectedSupplier.prices, dollarStone, margin]
  )

  const handleUpdatefornecedor = useCallback((newPrices: SupplierPriceEntry[]) => {
    setfornecedorMap((prev) => ({
      ...prev,
      [selectedSupplierId]: newPrices
    }))
  }, [selectedSupplierId])

  const effectiveGoldPrice = useMemo(() => goldPrice18k * margin, [goldPrice18k, margin])

  const pricingSummary = useMemo(() => {
    const goldValue = goldWeight * effectiveGoldPrice
    const totalQty = stones.reduce((sum, s) => sum + s.quantity, 0)
    const stonesValue = stones.reduce((sum, s) => sum + s.totalPrice, 0)
    const totalValue = goldValue + stonesValue
    const validStones = stones.filter((s) => s.sizeMm > 0)

    return {
      goldValue,
      totalQty,
      stonesValue,
      totalValue,
      validStones
    }
  }, [effectiveGoldPrice, goldWeight, stones])

  const { goldValue, totalQty, stonesValue, totalValue, validStones } = pricingSummary

  // Carregar dados do produto
  useEffect(() => {
    if (!product) return

    const weightNumber = Number(product.weight ?? 0)
    setGoldWeight(Number.isFinite(weightNumber) ? weightNumber : 0)

    if (Array.isArray(product.stones) && product.stones.length > 0) {
      const mapped = product.stones
        .map((stone) => {
          const quantity = Number(stone.quantity ?? 1)
          const ct = Number(stone.quilates) || (stone.pts ? Number(stone.pts) / 100 : 0)
          const sizeMm = ctToMm(ct)
          const basePrice = getStonePriceByMm(sizeMm, selectedSupplier.prices)
          const pricePerUnit = basePrice * (ct || 0) * dollarStone * margin
          return {
            id: generateId(),
            quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
            sizeMm,
            ct,
            pricePerUnit,
            totalPrice: pricePerUnit * quantity
          } as Stone
        })
        .filter((stone: Stone) => stone.quantity > 0)

      if (mapped.length > 0) {
        setStones(mapped)
      }
    }
  }, [product, selectedSupplier.prices, dollarStone, margin])

  const handleExportPdf = useCallback(() => {
    const goldFormula = `${goldWeight.toFixed(2)}g × R$ ${goldPrice18k.toFixed(2)}/g × margem ${margin.toFixed(2)} = R$ ${goldValue.toFixed(2)}`
    const stonesFormula =
      stones.length === 0
        ? 'Sem pedras'
        : stones
            .map((s) => {
              const basePrice = getStonePriceByMm(s.sizeMm, selectedSupplier.prices)
              return `${s.quantity} × (R$ ${basePrice.toFixed(2)} × ${s.ct.toFixed(3)}ct × dollar ${dollarStone.toFixed(2)} × margem ${margin.toFixed(2)}) = R$ ${s.totalPrice.toFixed(2)}`
            })
            .join('<br/>')
    const calculationLine = `${goldFormula}${stones.length ? '<br/>' + stonesFormula + '<br/>' : '<br/>'}<strong>Total: R$ ${totalValue.toFixed(2)}</strong>`
    const safeSupplierName = escapeHtml(selectedSupplier.name)

    const printWindow = window.open('', '_blank', 'width=900,height=1200')
    if (!printWindow) return
    printWindow.opener = null

    const productInfo = `
      <p><strong>Referência:</strong> ${escapeHtml(product?.reference_name || '-')}<br/>
      <strong>Categoria:</strong> ${escapeHtml(product?.category || '-')}<br/>
      <strong>Cliente:</strong> ${escapeHtml(product?.client_name || '-')}<br/>
      <strong>Rota:</strong> ${escapeHtml(product?.rota || '-')}</p>
    `

    const stonesHtml =
      stones.length === 0
        ? '<p>Sem pedras.</p>'
        : `<ol>${stones
            .map((s, idx) => {
              const basePrice = getStonePriceByMm(s.sizeMm, selectedSupplier.prices)
              const calcDetail = `R$ ${basePrice.toFixed(2)} × ${s.ct.toFixed(3)}ct × dollar ${dollarStone.toFixed(2)} × margem ${margin.toFixed(2)}`
              return `<li>
                <strong>Pedra ${idx + 1}</strong><br/>
                Quantidade: ${s.quantity}<br/>
                Tamanho (mm): ${s.sizeMm.toFixed(2)}<br/>
                CT estimado: ${s.ct.toFixed(3)}<br/>
                Preço/unidade: R$ ${s.pricePerUnit.toFixed(2)}<br/>
                Cálculo: ${calcDetail} = R$ ${s.pricePerUnit.toFixed(2)} (un)<br/>
                Subtotal: R$ ${s.totalPrice.toFixed(2)}
              </li>`
            })
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
                <span class="summary-label">Ouro 18K</span>
                <span class="summary-value">R$ ${effectiveGoldPrice.toFixed(2)}/g</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Peso</span>
                <span class="summary-value">${goldWeight.toFixed(2)} g</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Subtotal ouro</span>
                <span class="summary-value">R$ ${goldValue.toFixed(2)}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Fornecedor</span>
                <span class="summary-value">${safeSupplierName}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Pedras (${totalQty})</span>
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
              Preço 18K/g (c/ margem): R$ ${effectiveGoldPrice.toFixed(2)}<br/>
              Peso: ${goldWeight.toFixed(2)} g<br/>
              Subtotal ouro: R$ ${goldValue.toFixed(2)}
            </p>
          </div>

          <div class="section">
            <h2>Pedras</h2>
            <p>Fornecedor: ${safeSupplierName} | Qtd total: ${totalQty} | Subtotal: R$ ${stonesValue.toFixed(2)}</p>
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
    goldValue,
    goldWeight,
    effectiveGoldPrice,
    product,
    selectedSupplier,
    stones,
    stonesValue,
    totalQty,
    totalValue
  ])

  const gold18kFromQuote = goldQuote1000 > 0 ? (goldQuote1000 * 0.75 ).toFixed(2) : '0.00'

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
          <SecondaryButton type="button" onClick={() => setShowBaseCalc((prev) => !prev)}>
            {showBaseCalc ? 'Ocultar cálculo base' : 'Calculo base'}
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

      <ConversionTable />

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
        </ActionsRow>

        <ValuesGrid>
          {/* Cálculo base */}
          {showBaseCalc && (
            <ValueSection>
              <SubsectionTitle>Cálculo base</SubsectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.65rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '140px' }}>
                    <Label>Margem (multiplicador)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={margin}
                      onChange={(e) => setMargin(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: '140px' }}>
                    <Label>Dollar pedra (multiplicador)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={dollarStone}
                      onChange={(e) => setDollarStone(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <ButtonsRow>
                  <PrimaryButton
                    type="button"
                    onClick={handleSaveBaseCalc}
                    disabled={savingBase || pricingLoading}
                  >
                    {savingBase ? 'Salvando...' : 'Salvar cálculo base'}
                  </PrimaryButton>
                </ButtonsRow>
                <SmallText>
                  Ouro e pedras aplicam automaticamente: ouro final = OURO 18K × margem; pedra final = tabela × ct × dollar pedra × margem.
                </SmallText>
              </div>
            </ValueSection>
          )}

          {/* Cotação do Ouro 1000 */}
          <ValueSection>
            <SubsectionTitle>Cotação do Ouro 1000</SubsectionTitle>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <Label>Ouro hoje (R$/g)</Label>
                <Input
                  type="number"
                  value={goldQuote1000 || ''}
                  readOnly
                  placeholder="Clique em atualizar"
                />
              </div>
              <SecondaryButton 
                type="button" 
                onClick={handleUpdateGoldQuote}
                disabled={isLoadingQuote}
                style={{ marginBottom: '0.1rem' }}
              >
                <RefreshCw size={16} style={{ marginRight: 6 }} className={isLoadingQuote ? 'animate-spin' : ''} />
                {isLoadingQuote ? 'Atualizando...' : 'Atualizar'}
              </SecondaryButton>
            </div>

            {quoteError && (
              <SmallText style={{ marginTop: '0.35rem', color: '#b91c1c' }}>
                {quoteError}
              </SmallText>
            )}

            {goldQuote1000 > 0 && (
              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <SmallText style={{ margin: 0 }}>
                  Ouro 18K (750): <strong>R$ {gold18kFromQuote}</strong>
                </SmallText>
                <SuccessButton type="button" onClick={handleUseQuoteAsReference}>
                  <Check size={16} style={{ marginRight: 6 }} />
                  Usar essa referência
                </SuccessButton>
              </div>
            )}
          </ValueSection>

          {/* Preço do Ouro 18K */}
          <ValueSection>
            <SubsectionTitle>Preço do OURO 18K (R$/g)</SubsectionTitle>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <Label>OURO 18K</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={goldPrice18k || ''}
                  onChange={(e) => setGoldPrice18k(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  disabled={pricingLoading || savingPricing}
                />
              </div>
              <ButtonsRow style={{ marginBottom: '0.1rem' }}>
                <PrimaryButton
                  type="button"
                  onClick={handleSaveGoldPrice}
                  disabled={savingPricing || pricingLoading}
                >
                  {savingPricing ? 'Salvando...' : 'Salvar valor padrão'}
                </PrimaryButton>
              </ButtonsRow>
              <SmallText style={{ marginTop: '0.25rem' }}>
                Ouro com margem: R$ {effectiveGoldPrice.toFixed(2)}/g
              </SmallText>
            </div>
            <SmallText style={{ marginTop: '0.35rem' }}>
              Última atualização: {formatDateTime(lastUpdatedAt)}
            </SmallText>
          </ValueSection>
        </ValuesGrid>

        <Divider />

        {/* Seleção de Fornecedor */}
        <SubsectionTitle>Fornecedor de Pedras</SubsectionTitle>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <select
            value={selectedSupplierId}
            onChange={(e) => setSelectedSupplierId(e.target.value)}
            style={{
              padding: '0.65rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              background: '#fff',
              fontSize: '1rem',
              minWidth: '200px'
            }}
          >
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <SmallText style={{ marginBottom: '0.5rem' }}>
          Última atualização: {formatDateTime(lastUpdatedAt)}
        </SmallText>

        <SupplierPriceTable
          supplier={selectedSupplier}
          onUpdatePrices={handleUpdatefornecedor}
          isEditing={isEditingfornecedor}
          onToggleEdit={() => setIsEditingfornecedor(!isEditingfornecedor)}
          onSave={handleSavefornecedor}
        />
      </SectionCard>

      <MainGrid>
        <LeftColumn>
          <SectionCard>
            <SectionTitle>Ouro</SectionTitle>
            <HelperText>Valores por grama configurados no topo.</HelperText>
            <SmallText style={{ marginTop: '0.25rem' }}>
              {pricingLoading
                ? 'Carregando valores do ouro...'
                : `Preço OURO 18K (com margem): R$ ${effectiveGoldPrice.toFixed(2)} / g`}
            </SmallText>
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

            {goldWeight > 0 && effectiveGoldPrice > 0 && (
              <PreviewCard>
                <SmallText>Valor do Ouro</SmallText>
                <PreviewValue>
                  R$ {goldValue.toFixed(2)}
                </PreviewValue>
                <SmallText>
                  {goldWeight}g × R$ {effectiveGoldPrice.toFixed(2)}/g
                </SmallText>
              </PreviewCard>
            )}
          </SectionCard>

          <SectionCard>
            <SectionTitle>Pedras</SectionTitle>
            <SmallText style={{ marginBottom: '0.5rem' }}>
              Fornecedor: <strong>{selectedSupplier.name}</strong>
            </SmallText>

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
                  fornecedor={selectedSupplier.prices}
                  margin={margin}
                  dollarStone={dollarStone}
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
                  {totalQty !== 1 ? 's' : ''}
                </SmallText>
              </PreviewCard>
            )}
          </SectionCard>
        </LeftColumn>

        <CalculationSummary
          goldWeight={goldWeight}
          goldPrice={effectiveGoldPrice}
          goldValue={goldValue}
          stonesValue={stonesValue}
          totalValue={totalValue}
          totalQty={totalQty}
          validStones={validStones}
          supplierName={selectedSupplier.name}
        />
      </MainGrid>
    </PageContainer>
  )
}
