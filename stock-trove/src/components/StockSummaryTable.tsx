import { Table, Tbody, Tr, Td, TableCaption, Box, Heading } from "@chakra-ui/react";

const StockInfoTable = () => {
  return (
    <Box >
      <Table variant="simple" size="sm">
      {/* <Heading as="h2" size="md">
            Stock summary
      </Heading> */}
      <TableCaption placement="top" fontWeight="bold" color="black" fontSize="lg">Stock Summary</TableCaption>
        <Tbody>
            {/* Make adjustments based on the information we can get from the API  */}
          <Tr>
            <Td>Previous Close</Td>
            <Td>142.71</Td>
          </Tr>
          <Tr>
            <Td>Market Cap</Td>
            <Td>1.777T</Td>
          </Tr>
          <Tr>
            <Td>Open</Td>
            <Td>140.89</Td>
          </Tr>
          <Tr>
            <Td>Beta (5Y Monthly)</Td>
            <Td>1.05</Td>
          </Tr>
          <Tr>
            <Td>Bid</Td>
            <Td>143.50 × 900</Td>
          </Tr>
          <Tr>
            <Td>PE Ratio (TTM)</Td>
            <Td>24.75</Td>
          </Tr>
          <Tr>
            <Td>Ask</Td>
            <Td>143.72 × 800</Td>
          </Tr>
          <Tr>
            <Td>EPS (TTM)</Td>
            <Td>5.80</Td>
          </Tr>
          <Tr>
            <Td>Day's Range</Td>
            <Td>138.17 - 143.88</Td>
          </Tr>
          <Tr>
            <Td>Earnings Date</Td>
            <Td>Apr 23, 2024</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default StockInfoTable;
