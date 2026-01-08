import styled from 'styled-components';

export const ClienteContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

export const ClienteTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.titleColor};
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const FormSection = styled.div`
  background: ${({ theme }) => theme.formBackground};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
`;

export const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.titleColor};
  border-bottom: 1px solid ${({ theme }) => theme.inputBorderColor};
  padding-bottom: 0.5rem;
`;

export const ClientesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const ClienteCard = styled.div`
  background: ${({ theme }) => theme.formBackground};
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: ${({ theme }) => theme.cardShadow};
  }
`;

export const ClienteInfo = styled.div`
  flex: 1;
`;

export const ClienteNome = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 0.25rem;
  text-align: center;
`;

export const ClienteDetails = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.labelColor};
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const ClienteActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

export const ClientPhoneRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.9rem;
`;

export const ClientPhoneLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.labelColor};
`;

export const ClientPhoneValue = styled.span`
  color: ${({ theme }) => theme.text};
`;

export const ClientTagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export const ClientTag = styled.span`
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.12);
  color: #4338ca;
`;

export const InstaButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(236, 72, 153, 0.12);
  color: #be185d;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.cardShadow};
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
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
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
  color: ${({ theme }) => theme.labelColor};
`;

export const DetailValue = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
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
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  background: ${({ theme }) => theme.formBackground};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: ${({ theme }) => theme.cardShadow};
    transform: translateY(-1px);
  }
`;

export const JewelryTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 0.35rem;
`;

export const JewelryMeta = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.labelColor};
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const EmptyState = styled.p`
  color: ${({ theme }) => theme.labelColor};
  font-size: 0.95rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 8px;
  font-size: 1rem;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: ${({ theme }) => theme.inputFocusShadow};
  }

  &::placeholder {
    color: ${({ theme }) => theme.placeholderColor};
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.inputBorderColor};
  padding-bottom: 0.5rem;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background: ${({ $active, theme }) => ($active ? theme.buttonBackground : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.buttonText : theme.text)};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active, theme }) => ($active ? theme.buttonHoverBackground : theme.actionButtonBackground)};
  }
`;

export const FingerToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.labelColor};
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
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HandTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.titleColor};
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
  color: ${({ theme }) => theme.labelColor};
  margin-bottom: 0.25rem;
`;

export const FingerInput = styled.input`
  padding: 0.4rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  text-align: center;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: ${({ theme }) => theme.inputFocusShadow};
    background-color: ${({ theme }) => theme.inputFocusBackground};
  }
`;
