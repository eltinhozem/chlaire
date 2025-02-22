// translations.ts

// Defina a interface para o objeto de tradução
interface Translations {
    category: Record<string, string>;
    finish: Record<string, string>;
    designer: Record<string, string>;
    target_audience: Record<string, string>;
    cut: Record<string, string>;
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
      rivi: 'Rivieira',
    },
    finish: {
      polished: 'Polido',
      matte: 'Fosco',
      textured: 'Texturizado',
      hammered: 'Martelado',
      brushed: 'Escovado',
      antique: 'Envelhecido',
    },
    designer: {
      classic: 'Clássico',
      modern: 'Moderno',
      vintage: 'Vintage',
      contemporary: 'Contemporâneo',
      personalizado: 'Personalizado',
      minimalist: 'Minimalista',
    },
    target_audience: {
      female: 'Feminino',
      male: 'Masculino',
      children: 'Infantil',
      unisex: 'Unissex',
    },
    cut: {
      round: 'Redonda',
      princess: 'Princesa',
      oval: 'Oval',
      marquise: 'Marquise',
      pear: 'Pera',
      emerald: 'Esmeralda',
      cushion: 'Cushion',
      heart: 'Coração',
    },
  };
  
  // Função de tradução
  export const translate = (key: keyof Translations, value: string | null | undefined): string => {
    if (!value) return ''; // Retorna uma string vazia se o valor for nulo ou indefinido
    if (translations[key] && translations[key][value]) {
      return translations[key][value];
    }
    return value; // Retorna o valor original se não houver tradução
  };