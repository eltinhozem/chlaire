import { findConversionByCt, findConversionByMm, pointsToCt } from './stoneConversionTable'
import { Stone } from './types'

export const generateId = () => Math.random().toString(36).substring(2, 9)

export const createEmptyStone = (): Stone => ({
  id: generateId(),
  quantity: 1,
  sizeMm: 0,
  ct: 0,
  pricePerUnit: 0,
  totalPrice: 0
})

export const parseNumber = (raw: string): number | null => {
  if (!raw) return null
  const normalized = raw.replace(/\s+/g, '').replace(',', '.')
  const parsed = parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

export const parseTxtData = (
  content: string
): {
  weight?: number
  width?: number
  height?: number
  stones: Array<{ quantity: number; sizeMm: number }>
} => {
  const normalized = content.replace(/\r/g, '')

  const weightMatch = normalized.match(/PESO\s*:\s*([\d.,]+)/i)
  const weight = weightMatch ? parseNumber(weightMatch[1]) || undefined : undefined
  // captura valores de largura; se houver múltiplos (ex: "2.00mm / 2.76mm"), mantém o maior
  const widthLineMatch = normalized.match(/LARGURA\s*:\s*([^\n]+)/i)
  const parsedWidths = widthLineMatch
    ? [...widthLineMatch[1].matchAll(/([\d.,]+)/g)]
        .map((m) => parseNumber(m[1]))
        .filter((n): n is number => Number.isFinite(n))
    : []
  const width = parsedWidths.length > 0 ? Math.max(...parsedWidths) : undefined
  const heightMatch = normalized.match(/ALTURA\s*:\s*([\d.,]+)/i)
  const height = heightMatch ? parseNumber(heightMatch[1]) || undefined : undefined

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

  return { weight, width, height, stones }
}

export const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const TROY_OUNCE_IN_GRAMS = 31.1034768

// Fonte 1: GoldPrice.org (XAU em BRL) - converte de onça troy para grama
const fetchGoldQuoteFromGoldPriceOrg = async (): Promise<number> => {
  const response = await fetch('https://data-asg.goldprice.org/dbXRates/BRL', { cache: 'no-store' })
  if (!response.ok) {
    throw new Error(`Resposta inválida do GoldPrice.org (${response.status})`)
  }

  const payload = await response.json()
  const ouncePriceBrl = parseFloat(payload?.items?.[0]?.xauPrice)

  if (!Number.isFinite(ouncePriceBrl)) {
    throw new Error('Cotação do ouro não encontrada na resposta do GoldPrice.org')
  }

  const gramPrice = ouncePriceBrl / TROY_OUNCE_IN_GRAMS
  return Math.round(gramPrice * 100) / 100
}

// Fonte 2: AwesomeAPI (XAU/BRL) - converte de onça troy para grama
const fetchGoldQuoteFromAwesomeApi = async (): Promise<number> => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/last/XAU-BRL')
  if (!response.ok) {
    throw new Error(`Resposta inválida da AwesomeAPI (${response.status})`)
  }

  const payload = await response.json()
  const ouncePriceBrl = parseFloat(payload?.XAUBRL?.bid ?? payload?.XAU?.bid)

  if (!Number.isFinite(ouncePriceBrl)) {
    throw new Error('Cotação do ouro não encontrada na resposta da AwesomeAPI')
  }

  const gramPrice = ouncePriceBrl / TROY_OUNCE_IN_GRAMS
  return Math.round(gramPrice * 100) / 100
}

// Tenta múltiplas fontes e retorna a primeira cotação válida encontrada
export const fetchGoldQuoteInBrlPerGram = async (): Promise<number> => {
  const providers = [fetchGoldQuoteFromGoldPriceOrg, fetchGoldQuoteFromAwesomeApi]
  const errors: unknown[] = []

  for (const provider of providers) {
    try {
      const price = await provider()
      if (Number.isFinite(price) && price > 0) return price
    } catch (err) {
      errors.push(err)
      // tenta próxima fonte
    }
  }

  console.error('Todas as fontes de cotação falharam:', errors)
  throw new Error('Não foi possível obter a cotação do ouro.')
}

// Converte ct -> mm (linear entre tabelas conhecidas)
export const ctToMm = (ct: number): number => {
  if (!ct || ct <= 0) return 0
  const conversion = findConversionByCt(ct)
  return conversion ? conversion.mm : 0
}

// Converte mm -> ct (linear entre tabelas conhecidas)
export const mmToCt = (mm: number): number => {
  if (!mm || mm <= 0) return 0
  const conversion = findConversionByMm(mm)
  return conversion ? conversion.ct : 0
}

export const ptsToCt = (points: number): number => pointsToCt(points)

// Reexport para consumidores que usam utils como fachada
export { findConversionByMm } from './stoneConversionTable'
