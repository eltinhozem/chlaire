import React from 'react';
import {
  SectionCard,
  SectionTitle,
  HelperText,
  SmallText,
  Divider,
  Label,
  Input,
  PreviewCard,
  PreviewValue
} from '../styles';

interface GoldSectionProps {
  pricingLoading: boolean;
  effectiveGoldPrice: number;
  goldWeight: number;
  goldValue: number;
  onGoldWeightChange: (value: number) => void;
}

const GoldSection: React.FC<GoldSectionProps> = ({
  pricingLoading,
  effectiveGoldPrice,
  goldWeight,
  goldValue,
  onGoldWeightChange
}) => {
  return (
    <SectionCard>
      <SectionTitle>Ouro</SectionTitle>
      <HelperText>Valores por grama configurados no topo.</HelperText>
      <SmallText style={{ marginTop: '0.25rem' }}>
        {pricingLoading
          ? 'Carregando valores do ouro...'
          : `Preço OURO 18K (com margem): R$ ${effectiveGoldPrice.toFixed(2)} / g`}
      </SmallText>
      <Divider />

      <Label>Peso do Ouro (gramas)</Label>
      <Input
        type="number"
        min="0"
        step="0.01"
        value={goldWeight || ''}
        onChange={(e) => onGoldWeightChange(parseFloat(e.target.value) || 0)}
        placeholder="0.00"
      />

      {goldWeight > 0 && effectiveGoldPrice > 0 && (
        <PreviewCard>
          <SmallText>Valor do Ouro</SmallText>
          <PreviewValue>
            R$ {goldValue.toFixed(2)}
          </PreviewValue>
          <SmallText>
            {goldWeight}g × R$ {effectiveGoldPrice.toFixed(2)}/g
          </SmallText>
        </PreviewCard>
      )}
    </SectionCard>
  );
};

export default GoldSection;
