// translations.ts
// CustomButton.ts
// theme.ts
// ./components/Styles.ts
// ./components/Styles.ts
// ./components/Styles.ts
export const lightTheme = {
  /* Fundo geral da página (levemente cinza) */
  background: '#f9fafb',

  /* Fundo do formulário/card (branco) */
  formBackground: '#ffffff',

  /* Texto geral */
  text: '#333333',

  /* Cabeçalho e rodapé */
  headerBackground: '#ffffff',
  footerBackground: '#ffffff',

  /* Labels */
  labelColor: '#374151',

  /* Inputs */
  inputBackground: 'rgba(255, 255, 255, 0.5)',
  inputText: '#333333',
  inputBorderColor: '#d1d5db',
  inputFocusBorderColor: '#ca9674',
  inputFocusShadow: '0 0 0 2px rgba(202, 150, 116, 0.5)',
  inputFocusBackground: '#ffffff',
  placeholderColor: '#9ca3af',

  /* Botões */
  buttonBackground: 'linear-gradient(to right, #fad2a4, #f6cda0, #ca9674)',
  buttonBackgroundRed: 'linear-gradient(to right,rgb(250, 164, 164),rgb(246, 160, 160),rgb(202, 116, 116))',
  buttonText: '#8b4513',
  buttonHoverBackground: 'linear-gradient(to right, #f6cda0, #ca9674, #aa6e55)',
  buttonFocusShadow: '0 0 0 3px rgba(202, 150, 116, 0.5)',

  /* Botão de adicionar pedra */
  addStoneButtonText: '#8b4513',
  addStoneButtonBackground:
    'linear-gradient(to right, #fad2a4, #f6cda0, #ca9674)',
  addStoneButtonFocusColor: 'rgba(202, 150, 116, 0.5)',

  /* Botões de ação (Cancelar e Salvar) */
  actionButtonBorder: '#d1d5db',
  actionButtonText: '#374151',
  actionButtonBackground: 'white',
  actionButtonHoverBackground: '#f3f4f6',

  /* Botão de submit */
  submitButtonText: '#8b4513',
  submitButtonBackground:
    'linear-gradient(to right, #fad2a4, #f6cda0, #ca9674)',
  submitButtonFocusColor: 'rgba(202, 150, 116, 0.5)',

  /* Card e outros containers */
  cardBackground: '#ffffff',
  cardShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',

  /* Upload de imagem */
  uploadButtonBorder: '#d1d5db',
  uploadButtonText: '#374151',
  uploadButtonBackground: 'white',
  uploadButtonHoverBackground: '#f3f4f6',
  imagePreviewBoxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',

  /* Cor do título (marrom, semelhante ao print) */
  titleColor:
    'linear-gradient(to right, #fad2a4 0%, #f6cda0 3%, #ca9674 35%, #aa6e55 63%, #965641 85%, #8f4d3a 98%)'
}

 export const darkTheme = {
  /* Fundo geral da página (escuro) */
  background: '#1f2937',

  /* Fundo do formulário/card (escuro) */
  formBackground: '#2d3748',

  /* Texto geral (claro para contraste) */
  text: '#f3f4f6',

  /* Cabeçalho e rodapé (escuro) */
  headerBackground: '#374151',
  footerBackground: '#1f2937',

  /* Labels (claro para contraste) */
  labelColor: '#f3f4f6',

  /* Inputs */
  inputBackground: '#374151', // Fundo escuro
  inputText: '#f3f4f6', // Texto claro
  inputBorderColor: '#4b5563', // Borda escura
  inputFocusBorderColor: '#60a5fa', // Borda de foco (azul claro)
  inputFocusShadow: '0 0 0 2px rgba(96, 165, 250, 0.5)', // Sombra de foco
  inputFocusBackground: '#374151', // Fundo escuro ao focar
  placeholderColor: '#9ca3af', // Placeholder cinza

  /* Botões */
  buttonBackground: '#374151', // Fundo escuro
  buttonText: '#f3f4f6', // Texto claro
  buttonHoverBackground: '#4b5563', // Fundo escuro ao passar o mouse
  buttonFocusShadow: '0 0 0 3px rgba(96, 165, 250, 0.5)', // Sombra de foco

  /* Botão de adicionar pedra */
  addStoneButtonText: '#f3f4f6', // Texto claro
  addStoneButtonBackground: '#374151', // Fundo escuro
  addStoneButtonFocusColor: 'rgba(96, 165, 250, 0.5)', // Sombra de foco

  /* Botões de ação (Cancelar e Salvar) */
  actionButtonBorder: '#4b5563', // Borda escura
  actionButtonText: '#f3f4f6', // Texto claro
  actionButtonBackground: '#374151', // Fundo escuro
  actionButtonHoverBackground: '#4b5563', // Fundo escuro ao passar o mouse

  /* Botão de submit */
  submitButtonText: '#f3f4f6', // Texto claro
  submitButtonBackground: '#374151', // Fundo escuro
  submitButtonFocusColor: 'rgba(96, 165, 250, 0.5)', // Sombra de foco

  /* Card e outros containers */
  cardBackground: '#374151', // Fundo escuro
  cardShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', // Sombra mais escura

  /* Upload de imagem */
  uploadButtonBorder: '#4b5563', // Borda escura
  uploadButtonText: '#f3f4f6', // Texto claro
  uploadButtonBackground: '#374151', // Fundo escuro
  uploadButtonHoverBackground: '#4b5563', // Fundo escuro ao passar o mouse
  imagePreviewBoxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', // Sombra mais escura

  /* Cor do título (claro para contraste) */
  titleColor: '#f3f4f6', // Texto claro (sem gradiente no darkTheme)
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
