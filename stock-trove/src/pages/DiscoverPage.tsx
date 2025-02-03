import { Spinner, Text } from "@chakra-ui/react";
import { useDiscoverCompanies } from "../hooks/useDiscoverCompanies";
import CompanyGrid from "../components/CompanyGrid";
import useRecomendedCompanies from "../hooks/useRecomendedCompanies";
import useDiscoverCompanyQueryStore from "../stores/useDiscoverCompanyQueryStore";

const DiscoverPage = () => {
  const { discoverCompanyQuery } = useDiscoverCompanyQueryStore();
  const { data, isLoading, error } = useDiscoverCompanies();
  const {
    data: data2,
    isLoading: isLoading2,
    error: error2,
  } = useRecomendedCompanies();

  if (discoverCompanyQuery.q || "".length > 0) {
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

    return <CompanyGrid data={data} title={"Discover"} />;
  } else {
    if (isLoading2) {
      return (
        <>
          <Spinner paddingY={5} color="#C4B8EF" size={"xl"} />{" "}
          <Text color={"black"}>Loading...</Text>
        </>
      );
    }

    if (error2 || !data2) {
      throw error2;
    }

    return <CompanyGrid data={data2} title={"Recommended"} />;
  }
};

export default DiscoverPage;
