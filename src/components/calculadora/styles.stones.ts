import styled from 'styled-components';

export const StoneList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const StoneCard = styled.div`
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  background: ${({ theme }) => theme.background};
  border-radius: 0.75rem;
  padding: 0.9rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

export const StoneHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.65rem;
`;

export const InlineActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StoneMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 0.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const Metric = styled.div`
  padding: 0.65rem;
  border-radius: 0.65rem;
  background: ${({ theme }) => theme.formBackground};
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
`;

export const MetricLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.labelColor};
`;

export const MetricValue = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.titleColor};
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 0.75rem;
`;
