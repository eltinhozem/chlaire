import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Gem } from 'lucide-react';
import { mmToCt } from '@/data/stoneConversionTable';
import { StonePriceTiers, getStonePricePerCt, getStoneTierName } from './StonePricing';

export interface Stone {
  id: string;
  quantity: number;
  sizeMm: number;
  ctPerStone: number;
  totalCt: number;
  pricePerCt: number;
  totalPrice: number;
  tierName: string;
}

interface StoneEntryProps {
  stone: Stone;
  stonePrices: StonePriceTiers;
  onUpdate: (stone: Stone) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export function StoneEntry({
  stone,
  stonePrices,
  onUpdate,
  onRemove,
  canRemove,
}: StoneEntryProps) {
  const [quantity, setQuantity] = useState(stone.quantity || 1);
  const [sizeMm, setSizeMm] = useState(stone.sizeMm || 0);

  useEffect(() => {
    const ctPerStone = mmToCt(sizeMm);
    const totalCt = ctPerStone * quantity;
    const pricePerCt = getStonePricePerCt(ctPerStone, stonePrices);
    const totalPrice = totalCt * pricePerCt;
    const tierName = getStoneTierName(ctPerStone);

    onUpdate({
      ...stone,
      quantity,
      sizeMm,
      ctPerStone,
      totalCt,
      pricePerCt,
      totalPrice,
      tierName,
    });
  }, [quantity, sizeMm, stonePrices]);

  return (
    <div className="p-4 rounded-lg bg-secondary/30 border border-border/50 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gem className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground/80">Pedra</span>
        </div>
        {canRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(stone.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-foreground/70 text-sm">Quantidade</Label>
          <Input
            type="number"
            min="1"
            step="1"
            value={quantity || ''}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="bg-input border-border focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-foreground/70 text-sm">Tamanho (mm)</Label>
          <Input
            type="number"
            min="0"
            step="0.1"
            value={sizeMm || ''}
            onChange={(e) => setSizeMm(parseFloat(e.target.value) || 0)}
            className="bg-input border-border focus:border-primary"
            placeholder="0.0"
          />
        </div>
      </div>

      {sizeMm > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-border/30">
          <div>
            <p className="text-xs text-muted-foreground">ct/pedra</p>
            <p className="text-sm font-medium text-foreground">{stone.ctPerStone.toFixed(3)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total ct</p>
            <p className="text-sm font-medium text-foreground">{stone.totalCt.toFixed(3)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Faixa</p>
            <p className="text-xs font-medium text-primary">{stone.tierName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Subtotal</p>
            <p className="text-sm font-medium gold-gradient-text">R$ {stone.totalPrice.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
