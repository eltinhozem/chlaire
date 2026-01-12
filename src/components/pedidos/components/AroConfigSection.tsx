import React from 'react';
import styled, { useTheme } from 'styled-components';
import { 
  aroTypeOptions, 
  aroStructureOptions, 
  aroCravacaoTypeOptions 
} from '../../form/formOptions';
import type { AroConfig } from '../types';

// Import SVG images
import MeiaCana from '../../ReferenciasVisuais/aros/Meia cana.svg';
import Redondo from '../../ReferenciasVisuais/aros/Redondo.svg';
import BauladaDupla from '../../ReferenciasVisuais/aros/baulada dupla.svg';
import Gota from '../../ReferenciasVisuais/aros/gota.svg';
import Quadrado from '../../ReferenciasVisuais/aros/quadrado.svg';

interface ThemeProps {
  theme: {
    cardBackground: string;
    titleColor: string;
    labelColor: string;
    inputBackground: string;
    inputText: string;
    inputBorderColor: string;
    inputFocusBorderColor: string;
    inputFocusShadow: string;
    inputFocusBackground: string;
    placeholderColor: string;
  };
}

const aroImages: Record<string, string> = {
  meia_cana: MeiaCana,
  redondo: Redondo,
  baulada_dupla: BauladaDupla,
  gota: Gota,
  quadrado: Quadrado
};

const SectionContainer = styled.div<ThemeProps>`
  background-color: ${props => props.theme.cardBackground};
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

const SectionTitle = styled.h3<ThemeProps>`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.titleColor};
  margin-bottom: 1rem;
`;

const AroTypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const AroTypeCard = styled.button<ThemeProps & { isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  border: 2px solid ${props => props.isSelected ? props.theme.inputFocusBorderColor : props.theme.inputBorderColor};
  border-radius: 0.5rem;
  background-color: ${props => props.isSelected ? props.theme.inputFocusBackground : props.theme.inputBackground};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.theme.inputFocusBorderColor};
  }
`;

const AroImage = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 0.5rem;
`;

const AroLabel = styled.span<ThemeProps>`
  font-size: 0.75rem;
  color: ${props => props.theme.labelColor};
  text-align: center;
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label<ThemeProps>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.labelColor};
  margin-bottom: 0.25rem;
`;

const Input = styled.input<ThemeProps>`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.inputText};
  border: 1px solid ${props => props.theme.inputBorderColor};
  border-radius: 0.375rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.inputFocusBorderColor};
    box-shadow: ${props => props.theme.inputFocusShadow};
    background-color: ${props => props.theme.inputFocusBackground};
  }
`;

const Select = styled.select<ThemeProps>`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.inputText};
  border: 1px solid ${props => props.theme.inputBorderColor};
  border-radius: 0.375rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.inputFocusBorderColor};
    box-shadow: ${props => props.theme.inputFocusShadow};
    background-color: ${props => props.theme.inputFocusBackground};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CheckboxLabel = styled.label<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.labelColor};
  cursor: pointer;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const RadioLabel = styled.label<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.labelColor};
  cursor: pointer;
