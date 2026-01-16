import type { NumeracaoDedos, SpecialDate } from './types';

export const createEmptyFingerSizes = (): NumeracaoDedos => ({
  direita: {
    polegar: '',
    indicador: '',
    medio: '',
    anelar: '',
    minimo: ''
  },
  esquerda: {
    polegar: '',
    indicador: '',
    medio: '',
    anelar: '',
    minimo: ''
  }
});

export const parseFingerSizes = (value: unknown): NumeracaoDedos | null => {
  if (!value) return null;
  if (typeof value === 'string') {
    try {
      return parseFingerSizes(JSON.parse(value));
    } catch {
      return null;
    }
  }
  if (typeof value === 'object') {
    const record = value as Partial<NumeracaoDedos>;
    const empty = createEmptyFingerSizes();
    return {
      direita: { ...empty.direita, ...(record.direita || {}) },
      esquerda: { ...empty.esquerda, ...(record.esquerda || {}) }
    };
  }
  return null;
};

export const coerceFingerSizes = (value: unknown): NumeracaoDedos => {
  return parseFingerSizes(value) ?? createEmptyFingerSizes();
};

export const hasFingerSizing = (sizes: NumeracaoDedos | null) => {
  if (!sizes) return false;
  return Object.values(sizes).some((hand) =>
    Object.values(hand).some((value) => String(value).trim().length > 0)
  );
};

export const normalizeSpecialDates = (value: unknown): SpecialDate[] => {
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      return normalizeSpecialDates(JSON.parse(value));
    } catch {
      return [];
    }
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => ({
        data: item?.data || '',
        descricao: item?.descricao || ''
      }))
      .filter((item) => item.data || item.descricao);
  }
  return [];
};

export const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
  }
  return numbers
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2');
};

export const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 10) {
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return numbers
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
};

export const getInitials = (name: string) => {
  const parts = name.split(' ').filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]).join('');
  return initials.toUpperCase() || '-';
};

export const buildWhatsAppLink = (rawPhone: string) => {
  const digits = rawPhone.replace(/\D/g, '');
  if (!digits) return '';
  const shouldAddCountry = (digits.length === 10 || digits.length === 11) && !digits.startsWith('55');
  return `https://wa.me/${shouldAddCountry ? `55${digits}` : digits}`;
};
