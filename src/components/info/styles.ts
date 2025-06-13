
import styled from 'styled-components';

export const formatarData = (data: string): string => {
  if (!data) return '';
  const [ano, mes, dia] = data.split('-');
  return `${dia}-${mes}-${ano}`;
};

// Container principal do info
export const InfoContainer = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  padding: 1.5rem;
  background: ${({ theme }) => theme.formBackground};
  color: ${({ theme }) => theme.text};
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

// Estilo padrão para botões com efeito de brilho
const BaseButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 1;

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
  }

  &:hover::before {
    left: 100%;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Botão de ação (Cancelar)
export const ActionButton = styled(BaseButton)`
  color: ${({ theme }) => theme.actionButtonText};
  background: ${({ theme }) => theme.actionButtonBackground};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.actionButtonHoverBackground};
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.3);
  }
`;

// Estilo para as seções de informações
export const InfoSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const InfoLabel = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.labelColor};
`;

export const InfoText = styled.p`
  color: ${({ theme }) => theme.text};
`;

// Estilo para o modal de exclusão
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.formBackground};
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
  width: 100%;
  max-width: 400px;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 0.375rem;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  margin-bottom: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: ${({ theme }) => theme.inputFocusShadow};
    outline: none;
  }
`;

/* Botão padrão (azul) - para "Alterar" */
export const CustomButton = styled(BaseButton)`
  color: ${({ theme }) => theme.buttonText};
  background: ${({ theme }) => theme.buttonBackground};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.buttonHoverBackground};
  }

  &:focus {
    box-shadow: ${({ theme }) => theme.buttonFocusShadow};
  }
`;

/* Botão vermelho - para "Excluir" */
export const RedButton = styled(BaseButton)`
  color: ${({ theme }) => theme.buttonTextRed};
  background: ${({ theme }) => theme.buttonBackgroundRed};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.buttonHoverBackgroundRed};
  }

  &:focus {
    box-shadow: ${({ theme }) => theme.buttonFocusShadowRed};
  }
`;
