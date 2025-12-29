import styled from 'styled-components';

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

export const RemoveButton = styled.button`
  color: ${({ theme }) => theme.buttonText};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.buttonHoverBackground};
  }
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

export const BaseButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.addStoneButtonText || '#8b4513'};
  background: ${({ theme }) =>
    theme.addStoneButtonBackground ||
    'linear-gradient(to right, #fad2a4, #f6cda0, #ca9674)'};
  border: none;
  border-radius: 7px;
  cursor: pointer;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 10px 30px
    ${({ theme }) => theme.submitButtonFocusColor || 'rgba(250, 210, 164, 0.5)'};
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
    box-shadow: 0 10px 30px
      ${({ theme }) => theme.submitButtonFocusColor || 'rgba(250, 210, 164, 0.5)'};
  }

  &:hover::before {
    left: 100%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(202, 150, 116, 0.5);
  }
`;

export const EditButton = styled(BaseButton)``;
export const SaveButton = styled(BaseButton)``;