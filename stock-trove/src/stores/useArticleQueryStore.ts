import { create } from "zustand";

interface ArticleQuery {
  q?: string;
  addDateFrom: string;
  companyName: string;
  language: string;
  page: number;
}

interface ArticleQueryStore {
  articleQuery: ArticleQuery;
  setSearchText: (q: string) => void;
  setDataFrom: (addDateFrom: string) => void;
  setCompanyName: (companyName: string) => void;
  setPrevPage: () => void;
  setNextPage: () => void;
  resetPageCount: () => void;
}

const useArticleQueryStore = create<ArticleQueryStore>((set) => ({
  articleQuery: {
    q: '', // Set default values as needed
    addDateFrom: '',
    companyName: '',
    language: '',
    page: 1,
  },
  setSearchText: (q) =>
    set((store) => ({ articleQuery: { ...store.articleQuery, q } })),
  setDataFrom: (addDateFrom) =>
    set((store) => ({ articleQuery: { ...store.articleQuery, addDateFrom } })),
  setCompanyName: (companyName) =>
    set((store) => ({ articleQuery: { ...store.articleQuery, companyName } })),
  setPrevPage: () =>
    set((store) => ({
      articleQuery: { ...store.articleQuery, page: Math.max(store.articleQuery.page - 1, 1) },
    })),
  setNextPage: () =>
    set((store) => ({
      articleQuery: { ...store.articleQuery, page: Math.min(store.articleQuery.page + 1, 10) },
    })),
  resetPageCount: () =>
    set((store) => ({
      articleQuery: { ...store.articleQuery, page: 1 },
    })),
}));

export default useArticleQueryStore;
