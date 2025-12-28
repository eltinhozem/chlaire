import styled from 'styled-components';
import { PrimaryButton, DangerButton } from '../buttons';

export const StoneContainer = styled.div`
  background: ${({ theme }) => theme.formBackground};
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

export const StoneHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const StoneTitle = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

export const RemoveButton = styled(DangerButton)`
  padding: 0.4rem 0.75rem;
`;

export const GridMain = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.labelColor};
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 0.375rem;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  font-size: 0.875rem;

  &:focus {
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: ${({ theme }) => theme.inputFocusShadow};
    outline: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 0.375rem;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  font-size: 0.875rem;

  &:focus {
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: ${({ theme }) => theme.inputFocusShadow};
    outline: none;
  }
`;

export const ViewMode = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ViewText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
`;

export const EditButton = styled(PrimaryButton)``;
export const SaveButton = styled(PrimaryButton)``;
