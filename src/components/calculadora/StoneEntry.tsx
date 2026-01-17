import { useEffect, useMemo, useState } from 'react'
import { Gem, Trash2 } from 'lucide-react'
import { DangerButton } from '../buttons/DangerButton'
import { getStonePriceByMm, SupplierPriceEntry } from './fornecedor'
import { Stone } from './types'
import { mmToCt, findConversionByMm } from './utils'
import {
  StoneCard,
  StoneHeader,
  InlineActions,
  FormRow,
  Label,
  Input,
  StoneMetricsGrid,
  Metric,
  MetricLabel,
  MetricValue,
  Tag
} from './styles'

interface StoneEntryProps {
  stone: Stone
  fornecedor: SupplierPriceEntry[]
  fallbackFornecedor?: SupplierPriceEntry[]
  margin: number
  dollarStone: number
  onUpdate: (stone: Stone) => void
  onRemove: (id: string) => void
  canRemove: boolean
}

export function StoneEntry({
  stone,
  fornecedor,
  fallbackFornecedor,
  margin,
  dollarStone,
  onUpdate,
  onRemove,
  canRemove
}: StoneEntryProps) {
  const [quantity, setQuantity] = useState<number>(stone.quantity || 1)
  const [sizeMm, setSizeMm] = useState<number>(stone.sizeMm || 0)

  const stoneCt = useMemo(() => mmToCt(sizeMm), [sizeMm])
  const stonePoints = useMemo(() => findConversionByMm(sizeMm)?.points || 0, [sizeMm])
  const formattedPoints = useMemo(() => {
    if (!stonePoints) return ''
    const pointsString = Number.isInteger(stonePoints)
      ? stonePoints.toFixed(0)
      : stonePoints.toFixed(2).replace(/\.?0+$/, '')
    return `${pointsString}pts`
  }, [stonePoints])

  useEffect(() => {
    const basePrice = getStonePriceByMm(sizeMm, fornecedor, fallbackFornecedor)
    const pricePerUnit = basePrice * (stoneCt || 0) * dollarStone * margin
    const totalPrice = pricePerUnit * quantity

    onUpdate({
      ...stone,
      quantity,
      sizeMm,
      ct: stoneCt || 0,
      pricePerUnit,
      totalPrice
    })
  }, [quantity, sizeMm, fornecedor, fallbackFornecedor, stoneCt, dollarStone, margin, onUpdate, stone.id])

  return (
    <StoneCard>
      <StoneHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Gem size={18} />
          <span>Pedra</span>
          {sizeMm > 0 && <Tag>{sizeMm.toFixed(1)}mm</Tag>}
          {stoneCt > 0 && <Tag>{stoneCt.toFixed(3)}ct</Tag>}
          {stonePoints > 0 && <Tag>{formattedPoints}</Tag>}
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
            <MetricLabel>Pontuação estimada</MetricLabel>
            <MetricValue>{formattedPoints || '-'}</MetricValue>
          </Metric>
          <Metric>
            <MetricLabel>Preço/unidade</MetricLabel>
            <MetricValue>R$ {stone.pricePerUnit.toFixed(2)}</MetricValue>
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
