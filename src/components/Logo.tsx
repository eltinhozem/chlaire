import React from 'react'
import { styled } from 'styled-components'


export const CadastrosJoia = styled.button `
/* Define a posição relativa do botão, permitindo que elementos internos (como ::before) sejam posicionados em relação a ele */
position: relative;

/* Centraliza os itens horizontalmente e verticalmente dentro do botão */
display: inline-flex;
align-items: center;
justify-content: center;

/* Padding interno: controla o espaço entre o conteúdo (texto/ícone) e as bordas do botão */
padding: 7px 15px; // Altere aqui para diminuir/aumentar o tamanho do botão

/* Tamanho da fonte do texto dentro do botão */
font-size: 14px; // Altere aqui para mudar o tamanho do texto

/* Cor do texto */
color: brown;

/* Gradiente de fundo do botão */
background: linear-gradient(to right, #fad2a4, #f6cda0, #ca9674);

/* Remove a borda padrão do botão */
border: none;

/* Define o raio das bordas (quanto maior, mais arredondado será o botão) */
border-radius: 07px; // Altere aqui para ajustar o quão arredondado é o botão

/* Define o cursor como "pointer" quando o usuário passa o mouse sobre o botão */
cursor: pointer;

/* Garante que o pseudo-elemento ::before não "vaze" para fora do botão */
overflow: hidden;

/* Adiciona transições suaves para transformações (ex.: escala) e sombra */
transition: transform 0.3s ease, box-shadow 0.3s ease;

/* Sombra inicial do botão */
box-shadow: 0 10px 30px rgba(250, 210, 164, 0.5); // Altere aqui para ajustar a intensidade da sombra

/* Z-index garante que o botão fique acima de outros elementos */
z-index: 1;

/* Efeito de luz em movimento */
&::before {
  content: ''; // Cria um pseudo-elemento vazio
  position: absolute; // Posiciona o pseudo-elemento em relação ao botão
  top: 0; // Alinha o topo do pseudo-elemento com o topo do botão
  left: -100%; // Inicia o pseudo-elemento fora da área visível do botão
  width: 100%; // Largura igual à do botão
  height: 100%; // Altura igual à do botão
  background: rgba(255, 255, 255, 0.3); // Cor do efeito de luz (brilho)
  transform: skewX(-45deg); // Distorce o brilho para criar um efeito dinâmico
  transition: left 0.5s ease; // Animação suave do movimento do brilho
  z-index: -1; // Coloca o brilho atrás do conteúdo do botão
}

/* Efeito ao passar o mouse sobre o botão */
&:hover {
  transform: scale(1.05); // Aumenta ligeiramente o tamanho do botão
  box-shadow: 0 15px 40px rgba(250, 210, 164, 0.7); // Intensifica a sombra
}

/* Movimento do efeito de luz ao passar o mouse */
&:hover::before {
  left: 100%; // Move o brilho para fora da área visível do botão
}

/* Estilo para quando o botão está em foco (ex.: navegando com o teclado) */
&:focus {
  outline: none; // Remove o contorno padrão do foco
  box-shadow: 0 0 0 3px rgba(202, 150, 116, 0.5); // Adiciona uma borda destacada para acessibilidade
}
`;
export type LogoProps = {
  color?: 'url(#dDourado)' | 'black' | 'white'
  size?: 'small' | 'medium' | 'large'
  hideOnMobile?: boolean
  className?: string
}

