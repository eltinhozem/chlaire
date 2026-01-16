export const normalizeStones = <T extends object>(value: unknown): T[] => {
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      return normalizeStones<T>(JSON.parse(value));
    } catch {
      return [];
    }
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => item as T)
      .filter((item) => item && typeof item === 'object');
  }
  if (typeof value === 'object') {
    return [value as T];
  }
  return [];
};
