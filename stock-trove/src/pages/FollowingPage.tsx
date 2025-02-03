import { useFollowingCompanies } from "../hooks/useFollowingCompanies";
import CompanyGrid from "../components/CompanyGrid";
import { Spinner, Text } from "@chakra-ui/react";
import useFollowingCompanyQueryStore from "../stores/useFollowingCompanyQueryStore";
//import { ErrorBoundary } from 'react-error-boundary';

const FollowingPage = () => {
  const { data, isLoading, error } = useFollowingCompanies();
  const { symbols } = useFollowingCompanyQueryStore();
 
    

  const emptyData = { results: [], status: 200, numResults: 0, articles: null };

  if (symbols.length == 0) {
    return <CompanyGrid data={emptyData} title={"Following"} />;
  }

  if (isLoading) {
    return (
      <>
        <Spinner paddingY={5} color="#C4B8EF" size={"xl"} />{" "}
        <Text color={"black"}>Loading...</Text>
      </>
    );
  }

  if (error || !data) {
    throw error;
  }

  return <CompanyGrid data={data} title={"Following"} />;
};

export default FollowingPage;
