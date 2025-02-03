import { useQuery } from '@tanstack/react-query';
import GoPerigonAPIClient from '../servicies/GoPerigonAPIClient';
import { Company } from '../entities/Company';
import ms from 'ms';
import useRecommendedCompanyQueryStore from '../stores/useRecomendedCompanyQueryStore';

const companiesService = new GoPerigonAPIClient<Company>("/companies/all?exchange=NASDAQ");

const useRecomendedCompanies = () => {
    const {symbols} = useRecommendedCompanyQueryStore();

    return useQuery({
        queryKey: ["reccomended", symbols],
        queryFn: () =>
        companiesService.getAll({
            params: {
              symbol: symbols.join(","),
              size:5,
            },
          }),
        staleTime: ms("10m"),
        
      });


}


export default useRecomendedCompanies