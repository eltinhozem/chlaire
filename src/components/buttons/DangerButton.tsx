
import styled from 'styled-components';
import { BaseButton } from './BaseButton';

// Danger button (red) - for destructive actions like "Delete"
export const DangerButton = styled(BaseButton)`
  color: ${({ theme }) => theme.buttonTextRed};
  background: ${({ theme }) => theme.buttonBackgroundRed};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.buttonHoverBackgroundRed};
  }

  &:focus {
    box-shadow: ${({ theme }) => theme.buttonFocusShadowRed};
  }
`;
