import { useState } from 'react';
import { stoneConversionTable } from '@/data/stoneConversionTable';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Table } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export function ConversionTable() {
  const [isOpen, setIsOpen] = useState(false);

  const halfIndex = Math.ceil(stoneConversionTable.length / 2);
  const leftColumn = stoneConversionTable.slice(0, halfIndex);
  const rightColumn = stoneConversionTable.slice(halfIndex);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        >
          <span className="flex items-center gap-2">
            <Table className="w-4 h-4" />
            Tabela de Conversão mm → ct
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="animate-fade-in">
        <div className="mt-4 p-4 rounded-lg bg-secondary/30 border border-border/50 overflow-x-auto">
          <div className="grid grid-cols-2 gap-4 min-w-[500px]">
            {[leftColumn, rightColumn].map((column, colIndex) => (
              <div key={colIndex}>
                <div className="grid grid-cols-3 gap-2 text-xs font-medium text-muted-foreground pb-2 border-b border-border/30">
                  <span>Pontos</span>
                  <span>mm</span>
                  <span>ct</span>
                </div>
                <div className="space-y-1 mt-2">
                  {column.map((entry) => (
                    <div
                      key={entry.points}
                      className="grid grid-cols-3 gap-2 text-xs text-foreground/80 py-1 hover:bg-primary/5 rounded transition-colors"
                    >
                      <span>{entry.points}</span>
                      <span>{entry.mm.toFixed(1)}</span>
                      <span className="text-primary">{entry.ct.toFixed(3)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
