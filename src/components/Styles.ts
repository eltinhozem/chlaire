// translations.ts
// CustomButton.ts
import styled from 'styled-components';

export const CustomButton = styled.button`
  /* Posição e layout */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  /* Espaçamento interno e fonte */
  padding: 7px 15px;
  font-size: 14px;
  color: brown;
  
  /* Fundo, bordas e arredondamento */
  background: linear-gradient(to right, #fad2a4, #f6cda0, #ca9674);
  border: none;
  border-radius: 7px;
  cursor: pointer;
  overflow: hidden;
  
  /* Transições e sombra */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px rgba(250, 210, 164, 0.5);
  z-index: 1;
  
  /* Efeito de luz com pseudo-elemento */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    transform: skewX(-45deg);
    transition: left 0.5s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(250, 210, 164, 0.7);
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(202, 150, 116, 0.5);
  }
`;

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