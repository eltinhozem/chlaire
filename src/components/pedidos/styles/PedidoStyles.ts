
import styled from 'styled-components';
import { lightTheme, darkTheme } from '../../Styles';

interface ThemeProps {
  theme: typeof lightTheme | typeof darkTheme;
}

export const PageContainer = styled.div<ThemeProps>`
  max-width: 96rem;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  min-height: 100vh;
`;

export const PageTitle = styled.h1<ThemeProps>`
  font-size: 1.875rem;
  font-weight: bold;
  color: ${props => props.theme.titleColor};
  margin-bottom: 2rem;
`;

export const FormContainer = styled.form<ThemeProps>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const CardContainer = styled.div<ThemeProps>`
  background-color: ${props => props.theme.cardBackground};
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: ${props => props.theme.cardShadow};
`;

export const SectionTitle = styled.h2<ThemeProps>`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.titleColor};
  margin-bottom: 1rem;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const GridContainerLarge = styled.div`
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
  padding: 0.75rem;
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
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:read-only {
    background-color: ${props => props.theme.inputBackground};
    opacity: 0.7;
  }
`;

export const Select = styled.select<ThemeProps>`
  width: 100%;
  padding: 0.75rem;
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

export const Textarea = styled.textarea<ThemeProps>`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.inputText};
  border: 1px solid ${props => props.theme.inputBorderColor};
  border-radius: 0.375rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.inputFocusBorderColor};
    box-shadow: ${props => props.theme.inputFocusShadow};
    background-color: ${props => props.theme.inputFocusBackground};
  }
  
  &::placeholder {
    color: ${props => props.theme.placeholderColor};
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const CheckboxLabel = styled.label<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.labelColor};
  cursor: pointer;
`;

export const CheckboxInput = styled.input`
  width: 1rem;
  height: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const ImagePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ImagePreview = styled.div<ThemeProps>`
  width: 8rem;
  height: 8rem;
  border: 2px solid ${props => props.theme.inputBorderColor};
  border-radius: 0.5rem;
  overflow: hidden;
`;

export const ImagePreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const FullWidthContainer = styled.div`
  grid-column: 1 / -1;
`;
