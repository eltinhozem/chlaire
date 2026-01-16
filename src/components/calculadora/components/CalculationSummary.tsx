import type { Stone } from '../types';
import {
  SummaryCard,
  SummaryGroup,
  SummaryLine,
  SummaryLabel,
  SummaryValue,
  HighlightValue,
  Divider,
  Formula
} from '../styles';

interface CalculationSummaryProps {
  goldWeight: number;
  goldPrice: number;
  goldValue: number;
  stonesValue: number;
  totalValue: number;
  totalQty: number;
  validStones: Stone[];
  supplierName: string;
}

const CalculationSummary = ({
  goldWeight,
  goldPrice,
  goldValue,
  stonesValue,
  totalValue,
  totalQty,
  validStones,
  supplierName
}: CalculationSummaryProps) => {
  return (
    <SummaryCard>
      <SummaryGroup>
        <SummaryLine>
          <SummaryLabel>Ouro 18K</SummaryLabel>
          <SummaryValue>R$ {goldPrice.toFixed(2)}/g</SummaryValue>
        </SummaryLine>
        <SummaryLine>
          <SummaryLabel>Peso</SummaryLabel>
          <SummaryValue>{goldWeight.toFixed(2)} g</SummaryValue>
        </SummaryLine>
        <SummaryLine>
          <SummaryLabel>Subtotal ouro</SummaryLabel>
          <SummaryValue>R$ {goldValue.toFixed(2)}</SummaryValue>
        </SummaryLine>
      </SummaryGroup>

      <Divider />

      <SummaryGroup>
        <SummaryLine>
          <SummaryLabel>Fornecedor</SummaryLabel>
          <SummaryValue>{supplierName}</SummaryValue>
        </SummaryLine>
        <SummaryLine>
          <SummaryLabel>Pedras ({totalQty})</SummaryLabel>
          <SummaryValue>R$ {stonesValue.toFixed(2)}</SummaryValue>
        </SummaryLine>
      </SummaryGroup>

      <Divider />

      <SummaryGroup>
        <SummaryLabel>Total da joia</SummaryLabel>
        <HighlightValue>R$ {totalValue.toFixed(2)}</HighlightValue>
      </SummaryGroup>

      <Formula>
        <strong>Cálculo:</strong>{' '}
        ({goldWeight.toFixed(2)}g × R$ {goldPrice.toFixed(2)}/g)
        {validStones.length > 0 && (
          <>
            {' + '}
            {validStones.map((s, idx) => (
              <span key={s.id}>
                ({s.quantity} × R$ {s.pricePerUnit.toFixed(2)})
                {idx < validStones.length - 1 ? ' + ' : ''}
              </span>
            ))}
          </>
        )}{' '}
        = <strong>R$ {totalValue.toFixed(2)}</strong>
      </Formula>
    </SummaryCard>
  );
};

export default CalculationSummary;
