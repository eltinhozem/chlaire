import styled from 'styled-components';

export const DetailHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const DetailActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
`;

export const DetailItem = styled.div`
  background: var(--white-card);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const DetailLabel = styled.span`
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--secondary-text);
`;

export const DetailValue = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--primary-text);
`;

export const JewelryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
`;

export const JewelryCard = styled.button<{ $highlight?: boolean }>`
  text-align: left;
  padding: 0.85rem;
  border-radius: 10px;
  border: 1px solid ${({ $highlight }) => ($highlight ? 'rgba(197, 160, 89, 0.6)' : 'var(--card-border)')};
  background: ${({ $highlight }) => ($highlight ? 'rgba(250, 238, 212, 0.6)' : 'var(--white-card)')};
  color: var(--primary-text);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    border-color: var(--muted-gold);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
`;

export const JewelryTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary-text);
  margin-bottom: 0.35rem;
`;

export const JewelryMeta = styled.div`
  font-size: 0.85rem;
  color: var(--secondary-text);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const EmptyState = styled.p`
  color: var(--secondary-text);
  font-size: 0.95rem;
`;


export const FingerToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--secondary-text);
  cursor: pointer;
`;

export const FingerToggleInput = styled.input`
  width: 16px;
  height: 16px;
`;

export const HandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const HandCard = styled.div`
  background: var(--white-card);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HandTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: 0.5rem;
`;

export const HandImage = styled.img`
  width: 100%;
  max-width: 240px;
  height: auto;
  margin-bottom: 0.75rem;
`;

export const FingerInputs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 0.5rem;
`;

export const FingerField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FingerLabel = styled.label`
  font-size: 0.75rem;
  color: var(--secondary-text);
  margin-bottom: 0.25rem;
`;

export const FingerInput = styled.input`
  padding: 0.4rem 0.5rem;
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  background-color: var(--white-card);
  color: var(--primary-text);
  text-align: center;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--muted-gold);
    box-shadow: 0 0 0 2px rgba(197, 160, 89, 0.2);
    background-color: var(--white-card);
  }
`;
