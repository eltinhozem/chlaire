import styled from 'styled-components';

export const ClienteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--light-gold);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const PageActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

export const HeaderButtonPrimary = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  background-color: var(--muted-gold);
  color: var(--white-card);
  transition: all 0.3s ease;

  &:hover {
    background-color: #b39549;
  }
`;

export const HeaderButtonSecondary = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  background-color: var(--white-card);
  color: var(--muted-gold);
  border: 2px solid var(--muted-gold);
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--cream-bg);
  }
`;

export const ClienteTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: var(--muted-gold);
  margin: 0;
  font-family: 'Playfair Display', 'Times New Roman', serif;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const SearchContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  gap: 15px;
  position: relative;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px 40px 12px 20px;
  border: 2px solid var(--card-border);
  border-radius: 8px;
  font-size: 14px;
  background-color: var(--white-card);
  color: var(--primary-text);
  transition: border-color 0.3s ease;

  &::placeholder {
    color: var(--secondary-text);
  }

  &:focus {
    outline: none;
    border-color: var(--muted-gold);
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  right: 18px;
  color: var(--muted-gold);
  pointer-events: none;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const FormSection = styled.div`
  background: var(--white-card);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--card-border);
  box-shadow: 0 2px 8px var(--card-shadow);
`;

export const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-text);
  border-bottom: 1px solid var(--detail-border);
  padding-bottom: 0.5rem;
`;

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

export const JewelryCard = styled.button`
  text-align: left;
  padding: 0.85rem;
  border-radius: 10px;
  border: 1px solid var(--card-border);
  background: var(--white-card);
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

export const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--detail-border);
  padding-bottom: 0.5rem;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background: ${({ $active }) => ($active ? 'var(--muted-gold)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--white-card)' : 'var(--primary-text)')};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? '#b39549' : 'rgba(197, 160, 89, 0.12)'};
  }
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
