import {create} from 'zustand';

interface RecommendedCompanyQueryStore {
  symbols: string[];
  addSymbol: (symbol: string) => void;
  removeSymbol: (symbol: string) => void;
  addSymbolList: (symbolList: string[]) => void;
  clear: () => void;
}

const useRecommendedCompanyQueryStore = create<RecommendedCompanyQueryStore>((set) => ({
  symbols: [],
  addSymbol: (symbol) => set((store) => ({ symbols: [...store.symbols, symbol] })),
  removeSymbol: (symbol) => set((store) => ({ symbols: store.symbols.filter((n) => n !== symbol) })),
  addSymbolList: (symbolList) => set((store) => {
  const uniqueSymbols = Array.from(new Set([...store.symbols, ...symbolList]));
  return { symbols: uniqueSymbols };
}),
  clear: () => set({ symbols: [] }),
}));

export default useRecommendedCompanyQueryStore;