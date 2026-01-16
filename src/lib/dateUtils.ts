export const formatDateLabel = (value?: string): { date: Date; label: string } | null => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return { date, label: `${day}/${month}/${year}` };
};

export const formatDateString = (value?: string): string | null => {
  return formatDateLabel(value)?.label ?? null;
};

export const calculateAge = (date: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age -= 1;
  }
  return age;
};

export const getBirthMonth = (value?: string | null): string | null => {
  if (!value) return null;
  const parts = value.split('-');
  if (parts.length >= 2 && parts[1]) {
    return parts[1].padStart(2, '0');
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return String(date.getMonth() + 1).padStart(2, '0');
};
