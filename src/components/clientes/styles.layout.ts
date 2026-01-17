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

export const FilterPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: var(--white-card);
  border: 1px solid var(--card-border);
  box-shadow: 0 2px 8px var(--card-shadow);
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
`;

export const FilterLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary-text);
`;

export const FilterActionButton = styled.button`
  padding: 0.55rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--card-border);
  background: var(--cream-bg);
  color: var(--primary-text);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
`;

export const MonthPickerBox = styled.div`
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background: var(--white-card);
  padding: 0.5rem;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.03);
  width: fit-content;
  max-width: 100%;
`;

export const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 60px);
  gap: 0.5rem;
  justify-content: start;

  @media (max-width: 640px) {
    grid-template-columns: repeat(3, 60px);
  }
`;

export const MonthButton = styled.button<{ $active?: boolean }>`
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(197, 160, 89, 0.7)' : 'var(--card-border)')};
  background: ${({ $active }) => ($active ? 'rgba(250, 238, 212, 0.9)' : 'var(--cream-bg)')};
  color: var(--primary-text);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
`;

export const FilterToggleButton = styled.button<{ $state?: 'none' | 'casado' | 'solteiro' }>`
  padding: 0.55rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--card-border);
  background: ${({ $state }) => {
    if ($state === 'casado') return '#d1fae5';
    if ($state === 'solteiro') return '#dbeafe';
    return '#f3f4f6';
  }};
  color: var(--primary-text);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
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

  input,
  select,
  textarea {
    text-align: left;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-text);
  border-bottom: 1px solid var(--detail-border);
  padding-bottom: 0.5rem;
`;
