import ms from "ms";
import GoPerigonAPIClient from "../servicies/GoPerigonAPIClient";
import { Article } from "../entities/Article";
import { useQuery } from "@tanstack/react-query";
import useArticleQueryStore from "../stores/useArticleQueryStore";
import useFollowingCompanyQueryStore from "../stores/useFollowingCompanyQueryStore";
import useNotificationStore from "../stores/useNotificationStore";


const articlesService = new GoPerigonAPIClient<Article>("/all");

export const useFollowingArticlesSearch = () => {
  const { articleQuery } = useArticleQueryStore();
  const {symbols} = useFollowingCompanyQueryStore();
  const {notification} = useNotificationStore();

  const today = new Date();
  const fromDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7,
  ); 
  
  const formattedDate = `${fromDate.getFullYear()}-${(fromDate.getMonth() + 1).toString().padStart(2, "0")}-${fromDate.getDate().toString().padStart(2, "0")}` 

  return useQuery({
    queryKey: ["articles", articleQuery, symbols],
    queryFn: () =>
      articlesService.getAll({
        params: {
          addDateFrom: formattedDate, //date article can be from
          companySymbol: symbols.join(","),
          sortBy: "relevance", //sort by relevance
          excludeLabel: "Non-news", //exclude non-news articles
          sourceGroup: "top100", //source group is top 100
          language: "en", //language must be english
          size:"100", //100 articles 
          showReprints:"false",
        },
  
      }),
      
    staleTime: ms("10m"),
    enabled: notification.breakingNews
  });
};
