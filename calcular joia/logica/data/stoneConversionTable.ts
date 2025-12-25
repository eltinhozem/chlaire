// Tabela de conversão de pontos/mm para quilates (ct)
export interface StoneConversion {
  points: number;
  mm: number;
  ct: number;
}

export const stoneConversionTable: StoneConversion[] = [
  { points: 0.5, mm: 1.0, ct: 0.005 },
  { points: 1, mm: 1.3, ct: 0.01 },
  { points: 1.5, mm: 1.5, ct: 0.015 },
  { points: 2, mm: 1.7, ct: 0.02 },
  { points: 2.5, mm: 1.8, ct: 0.025 },
  { points: 3, mm: 2.0, ct: 0.03 },
  { points: 3.5, mm: 2.1, ct: 0.035 },
  { points: 4, mm: 2.2, ct: 0.04 },
  { points: 5, mm: 2.4, ct: 0.05 },
  { points: 6, mm: 2.5, ct: 0.06 },
  { points: 7, mm: 2.7, ct: 0.07 },
  { points: 8, mm: 2.8, ct: 0.08 },
  { points: 9, mm: 2.9, ct: 0.09 },
  { points: 10, mm: 3.0, ct: 0.10 },
  { points: 11, mm: 3.1, ct: 0.11 },
  { points: 12, mm: 3.2, ct: 0.12 },
  { points: 14, mm: 3.3, ct: 0.14 },
  { points: 15, mm: 3.4, ct: 0.15 },
  { points: 16, mm: 3.5, ct: 0.16 },
  { points: 17, mm: 3.6, ct: 0.17 },
  { points: 18, mm: 3.7, ct: 0.18 },
  { points: 20, mm: 3.8, ct: 0.20 },
  { points: 22, mm: 3.9, ct: 0.22 },
  { points: 25, mm: 4.0, ct: 0.25 },
  { points: 30, mm: 4.2, ct: 0.30 },
  { points: 33, mm: 4.4, ct: 0.33 },
  { points: 35, mm: 4.5, ct: 0.35 },
  { points: 38, mm: 4.6, ct: 0.38 },
  { points: 40, mm: 4.8, ct: 0.40 },
  { points: 50, mm: 5.0, ct: 0.50 },
  { points: 60, mm: 5.4, ct: 0.60 },
  { points: 63, mm: 5.5, ct: 0.63 },
  { points: 65, mm: 5.6, ct: 0.64 },
  { points: 75, mm: 6.0, ct: 0.75 },
  { points: 95, mm: 6.4, ct: 0.95 },
  { points: 100, mm: 6.6, ct: 1.00 },
  { points: 117, mm: 6.8, ct: 1.17 },
  { points: 125, mm: 7.0, ct: 1.25 },
  { points: 133, mm: 7.2, ct: 1.33 },
  { points: 155, mm: 7.5, ct: 1.55 },
  { points: 175, mm: 7.8, ct: 1.75 },
  { points: 200, mm: 8.0, ct: 2.00 },
  { points: 215, mm: 8.4, ct: 2.15 },
  { points: 225, mm: 8.6, ct: 2.25 },
  { points: 275, mm: 9.0, ct: 2.75 },
  { points: 300, mm: 9.4, ct: 3.00 },
  { points: 315, mm: 9.6, ct: 3.15 },
  { points: 335, mm: 9.8, ct: 3.35 },
  { points: 350, mm: 10.0, ct: 3.50 },
  { points: 375, mm: 10.2, ct: 3.75 },
  { points: 400, mm: 10.4, ct: 4.00 },
  { points: 425, mm: 10.6, ct: 4.25 },
  { points: 450, mm: 10.8, ct: 4.50 },
  { points: 500, mm: 11.2, ct: 5.00 },
  { points: 650, mm: 12.0, ct: 6.50 },
];

// Função para converter mm para ct (usa interpolação linear)
export function mmToCt(mm: number): number {
  if (mm <= 0) return 0;
  
  // Encontra os dois pontos mais próximos
  const sorted = [...stoneConversionTable].sort((a, b) => a.mm - b.mm);
  
  // Se for menor que o mínimo
  if (mm <= sorted[0].mm) {
    return sorted[0].ct;
  }
  
  // Se for maior que o máximo
  if (mm >= sorted[sorted.length - 1].mm) {
    return sorted[sorted.length - 1].ct;
  }
  
  // Encontra os dois pontos para interpolação
  for (let i = 0; i < sorted.length - 1; i++) {
    if (mm >= sorted[i].mm && mm <= sorted[i + 1].mm) {
      const ratio = (mm - sorted[i].mm) / (sorted[i + 1].mm - sorted[i].mm);
      const ct = sorted[i].ct + ratio * (sorted[i + 1].ct - sorted[i].ct);
      return Math.round(ct * 1000) / 1000;
    }
  }
  
  return 0;
}

// Função para obter o valor mais próximo da tabela
export function getClosestConversion(mm: number): StoneConversion | null {
  if (mm <= 0) return null;
  
  let closest = stoneConversionTable[0];
  let minDiff = Math.abs(mm - closest.mm);
  
  for (const entry of stoneConversionTable) {
    const diff = Math.abs(mm - entry.mm);
    if (diff < minDiff) {
      minDiff = diff;
      closest = entry;
    }
  }
  
  return closest;
}
