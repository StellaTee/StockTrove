import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import { NotificationButton } from "../components/NotificationButton";
import { useEffect } from "react";
import useAuthUser from "../stores/useAuthUser";
import {
  getNotificationTypes,
  getUserFollows,
  getUserRecommendations,
  updateNotificationTypes,
} from "../servicies/DatabaseAPIClient";
import useFollowingCompanyQueryStore from "../stores/useFollowingCompanyQueryStore";
import useNotificationStore from "../stores/useNotificationStore";
import useRecommendedCompanyQueryStore from "../stores/useRecomendedCompanyQueryStore";

const Layout = () => {
  const { authUser, setUser } = useAuthUser();
  const navigate = useNavigate();
  const email = authUser.email;
  const { toggleBreakingNews, toggleStockPriceChange } = useNotificationStore();

  const { addSymbolList } = useFollowingCompanyQueryStore();
  const { addSymbolList: addRecommended } = useRecommendedCompanyQueryStore(); //

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser["email"]);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    console.log(authUser.email);
    handleGetFollowingCompnaies(email);
    handleLoadNotification();
    handleGetRecommendedCompanies(email);
  }, [authUser]);

  const handleLoadNotification = async () => {
    try {
      const response = await getNotificationTypes(authUser.email);
      const stockNoti = response[0];
      const breakingNoti = response[1];
      if (stockNoti == 1) {
        toggleStockPriceChange();
      }
      if (breakingNoti == 1) {
        toggleBreakingNews();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetFollowingCompnaies = async (email: string) => {
    try {
      const response = await getUserFollows({ email });
      const symbolList = response.map((res: any) => res.symbol);
      addSymbolList(symbolList);
    } catch (error: any) {
      console.log(error);
    }
  };

  function handleGetRecommendedCompanies(email: string) {
    getUserRecommendations(email)
      .then((data) => {
        const symbols = data.map(
          (dat: { symbol: string; companyname: string }) => dat.symbol,
        );
        addRecommended(symbols);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  return (
    <Flex h="100vh">
      {" "}
      {/* Remove w="100vh" from here */}
      <NavBar />
      <Flex flex="1" bg="white" direction="column" padding={5} overflowY="auto">
        {" "}
        {/* Add flex="1" to make content area take remaining space, and add overflowY="auto" to enable vertical scrolling */}
        <Flex direction="row" justifyContent="space-between" marginBottom={3}>
          <Box marginRight={3}>
            <SearchBar />
          </Box>
          <Box>
            <NotificationButton />
          </Box>
        </Flex>
        <Box flex="1">
          {" "}
          {/* Add flex="1" to make the content area take remaining space */}
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
