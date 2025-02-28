import { styled } from 'styled-components'




export const Loginbutton = styled.button `
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