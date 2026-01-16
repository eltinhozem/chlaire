import styled from 'styled-components';
import { goldGradient } from './styles.tokens';

export const SummaryCard = styled.div`
  position: sticky;
  top: 1rem;
  background: linear-gradient(
      180deg,
      rgba(202, 150, 116, 0.08),
      rgba(202, 150, 116, 0.18)
    ),
    ${({ theme }) => theme.formBackground};
  border-radius: 0.9rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  box-shadow: ${({ theme }) => theme.cardShadow};
  padding: 1.25rem;
`;

export const SummaryGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const SummaryLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.95rem;
`;

export const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.labelColor};
`;

export const SummaryValue = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.titleColor};
`;

export const HighlightValue = styled.span`
  font-size: 1.3rem;
  font-weight: 800;
  background: ${goldGradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const Formula = styled.div`
  margin-top: 0.8rem;
  padding: 0.65rem 0.75rem;
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.background};
  border: 1px dashed ${({ theme }) => theme.inputBorderColor};
  color: ${({ theme }) => theme.labelColor};
  font-size: 0.85rem;
  line-height: 1.4;
`;
