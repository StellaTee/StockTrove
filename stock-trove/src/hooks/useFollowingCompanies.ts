import ms from "ms";
import GoPerigonAPIClient from "../servicies/GoPerigonAPIClient";
import { useQuery } from "@tanstack/react-query";
import { Company } from "../entities/Company";
import useFollowingCompanyQueryStore from "../stores/useFollowingCompanyQueryStore";

const companiesService = new GoPerigonAPIClient<Company>("/companies/all?exchange=NASDAQ");

export const useFollowingCompanies = () => {
  const { symbols } = useFollowingCompanyQueryStore();
  console.log(symbols)
  
  return useQuery({
    queryKey: ["following", symbols],
    queryFn: () =>
    companiesService.getAll({
        params: {
          symbol: symbols.join(","),
        },
      }),
    staleTime: ms("10m"),
  });
};
