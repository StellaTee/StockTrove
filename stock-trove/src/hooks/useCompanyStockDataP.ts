
import PolygonAPIClient from "../servicies/PolygonAPIClient";
import { useQuery } from "@tanstack/react-query";
import { PolygonResponse } from "../entities/PolygonResponse";


//const PolygonService = new PolygonAPIClient<PolygonResponse>("");

export const useCompanyStockDataP = (ticker : string) => {
const PolygonService = new PolygonAPIClient<PolygonResponse>(`${ticker}/range/1/day/2024-02-01/2024-02-29`); //currently hardcoded the dates but will change later
  return useQuery({
    queryKey: ["polygon"],
    queryFn: () =>
    PolygonService.getAll({
      }),
  });
};