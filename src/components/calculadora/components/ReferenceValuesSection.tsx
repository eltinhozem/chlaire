import { Check, Clock3, RefreshCw } from 'lucide-react';
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { SecondaryButton } from '../../buttons/SecondaryButton';
import { SuccessButton } from '../../buttons/SuccessButton';
import { suppliers, Supplier, SupplierPriceEntry } from '../fornecedor';
import SupplierPriceTable from './SupplierPriceTable';
import {
  SectionCard,
  ActionsRow,
  SectionHeader,
  TitleRow,
  SectionTitle,
  StatusChip,
  ValuesGrid,
  ValueSection,
  SubsectionTitle,
  Label,
  Input,
  ButtonsRow,
  SmallText,
  Divider
} from '../styles';

interface ReferenceValuesSectionProps {
  pricingLoading: boolean;
  savingPricing: boolean;
  savingBase: boolean;
  showBaseCalc: boolean;
  margin: number;
  dollarStone: number;
  goldQuote1000: number;
  isLoadingQuote: boolean;
  quoteError: string | null;
  gold18kFromQuote: string;
  goldPrice18k: number;
  effectiveGoldPrice: number;
  lastUpdatedLabel: string;
  selectedSupplierId: string;
  selectedSupplier: Supplier;
  isEditingSupplier: boolean;
  onMarginChange: (value: number) => void;
  onDollarStoneChange: (value: number) => void;
  onSaveBaseCalc: () => void;
  onUpdateGoldQuote: () => void;
  onUseQuoteAsReference: () => void;
  onGoldPriceChange: (value: number) => void;
  onSaveGoldPrice: () => void;
  onSupplierChange: (id: string) => void;
  onUpdateSupplierPrices: (prices: SupplierPriceEntry[]) => void;
  onToggleSupplierEdit: () => void;
  onSaveSupplierPrices: () => void;
}

const ReferenceValuesSection = ({
  pricingLoading,
  savingPricing,
  savingBase,
  showBaseCalc,
  margin,
  dollarStone,
  goldQuote1000,
  isLoadingQuote,
  quoteError,
  gold18kFromQuote,
  goldPrice18k,
  effectiveGoldPrice,
  lastUpdatedLabel,
  selectedSupplierId,
  selectedSupplier,
  isEditingSupplier,
  onMarginChange,
  onDollarStoneChange,
  onSaveBaseCalc,
  onUpdateGoldQuote,
  onUseQuoteAsReference,
  onGoldPriceChange,
  onSaveGoldPrice,
  onSupplierChange,
  onUpdateSupplierPrices,
  onToggleSupplierEdit,
  onSaveSupplierPrices
}: ReferenceValuesSectionProps) => {
  return (
    <SectionCard>
      <ActionsRow>
        <SectionHeader>
          <TitleRow>
            <SectionTitle>Valores de referência</SectionTitle>
            <StatusChip>
              <Clock3 size={16} />
              {pricingLoading ? 'Carregando valores...' : `Última atualização: ${lastUpdatedLabel}`}
            </StatusChip>
          </TitleRow>
        </SectionHeader>
      </ActionsRow>

      <ValuesGrid>
        {showBaseCalc && (
          <ValueSection>
            <SubsectionTitle>Cálculo base</SubsectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.65rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '140px' }}>
                  <Label>Margem (multiplicador)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={margin}
                    onChange={(e) => onMarginChange(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div style={{ flex: 1, minWidth: '140px' }}>
                  <Label>Dollar pedra (multiplicador)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={dollarStone}
                    onChange={(e) => onDollarStoneChange(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              <ButtonsRow>
                <PrimaryButton
                  type="button"
                  onClick={onSaveBaseCalc}
                  disabled={savingBase || pricingLoading}
                >
                  {savingBase ? 'Salvando...' : 'Salvar cálculo base'}
                </PrimaryButton>
              </ButtonsRow>
              <SmallText>
                Ouro e pedras aplicam automaticamente: ouro final = OURO 18K × margem; pedra final = tabela × ct × dollar pedra × margem.
              </SmallText>
            </div>
          </ValueSection>
        )}

        <ValueSection>
          <SubsectionTitle>Cotação do Ouro 1000</SubsectionTitle>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '120px' }}>
              <Label>Ouro hoje (R$/g)</Label>
              <Input
                type="number"
                value={goldQuote1000 || ''}
                readOnly
                placeholder="Clique em atualizar"
              />
            </div>
            <SecondaryButton 
              type="button" 
              onClick={onUpdateGoldQuote}
              disabled={isLoadingQuote}
              style={{ marginBottom: '0.1rem' }}
            >
              <RefreshCw size={16} style={{ marginRight: 6 }} className={isLoadingQuote ? 'animate-spin' : ''} />
              {isLoadingQuote ? 'Atualizando...' : 'Atualizar'}
            </SecondaryButton>
          </div>

          {quoteError && (
            <SmallText style={{ marginTop: '0.35rem', color: '#b91c1c' }}>
              {quoteError}
            </SmallText>
          )}

          {goldQuote1000 > 0 && (
            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <SmallText style={{ margin: 0 }}>
                Ouro 18K (750): <strong>R$ {gold18kFromQuote}</strong>
              </SmallText>
              <SuccessButton type="button" onClick={onUseQuoteAsReference}>
                <Check size={16} style={{ marginRight: 6 }} />
                Usar essa referência
              </SuccessButton>
            </div>
          )}
        </ValueSection>

        <ValueSection>
          <SubsectionTitle>Preço do OURO 18K (R$/g)</SubsectionTitle>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '120px' }}>
              <Label>OURO 18K</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={goldPrice18k || ''}
                onChange={(e) => onGoldPriceChange(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                disabled={pricingLoading || savingPricing}
              />
            </div>
            <ButtonsRow style={{ marginBottom: '0.1rem' }}>
              <PrimaryButton
                type="button"
                onClick={onSaveGoldPrice}
                disabled={savingPricing || pricingLoading}
              >
                {savingPricing ? 'Salvando...' : 'Salvar valor padrão'}
              </PrimaryButton>
            </ButtonsRow>
            <SmallText style={{ marginTop: '0.25rem' }}>
              Ouro com margem: R$ {effectiveGoldPrice.toFixed(2)}/g
            </SmallText>
          </div>
          <SmallText style={{ marginTop: '0.35rem' }}>
            Última atualização: {lastUpdatedLabel}
          </SmallText>
        </ValueSection>
      </ValuesGrid>

      <Divider />

      <SubsectionTitle>Fornecedor de Pedras</SubsectionTitle>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        <select
          value={selectedSupplierId}
          onChange={(e) => onSupplierChange(e.target.value)}
          style={{
            padding: '0.65rem 0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid #ccc',
            background: '#fff',
            fontSize: '1rem',
            minWidth: '200px'
          }}
        >
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <SmallText style={{ marginBottom: '0.5rem' }}>
        Última atualização: {lastUpdatedLabel}
      </SmallText>

      <SupplierPriceTable
        supplier={selectedSupplier}
        onUpdatePrices={onUpdateSupplierPrices}
        isEditing={isEditingSupplier}
        onToggleEdit={onToggleSupplierEdit}
        onSave={onSaveSupplierPrices}
      />
    </SectionCard>
  );
};

export default ReferenceValuesSection;
