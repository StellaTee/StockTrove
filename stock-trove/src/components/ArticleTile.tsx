import { Text, Image, VStack, Flex, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Article } from "../entities/Article";
import { Link } from "react-router-dom";
import { CiFaceSmile, CiFaceMeh, CiFaceFrown } from "react-icons/ci";

interface Props {
  article: Article;
}

const getSentimentLabel = (
  positive: number,
  neutral: number,
  negative: number,
): any => {
  const max = Math.max(positive, neutral, negative);

  if (max === positive) {
    return (
      <Flex direction="column" alignItems="center">
        <CiFaceSmile size={50} />
        <Text>Positive</Text>
      </Flex>
    );
  } else if (max === negative) {
    return (
      <Flex direction="column" alignItems="center">
        <CiFaceFrown size={50} />
        <Text>Negative</Text>
      </Flex>
    );
  } else {
    return (
      <Flex direction="column" alignItems="center">
        <CiFaceMeh size={50} />
        <Text>Neutral</Text>
      </Flex>
    );
  }
};
const handleImageError = () => {
  console.log("Image Error");
  return null; // or return <></> if you prefer using fragments
};

const ArticleTile = ({ article }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let sentimentLabel;


  if (article.sentiment==undefined){(sentimentLabel=null);}
  if (article.sentiment) {
    sentimentLabel = getSentimentLabel(
      article.sentiment.positive,
      article.sentiment.neutral,
      article.sentiment.negative,
    );
  } else {
    sentimentLabel = (
      <Flex direction="column" alignItems="center">
        <CiFaceFrown size={50} />
        <Text>Negative</Text>
      </Flex>
    );
  }

  return (
    <>
      <Flex
        direction="row"
        align="center"
        justifyContent="space-between"
        width="100%"
        onClick={onOpen}
        //border for testing only
        // borderWidth={1}
        // borderColor="black"
        // borderRadius={20}

        padding={3} // Padding around the container
      >
        <Image
          src={article.imageUrl}
          style={{ maxWidth: 200, maxHeight: 400 }}
          onError={handleImageError}
        />
        <VStack padding={3}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {article.title}
          </Text>
          <Text style={{ fontSize: 13 }}>{article.description}</Text>
          <Link style={{ fontSize: 10 }} to={article.url}>
            {article.url}
          </Link>
        </VStack>
        {sentimentLabel}
      </Flex>
      {/* Modal for article summary */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay style={{ backdropFilter: "blur(2px)" }} />
        <ModalContent bg="white" color="black">
          <ModalHeader textAlign="center" color="purple">
            Article Summary
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{article.summary}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  ); //you can't include sentiment in the Modal as some articles do not have it defined
};

export default ArticleTile;
