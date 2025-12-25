import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface StonePriceTiers {
  tier1: number; // até 0.07ct
  tier2: number; // 0.08ct até 0.725ct
  tier3: number; // acima de 0.725ct
}

interface StonePricingProps {
  stonePrices: StonePriceTiers;
  onPriceChange: (tier: keyof StonePriceTiers, value: number) => void;
}

const tiers = [
  { key: 'tier1' as keyof StonePriceTiers, label: 'Até 0.07 ct', description: 'Pedras pequenas' },
  { key: 'tier2' as keyof StonePriceTiers, label: '0.08 a 0.725 ct', description: 'Pedras médias' },
  { key: 'tier3' as keyof StonePriceTiers, label: 'Acima de 0.725 ct', description: 'Pedras grandes' },
];

export function StonePricing({ stonePrices, onPriceChange }: StonePricingProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-display text-foreground/90">Tabela de Preços por Quilate</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div key={tier.key} className="space-y-2">
            <Label className="text-foreground/80 text-sm">
              {tier.label}
              <span className="block text-xs text-muted-foreground">{tier.description}</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                R$
              </span>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={stonePrices[tier.key] || ''}
                onChange={(e) => onPriceChange(tier.key, parseFloat(e.target.value) || 0)}
                className="bg-input border-border focus:border-primary focus:ring-primary/20 pl-10"
                placeholder="0.00"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function getStonePricePerCt(ct: number, prices: StonePriceTiers): number {
  if (ct <= 0.07) return prices.tier1;
  if (ct <= 0.725) return prices.tier2;
  return prices.tier3;
}

export function getStoneTierName(ct: number): string {
  if (ct <= 0.07) return 'Até 0.07 ct';
  if (ct <= 0.725) return '0.08 a 0.725 ct';
  return 'Acima de 0.725 ct';
}
