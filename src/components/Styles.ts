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
  inputFocusBorderColor: '#8493aaff',
  inputFocusShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
  inputFocusBackground: '#ffffff',
  placeholderColor: '#9ca3af',

  /* Botões padrão (dourado) */
  buttonBackground: '#c29b62',
  buttonText: '#ffffff',
  buttonHoverBackground: '#b39549',
  buttonFocusShadow: '0 0 0 3px rgba(194, 155, 98, 0.35)',

  /* Botões de excluir (vermelho suave) */
  buttonBackgroundRed: 'linear-gradient(to right, #fecaca, #fca5a5, #f87171)',
  buttonTextRed: '#b91c1c',
  buttonHoverBackgroundRed: 'linear-gradient(to right, #fca5a5, #f87171, #ef4444)',
  buttonFocusShadowRed: '0 0 0 3px rgba(248, 113, 113, 0.3)',

  /* Botão de adicionar pedra (dourado) */
  addStoneButtonText: '#ffffff',
  addStoneButtonBackground: '#c29b62',
  addStoneButtonHoverBackground: '#b39549',
  addStoneButtonFocusShadow: '0 0 0 3px rgba(194, 155, 98, 0.35)',
  addStoneButtonFocusColor: 'rgba(194, 155, 98, 0.45)',

  /* Botões de ação (dourado) */
  actionButtonBorder: '#c29b62',
  actionButtonText: '#ffffff',
  actionButtonBackground: '#c29b62',
  actionButtonHoverBackground: '#b39549',

  /* Card e outros containers */
  cardBackground: '#ffffff',
  cardShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',

  /* Upload de imagem */
  uploadButtonBorder: '#c29b62',
  uploadButtonText: '#ffffff',
  uploadButtonBackground: '#c29b62',
  uploadButtonHoverBackground: '#b39549',
  imagePreviewBoxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',

  /* Cor do título */
  titleColor: '#1f2937',

  /* Submit button */
  submitButtonText: '#ffffff',
  submitButtonBackground: '#c29b62',
  submitButtonFocusColor: 'rgba(194, 155, 98, 0.45)'
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

  /* Botões padrão (dourado) */
  buttonBackground: '#c29b62',
  buttonText: '#ffffff',
  buttonHoverBackground: '#b39549',
  buttonFocusShadow: '0 0 0 3px rgba(194, 155, 98, 0.35)',

  /* Botões de excluir (vermelho suave) */
  buttonBackgroundRed: 'linear-gradient(to right, #991b1b, #dc2626, #ef4444)',
  buttonTextRed: '#fecaca',
  buttonHoverBackgroundRed: 'linear-gradient(to right, #dc2626, #ef4444, #f87171)',
  buttonFocusShadowRed: '0 0 0 3px rgba(239, 68, 68, 0.3)',

  /* Botão de adicionar pedra (dourado) */
  addStoneButtonText: '#ffffff',
  addStoneButtonBackground: '#c29b62',
  addStoneButtonHoverBackground: '#b39549',
  addStoneButtonFocusShadow: '0 0 0 3px rgba(194, 155, 98, 0.35)',
  addStoneButtonFocusColor: 'rgba(194, 155, 98, 0.45)',

  /* Botões de ação (dourado) */
  actionButtonBorder: '#c29b62',
  actionButtonText: '#ffffff',
  actionButtonBackground: '#c29b62',
  actionButtonHoverBackground: '#b39549',

  /* Card e outros containers */
  cardBackground: '#1f2937',
  cardShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',

  /* Upload de imagem */
  uploadButtonBorder: '#c29b62',
  uploadButtonText: '#ffffff',
  uploadButtonBackground: '#c29b62',
  uploadButtonHoverBackground: '#b39549',
  imagePreviewBoxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',

  /* Cor do título */
  titleColor: '#f9fafb',

  /* Submit button */
  submitButtonText: '#ffffff',
  submitButtonBackground: '#c29b62',
  submitButtonFocusColor: 'rgba(194, 155, 98, 0.45)'
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
    contemporary: 'Reta',
    personalizado: 'Personalizado',
    minimalist: 'Bojuda'
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