const Logo = ({
  color = 'url(#dDourado)',
  size = 'large',
  hideOnMobile = false,
  className = ''
}: LogoProps) => {
  const getWidth = () => {
    switch (size) {
      case 'small':
        return '2rem'
      case 'large':
        return '13rem'
      default:
        return '10rem'
    }
  }

  const getHeight = () => {
    switch (size) {
      case 'small':
        return '2rem'
      case 'large':
        return '5rem'
      default:
        return '3rem'
    }
  }

  return (
    <div
      className={`${className} ${hideOnMobile ? 'hidden md:block' : ''}`}
      style={{ width: getWidth(), height: getHeight() }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 886.49 419.2">
        <defs>
          <linearGradient
            id="dDourado"
            x1="111.39"
            x2="365.62"
            y1="124.54"
            y2="375.46"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fad2a4" />
            <stop offset=".03" stopColor="#f6cda0" />
            <stop offset=".35" stopColor="#ca9674" />
            <stop offset=".63" stopColor="#aa6e55" />
            <stop offset=".85" stopColor="#965641" />
            <stop offset=".98" stopColor="#8f4d3a" />
          </linearGradient>
        </defs>

        <path
          fill={color}
          aria-label="Chlaire"
          stroke="none"
          strokeMiterlimit="10"
          d="M447.54 250c-11.1-22.14-29.74-38.95-51.2-49.46-3.06-8.73 7.82-15.57 14.35-9l7.89-6.87q-24.22-34.32-51.64-57.08-1.65-1.35-3.19-2.81c-1-1-1.91-2.1-2.82-3.19q-22.76-27.42-57.08-51.65L297 77.81c6.55 6.54-.29 17.42-9 14.35-10.55-21.46-27.36-40.1-49.49-51.16-22.14 11.06-38.95 29.7-49.51 51.16-8.73 3.07-15.57-7.81-9-14.35l-6.86-7.89q-34.32 24.24-57.08 51.65c-.91 1.09-1.85 2.16-2.82 3.19s-2.09 1.91-3.19 2.81q-27.4 22.76-51.64 57.08l7.89 6.87c6.53-6.55 17.41.29 14.35 9-21.46 10.51-40.1 27.32-51.2 49.46 11.1 22.14 29.74 38.95 51.2 49.46 3.06 8.73-7.82 15.57-14.35 9l-7.89 6.87q24.23 34.32 51.64 57.08 1.65 1.35 3.19 2.81c1 1 1.91 2.1 2.82 3.19q22.76 27.42 57.08 51.65l6.86-7.89c-6.55-6.54.29-17.42 9-14.35 10.52 21.46 27.33 40.1 49.47 51.2 22.13-11.1 38.94-29.74 49.46-51.2 8.73-3.07 15.57 7.81 9 14.35l6.86 7.89q34.32-24.24 57.08-51.65c.91-1.09 1.85-2.16 2.82-3.19s2.09-1.91 3.19-2.81q27.4-22.76 51.64-57.08l-7.89-6.87c-6.53 6.55-17.41-.29-14.35-9 21.52-10.44 40.16-27.3 51.26-49.44ZM297.75 122.26A59.23 59.23 0 0 1 345.1 136c1.34 1.15 2.62 2.34 3.86 3.58s2.44 2.53 3.59 3.87a59.28 59.28 0 0 1 13.7 47.34c-29.09-6.62-59.3-3-81 12.55 15.48-21.79 19.13-52 12.5-81.08Zm-7.25 114c12.46-16.62 39.35-28.63 67.39-26.4a59.25 59.25 0 0 1-67.39 26.38Zm67.39 53.92c-28 2.23-54.93-9.78-67.39-26.4a59.25 59.25 0 0 1 67.39 26.38ZM238.51 67.63C256.75 79.72 267.72 95 273.23 111a70.32 70.32 0 0 0-34.72 33.54A70.38 70.38 0 0 0 203.78 111c5.51-16 16.48-31.28 34.73-43.37Zm11.54 151.1 10.22 9.5 9.51 10.22A19.61 19.61 0 0 1 275 250a19.61 19.61 0 0 1-5.18 11.55l-9.51 10.22-10.22 9.5a19.57 19.57 0 0 1-11.54 5.19 19.57 19.57 0 0 1-11.55-5.19l-10.22-9.5-9.51-10.22a19.61 19.61 0 0 1-5.22-11.55 19.61 19.61 0 0 1 5.18-11.55l9.51-10.22 10.22-9.5a19.57 19.57 0 0 1 11.55-5.19 19.57 19.57 0 0 1 11.54 5.19Zm-51.71-88.12a59.25 59.25 0 0 1 26.4 67.4c-16.61-12.46-28.63-39.36-26.4-67.4ZM99.53 284.73c-16-5.52-31.31-16.48-43.4-34.73 12.09-18.25 27.41-29.21 43.4-34.73A70.36 70.36 0 0 0 133.06 250a70.36 70.36 0 0 0-33.53 34.73Zm19.59-74.89c28-2.23 54.93 9.78 67.39 26.4a59.25 59.25 0 0 1-67.39-26.4Zm67.39 53.92c-12.46 16.62-39.35 28.63-67.39 26.4a59.25 59.25 0 0 1 67.39-26.4Zm-7.25 114A59.23 59.23 0 0 1 131.91 364c-1.34-1.15-2.62-2.34-3.86-3.58s-2.43-2.53-3.59-3.87a59.28 59.28 0 0 1-13.7-47.34c29.09 6.62 59.3 3 81-12.55-15.48 21.79-19.13 52-12.5 81.08Zm-68.5-187a59.28 59.28 0 0 1 13.7-47.34c1.16-1.34 2.35-2.63 3.59-3.87s2.52-2.43 3.86-3.58a59.23 59.23 0 0 1 47.35-13.7c-6.63 29.08-3 59.29 12.54 81-21.74-15.49-51.95-19.14-81.04-12.52ZM224.74 302a59.25 59.25 0 0 1-26.4 67.4c-2.23-28.05 9.79-54.95 26.4-67.4Zm13.77 130.38c-18.25-12.1-29.22-27.38-34.73-43.38a70.38 70.38 0 0 0 34.73-33.54A70.32 70.32 0 0 0 273.23 389c-5.51 16-16.48 31.28-34.72 43.37Zm40.16-63a59.25 59.25 0 0 1-26.4-67.4c16.62 12.47 28.63 39.37 26.4 67.41ZM252.27 198a59.25 59.25 0 0 1 26.4-67.4c2.23 28.05-9.78 54.95-26.4 67.4Zm100.28 158.59q-1.73 2-3.59 3.87a68.976 68.976 0 0 1-3.86 3.58 59.23 59.23 0 0 1-47.35 13.7c6.63-29.08 3-59.29-12.54-81 21.74 15.52 52 19.17 81 12.55a59.28 59.28 0 0 1-13.66 47.3Zm24.93-71.86A70.36 70.36 0 0 0 344 250a70.36 70.36 0 0 0 33.53-34.73c16 5.52 31.31 16.48 43.4 34.73-12.14 18.25-27.46 29.21-43.45 34.73Z"
          transform="translate(-28.91 -40.4)"
        />
        <text
          fontFamily = "TimesNewRomanPSMT,Times New Roman"
          fontSize="140"
          stroke="#000"
          fill={color}
          transform="translate(437.6 247.12)"
        >
          Chlaire
        </text>
      </svg>
    </div>
  )
}

export default Logo
