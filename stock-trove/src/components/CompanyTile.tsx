import { Box, Flex, Image, Text, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Company } from "../entities/Company";
import FollowCompanyButton from "./FollowCompanyButton";
import { useCompanyArticles } from "../hooks/useCompanyArticles";
import { FetchResponse } from "../servicies/GoPerigonAPIClient";
import { Article } from "../entities/Article";
import { getCompanySymbol } from "../util/util";

interface Props {
  company: Company;
  index: number;
}

const isNotNeutral = (positive: number, neutral: number, negative: number) => {
  const max = Math.max(positive, neutral, negative);
  return max !== neutral;
};

const getPrediction = (data: FetchResponse<Article> | undefined) => {
  if (!data) return null;

  const sentiment = data.articles?.filter((article) =>
    isNotNeutral(
      article.sentiment.positive,
      article.sentiment.neutral,
      article.sentiment.negative,
    ),
  );

  const sentimentScores = sentiment?.map(
    (article) => article.sentiment.positive - article.sentiment.negative,
  );
  const sum = sentimentScores?.reduce((a, b) => a + b, 0) || 0;

  if (sum > 0) {
    return <Image src={"/src/assets/increase_arrow.png"} />;
  } else {
    return <Image src={"/src/assets/decrease_arrow.png"} />;
  }
};

const convertDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CompanyTile = ({ company, index }: Props) => {
  const symbol = getCompanySymbol(company);
  if (!symbol) return <></>;

  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));
  const from = "2024-03-01";
  const to = convertDate(new Date());
  const { data, isLoading, error } = useCompanyArticles(symbol, from, to);

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
      {company.name}

      <Flex
        key={index}
        p={3}
        bg="#EEE9FF"
        borderRadius="md"
        align="center"
        justify="space-between"
        boxShadow="sm"
        _hover={{
          bg: "#D6BCFA",
          cursor: "pointer",
        }}
      >
        <Link to={`/company/${symbol}`}>
          <Flex align="center">
            <Image
              src={company.logo}
              w={8}
              h={8}
              borderRadius="md"
              mr={3}
              objectFit="cover"
              fallbackSrc="path_to_some_default_image"
            />
            <Text color="black" fontWeight="semibold">
              {company.name}
            </Text>
            <Text ml={5} color="black">
              {company.symbols.length > 0 ? symbol : ""}
            </Text>
            <Text ml={5} color="black">
              {company.description.split(".").slice(0, 2).join(".")}
            </Text>
          </Flex>
        </Link>
        <Flex align="center">
          <FollowCompanyButton company={company} />
          <Box ml={2} width="30px">
            {" "}
            {/* Adjust the width as needed */}
            {getPrediction(data)}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CompanyTile;
