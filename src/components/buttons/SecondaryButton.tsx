
import styled from 'styled-components';
import { BaseButton } from './BaseButton';

// Secondary button (gray) - for actions like "Cancel"
export const SecondaryButton = styled(BaseButton)`
  color: ${({ theme }) => theme.actionButtonText};
  background: ${({ theme }) => theme.actionButtonBackground};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.actionButtonHoverBackground};
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.3);
  }
`;
