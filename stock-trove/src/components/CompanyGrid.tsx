import {
  Text,
  ChakraProvider,
  theme,
  Flex,
  Stack,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

interface Props {
  data: FetchResponse<Company>;
  title: string;
}

import CompanyTile from "./CompanyTile";
import { FetchResponse } from "../servicies/GoPerigonAPIClient";
import { Company } from "../entities/Company";

const CompanyGrid = ({ data, title }: Props) => {
  const bg = useColorModeValue("white", "white");
  const navbarBg = useColorModeValue("white", "white");
  return (
    <ChakraProvider theme={theme}>
      <Flex h="100vh">
        {/* Main Content */}
        <Box width="100%" bg={bg} p={5}>
          {/* Following Section */}
          <Box bg={navbarBg} borderRadius="md" p={5}>
            <Box
              bg="#D6DCFF"
              color="#054678"
              fontSize="xx-large"
              fontWeight="bold"
              mb={4}
            >
              {title}
            </Box>

            {/* Headers */}
            <Flex justifyContent="space-between" mb={3}>
              <Text fontSize="lg" fontWeight="bold" color="black">
                Company
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="black" mr={8}>
                Prediction
              </Text>
            </Flex>

            {/* Company List */}
            <Stack spacing={3} maxH="calc(100vh - 200px)" overflowY="auto">
              {data?.results?.map((company, index) => (
                <CompanyTile company={company} index={index} />
              ))}
            </Stack>
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default CompanyGrid;
