import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Stone, StoneEntry } from './StoneEntry';
import { StonePriceTiers, StonePricing } from './StonePricing';

interface StoneSectionProps {
  stones: Stone[];
  stonePrices: StonePriceTiers;
  onStonePriceChange: (tier: keyof StonePriceTiers, value: number) => void;
  onAddStone: () => void;
  onUpdateStone: (stone: Stone) => void;
  onRemoveStone: (id: string) => void;
}

export function StoneSection({
  stones,
  stonePrices,
  onStonePriceChange,
  onAddStone,
  onUpdateStone,
  onRemoveStone,
}: StoneSectionProps) {
  const totalStonesPrice = stones.reduce((sum, s) => sum + s.totalPrice, 0);
  const totalCt = stones.reduce((sum, s) => sum + s.totalCt, 0);
  const totalQuantity = stones.reduce((sum, s) => sum + s.quantity, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display gold-gradient-text">Pedras</h2>
      
      <StonePricing stonePrices={stonePrices} onPriceChange={onStonePriceChange} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-display text-foreground/90">Pedras da Peça</h3>
          <Button
            onClick={onAddStone}
            variant="outline"
            size="sm"
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Pedra
          </Button>
        </div>

        <div className="space-y-3">
          {stones.map((stone) => (
            <StoneEntry
              key={stone.id}
              stone={stone}
              stonePrices={stonePrices}
              onUpdate={onUpdateStone}
              onRemove={onRemoveStone}
              canRemove={stones.length > 1}
            />
          ))}
        </div>

        {stones.some(s => s.sizeMm > 0) && (
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <p className="text-sm text-muted-foreground">Valor Total das Pedras</p>
            <p className="text-xl font-display gold-gradient-text">
              R$ {totalStonesPrice.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {totalQuantity} pedra{totalQuantity !== 1 ? 's' : ''} • {totalCt.toFixed(3)} ct total
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
