// Tabela de preços por fornecedor - preço por unidade baseado no tamanho (mm)
export interface SupplierPriceEntry {
  mm: number
  price: number
}

export interface Supplier {
  id: string
  name: string
  prices: SupplierPriceEntry[]
}

export const suppliers: Supplier[] = [
  {
    id: 'fornecedor1',
    name: 'Fornecedor 1',
    prices: [
      { mm: 1.0, price: 425 },
      { mm: 1.3, price: 425 },
      { mm: 1.5, price: 425 },
      { mm: 1.7, price: 425 },
      { mm: 1.8, price: 425 },
      { mm: 2.0, price: 425 },
      { mm: 2.1, price: 425 },
      { mm: 2.2, price: 425 },
      { mm: 2.4, price: 425 },
      { mm: 2.5, price: 425 },
      { mm: 2.7, price: 425 },
      { mm: 3.0, price: 525 },
      { mm: 3.4, price: 550 },
      { mm: 3.8, price: 685 },
      { mm: 4.0, price: 725 },
      { mm: 4.2, price: 785 },
      { mm: 4.8, price: 1050 }
      
    ]
  },
  {
    id: 'fornecedor2',
    name: 'Fornecedor 2 com GIA',
    prices: [
      { mm: 1.0, price: 425 },
      { mm: 1.3, price: 425 },
      { mm: 1.5, price: 425 },
      { mm: 1.7, price: 425 },
      { mm: 1.8, price: 425 },
      { mm: 2.0, price: 425 },
      { mm: 2.1, price: 425 },
      { mm: 2.2, price: 425 },
      { mm: 2.4, price: 425 },
      { mm: 2.5, price: 425 },
      { mm: 2.7, price: 425 },
      { mm: 3.0, price: 525 },
      { mm: 3.4, price: 550 },
      { mm: 3.8, price: 685 },
      { mm: 4.0, price: 725 },
      { mm: 4.2, price: 1100 },
      { mm: 4.8, price: 1063 },
      { mm: 5.0, price: 1200 },
      { mm: 5.8, price: 1381 },
      { mm: 6.6, price: 2114 },
      { mm: 7.4, price: 3739 },
      { mm: 8.0, price: 4554 }
    ]
  }
]

// Retorna o preço da pedra por unidade baseado no tamanho (mm)
export function getStonePriceByMm(
  mm: number,
  fornecedor: SupplierPriceEntry[],
  fallbackFornecedor?: SupplierPriceEntry[]
): number {
  if (mm <= 0) return 0
  if (fornecedor.length === 0) {
    return fallbackFornecedor ? getStonePriceByMm(mm, fallbackFornecedor) : 0
  }

  // Ordena por mm
  const sorted = [...fornecedor].sort((a, b) => a.mm - b.mm)
  const minMm = sorted[0].mm
  const maxMm = sorted[sorted.length - 1].mm

  // Se o fornecedor não cobrir o tamanho, usa o fallback (ex: Fornecedor 2 com GIA)
  if (fallbackFornecedor && mm > maxMm) {
    return getStonePriceByMm(mm, fallbackFornecedor)
  }

  // Se for menor que o primeiro, retorna o primeiro
  if (mm <= minMm) return sorted[0].price

  // Se for maior que o último, retorna o último
  if (mm >= maxMm) return sorted[sorted.length - 1].price

  // Encontra o mais próximo
  let closest = sorted[0]
  let minDiff = Math.abs(mm - closest.mm)

  for (const entry of sorted) {
    const diff = Math.abs(mm - entry.mm)
    if (diff < minDiff) {
      minDiff = diff
      closest = entry
    }
  }

  return closest.price
}

// Retorna o fornecedor pelo ID
export function getSupplierById(id: string): Supplier | undefined {
  return suppliers.find((s) => s.id === id)
}
