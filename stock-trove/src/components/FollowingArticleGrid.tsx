import {
  Text,
  List,
  ListItem,
  Spinner,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useFollowingArticles } from "../hooks/useFollowingArticles";
import ArticleTile from "./ArticleTile";
import { BsArrow90DegLeft, BsArrow90DegRight } from "react-icons/bs";
import useArticleQueryStore from "../stores/useArticleQueryStore";

const FollowingArticleGrid = () => {
  const { data, isLoading, error } = useFollowingArticles(); // Set a default value of an empty string if companySymbol is undefined
  const { articleQuery, setNextPage, setPrevPage } = useArticleQueryStore();
  console.log(articleQuery.page);
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

  // Set the maxHeight for the List to be the viewport height minus any other UI elements
  // that take up space, such as headers, footers, paddings, etc.
  // For example, if you have a header that's 60px tall:
  const headerHeight = 60; // Adjust this value as per your layout

  return (
    <VStack width={"1100ph"} height={"100vh"}>
      <List
        width={"100%"}
        maxHeight={`calc(100vh - ${headerHeight}px)`} // Adjust this calculation as needed
        overflowY={"auto"}
        color="black"
      >
        {data?.articles?.map((article) => (
          <ListItem key={article.url} paddingY={2}>
            <ArticleTile article={article} />
          </ListItem>
        ))}
      </List>
      <HStack>
        <BsArrow90DegLeft
          onClick={setPrevPage}
          style={{ cursor: "pointer" }}
          size={25}
        />
        <BsArrow90DegRight
          onClick={setNextPage}
          style={{ cursor: "pointer" }}
          size={25}
        />
      </HStack>
    </VStack>
  );
};

export default FollowingArticleGrid;
