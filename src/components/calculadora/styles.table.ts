import styled from 'styled-components';

export const ToggleButton = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.75rem 0.9rem;
  border-radius: 0.65rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.inputFocusBackground};
    transform: translateY(-1px);
  }
`;

export const TableWrapper = styled.div`
  margin-top: 0.75rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 0.75rem;
  overflow: hidden;
  background: ${({ theme }) => theme.background};
`;

export const ConversionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const TableCol = styled.div`
  padding: 0.65rem;
  border-right: 1px solid ${({ theme }) => theme.inputBorderColor};

  &:last-child {
    border-right: none;
  }
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid ${({ theme }) => theme.inputBorderColor};
  color: ${({ theme }) => theme.labelColor};
  font-weight: 700;
  font-size: 0.85rem;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
  padding: 0.35rem 0;
  color: ${({ theme }) => theme.text};
  font-size: 0.85rem;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.inputBorderColor};
  }
`;

export const ConversionRows = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ConversionRow = styled(TableRow)`
  background: ${({ theme }) => theme.background};

  &:nth-child(odd) {
    background: ${({ theme }) => theme.formBackground};
  }
`;
