
import styled from 'styled-components';
import { BaseButton } from './BaseButton';

// Primary button (blue) - for main actions like "Submit", "Save", etc.
export const PrimaryButton = styled(BaseButton)`
  color: ${({ theme }) => theme.buttonText};
  background: ${({ theme }) => theme.buttonBackground};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.buttonHoverBackground};
  }

  &:focus {
    box-shadow: ${({ theme }) => theme.buttonFocusShadow};
  }
`;
