import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const CadastrosJoia = styled.button`
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
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  /* Sombra inicial do botão */
   box-shadow: 0 10px 30px
   ${({ theme }) =>
        theme.submitButtonFocusColor ||'rgba(250, 210, 164, 0.5)'}; // Altere aqui para ajustar a intensidade da sombra

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
     box-shadow: 0 0 0 1px
      ${({ theme }) =>
        theme.submitButtonFocusColor || 'rgba(202, 150, 116, 0.5)'}; // Intensifica a sombra
  }

  /* Movimento do efeito de luz ao passar o mouse */
  &:hover::before {
    left: 100%; // Move o brilho para fora da área visível do botão
  }

  /* Estilo para quando o botão está em foco (ex.: navegando com o teclado) */
  &:focus {
    outline: none; // Remove o contorno padrão do foco
     box-shadow: 0 0 0 1px
      ${({ theme }) =>
        theme.submitButtonFocusColor || 'rgba(202, 150, 116, 0.5)'}; // Adiciona uma borda destacada para acessibilidade
  }

  @media (max-width: 640px) {
    padding: 8px 10px;
    border-radius: 10px;
    gap: 0.25rem;
    min-width: 44px;
    min-height: 44px;
    font-size: 0; /* texto escondido, mas acessível via label separado */
    box-shadow: none;

    &:hover {
      transform: none;
      box-shadow: 0 0 0 1px
        ${({ theme }) =>
          theme.submitButtonFocusColor || 'rgba(202, 150, 116, 0.3)'};
    }
  }
`

export const NavButtonLabel = styled.span`
  font-size: 14px;
  @media (max-width: 640px) {
    display: none;
  }
`
// Styled components para o layout
export const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
`

export const Navbar = styled.nav`
  background-color: #c2aa84;
  color: #f8efe5;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
`

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
`

export const NavContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const NavShell = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  color: #f8efe5;

  @media (max-width: 640px) {
    padding: 1.25rem 1rem 1rem;
    gap: 1rem;
  }
`

export const BrandRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const Brand = styled(Link)`
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-size: 2.5rem;
  letter-spacing: 0.3rem;
  color: #f8efe5;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;

  @media (max-width: 640px) {
    font-size: 2rem;
    letter-spacing: 0.22rem;
  }
`

export const NavActions = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const LogoutButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.7rem;
  border-radius: 9999px;
  border: 1px solid rgba(248, 239, 229, 0.45);
  background: rgba(255, 255, 255, 0.06);
  color: #f8efe5;
  cursor: pointer;
  font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(248, 239, 229, 0.65);
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(248, 239, 229, 0.25);
  }
`

export const LogoutLabel = styled.span`
  @media (max-width: 640px) {
    display: none;
  }
`

export const UserGreeting = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #f8efe5;
  white-space: nowrap;

  @media (max-width: 640px) {
    display: none;
  }
`

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem;
  border-radius: 9999px;
  border: 1px solid rgba(248, 239, 229, 0.45);
  background: rgba(255, 255, 255, 0.06);
  color: #f8efe5;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(248, 239, 229, 0.65);
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(248, 239, 229, 0.25);
  }
`

export const MenuBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;
  font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.04em;

  @media (max-width: 640px) {
    gap: 1rem;
    font-size: 0.85rem;
  }
`

export const MenuItem = styled(Link)<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.25rem;
  color: #f8efe5;
  text-decoration: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? '#f8efe5' : 'transparent')};
  transition: border-color 0.2s ease, opacity 0.2s ease;
  text-transform: uppercase;

  &:hover {
    border-color: #f8efe5;
    opacity: 0.9;
  }
`

export const MenuChevron = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  line-height: 1;
`

export const Main = styled.main`
  flex-grow: 1;
  padding: 1.5rem 0;
`

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.footerBackground || '#ffffff'};
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.05);
  padding: 1rem 0;
  text-align: center;
  color: ${({ theme }) => theme.text};
`
