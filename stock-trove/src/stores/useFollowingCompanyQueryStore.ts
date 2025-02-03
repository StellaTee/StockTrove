import {create} from 'zustand';

interface FollowingCompanyQueryStore {
  symbols: string[];
  addSymbol: (symbol: string) => void;
  removeSymbol: (symbol: string) => void;
  addSymbolList: (symbolList: string[]) => void;
  clear: () => void;
}

const useFollowingCompanyQueryStore = create<FollowingCompanyQueryStore>((set) => ({
  symbols: [],
  addSymbol: (symbol) => set((store) => ({ symbols: [...store.symbols, symbol] })),
  removeSymbol: (symbol) => set((store) => ({ symbols: store.symbols.filter((n) => n !== symbol) })),
  addSymbolList: (symbolList) => set((store) => {
  const uniqueSymbols = Array.from(new Set([...store.symbols, ...symbolList]));
  return { symbols: uniqueSymbols };
}),
  clear: () => set({ symbols: [] }),
}));

export default useFollowingCompanyQueryStore;