import type { FingerKey, HandSide } from './types';

export const fingerLabels: { key: FingerKey; label: string }[] = [
  { key: 'polegar', label: 'Polegar' },
  { key: 'indicador', label: 'Indicador' },
  { key: 'medio', label: 'Médio' },
  { key: 'anelar', label: 'Anelar' },
  { key: 'minimo', label: 'Mindinho' }
];

export const handLabels: { key: HandSide; label: string }[] = [
  { key: 'direita', label: 'Mão direita' },
  { key: 'esquerda', label: 'Mão esquerda' }
];

export const birthMonthOptions = [
  { value: '01', label: 'Janeiro' },
  { value: '02', label: 'Fevereiro' },
  { value: '03', label: 'Março' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Maio' },
  { value: '06', label: 'Junho' },
  { value: '07', label: 'Julho' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' }
];
