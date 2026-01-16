import React from 'react';
import { Plus } from 'lucide-react';
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { StoneEntry } from '../StoneEntry';
import type { SupplierPriceEntry } from '../fornecedor';
import type { Stone } from '../types';
import {
  SectionCard,
  SectionTitle,
  SmallText,
  Divider,
  StoneList,
  InlineActions,
  PreviewCard,
  PreviewValue
} from '../styles';

interface StonesSectionProps {
  stones: Stone[];
  supplierName: string;
  supplierPrices: SupplierPriceEntry[];
  margin: number;
  dollarStone: number;
  stonesValue: number;
  totalQty: number;
  onAddStone: () => void;
  onUpdateStone: (stone: Stone) => void;
  onRemoveStone: (id: string) => void;
}

const StonesSection: React.FC<StonesSectionProps> = ({
  stones,
  supplierName,
  supplierPrices,
  margin,
  dollarStone,
  stonesValue,
  totalQty,
  onAddStone,
  onUpdateStone,
  onRemoveStone
}) => {
  return (
    <SectionCard>
      <SectionTitle>Pedras</SectionTitle>
      <SmallText style={{ marginBottom: '0.5rem' }}>
        Fornecedor: <strong>{supplierName}</strong>
      </SmallText>

      <InlineActions>
        <PrimaryButton type="button" onClick={onAddStone}>
          <Plus size={16} style={{ marginRight: 6 }} />
          Adicionar pedra
        </PrimaryButton>
      </InlineActions>

      <Divider />

      <StoneList>
        {stones.map((stone) => (
          <StoneEntry
            key={stone.id}
            stone={stone}
            fornecedor={supplierPrices}
            margin={margin}
            dollarStone={dollarStone}
            onUpdate={onUpdateStone}
            onRemove={onRemoveStone}
            canRemove={stones.length > 1}
          />
        ))}
      </StoneList>

      {stones.some((s) => s.sizeMm > 0) && (
        <PreviewCard style={{ marginTop: '0.75rem' }}>
          <SmallText>Valor total das pedras</SmallText>
          <PreviewValue>R$ {stonesValue.toFixed(2)}</PreviewValue>
          <SmallText>
            {totalQty} pedra
            {totalQty !== 1 ? 's' : ''}
          </SmallText>
        </PreviewCard>
      )}
    </SectionCard>
  );
};

export default StonesSection;
