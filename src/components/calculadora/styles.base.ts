import styled from 'styled-components';
import { goldGradient } from './styles.tokens';

export const PageContainer = styled.div`
  width: 100%;
  padding: 0.5rem 0 1.5rem;
  color: ${({ theme }) => theme.text};
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1;
  min-width: 200px;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 1.875rem;
  font-weight: 700;
  background: ${goldGradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.labelColor};
  font-size: 0.95rem;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionCard = styled.div`
  background: ${({ theme }) => theme.formBackground};
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 0.75rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
  padding: 1.25rem;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.35rem;
  font-weight: 700;
  background: ${goldGradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
  min-width: 240px;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

export const ButtonsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.labelColor};
  margin-bottom: 0.35rem;
`;

export const SubsectionTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.titleColor};
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.35rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.65rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: ${({ theme }) => theme.inputFocusShadow};
    background: ${({ theme }) => theme.inputFocusBackground};
  }

  &::placeholder {
    color: ${({ theme }) => theme.placeholderColor};
  }
`;

export const PreviewCard = styled.div`
  margin-top: 0.75rem;
  padding: 0.9rem 1rem;
  border-radius: 0.75rem;
  background: linear-gradient(
    135deg,
    rgba(202, 150, 116, 0.1),
    rgba(250, 210, 164, 0.18)
  );
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
`;

export const PreviewValue = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
  background: ${goldGradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const SmallText = styled.p`
  margin: 0.2rem 0 0;
  color: ${({ theme }) => theme.labelColor};
  font-size: 0.85rem;
`;

export const HelperText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.labelColor};
  font-size: 0.85rem;
`;

export const StatusChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.65rem;
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  color: ${({ theme }) => theme.labelColor};
  font-size: 0.85rem;
`;

export const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const ValueSection = styled.div`
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  background: ${({ theme }) => theme.background};
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.inputBorderColor};
  margin: 1rem 0;
`;
