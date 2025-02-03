import ms from "ms";
import GoPerigonAPIClient from "../servicies/GoPerigonAPIClient";
import { Article } from "../entities/Article";
import { useQuery } from "@tanstack/react-query";
import useArticleQueryStore from "../stores/useArticleQueryStore";

const articlesService = new GoPerigonAPIClient<Article>("/all");

export const useCompanyArticles = (companySymbol?: string, from?: string, to?: string) => {
  const { articleQuery } = useArticleQueryStore();
  const symbols = [companySymbol]
  
  return useQuery({
    queryKey: ["articles", articleQuery, symbols],
    queryFn: () =>
      articlesService.getAll({
        params: {
          addDateFrom: articleQuery.addDateFrom, //date article can be from
          companySymbol: symbols.join(","),
          from: from,
          to: to,
          sortBy: "relevance", //sort by relevance
          excludeLabel: "Non-news", //exclude non-news articles
          sourceGroup: "top100", //source group is top 100
          language: "en", //language must be english
          showReprints:"false",
          // page: articleQuery.page,
        },
      }),
    staleTime: ms("10m"),
    //I cannot seem to get react query to fetch data in the foreground when it is stale, data is fetched in the background when stale through
  });
};
