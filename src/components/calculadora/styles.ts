import styled from 'styled-components'

const goldGradient =
  'linear-gradient(to right, #fad2a4 0%, #f6cda0 25%, #ca9674 60%, #8f4d3a 100%)'

export const PageContainer = styled.div`
  width: 100%;
  padding: 0.5rem 0 1.5rem;
  color: ${({ theme }) => theme.text};
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
`

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1;
  min-width: 200px;
`

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
`

export const Title = styled.h1`
  margin: 0;
  font-size: 1.875rem;
  font-weight: 700;
  background: ${goldGradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`

export const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.labelColor};
  font-size: 0.95rem;
`

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const SectionCard = styled.div`
  background: ${({ theme }) => theme.formBackground};
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 0.75rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
  padding: 1.25rem;
`

export const SectionTitle = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.35rem;
  font-weight: 700;
  background: ${goldGradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
  min-width: 240px;
`

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
`

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
`

export const ButtonsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
`


export const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.labelColor};
  margin-bottom: 0.35rem;
`

export const SubsectionTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.titleColor};
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.35rem;
`

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
`

export const RadioOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
`

export const RadioOption = styled.label<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.9rem;
  border-radius: 0.65rem;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.inputFocusBorderColor : theme.inputBorderColor};
  background: ${({ theme, $active }) =>
    $active ? theme.inputFocusBackground : theme.inputBackground};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $active }) => ($active ? '0 6px 18px rgba(0, 0, 0, 0.08)' : 'none')};

  &:hover {
    transform: translateY(-1px);
  }
`

export const RadioInput = styled.input`
  display: none;
`

export const ColorDot = styled.span<{ $color: string }>`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 9999px;
  background: ${({ $color }) => $color};
  border: 1px solid rgba(0, 0, 0, 0.1);
`

export const OptionLabel = styled.span`
  font-weight: 600;
`

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
`

export const PreviewValue = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
  background: ${goldGradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`

export const SmallText = styled.p`
  margin: 0.2rem 0 0;
  color: ${({ theme }) => theme.labelColor};
  font-size: 0.85rem;
`

export const HelperText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.labelColor};
  font-size: 0.85rem;
`

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
`

export const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const ValueSection = styled.div`
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  background: ${({ theme }) => theme.background};
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.inputBorderColor};
  margin: 1rem 0;
`

export const StoneList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const StoneCard = styled.div`
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  background: ${({ theme }) => theme.background};
  border-radius: 0.75rem;
  padding: 0.9rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`

export const StoneHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.65rem;
`

export const InlineActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const StoneMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 0.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

export const Metric = styled.div`
  padding: 0.65rem;
  border-radius: 0.65rem;
  background: ${({ theme }) => theme.formBackground};
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
`

export const MetricLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.labelColor};
`

export const MetricValue = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.titleColor};
`

export const Tag = styled.span`
  display: inline-block;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 0.75rem;
`

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
`

export const SummaryGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

export const SummaryLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.95rem;
`

export const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.labelColor};
`

export const SummaryValue = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.titleColor};
`

export const HighlightValue = styled.span`
  font-size: 1.3rem;
  font-weight: 800;
  background: ${goldGradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`

export const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.55rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  color: ${({ theme }) => theme.labelColor};
  font-size: 0.8rem;
`

export const Formula = styled.div`
  margin-top: 0.8rem;
  padding: 0.65rem 0.75rem;
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.background};
  border: 1px dashed ${({ theme }) => theme.inputBorderColor};
  color: ${({ theme }) => theme.labelColor};
  font-size: 0.85rem;
  line-height: 1.4;
`

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
`

export const TableWrapper = styled.div`
  margin-top: 0.75rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 0.75rem;
  overflow: hidden;
  background: ${({ theme }) => theme.background};
`

export const ConversionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const TableCol = styled.div`
  padding: 0.65rem;
  border-right: 1px solid ${({ theme }) => theme.inputBorderColor};

  &:last-child {
    border-right: none;
  }
`

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid ${({ theme }) => theme.inputBorderColor};
  color: ${({ theme }) => theme.labelColor};
  font-weight: 700;
  font-size: 0.85rem;
`

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
`

export const ConversionRows = styled.div`
  display: flex;
  flex-direction: column;
`

export const ConversionRow = styled(TableRow)`
  background: ${({ theme }) => theme.background};

  &:nth-child(odd) {
    background: ${({ theme }) => theme.formBackground};
  }
`
