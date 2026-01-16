import styled from 'styled-components';

export const ClientesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 320px));
  gap: 25px;
  align-items: start;
  justify-content: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ClienteCard = styled.div`
  background-color: var(--white-card);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 8px var(--card-shadow);
  transition: all 0.3s ease;
  cursor: pointer;
  height: fit-content;
  align-self: start;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

export const ClienteHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ClienteAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--cream-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 22px;
  font-weight: 600;
  color: var(--muted-gold);
`;

export const ClienteInfo = styled.div`
  flex: 1;
`;

export const ClienteInfoHeader = styled.div`
  flex: 1;
`;

export const ClienteNome = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: 4px;
`;

export const ClienteEmail = styled.div`
  font-size: 0.85rem;
  color: var(--secondary-text);
`;

export const ClienteDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid var(--detail-border);
  padding-top: 15px;
`;

export const ClienteDetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--secondary-text);

  svg {
    color: var(--muted-gold);
  }
`;

export const ClienteDetailLabel = styled.span`
  font-weight: 600;
  color: var(--primary-text);
  margin-right: 6px;
`;

export const ClienteDetailValue = styled.span`
  color: var(--secondary-text);
`;

export const InstaButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(197, 160, 89, 0.18);
  color: var(--muted-gold);
  border: 1px solid rgba(197, 160, 89, 0.35);
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
`;
