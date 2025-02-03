import { Text, Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import StockSummaryTable from "../components/StockSummaryTable";
import StockGraph from "../components/StockGraph";
import { useParams } from "react-router-dom";
import { useCompany } from "../hooks/useCompany";
import CompanyArticleGrid from "../components/CompanyArticleGrid";
import { getCompanySymbol } from "../util/util";

const CompanyDetail = () => {
  const { symbol } = useParams();
  //console.log(symbol);

  const { data, isLoading, error } = useCompany(symbol!);
  const company = data?.results?.[0];
  let companySymbol = "";
  companySymbol = getCompanySymbol(company);

  //console.log(company);

  if (!company) {
    return <Heading>Company not found</Heading>;
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

  return (
    <Box>
      <Heading>{company.name} Overview </Heading>

      <Flex>
        {/* Stock Summary Table */}
        <Box flex="1" mr={2}>
          <StockSummaryTable />
        </Box>

        {/* Stock Graph which gets passed the name and company symbol*/}
        <Box flex="1" ml={2}>
          <StockGraph
            companyName={company.name}
            companySymbol={companySymbol}
          />
        </Box>
      </Flex>

      {/* Article Grid - I dont know how to only fetch the news of the specific company that we clicked on*/}
      <CompanyArticleGrid companySymbol={companySymbol} />
    </Box>
  );
};

export default CompanyDetail;
