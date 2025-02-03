import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { Company } from "../entities/Company";
import GoPerigonAPIClient from "../servicies/GoPerigonAPIClient";

export const useCompany = (symbol: string) => {

    const companiesService = new GoPerigonAPIClient<Company>("/companies/all?exchange=NASDAQ");
    
    return useQuery({
      queryKey: ["company", symbol],
      queryFn: () =>
      companiesService.getAll({
          params: {
            symbol: symbol, //comapany search string
          },
        }),
      staleTime: ms("10m"),
    });
  };
  