import ms from "ms";
import GoPerigonAPIClient from "../servicies/GoPerigonAPIClient";
import { useQuery } from "@tanstack/react-query";
import { Company } from "../entities/Company";
import useDiscoverCompanyQueryStore from "../stores/useDiscoverCompanyQueryStore";

const companiesService = new GoPerigonAPIClient<Company>("/companies/all?exchange=NASDAQ");

export const useDiscoverCompanies = () => {
  const { discoverCompanyQuery } = useDiscoverCompanyQueryStore();

  
  return useQuery({
    queryKey: ["following", discoverCompanyQuery],
    queryFn: () =>
    companiesService.getAll({
        params: {
          q: discoverCompanyQuery.q, //comapany search string
          numEmployeesFrom: 1000, //min number of employees, set to 1000 for now as any companies with less than 1000 people won't be stock traded
          size:5,
        },
      }),
    staleTime: ms("10m"),
    // enabled: ((discoverCompanyQuery.q || "").length > 0)
  });
};
