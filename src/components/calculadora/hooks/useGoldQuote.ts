import { useCallback, useState } from 'react';
import { fetchGoldQuoteInBrlPerGram } from '../utils';

export const useGoldQuote = () => {
  const [goldQuote1000, setGoldQuote1000] = useState(0);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const updateGoldQuote = useCallback(async () => {
    setIsLoadingQuote(true);
    setQuoteError(null);
    try {
      const goldBrlPerGram = await fetchGoldQuoteInBrlPerGram();
      setGoldQuote1000(goldBrlPerGram);
    } catch (error) {
      console.error('Error fetching gold quote:', error);
      setQuoteError('Não foi possível atualizar a cotação agora. Tente novamente em instantes.');
    } finally {
      setIsLoadingQuote(false);
    }
  }, []);

  const gold18kFromQuote = goldQuote1000 > 0 ? (goldQuote1000 * 0.75).toFixed(2) : '0.00';

  return {
    goldQuote1000,
    isLoadingQuote,
    quoteError,
    gold18kFromQuote,
    updateGoldQuote
  };
};
