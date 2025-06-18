import styled from 'styled-components';
import { lightTheme, darkTheme } from '../../Styles';

interface ThemeProps {
  theme: typeof lightTheme | typeof darkTheme;
}

export const StoneContainer = styled.div<ThemeProps>`
  background-color: ${props => props.theme.cardBackground};
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.theme.inputBorderColor};
  margin-bottom: 1rem;
`;

export const StoneHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const StoneTitle = styled.h4<ThemeProps>`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${props => props.theme.titleColor};
`;

export const StoneActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const StoneActionButton = styled.button<ThemeProps & { variant: string }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  
  background-color: ${props => 
    props.variant === 'edit' ? 'transparent' :
    props.variant === 'save' ? props.theme.addStoneButtonBackground :
    'transparent'
  };
  
  color: ${props => 
    props.variant === 'edit' ? props.theme.buttonText :
    props.variant === 'save' ? props.theme.addStoneButtonText :
    props.theme.buttonTextRed
  };
  
  &:hover {
    background-color: ${props => 
      props.variant === 'edit' ? props.theme.inputBorderColor :
      props.variant === 'save' ? props.theme.addStoneButtonHoverBackground :
      props.theme.inputBorderColor
    };
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StonePreviewContainer = styled.div<ThemeProps>`
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.inputBorderColor};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.inputBorderColor};
  }
`;

export const StonePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  font-size: 0.875rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StonePreviewItem = styled.div<ThemeProps>`
  strong {
    color: ${props => props.theme.labelColor};
  }
`;

export const StonePreviewHint = styled.div<ThemeProps>`
  font-size: 0.75rem;
  color: ${props => props.theme.placeholderColor};
  margin-top: 0.5rem;
`;

export const StoneFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const FormRowLarge = styled.div`
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

export const QuantityTypeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

export const RadioLabel = styled.label<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  input {
    width: 1rem;
    height: 1rem;
  }
  
  span {
    font-size: 0.875rem;
    color: ${props => props.theme.text};
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label<ThemeProps>`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.labelColor};
  margin-bottom: 0.25rem;
`;

export const Input = styled.input<ThemeProps>`
  width: 100%;
  padding: 0.5rem;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.inputText};
  border: 1px solid ${props => props.theme.inputBorderColor};
  border-radius: 0.375rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.inputFocusBorderColor};
    box-shadow: ${props => props.theme.inputFocusShadow};
    background-color: ${props => props.theme.inputFocusBackground};
  }
  
  &::placeholder {
    color: ${props => props.theme.placeholderColor};
  }
  
  &:read-only {
    background-color: ${props => props.theme.inputBackground};
    opacity: 0.7;
  }
`;

export const Select = styled.select<ThemeProps>`
  width: 100%;
  padding: 0.5rem;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.inputText};
  border: 1px solid ${props => props.theme.inputBorderColor};
  border-radius: 0.375rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.inputFocusBorderColor};
    box-shadow: ${props => props.theme.inputFocusShadow};
    background-color: ${props => props.theme.inputFocusBackground};
  }
`;
