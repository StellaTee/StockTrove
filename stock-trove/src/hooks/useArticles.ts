import ms from "ms";
import GoPerigonAPIClient from "../servicies/GoPerigonAPIClient";
import { Article } from "../entities/Article";
import { useQuery } from "@tanstack/react-query";
import useArticleQueryStore from "../stores/useArticleQueryStore";
import useFollowingCompanyQueryStore from "../stores/useFollowingCompanyQueryStore";

interface Props {
  companySymbol: string;
}
const articlesService = new GoPerigonAPIClient<Article>("/all");

export const useArticles = ({ companySymbol }: Props) => {
  const { articleQuery } = useArticleQueryStore();
  const followingCompanies = useFollowingCompanyQueryStore();
  const symbols = companySymbol ? [companySymbol] : followingCompanies;

  const symbolsArray = Array.isArray(symbols) ? symbols : [];

  return useQuery({
    queryKey: ["articles", articleQuery, symbols],
    queryFn: () =>
      articlesService.getAll({
        params: {
          addDateFrom: articleQuery.addDateFrom, //date article can be from
          companySymbol: symbolsArray.join(","),
          sortBy: "relevance", //sort by relevance
          excludeLabel: "Non-news", //exclude non-news articles
          sourceGroup: "top100", //source group is top 100
          language: "en", //language must be english
          page: articleQuery.page,
        },
      }),
    staleTime: ms("10m"),
    //I cannot seem to get react query to fetch data in the foreground when it is stale, data is fetched in the background when stale through
  });
};
