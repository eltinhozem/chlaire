// styles.ts
import styled from 'styled-components';
// ---------------------
// 1. Container com fundo degradê multi-stop
// ---------------------
export const formContainer = `
  max-w-4xl mx-auto p-6 
  rounded-xl shadow-lg

  /* Cria um gradiente que vai do canto superior-esquerdo 
     ao canto inferior-direito (to_br) 
     passando pelas cores que você forneceu, em seus respectivos offsets. */
  bg-[linear-gradient(to_br,_#fad2a4_0%,_#f6cda0_3%,_#ca9674_35%,_#aa6e55_63%,_#965641_85%,_#8f4d3a_98%)]
`

// ---------------------
// 2. Título com gradiente de texto
// ---------------------
export const formTitle = `
  text-3xl font-bold 
  text-transparent bg-clip-text

  /* Aqui usamos um gradiente na horizontal (to_right), 
     mas com os mesmos stops. Sinta-se livre para mudar. */
  bg-[linear-gradient(to_right,_#fad2a4_0%,_#f6cda0_3%,_#ca9674_35%,_#aa6e55_63%,_#965641_85%,_#8f4d3a_98%)]
  
  mb-8 text-center
`

// ---------------------
// 3. Outras classes
// ---------------------
export const formGrid = `
  grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4
`

export const inputLabel = `
  block text-sm font-medium text-gray-700
`

// Para dar um leve efeito de foco dourado, 
// você pode escolher uma das cores do seu gradiente (ex: #ca9674) 
export const inputField = `
  mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm
  transition-all duration-200
  focus:border-[#ca9674] focus:ring-2 focus:ring-[#ca9674]/50
  focus:bg-white sm:text-sm
`

export const selectField = inputField
export const textAreaField = inputField

export const stoneHeader = `
  flex justify-between items-center mt-8 mb-6
`

// Gradiente de texto nos títulos das seções
export const stoneTitle = `
  text-2xl font-semibold text-transparent bg-clip-text
  bg-[linear-gradient(to_right,_#fad2a4_0%,_#f6cda0_3%,_#ca9674_35%,_#aa6e55_63%,_#965641_85%,_#8f4d3a_98%)]
`


export const stoneSection = `
  space-y-6
`

export const actionButtonsContainer = `
  flex justify-end space-x-4 mt-8
`

// Botão “Cancelar”
export const cancelButton = `
  inline-flex justify-center py-2.5 px-6 border border-gray-300 rounded-lg shadow-sm 
  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
  focus:outline-none focus:ring-2 focus:ring-offset-2 
  focus:ring-[#ca9674] transition-all duration-200
`

// Botão “Salvar” com gradiente multi-stop
export const SubmitButton = styled.button `
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
border-radius: 30px; // Altere aqui para ajustar o quão arredondado é o botão

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
// Botão com gradiente multi-stop
export const AddStoneButton = styled.button `
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
  border-radius: 30px; // Altere aqui para ajustar o quão arredondado é o botão

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


export const imageUploadContainer = `
  mb-8
`

export const imagePreview = `
  relative rounded-lg overflow-hidden shadow-md
`

// Botão de upload com borda normal
export const imageUploadButton = `
  inline-flex items-center px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg
  text-gray-700 bg-white hover:bg-gray-50 focus:outline-none 
  focus:ring-2 focus:ring-offset-2 focus:ring-[#ca9674]
  transition-all duration-200 cursor-pointer
`
