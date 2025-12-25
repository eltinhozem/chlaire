import { GoldType } from './GoldSection';
import { Stone } from './StoneEntry';
import { Separator } from '@/components/ui/separator';

interface GoldPrices {
  yellow: number;
  white: number;
  rose: number;
}

interface CalculationSummaryProps {
  selectedGold: GoldType;
  goldPrices: GoldPrices;
  goldWeight: number;
  stones: Stone[];
}

const goldTypeLabels: Record<GoldType, string> = {
  yellow: 'Ouro Amarelo',
  white: 'Ouro Branco',
  rose: 'Ouro Rosé',
};

export function CalculationSummary({
  selectedGold,
  goldPrices,
  goldWeight,
  stones,
}: CalculationSummaryProps) {
  const goldValue = goldWeight * goldPrices[selectedGold];
  const stonesValue = stones.reduce((sum, s) => sum + s.totalPrice, 0);
  const totalValue = goldValue + stonesValue;
  const validStones = stones.filter(s => s.sizeMm > 0);

  return (
    <div className="space-y-6 p-6 rounded-xl bg-gradient-to-b from-card to-secondary/20 border border-primary/20 gold-glow">
      <h2 className="text-2xl font-display gold-gradient-text text-center">
        Resumo do Cálculo
      </h2>

      {/* Seção do Ouro */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Ouro
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-foreground/70">Tipo</span>
            <span className="text-foreground">{goldTypeLabels[selectedGold]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground/70">Peso</span>
            <span className="text-foreground">{goldWeight.toFixed(2)}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground/70">Preço/g</span>
            <span className="text-foreground">R$ {goldPrices[selectedGold].toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-border/30">
            <span className="text-foreground/80 font-medium">Subtotal Ouro</span>
            <span className="text-primary font-medium">R$ {goldValue.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Separator className="bg-border/30" />

      {/* Seção das Pedras */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Pedras
        </h3>
        {validStones.length > 0 ? (
          <div className="space-y-3">
            {validStones.map((stone, index) => (
              <div key={stone.id} className="space-y-1 text-sm">
                <div className="text-foreground/60 text-xs">
                  Pedra {index + 1}
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">
                    {stone.quantity}x {stone.sizeMm.toFixed(1)}mm ({stone.ctPerStone.toFixed(3)}ct cada)
                  </span>
                  <span className="text-foreground">{stone.totalCt.toFixed(3)} ct</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    Faixa: {stone.tierName} • R$ {stone.pricePerCt.toFixed(2)}/ct
                  </span>
                  <span className="text-primary">R$ {stone.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t border-border/30">
              <span className="text-foreground/80 font-medium">Subtotal Pedras</span>
              <span className="text-primary font-medium">R$ {stonesValue.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">Nenhuma pedra adicionada</p>
        )}
      </div>

      <Separator className="bg-primary/30" />

      {/* Total */}
      <div className="text-center space-y-2 pt-2">
        <p className="text-sm text-muted-foreground uppercase tracking-wider">
          Valor Total da Joia
        </p>
        <p className="text-4xl font-display gold-gradient-text animate-pulse-gold">
          R$ {totalValue.toFixed(2)}
        </p>
      </div>

      {/* Fórmula */}
      <div className="p-3 rounded-lg bg-background/50 border border-border/30">
        <p className="text-xs text-muted-foreground text-center">
          <span className="font-medium text-foreground/80">Cálculo:</span>{' '}
          ({goldWeight.toFixed(2)}g × R$ {goldPrices[selectedGold].toFixed(2)}/g)
          {validStones.length > 0 && (
            <>
              {' + '}
              {validStones.map((s, i) => (
                <span key={s.id}>
                  ({s.totalCt.toFixed(3)}ct × R$ {s.pricePerCt.toFixed(2)}/ct)
                  {i < validStones.length - 1 ? ' + ' : ''}
                </span>
              ))}
            </>
          )}
          {' = '}
          <span className="text-primary font-medium">R$ {totalValue.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}
