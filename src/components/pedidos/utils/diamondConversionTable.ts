export interface DiamondConversion {
  pts: number;
  size: number;
  carats: number;
}

export const DIAMOND_CONVERSION_TABLE: DiamondConversion[] = [
  { pts: 0.5, size: 1.0, carats: 0.005 },
  { pts: 1, size: 1.3, carats: 0.01 },
  { pts: 1.5, size: 1.5, carats: 0.015 },
  { pts: 2, size: 1.7, carats: 0.02 },
  { pts: 2.5, size: 1.8, carats: 0.025 },
  { pts: 3, size: 2.0, carats: 0.03 },
  { pts: 3.5, size: 2.1, carats: 0.035 },
  { pts: 4, size: 2.2, carats: 0.04 },
  { pts: 5, size: 2.4, carats: 0.05 },
  { pts: 6, size: 2.5, carats: 0.06 },
  { pts: 7, size: 2.7, carats: 0.07 },
  { pts: 8, size: 2.8, carats: 0.08 },
  { pts: 9, size: 2.9, carats: 0.09 },
  { pts: 10, size: 3.0, carats: 0.10 },
  { pts: 11, size: 3.1, carats: 0.11 },
  { pts: 12, size: 3.2, carats: 0.12 },
  { pts: 14, size: 3.3, carats: 0.14 },
  { pts: 15, size: 3.4, carats: 0.15 },
  { pts: 16, size: 3.5, carats: 0.16 },
  { pts: 17, size: 3.6, carats: 0.17 },
  { pts: 18, size: 3.7, carats: 0.18 },
  { pts: 20, size: 3.8, carats: 0.20 },
  { pts: 22, size: 3.9, carats: 0.22 },
  { pts: 30, size: 4.2, carats: 0.30 },
  { pts: 33, size: 4.4, carats: 0.33 },
  { pts: 35, size: 4.5, carats: 0.35 },
  { pts: 38, size: 4.6, carats: 0.38 },
  { pts: 40, size: 4.8, carats: 0.40 },
  { pts: 50, size: 5.0, carats: 0.50 },
  { pts: 60, size: 5.4, carats: 0.60 },
  { pts: 63, size: 5.5, carats: 0.63 },
  { pts: 65, size: 5.6, carats: 0.65 },
  { pts: 75, size: 6.0, carats: 0.75 },
  { pts: 95, size: 6.4, carats: 0.95 },
  { pts: 100, size: 6.6, carats: 1.00 },
  { pts: 117, size: 6.8, carats: 1.17 },
  { pts: 125, size: 7.0, carats: 1.25 },
  { pts: 133, size: 7.2, carats: 1.33 },
  { pts: 155, size: 7.5, carats: 1.55 },
  { pts: 175, size: 7.8, carats: 1.75 },
  { pts: 200, size: 8.0, carats: 2.00 },
  { pts: 215, size: 8.2, carats: 2.15 },
  { pts: 225, size: 8.4, carats: 2.25 },
  { pts: 275, size: 9.0, carats: 2.75 },
  { pts: 300, size: 9.4, carats: 3.00 },
  { pts: 315, size: 9.6, carats: 3.15 },
  { pts: 335, size: 9.8, carats: 3.35 },
  { pts: 350, size: 10.0, carats: 3.50 },
  { pts: 375, size: 10.2, carats: 3.75 },
  { pts: 400, size: 10.4, carats: 4.00 },
  { pts: 425, size: 10.6, carats: 4.25 },
  { pts: 450, size: 10.8, carats: 4.50 },
  { pts: 475, size: 11.0, carats: 4.75 },
  { pts: 500, size: 11.2, carats: 5.00 },
  { pts: 650, size: 12.0, carats: 6.50 },
];

export const findDiamondDataBySize = (size: number): DiamondConversion | null => {
  // Busca valor exato na tabela
  const exactMatch = DIAMOND_CONVERSION_TABLE.find(d => d.size === size);
  if (exactMatch) {
    return exactMatch;
  }

  // Se não encontrar valor exato, faz interpolação linear
  const sortedTable = [...DIAMOND_CONVERSION_TABLE].sort((a, b) => a.size - b.size);
  
  let lower = null;
  let upper = null;

  for (let i = 0; i < sortedTable.length; i++) {
    if (sortedTable[i].size < size) {
      lower = sortedTable[i];
    } else if (sortedTable[i].size > size && upper === null) {
      upper = sortedTable[i];
      break;
    }
  }

  // Se size é menor que o menor valor da tabela
  if (lower === null && upper !== null) {
    return upper;
  }

  // Se size é maior que o maior valor da tabela
  if (upper === null && lower !== null) {
    return lower;
  }

  // Interpolação linear
  if (lower !== null && upper !== null) {
    const ratio = (size - lower.size) / (upper.size - lower.size);
    return {
      pts: Math.round(lower.pts + (upper.pts - lower.pts) * ratio),
      size: parseFloat(size.toFixed(1)),
      carats: parseFloat((lower.carats + (upper.carats - lower.carats) * ratio).toFixed(3))
    };
  }

  return null;
};
