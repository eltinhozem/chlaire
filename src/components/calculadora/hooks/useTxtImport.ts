import { useCallback, useRef, useState, ChangeEvent } from 'react';
import { getStonePriceByMm, SupplierPriceEntry } from '../fornecedor';
import { Stone } from '../types';
import { generateId, mmToCt, parseTxtData } from '../utils';

interface UseTxtImportParams {
  supplierPrices: SupplierPriceEntry[];
  dollarStone: number;
  margin: number;
  onGoldWeightChange: (value: number) => void;
  onStonesChange: (stones: Stone[]) => void;
}

export const useTxtImport = ({
  supplierPrices,
  dollarStone,
  margin,
  onGoldWeightChange,
  onStonesChange
}: UseTxtImportParams) => {
  const [txtFolderCode, setTxtFolderCode] = useState<string>('');
  const [parsedWidth, setParsedWidth] = useState<number | null>(null);
  const [parsedHeight, setParsedHeight] = useState<number | null>(null);
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const handleImportTxtClick = useCallback(() => {
    importInputRef.current?.click();
  }, []);

  const handleImportTxt = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const content = await file.text();
        const parsed = parseTxtData(content);

        const pathParts = (file.webkitRelativePath || file.name).split(/[/\\]/).filter(Boolean);
        const folderFromPath = pathParts.length > 1 ? pathParts[pathParts.length - 2] : '';
        const fileBase = file.name.replace(/\.[^.]+$/, '');
        setTxtFolderCode(folderFromPath || fileBase);

        if (parsed.weight && parsed.weight > 0) {
          onGoldWeightChange(parsed.weight);
        }

        if (parsed.width && parsed.width > 0) {
          setParsedWidth(parsed.width);
        } else {
          setParsedWidth(null);
        }

        if (parsed.height && parsed.height > 0) {
          setParsedHeight(parsed.height);
        } else {
          setParsedHeight(null);
        }

        if (parsed.stones.length > 0) {
          const importedStones: Stone[] = parsed.stones.map(({ quantity, sizeMm }) => {
            const ct = mmToCt(sizeMm);
            const basePrice = getStonePriceByMm(sizeMm, supplierPrices);
            const pricePerUnit = basePrice * (ct || 0) * dollarStone * margin;
            const totalPrice = pricePerUnit * quantity;
            return {
              id: generateId(),
              quantity,
              sizeMm,
              ct,
              pricePerUnit,
              totalPrice
            };
          });

          onStonesChange(importedStones);
        }
      } finally {
        event.target.value = '';
      }
    },
    [supplierPrices, dollarStone, margin, onGoldWeightChange, onStonesChange]
  );

  return {
    txtFolderCode,
    parsedWidth,
    parsedHeight,
    importInputRef,
    handleImportTxt,
    handleImportTxtClick
  };
};
