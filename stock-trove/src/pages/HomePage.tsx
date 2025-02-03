/* import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import ArticleGrid from "../components/ArticleGrid";
import MenuForHomePage from "../components/MenuForHomePage";

function App() {
  const text = useColorModeValue("black", "white");
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading>Latest news</Heading>
        <Box
          as="button"
          borderRadius="md"
          color={text}
          px={4}
          h={8}
          border="1px solid black"
        >
          <MenuForHomePage />
        </Box>
      </Box>
      <ArticleGrid companySymbol="" />
    </Box>
  );
}

export default App; */

import { Box, Heading, useColorModeValue, Image, Flex, Text, Spinner } from "@chakra-ui/react";
import FollowingArticleGrid from "../components/FollowingArticleGrid";
import MenuForHomePage from "../components/MenuForHomePage";
import { useParams } from "react-router-dom";
import { useCompany } from "../hooks/useCompany";

function App() {
  const text = useColorModeValue("black", "white");

  // Define a custom width for the news section and the graph section

  // const { symbol } = useParams();
  // console.log("Symbol" :symbol);

  // const { data, isLoading, error } = useCompany(symbol!);
  // const company = data?.results?.[0];
  // let companySymbol="";
  // if (company?.symbols) {
  //   for (let i = 0; i < company?.symbols.length; i++) {
  //     if (company?.symbols[i].exchangeShortName == "NASDAQ") {
  //       companySymbol = company?.symbols[i].symbol;
  //     }
  //   }
  // }
  
  // console.log(company);

  // if (!company) {
  //   return <Heading>Company not found</Heading>;
  // }

  // if (isLoading) {
  //   return (
  //     <>
  //       <Spinner paddingY={5} color="#C4B8EF" size={"xl"} />{" "}
  //       <Text color={"black"}>Loading...</Text>
  //     </>
  //   );
  // }

  // if (error || !data) {
  //   throw error;
  // }

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center">
        {/* News Section */}
        <Box width={"100%"}>
          {/* Heading and Button in a Flex container */}
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading>Latest News</Heading>
            <Box
              as="button"
              borderRadius="md"
              color={text}
              px={4}
              h={8}
              border="1px solid black"
            >
              <MenuForHomePage />
            </Box>
          </Flex>
          {/* Article Grid */}
          <FollowingArticleGrid /> 
        </Box>

      </Flex>
    </Box>
  );
}

export default App;
