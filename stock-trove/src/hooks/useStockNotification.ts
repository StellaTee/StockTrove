import PolygonAPIClient from "../servicies/PolygonAPIClient";
import { useQueries} from "@tanstack/react-query";
import { PolygonResponse } from "../entities/PolygonResponse";
import useFollowingCompanyQueryStore from "../stores/useFollowingCompanyQueryStore";
import ms from "ms";


//const PolygonService = new PolygonAPIClient<PolygonResponse>("");

export const useStockNotifications = () => {
    const {symbols} = useFollowingCompanyQueryStore();
    
    let queries = symbols.map((symbol, key) => { return {queryKey: ["polygon1", key] , queryFn: () => (new PolygonAPIClient<PolygonResponse>(`${symbol}/range/1/day/2024-03-06/2024-03-07`)).getAll(), staleTime : ms("10m")}});
    //filter out any queries that receive an error from polygon (i.e if the stock symbol is invalid)
    queries = queries.filter((query) => query !== undefined);
    return useQueries({
        queries,
      });
};