`;

const CravacaoSection = styled.div<ThemeProps>`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.inputBorderColor};
`;

interface AroConfigSectionProps {
  config: AroConfig;
  onChange: (config: AroConfig) => void;
  theme?: ThemeProps['theme'];
  className?: string;
}

const AroConfigSection: React.FC<AroConfigSectionProps> = ({
  config,
  onChange,
  theme,
  className
}) => {
  const themeFromContext = useTheme() as ThemeProps['theme'];
  const appliedTheme = theme ?? themeFromContext;
  const handleChange = <K extends keyof AroConfig>(field: K, value: AroConfig[K]) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <SectionContainer theme={appliedTheme} className={className}>
      <SectionTitle theme={appliedTheme}>Configuração do Aro</SectionTitle>

      {/* Tipos de Aro */}
      <Label theme={appliedTheme}>Tipo de Aro</Label>
      <AroTypesGrid>
        {aroTypeOptions.map((tipo) => (
          <AroTypeCard
            key={tipo.value}
            type="button"
            theme={appliedTheme}
            isSelected={config.tipoAro === tipo.value}
            onClick={() => handleChange('tipoAro', tipo.value)}
          >
            <AroImage src={aroImages[tipo.value]} alt={tipo.label} />
            <AroLabel theme={appliedTheme}>{tipo.label}</AroLabel>
          </AroTypeCard>
        ))}
      </AroTypesGrid>

      {/* Dimensões do Aro */}
      <FieldsGrid>
        <FieldContainer>
          <Label theme={appliedTheme}>Altura do Aro (mm)</Label>
          <Input
            theme={appliedTheme}
            type="number"
            step="0.1"
            value={config.alturaAro}
            onChange={(e) => handleChange('alturaAro', e.target.value)}
            disabled={config.proporcional}
            placeholder={config.proporcional ? 'Proporcional' : 'Altura'}
          />
        </FieldContainer>

        <FieldContainer>
          <Label theme={appliedTheme}>Largura do Aro (mm)</Label>
          <Input
            theme={appliedTheme}
            type="number"
            step="0.1"
            value={config.comprimentoAro}
            onChange={(e) => handleChange('comprimentoAro', e.target.value)}
            disabled={config.proporcional}
            placeholder={config.proporcional ? 'Proporcional' : 'Comprimento'}
          />
        </FieldContainer>

        <FieldContainer>
          <CheckboxContainer style={{ height: '100%', alignItems: 'flex-end', paddingBottom: '0.75rem' }}>
            <CheckboxLabel theme={appliedTheme}>
              <input
                type="checkbox"
                checked={config.proporcional}
                onChange={(e) => handleChange('proporcional', e.target.checked)}
              />
              Proporcional
            </CheckboxLabel>
          </CheckboxContainer>
        </FieldContainer>

        <FieldContainer>
          <Label theme={appliedTheme}>Estrutura</Label>
          <RadioGroup>
            {aroStructureOptions.map((opt) => (
              <RadioLabel key={opt.value} theme={appliedTheme}>
                <input
                  type="radio"
                  name="estrutura"
                  checked={config.estrutura === opt.value}
                  onChange={() => handleChange('estrutura', opt.value as 'ocado' | 'macico')}
                />
                {opt.label}
              </RadioLabel>
            ))}
          </RadioGroup>
        </FieldContainer>
      </FieldsGrid>

      {/* Cravado ou Sem Pedra */}
      <FieldsGrid>
        <FieldContainer>
          <Label theme={appliedTheme}>Pedras no Aro</Label>
          <RadioGroup>
            <RadioLabel theme={appliedTheme}>
              <input
                type="radio"
                name="comPedra"
                checked={config.comPedra}
                onChange={() => handleChange('comPedra', true)}
              />
              Cravado
            </RadioLabel>
            <RadioLabel theme={appliedTheme}>
              <input
                type="radio"
                name="comPedra"
                checked={!config.comPedra}
                onChange={() => handleChange('comPedra', false)}
              />
              Sem Pedra
            </RadioLabel>
          </RadioGroup>
        </FieldContainer>
      </FieldsGrid>

      {/* Configuração de Cravação */}
      {config.comPedra && (
        <CravacaoSection theme={appliedTheme}>
          <SectionTitle theme={appliedTheme}>Configuração da Cravação</SectionTitle>
          <FieldsGrid>
            <FieldContainer>
              <Label theme={appliedTheme}>Quantidade de Fileiras</Label>
              <Input
                theme={appliedTheme}
                type="number"
                min="1"
                value={config.quantidadeFileiras}
                onChange={(e) => handleChange('quantidadeFileiras', parseInt(e.target.value) || 1)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label theme={appliedTheme}>Tipo de Cravação</Label>
              <Select
                theme={appliedTheme}
                value={config.tipoCravacao}
                onChange={(e) => handleChange('tipoCravacao', e.target.value)}
              >
                <option value="">Selecione</option>
                {aroCravacaoTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </FieldContainer>
          </FieldsGrid>
        </CravacaoSection>
      )}
    </SectionContainer>
  );
};

export default AroConfigSection;
