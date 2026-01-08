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
  ConversionRows,
  ConversionRow
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
                <TableHeader>
                  <span>mm</span>
                  <span>pts</span>
                  <span>ct</span>
                </TableHeader>
                <ConversionRows>
                  {column.map((row, rowIndex) => (
                    <ConversionRow key={rowIndex}>
                      <span>{row.mm}</span>
                      <span>{row.points}</span>
                      <span>{row.ct}</span>
                    </ConversionRow>
                  ))}
                </ConversionRows>
              </TableCol>
            ))}
          </ConversionGrid>
        </TableWrapper>
      )}
    </SectionCard>
  )
}
