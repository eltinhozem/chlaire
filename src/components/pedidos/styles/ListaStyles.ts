
import styled from 'styled-components';
import { lightTheme, darkTheme } from '../../Styles';

interface ThemeProps {
  theme: typeof lightTheme | typeof darkTheme;
}

export const PageContainer = styled.div<ThemeProps>`
  max-width: 96rem;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  min-height: 100vh;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h1<ThemeProps>`
  font-size: 1.875rem;
  font-weight: bold;
  color: ${props => props.theme.titleColor};
`;

export const NewOrderButton = styled.button<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.buttonBackground};
  color: ${props => props.theme.buttonText};
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.theme.buttonHoverBackground};
  }
  
  &:focus {
    outline: none;
    box-shadow: ${props => props.theme.buttonFocusShadow};
  }
`;

export const EmptyState = styled.div<ThemeProps>`
  text-align: center;
  padding: 3rem 0;
  
  p {
    color: ${props => props.theme.text};
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }
  
  button {
    color: ${props => props.theme.buttonText};
    
    &:hover {
      color: ${props => props.theme.buttonText};
    }
  }
`;

export const LoadingState = styled.div<ThemeProps>`
  text-align: center;
  padding: 3rem 0;
  
  p {
    color: ${props => props.theme.text};
    font-size: 1.125rem;
  }
`;

export const PedidosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const PedidoCard = styled.div<ThemeProps & { riscado: boolean; borderColor: string }>`
  background-color: ${props => props.theme.cardBackground};
  border-radius: 0.5rem;
  box-shadow: ${props => props.theme.cardShadow};
  border-left: 4px solid ${props => props.riscado ? '#ef4444' : props.borderColor};
  padding: 1rem;
  opacity: ${props => props.riscado ? 0.6 : 1};
  transition: all 0.2s ease-in-out;
`;

export const PedidoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const PedidoContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  flex: 1;
`;

export const PositionButton = styled.button<ThemeProps & { disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: bold;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  background-color: ${props => props.disabled ? props.theme.inputBorderColor : props.theme.buttonBackground};
  color: ${props => props.disabled ? props.theme.placeholderColor : props.theme.buttonText};
  
  &:hover {
    background-color: ${props => props.disabled ? props.theme.inputBorderColor : props.theme.buttonHoverBackground};
  }
`;

export const PedidoDetails = styled.div`
  flex: 1;
`;

export const PedidoImageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const PedidoImage = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const PedidoInfo = styled.div``;

export const PedidoName = styled.h3<ThemeProps & { riscado: boolean }>`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.titleColor};
  text-decoration: ${props => props.riscado ? 'line-through' : 'none'};
`;

export const PedidoDate = styled.p<ThemeProps>`
  font-size: 0.75rem;
  color: ${props => props.theme.placeholderColor};
`;

export const DeliveryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.25rem;
`;

export const DeliveryDate = styled.span<ThemeProps>`
  font-size: 0.75rem;
  color: ${props => props.theme.text};
`;

export const DeliveryStatus = styled.span<ThemeProps & { statusType: string; riscado: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: ${props => 
    props.riscado ? props.theme.inputBorderColor :
    props.statusType === 'urgent' ? '#fecaca' :
    props.statusType === 'warning' ? '#fecaca' :
    '#dbeafe'
  };
  color: ${props => 
    props.riscado ? props.theme.placeholderColor :
    props.statusType === 'urgent' ? '#b91c1c' :
    props.statusType === 'warning' ? '#b91c1c' :
    '#1e40af'
  };
`;

export const PedidoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const PedidoGridItem = styled.div<ThemeProps & { riscado: boolean }>`
  span.label {
    font-weight: 500;
    color: ${props => props.theme.labelColor};
  }
  
  span.value {
    margin-left: 0.5rem;
    text-decoration: ${props => props.riscado ? 'line-through' : 'none'};
    color: ${props => props.theme.text};
  }
`;

export const PedidoDescription = styled.div<ThemeProps>`
  margin-bottom: 0.75rem;
  
  span.label {
    font-weight: 500;
    color: ${props => props.theme.labelColor};
  }
`;

export const DescriptionText = styled.p<ThemeProps & { riscado: boolean }>`
  font-size: 0.875rem;
  color: ${props => props.theme.text};
  margin-top: 0.25rem;
  text-decoration: ${props => props.riscado ? 'line-through' : 'none'};
`;

export const StonesContainer = styled.div<ThemeProps>`
  margin-bottom: 0.75rem;
  
  span.label {
    font-weight: 500;
    color: ${props => props.theme.labelColor};
    margin-bottom: 0.5rem;
    display: block;
  }
`;

export const StonesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StoneCard = styled.div<ThemeProps & { riscado: boolean }>`
  background-color: ${props => props.theme.background};
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.theme.inputBorderColor};
  opacity: ${props => props.riscado ? 0.6 : 1};
`;

export const StoneHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const StoneTitle = styled.span<ThemeProps>`
  font-weight: 600;
  font-size: 1rem;
  color: ${props => props.theme.titleColor};
`;

export const StoneDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 1rem;
  
  div {
    strong {
      font-weight: 600;
    }
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

export const Tag = styled.span<ThemeProps & { tagType: string; riscado: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: ${props => 
    props.riscado ? props.theme.inputBorderColor :
    props.tagType === 'aramado' ? '#dbeafe' :
    props.tagType === 'galeria' ? '#d1fae5' :
    props.tagType === 'render' ? '#e9d5ff' :
    props.theme.inputBorderColor
  };
  color: ${props => 
    props.riscado ? props.theme.placeholderColor :
    props.tagType === 'aramado' ? '#1e40af' :
    props.tagType === 'galeria' ? '#047857' :
    props.tagType === 'render' ? '#7c3aed' :
    props.theme.text
  };
`;

export const ReferenceInfo = styled.div<ThemeProps & { riscado: boolean }>`
  font-size: 0.875rem;
  
  span.label {
    font-weight: 500;
    color: ${props => props.theme.labelColor};
  }
  
  span.value {
    margin-left: 0.5rem;
    text-decoration: ${props => props.riscado ? 'line-through' : 'none'};
    color: ${props => props.theme.text};
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ActionButton = styled.button<ThemeProps & { actionType: string }>`
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  background-color: ${props => 
    props.actionType === 'restore' ? props.theme.addStoneButtonBackground :
    props.actionType === 'complete' ? props.theme.buttonBackgroundRed :
    props.theme.actionButtonBackground
  };
  
  color: ${props => 
    props.actionType === 'restore' ? props.theme.addStoneButtonText :
    props.actionType === 'complete' ? props.theme.buttonTextRed :
    props.theme.actionButtonText
  };
  
  &:hover {
    background-color: ${props => 
      props.actionType === 'restore' ? props.theme.addStoneButtonHoverBackground :
      props.actionType === 'complete' ? props.theme.buttonHoverBackgroundRed :
      props.theme.actionButtonHoverBackground
    };
  }
`;