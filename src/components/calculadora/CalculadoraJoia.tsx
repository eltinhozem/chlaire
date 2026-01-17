import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Gem, FileText } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { SecondaryButton } from '../buttons/SecondaryButton'
import { ConversionTable } from './ConversionTable'
import { suppliers, getStonePriceByMm, getSupplierById, SupplierPriceEntry } from './fornecedor'
import { Stone, ProductData } from './types'
import CalculationSummary from './components/CalculationSummary'
import GoldSection from './components/GoldSection'
import ReferenceValuesSection from './components/ReferenceValuesSection'
import StonesSection from './components/StonesSection'
import { useGoldQuote } from './hooks/useGoldQuote'
import { useTxtImport } from './hooks/useTxtImport'
import { exportDescriptionPdf, openCalculationPdf } from './pdfExport'
import {
  createEmptyStone,
  generateId,
  ctToMm,
  ptsToCt
} from './utils'
import {
  PageContainer,
  Header,
  HeaderText,
  Title,
  Subtitle,
  MainGrid,
  LeftColumn,
  HeaderActions
} from './styles'

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
  const {
    goldQuote1000,
    isLoadingQuote,
    quoteError,
    gold18kFromQuote,
    updateGoldQuote
  } = useGoldQuote()

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

  const selectedSupplier = useMemo(() => {
    const supplier = getSupplierById(selectedSupplierId)
    if (!supplier) return suppliers[0]
    return {
      ...supplier,
      prices: fornecedorMap[supplier.id] || supplier.prices
    }
  }, [selectedSupplierId, fornecedorMap])

  const fallbackSupplierPrices = useMemo(() => {
    if (selectedSupplierId !== 'fornecedor1') return undefined
    const fallbackSupplier = getSupplierById('fornecedor2')
    if (!fallbackSupplier) return undefined
    return fornecedorMap[fallbackSupplier.id] || fallbackSupplier.prices
  }, [selectedSupplierId, fornecedorMap])

  const {
    txtFolderCode,
    parsedWidth,
    parsedHeight,
    importInputRef,
    handleImportTxt,
    handleImportTxtClick
  } = useTxtImport({
    supplierPrices: selectedSupplier.prices,
    fallbackSupplierPrices,
    dollarStone,
    margin,
    onGoldWeightChange: setGoldWeight,
    onStonesChange: setStones
  })

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
          const quilates = Number(stone.quilates)
          const ptsValue = Number(stone.pts)
          const ctFromPts = Number.isFinite(ptsValue) && ptsValue > 0 ? ptsToCt(ptsValue) : 0
          const ct = Number.isFinite(quilates) && quilates > 0 ? quilates : ctFromPts
          const sizeMm = ctToMm(ct)
          const basePrice = getStonePriceByMm(sizeMm, selectedSupplier.prices, fallbackSupplierPrices)
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
  }, [product, selectedSupplier.prices, fallbackSupplierPrices, dollarStone, margin])

  const handleExportPdf = useCallback(() => {
    openCalculationPdf({
      goldWeight,
      goldPrice18k,
      effectiveGoldPrice,
      margin,
      dollarStone,
      goldValue,
      stonesValue,
      totalQty,
      totalValue,
      stones,
      supplier: selectedSupplier,
      fallbackSupplierPrices,
      product
    })
  }, [
    goldPrice18k,
    goldValue,
    goldWeight,
    effectiveGoldPrice,
    margin,
    dollarStone,
    product,
    selectedSupplier,
    fallbackSupplierPrices,
    stones,
    stonesValue,
    totalQty,
    totalValue
  ])

  const handleExportDescriptionPdf = useCallback(async () => {
    await exportDescriptionPdf({
      txtFolderCode,
      goldWeight,
      parsedWidth,
      parsedHeight,
      stones
    })
  }, [txtFolderCode, goldWeight, parsedWidth, parsedHeight, stones])

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
          <SecondaryButton type="button" onClick={handleExportDescriptionPdf} disabled={pricingLoading}>
            <FileText size={16} style={{ marginRight: 6 }} />
            Descrição HTML
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

      <ReferenceValuesSection
        pricingLoading={pricingLoading}
        savingPricing={savingPricing}
        savingBase={savingBase}
        showBaseCalc={showBaseCalc}
        margin={margin}
        dollarStone={dollarStone}
        goldQuote1000={goldQuote1000}
        isLoadingQuote={isLoadingQuote}
        quoteError={quoteError}
        gold18kFromQuote={gold18kFromQuote}
        goldPrice18k={goldPrice18k}
        effectiveGoldPrice={effectiveGoldPrice}
        lastUpdatedLabel={formatDateTime(lastUpdatedAt)}
        selectedSupplierId={selectedSupplierId}
        selectedSupplier={selectedSupplier}
        isEditingSupplier={isEditingfornecedor}
        onMarginChange={setMargin}
        onDollarStoneChange={setDollarStone}
        onSaveBaseCalc={handleSaveBaseCalc}
        onUpdateGoldQuote={updateGoldQuote}
        onUseQuoteAsReference={handleUseQuoteAsReference}
        onGoldPriceChange={setGoldPrice18k}
        onSaveGoldPrice={handleSaveGoldPrice}
        onSupplierChange={setSelectedSupplierId}
        onUpdateSupplierPrices={handleUpdatefornecedor}
        onToggleSupplierEdit={() => setIsEditingfornecedor(!isEditingfornecedor)}
        onSaveSupplierPrices={handleSavefornecedor}
      />

      <MainGrid>
        <LeftColumn>
          <GoldSection
            pricingLoading={pricingLoading}
            effectiveGoldPrice={effectiveGoldPrice}
            goldWeight={goldWeight}
            goldValue={goldValue}
            onGoldWeightChange={setGoldWeight}
          />
          <StonesSection
            stones={stones}
            supplierName={selectedSupplier.name}
            supplierPrices={selectedSupplier.prices}
            fallbackSupplierPrices={fallbackSupplierPrices}
            margin={margin}
            dollarStone={dollarStone}
            stonesValue={stonesValue}
            totalQty={totalQty}
            onAddStone={handleAddStone}
            onUpdateStone={handleUpdateStone}
            onRemoveStone={handleRemoveStone}
          />
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
