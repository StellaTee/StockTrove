import { create } from "zustand";

interface DiscoverCompanyQuery {
  q?: string;
  numEmployeesFrom : number;
}

interface DiscoverCompanyQueryStore {
  discoverCompanyQuery: DiscoverCompanyQuery;
  setSearchText: (q: string) => void;
  setNumEmployeesFrom: (numEmployeesFrom: number) => void;
}

const useDiscoverCompanyQueryStore = create<DiscoverCompanyQueryStore>((set) => ({
    discoverCompanyQuery: {} as DiscoverCompanyQuery,
  setSearchText: (q) =>
    set((store) => ({ discoverCompanyQuery: { ...store.discoverCompanyQuery, q } })),
    setNumEmployeesFrom: (numEmployeesFrom) =>
    set((store) => ({ discoverCompanyQuery: { ...store.discoverCompanyQuery, numEmployeesFrom } })),
}));

export default useDiscoverCompanyQueryStore;
