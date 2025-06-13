
// translations.ts
// CustomButton.ts
// theme.ts
// ./components/Styles.ts
// ./components/Styles.ts
// ./components/Styles.ts
export const lightTheme = {
  /* Fundo geral da página */
  background: '#f9fafb',

  /* Fundo do formulário/card */
  formBackground: '#ffffff',

  /* Texto geral */
  text: '#333333',

  /* Cabeçalho e rodapé */
  headerBackground: '#ffffff',
  footerBackground: '#ffffff',

  /* Labels */
  labelColor: '#374151',

  /* Inputs */
  inputBackground: '#ffffff',
  inputText: '#333333',
  inputBorderColor: '#d1d5db',
  inputFocusBorderColor: '#3b82f6',
  inputFocusShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
  inputFocusBackground: '#ffffff',
  placeholderColor: '#9ca3af',

  /* Botões padrão (azul) */
  buttonBackground: '#3b82f6',
  buttonText: '#ffffff',
  buttonHoverBackground: '#2563eb',
  buttonFocusShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',

  /* Botões de excluir (vermelho) */
  buttonBackgroundRed: '#ef4444',
  buttonTextRed: '#ffffff',
  buttonHoverBackgroundRed: '#dc2626',
  buttonFocusShadowRed: '0 0 0 3px rgba(239, 68, 68, 0.3)',

  /* Botão de adicionar pedra (verde) */
  addStoneButtonText: '#ffffff',
  addStoneButtonBackground: '#10b981',
  addStoneButtonHoverBackground: '#059669',
  addStoneButtonFocusShadow: '0 0 0 3px rgba(16, 185, 129, 0.3)',

  /* Botões de ação (Cancelar) */
  actionButtonBorder: '#d1d5db',
  actionButtonText: '#374151',
  actionButtonBackground: '#ffffff',
  actionButtonHoverBackground: '#f3f4f6',

  /* Card e outros containers */
  cardBackground: '#ffffff',
  cardShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',

  /* Upload de imagem */
  uploadButtonBorder: '#d1d5db',
  uploadButtonText: '#374151',
  uploadButtonBackground: '#ffffff',
  uploadButtonHoverBackground: '#f3f4f6',
  imagePreviewBoxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',

  /* Cor do título */
  titleColor: '#1f2937'
}

export const darkTheme = {
  /* Fundo geral da página */
  background: '#111827',

  /* Fundo do formulário/card */
  formBackground: '#1f2937',

  /* Texto geral */
  text: '#f9fafb',

  /* Cabeçalho e rodapé */
  headerBackground: '#1f2937',
  footerBackground: '#111827',

  /* Labels */
  labelColor: '#f9fafb',

  /* Inputs */
  inputBackground: '#374151',
  inputText: '#f9fafb',
  inputBorderColor: '#4b5563',
  inputFocusBorderColor: '#60a5fa',
  inputFocusShadow: '0 0 0 2px rgba(96, 165, 250, 0.2)',
  inputFocusBackground: '#374151',
  placeholderColor: '#9ca3af',

  /* Botões padrão (azul) */
  buttonBackground: '#3b82f6',
  buttonText: '#ffffff',
  buttonHoverBackground: '#2563eb',
  buttonFocusShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',

  /* Botões de excluir (vermelho) */
  buttonBackgroundRed: '#ef4444',
  buttonTextRed: '#ffffff',
  buttonHoverBackgroundRed: '#dc2626',
  buttonFocusShadowRed: '0 0 0 3px rgba(239, 68, 68, 0.3)',

  /* Botão de adicionar pedra (verde) */
  addStoneButtonText: '#ffffff',
  addStoneButtonBackground: '#10b981',
  addStoneButtonHoverBackground: '#059669',
  addStoneButtonFocusShadow: '0 0 0 3px rgba(16, 185, 129, 0.3)',

  /* Botões de ação (Cancelar) */
  actionButtonBorder: '#4b5563',
  actionButtonText: '#f9fafb',
  actionButtonBackground: '#374151',
  actionButtonHoverBackground: '#4b5563',

  /* Card e outros containers */
  cardBackground: '#1f2937',
  cardShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',

  /* Upload de imagem */
  uploadButtonBorder: '#4b5563',
  uploadButtonText: '#f9fafb',
  uploadButtonBackground: '#374151',
  uploadButtonHoverBackground: '#4b5563',
  imagePreviewBoxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',

  /* Cor do título */
  titleColor: '#f9fafb'
};

// Defina a interface para o objeto de tradução
interface Translations {
  category: Record<string, string>
  finish: Record<string, string>
  designer: Record<string, string>
  target_audience: Record<string, string>
  cut: Record<string, string>
}

// Objeto de tradução
export const translations: Translations = {
  category: {
    ring: 'Anel',
    wedding_ring: 'Aliança',
    meia_alianca: 'Meia Aliança',
    pendant: 'Pingente',
    earring: 'Brinco',
    necklace: 'Colar',
    bracelet: 'Pulseira',
    brooch: 'Broche',
    rivi: 'Rivieira'
  },
  finish: {
    polished: 'Polido',
    matte: 'Fosco',
    textured: 'Texturizado',
    hammered: 'Martelado',
    brushed: 'Escovado',
    antique: 'Envelhecido'
  },
  designer: {
    classic: 'Clássico',
    modern: 'Moderno',
    vintage: 'Vintage',
    contemporary: 'Contemporâneo',
    personalizado: 'Personalizado',
    minimalist: 'Minimalista'
  },
  target_audience: {
    female: 'Feminino',
    male: 'Masculino',
    children: 'Infantil',
    unisex: 'Unissex'
  },
  cut: {
    round: 'Redonda',
    princess: 'Princesa',
    oval: 'Oval',
    marquise: 'Marquise',
    pear: 'Pera',
    emerald: 'Esmeralda',
    cushion: 'Cushion',
    heart: 'Coração'
  }
}

// Função de tradução
export const translate = (
  key: keyof Translations,
  value: string | null | undefined
): string => {
  if (!value) return '' // Retorna uma string vazia se o valor for nulo ou indefinido
  if (translations[key] && translations[key][value]) {
    return translations[key][value]
  }
  return value // Retorna o valor original se não houver tradução
}
