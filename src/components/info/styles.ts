
import styled from 'styled-components';
import { SecondaryButton, PrimaryButton, DangerButton } from '../buttons';

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

// Use standardized buttons from the buttons folder
export const ActionButton = SecondaryButton;
export const CustomButton = PrimaryButton;
export const RedButton = DangerButton;

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
