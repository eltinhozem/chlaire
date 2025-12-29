
import styled from 'styled-components';
import { BaseButton } from './BaseButton';

// Success button (green) - for positive actions like "Add Stone"
export const SuccessButton = styled(BaseButton)`
  color: ${({ theme }) => theme.addStoneButtonText};
  background: ${({ theme }) => theme.addStoneButtonBackground};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.addStoneButtonHoverBackground};
  }

  &:focus {
    box-shadow: ${({ theme }) => theme.addStoneButtonFocusShadow};
  }
`;
