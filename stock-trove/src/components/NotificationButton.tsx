import { useEffect, useState } from "react"; // For managing state
import { IoMdNotificationsOutline } from "react-icons/io"; // For icon
import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  StackDivider,
  Box,
  Link,
  HStack,
} from "@chakra-ui/react"; // Import missing components
import { useFollowingArticlesSearch } from "../hooks/useFollowingArticlesSearch";
import { AppNotification } from "../entities/AppNotification";
import { BsX } from "react-icons/bs";
import { useStockNotifications } from "../hooks/useStockNotification";
import { alarmingKeywords } from "../util/alarmingKeywords";
import useNotificationStore from "../stores/useNotificationStore";
import useFollowingCompanyQueryStore from "../stores/useFollowingCompanyQueryStore";

export const NotificationButton = () => {
  const stockData = useStockNotifications().map(({ data }) => data);

  //declare an array of key value pairs where the key is a string and the value is an array of 2 numbers
  //the key is the ticker and the value is the two opening prices

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useFollowingArticlesSearch();
  const { notification } = useNotificationStore();
  const { symbols } = useFollowingCompanyQueryStore();

  const [notifications, setNotifications] = useState(
    [] as Array<AppNotification>,
  );

  const checkStockPrice = () => {
    const stockDataMap = new Map<string | undefined, number[] | undefined>();
    //iterate through the stock data and add the ticker and the opening price to the map
    stockData.map((data) => {
      if (data?.results) {
        stockDataMap.set(
          data.ticker,
          data.results.map((result) => result["o"]),
        );
      }
    });
    //iterate through the stockDataMap and check if the current price is greater than the opening price
    stockDataMap.forEach((value, key) => {
      if (value && value[0] && value[1]) {
        if (value[1] < value[0] * 0.99) {
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            {
              title: "Stock Price Alert, " + key + " has increased by 5%",
              url: `/company/${key}`,
            },
          ]);
        }
        if (value[1] > value[0] * 1.01) {
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            {
              title: "Stock Price Alert, " + key + " has increased by 5%",
              url: `/company/${key}`,
            },
          ]);
        }
      }
    });
  };

  const findBreakingNews = () => {
    const filteredArticles = data?.articles
      ?.map((article) => {
        const matchingKeywords = article.keywords.filter((keyword) =>
          checkWords(keyword.name, alarmingKeywords),
        );

        // Only return the article if matchingKeywords is non-empty
        if (matchingKeywords.length > 0) {
          return article;
        }

        // Return null for articles with no matchingKeywords
        return null;
      })
      .filter((article) => article !== null);

    console.log(filteredArticles);

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      ...(filteredArticles?.map((article) => {
        return { title: `Urgent News: ${article!.title}`, url: article!.url };
      }) || []),
    ]);
  };

  const checkWords = (inputString: string, wordList: string[]) => {
    // Step 1: Split the input string into an array of words
    const words = inputString.split(" ");

    // Step 2: Convert each word to lowercase
    const lowercasedWords = words.map((word) => word.toLowerCase());

    // Step 3: Check if any of the lowercase words are in the provided wordList
    const matchingWords = lowercasedWords.filter((word) =>
      wordList.includes(word),
    );

    return matchingWords.length > 0;
  };

  useEffect(() => {
    setNotifications((prev) => []);

    if (notification.breakingNews) {
      findBreakingNews();
    }
    if (notification.stockPriceChange) {
      checkStockPrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, notification, symbols]);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        // Add these props for rounded button
        borderRadius="10"
        bg="gray.200"
        _hover={{ bg: "gray.300" }}
      >
        <IoMdNotificationsOutline size={24} />
        {/* Add text label if desired */}
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent bg="white" color="black">
          <ModalHeader>Notifications</ModalHeader>
          <ModalBody>
            {
              /* Display the notification content here */
              // make it as another componenet?
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={3}
                align="stretch"
              >
                {notifications.slice(0, 3).map((noti) => (
                  <Box>
                    <HStack>
                      <Link href={noti.url}>{noti.title} </Link>{" "}
                      <BsX
                        size={25}
                        color="red"
                        onClick={() =>
                          setNotifications(
                            notifications.filter(
                              (notification) => notification !== noti,
                            ),
                          )
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </HStack>
                  </Box>
                ))}
              </VStack>
            }
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};
