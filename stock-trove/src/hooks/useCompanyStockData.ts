import ms from "ms";
import AlphaVantageAPIClient from "../servicies/AlphaVantageAPIClient";
import { useQuery } from "@tanstack/react-query";
import { AlphaVantageResponse } from "../entities/AlphaVantageResponse";


const AlphaService = new AlphaVantageAPIClient<AlphaVantageResponse>("query?function=TIME_SERIES_WEEKLY");

export const useCompanyStockData = (ticker : string) => {

    
  return useQuery({
    queryKey: ["alphavantage"],
    queryFn: () =>
    AlphaService.getAll({
        params: {
          symbol: ticker, 
        },
      }),
    staleTime: ms("10m"),
  });
};