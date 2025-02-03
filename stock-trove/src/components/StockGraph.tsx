import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useCompanyStockDataP } from "../hooks/useCompanyStockDataP";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
const StockGraph = ({
  companyName,
  companySymbol,
}: {
  companyName: string;
  companySymbol: string;
}) => {
  const { data, isLoading, error } = useCompanyStockDataP(companySymbol); //get stock data for the company
  if (isLoading || error) {
    return (
      <>
        <Spinner paddingY={5} color="#C4B8EF" size={"xl"} />{" "}
        <Text color={"black"}>Loading...</Text>
      </>
    );
  }
  //array of stock data, key is the unix timestamp, value is the opening price of the stock at that time
  if (data?.results == undefined) {
    return (
      <Flex justify="center" align="center" h="100%">
        <Box p={4} bg="red.200" color="black" borderRadius="md" width = {"100%"}>
          <Text textAlign="center" fontWeight="bold">
            Stock graph of {companyName} isn't available
          </Text>
        </Box>
      </Flex>
    );
  }
  else {
    const stockData = data.results.map((day) => {
      return { key: day["t"], value: day["o"] };
    });
  
    // const dates = stockData?.map((entry) => new Date(entry.key * 1000)); // Convert Unix timestamp to JavaScript Date
    const dates = stockData?.map((entry) => {
      const date = new Date(entry.key);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    });
    
    const prices = stockData?.map((entry) => entry.value); //array of prices for the stock
    //console.log(prices);
    //console.log(dates);
  
    const chartData = {
      labels: dates,
      datasets: [
        {
          label: "Stock Price",
          data: prices,
          fill: false,
          backgroundColor: 'white',
          borderColor: 'blue',
          pointStyle: "circle",
          pointRadius: 5,
        },
      ],
    };
  
    const chartOptions = {
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Price',
            color: 'black',
            font: {
              size: 16,
              weight: 700,
            }
          }
        },
        x: {
          display: true,
          title: {
            display: true,
            text: 'Date',
            color: 'black',
            font: {
              size: 16,
              weight: 700,
            }
          },
        }

      },
      responsive: true, // Make the chart responsive
    };
    
  
    return (
      <Box overflow="hidden">
        <Box p="6">
          <Box alignItems="center" justifyContent="center">
            {" "}
            {/* Center align vertically and horizontally */}
            <Heading as="h2" size="md">
              Stock Price Graph for {companyName}
            </Heading>
          </Box>
          <Box mt="4" lineHeight="tight" width="120%" height="500%">
            <Line data={chartData} options={chartOptions} />
          </Box>
        </Box>
      </Box>
    );
  } 
};

export default StockGraph;
