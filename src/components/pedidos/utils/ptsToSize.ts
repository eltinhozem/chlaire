// Tabela de conversão PTS para tamanho em milímetros para diamantes redondos
export const PTS_TO_SIZE_TABLE: Record<number, number> = {
  0.5: 1.0,
  1: 1.3,
  1.5: 1.5,
  2: 1.7,
  2.5: 1.8,
  3: 2.0,
  3.5: 2.1,
  4: 2.2,
  5: 2.4,
  6: 2.5,
  7: 2.7,
  8: 2.8,
  9: 2.9,
  10: 3.0,
  11: 3.1,
  12: 3.2,
  14: 3.3,
  15: 3.4,
  16: 3.5,
  17: 3.6,
  18: 3.7,
  20: 3.8,
  22: 3.9,
  25: 4.0,
  30: 4.2,
  33: 4.4,
  35: 4.5,
  38: 4.6,
  40: 4.8,
  50: 5.0,
  60: 5.4,
  63: 5.5,
  65: 5.6,
  75: 6.0,
  95: 6.4,
  100: 6.0,
  117: 6.6,
  125: 7.0,
  133: 7.2,
  155: 7.9,
  175: 7.8,
  200: 8.8,
  215: 8.4,
  225: 8.6,
  275: 9.0,
  300: 9.4,
  315: 9.6,
  335: 9.8,
  350: 10.0,
  375: 10.2,
  400: 10.4,
  425: 10.6,
  450: 11.0,
  475: 11.2,
  500: 11.2,
  650: 12.0
};

export const convertPtsToSize = (pts: number): number | null => {
  // Busca valor exato na tabela
  if (PTS_TO_SIZE_TABLE[pts]) {
    return PTS_TO_SIZE_TABLE[pts];
  }

  // Se não encontrar valor exato, faz interpolação linear
  const ptsValues = Object.keys(PTS_TO_SIZE_TABLE).map(Number).sort((a, b) => a - b);
  
  // Encontra os valores mais próximos para interpolação
  let lower = null;
  let upper = null;

  for (let i = 0; i < ptsValues.length; i++) {
    if (ptsValues[i] < pts) {
      lower = ptsValues[i];
    } else if (ptsValues[i] > pts && upper === null) {
      upper = ptsValues[i];
      break;
    }
  }

  // Se pts é menor que o menor valor da tabela
  if (lower === null && upper !== null) {
    return PTS_TO_SIZE_TABLE[upper];
  }

  // Se pts é maior que o maior valor da tabela
  if (upper === null && lower !== null) {
    return PTS_TO_SIZE_TABLE[lower];
  }

  // Interpolação linear
  if (lower !== null && upper !== null) {
    const lowerSize = PTS_TO_SIZE_TABLE[lower];
    const upperSize = PTS_TO_SIZE_TABLE[upper];
    const ratio = (pts - lower) / (upper - lower);
    return parseFloat((lowerSize + (upperSize - lowerSize) * ratio).toFixed(1));
  }

  return null;
};