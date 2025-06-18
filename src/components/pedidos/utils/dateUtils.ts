export const getDeliveryStatusColor = (dataPrevistaEntrega?: Date): string => {
  if (!dataPrevistaEntrega) return 'border-l-gray-400';

  const today = new Date();
  const deliveryDate = new Date(dataPrevistaEntrega);
  const diffTime = deliveryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Vencido
  if (diffDays < 0) {
    return 'border-l-red-600 bg-red-50';
  }
  
  // 0-5 dias (vermelho)
  if (diffDays <= 5) {
    return 'border-l-red-500 bg-red-50';
  }
  
  // 6-7 dias (laranja)
  if (diffDays <= 7) {
    return 'border-l-orange-500 bg-orange-50';
  }
  
  // 8-9 dias (amarelo)
  if (diffDays <= 9) {
    return 'border-l-yellow-500 bg-yellow-50';
  }
  
  // 10+ dias (verde)
  return 'border-l-green-500 bg-green-50';
};

export const getDeliveryStatusText = (dataPrevistaEntrega?: Date): string => {
  if (!dataPrevistaEntrega) return '';

  const today = new Date();
  const deliveryDate = new Date(dataPrevistaEntrega);
  const diffTime = deliveryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `Vencido há ${Math.abs(diffDays)} dias`;
  } else if (diffDays === 0) {
    return 'Vence hoje';
  } else if (diffDays === 1) {
    return 'Vence amanhã';
  } else {
    return `${diffDays} dias restantes`;
  }
};