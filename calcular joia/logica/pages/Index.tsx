import { useState, useCallback } from 'react';
import { GoldSection, GoldType } from '@/components/GoldSection';
import { StoneSection } from '@/components/StoneSection';
import { Stone } from '@/components/StoneEntry';
import { StonePriceTiers } from '@/components/StonePricing';
import { CalculationSummary } from '@/components/CalculationSummary';
import { ConversionTable } from '@/components/ConversionTable';
import { Separator } from '@/components/ui/separator';
import { Gem } from 'lucide-react';

const generateId = () => Math.random().toString(36).substring(2, 9);

const createEmptyStone = (): Stone => ({
  id: generateId(),
  quantity: 1,
  sizeMm: 0,
  ctPerStone: 0,
  totalCt: 0,
  pricePerCt: 0,
  totalPrice: 0,
  tierName: '',
});

export default function Index() {
  // Estado do Ouro
  const [selectedGold, setSelectedGold] = useState<GoldType>('yellow');
  const [goldPrices, setGoldPrices] = useState({
    yellow: 0,
    white: 0,
    rose: 0,
  });
  const [goldWeight, setGoldWeight] = useState(0);

  // Estado das Pedras
  const [stonePrices, setStonePrices] = useState<StonePriceTiers>({
    tier1: 0,
    tier2: 0,
    tier3: 0,
  });
  const [stones, setStones] = useState<Stone[]>([createEmptyStone()]);

  // Handlers
  const handleGoldPriceChange = (type: GoldType, value: number) => {
    setGoldPrices((prev) => ({ ...prev, [type]: value }));
  };

  const handleStonePriceChange = (tier: keyof StonePriceTiers, value: number) => {
    setStonePrices((prev) => ({ ...prev, [tier]: value }));
  };

  const handleAddStone = useCallback(() => {
    setStones((prev) => [...prev, createEmptyStone()]);
  }, []);

  const handleUpdateStone = useCallback((updatedStone: Stone) => {
    setStones((prev) =>
      prev.map((s) => (s.id === updatedStone.id ? updatedStone : s))
    );
  }, []);

  const handleRemoveStone = useCallback((id: string) => {
    setStones((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-8 px-4 text-center border-b border-border/30">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Gem className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-display gold-gradient-text">
            Calculadora de Joias
          </h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Sistema de precificação para peças em ouro com pedras preciosas
        </p>
      </header>

      <main className="container max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2 space-y-8">
            {/* Seção do Ouro */}
            <section className="p-6 rounded-xl bg-card border border-border/50">
              <GoldSection
                selectedGold={selectedGold}
                onGoldChange={setSelectedGold}
                goldPrices={goldPrices}
                onPriceChange={handleGoldPriceChange}
                goldWeight={goldWeight}
                onWeightChange={setGoldWeight}
              />
            </section>

            <Separator className="bg-border/30" />

            {/* Seção das Pedras */}
            <section className="p-6 rounded-xl bg-card border border-border/50">
              <StoneSection
                stones={stones}
                stonePrices={stonePrices}
                onStonePriceChange={handleStonePriceChange}
                onAddStone={handleAddStone}
                onUpdateStone={handleUpdateStone}
                onRemoveStone={handleRemoveStone}
              />
            </section>

            {/* Tabela de Conversão */}
            <section className="p-6 rounded-xl bg-card border border-border/50">
              <ConversionTable />
            </section>
          </div>

          {/* Resumo */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CalculationSummary
                selectedGold={selectedGold}
                goldPrices={goldPrices}
                goldWeight={goldWeight}
                stones={stones}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-border/30">
        <p className="text-xs text-muted-foreground">
          Sistema de Precificação de Joias
        </p>
      </footer>
    </div>
  );
}
