import styled from 'styled-components';






export const formatarData = (data: string): string => {
  if (!data) return ''; // Se a data for nula ou indefinida, retorna uma string vazia
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

// Estilo para os botões de ação
export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.actionButtonBorder};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.actionButtonText};
  background-color: ${({ theme }) => theme.actionButtonBackground};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.actionButtonHoverBackground};
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

/* Botão para "Alterar" com o estilo original (gradiente dourado) */
export const CustomButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.buttonText};
  background: ${({ theme }) =>
    theme.buttonBackground || 'linear-gradient(to right, #fad2a4, #f6cda0, #ca9674)'};
  border: none;
  border-radius: 7px;
  cursor: pointer;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
 box-shadow: 0 10px 30px
   ${({ theme }) =>
        theme.submitButtonFocusColor ||'rgba(250, 210, 164, 0.5)'};
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
     box-shadow: 0 0 0 1px
      ${({ theme }) =>
        theme.submitButtonFocusColor || 'rgba(202, 150, 116, 0.5)'};
  }
  &:hover::before {
    left: 100%;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.addStoneButtonFocusColor || 'rgba(202, 150, 116, 0.5)'};
  }
`;

/* Botão para "Excluir" com estilo semelhante, mas com gradiente avermelhado */
export const RedButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.buttonText};
  background: ${({ theme }) =>
    theme.buttonBackgroundRed || 'linear-gradient(to right, #f87171, #ef4444, #dc2626)'};
  border: none;
  border-radius: 7px;
  cursor: pointer;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
 box-shadow: 0 10px 30px
   ${({ theme }) =>
        theme.submitButtonFocusColor ||'rgba(212, 43, 13, 0.5)'};
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
    box-shadow: ${({ theme }) =>
      theme.buttonFocusShadow || '0 15px 40px rgba(220, 38, 38, 0.7)'};
  }

  &:hover::before {
    left: 100%;
  }

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) =>
      theme.buttonFocusShadow || '0 0 0 3px rgba(239, 68, 68, 0.5)'};
  }
`;