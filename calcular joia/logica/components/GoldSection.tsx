import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type GoldType = 'yellow' | 'white' | 'rose';

interface GoldPrices {
  yellow: number;
  white: number;
  rose: number;
}

interface GoldSectionProps {
  selectedGold: GoldType;
  onGoldChange: (type: GoldType) => void;
  goldPrices: GoldPrices;
  onPriceChange: (type: GoldType, value: number) => void;
  goldWeight: number;
  onWeightChange: (weight: number) => void;
}

const goldOptions = [
  { value: 'yellow' as GoldType, label: 'Ouro Amarelo', colorClass: 'bg-gold-yellow' },
  { value: 'white' as GoldType, label: 'Ouro Branco', colorClass: 'bg-gold-white' },
  { value: 'rose' as GoldType, label: 'Ouro Rosé', colorClass: 'bg-gold-rose' },
];

export function GoldSection({
  selectedGold,
  onGoldChange,
  goldPrices,
  onPriceChange,
  goldWeight,
  onWeightChange,
}: GoldSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display gold-gradient-text">Ouro</h2>
      
      {/* Preços por tipo de ouro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goldOptions.map((option) => (
          <div key={option.value} className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground/80">
              <span className={`w-4 h-4 rounded-full ${option.colorClass}`} />
              {option.label} (R$/g)
            </Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={goldPrices[option.value] || ''}
              onChange={(e) => onPriceChange(option.value, parseFloat(e.target.value) || 0)}
              className="bg-input border-border focus:border-primary focus:ring-primary/20"
              placeholder="0.00"
            />
          </div>
        ))}
      </div>

      {/* Seleção do tipo de ouro */}
      <div className="space-y-3">
        <Label className="text-foreground/80">Tipo de Ouro da Peça</Label>
        <RadioGroup
          value={selectedGold}
          onValueChange={(value) => onGoldChange(value as GoldType)}
          className="flex flex-wrap gap-4"
        >
          {goldOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="border-primary text-primary"
              />
              <Label
                htmlFor={option.value}
                className={`flex items-center gap-2 cursor-pointer transition-colors ${
                  selectedGold === option.value ? 'text-primary' : 'text-foreground/70'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${option.colorClass}`} />
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Peso do ouro */}
      <div className="space-y-2">
        <Label className="text-foreground/80">Peso do Ouro (gramas)</Label>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={goldWeight || ''}
          onChange={(e) => onWeightChange(parseFloat(e.target.value) || 0)}
          className="bg-input border-border focus:border-primary focus:ring-primary/20 max-w-xs"
          placeholder="0.00"
        />
      </div>

      {/* Preview do valor */}
      {goldWeight > 0 && goldPrices[selectedGold] > 0 && (
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <p className="text-sm text-muted-foreground">Valor do Ouro</p>
          <p className="text-xl font-display gold-gradient-text">
            R$ {(goldWeight * goldPrices[selectedGold]).toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {goldWeight}g × R$ {goldPrices[selectedGold].toFixed(2)}/g
          </p>
        </div>
      )}
    </div>
  );
}
