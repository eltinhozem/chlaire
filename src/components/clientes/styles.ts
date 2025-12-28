import styled from 'styled-components';

export const ClienteContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

export const ClienteTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.titleColor};
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const FormSection = styled.div`
  background: ${({ theme }) => theme.formBackground};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
`;

export const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.titleColor};
  border-bottom: 1px solid ${({ theme }) => theme.inputBorderColor};
  padding-bottom: 0.5rem;
`;

export const ClientesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const ClienteCard = styled.div`
  background: ${({ theme }) => theme.formBackground};
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: ${({ theme }) => theme.cardShadow};
  }
`;

export const ClienteInfo = styled.div`
  flex: 1;
`;

export const ClienteNome = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 0.25rem;
`;

export const ClienteDetails = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.labelColor};
`;

export const ClienteActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 8px;
  font-size: 1rem;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: ${({ theme }) => theme.inputFocusShadow};
  }

  &::placeholder {
    color: ${({ theme }) => theme.placeholderColor};
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.inputBorderColor};
  padding-bottom: 0.5rem;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background: ${({ $active, theme }) => ($active ? theme.buttonBackground : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.buttonText : theme.text)};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active, theme }) => ($active ? theme.buttonHoverBackground : theme.actionButtonBackground)};
  }
`;
