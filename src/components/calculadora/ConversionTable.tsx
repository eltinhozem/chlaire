import { useState } from 'react'
import { Gauge, ChevronUp, ChevronDown } from 'lucide-react'
import { stoneConversionTable } from './stoneConversionTable'
import {
  SectionCard,
  ToggleButton,
  TableWrapper,
  ConversionGrid,
  TableCol,
  TableHeader,
  TableRow,
  TitleRow
} from './styles'

export function ConversionTable() {
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
                <TitleRow>
                  <TableHeader>mm</TableHeader>
                  <TableHeader>ct</TableHeader>
                  <TableHeader>pts</TableHeader>
                </TitleRow>
                {column.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <span>{row.mm}</span>
                    <span>{row.ct}</span>
                    <span>{(row.ct * 100).toFixed(0)}</span>
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
