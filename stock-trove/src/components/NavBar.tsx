import { SetStateAction, useEffect, useState } from "react";
import { Text, VStack, HStack, Image, Box, Flex } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import useDiscoverCompanyQueryStore from "../stores/useDiscoverCompanyQueryStore";
import useArticleQueryStore from "../stores/useArticleQueryStore";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState(""); // State to manage active link
  const location = useLocation();
  const setSearchText = useDiscoverCompanyQueryStore((s) => s.setSearchText);
  const { resetPageCount } = useArticleQueryStore();

  // Function to handle click on a link and set active link
  const handleLinkClick = (link: SetStateAction<string>) => {
    setActiveLink(link);
    resetPageCount();
    setSearchText(""); // Clear search text when a link is clicked
  };

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname == "/") {
      handleLinkClick("home");
    } else {
      handleLinkClick(location.pathname.substring(1));
    }
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      bg="#C4B8EF"
      color="black"
      p={4}
      h="100vh"
      w={"19vh"}
      justifyContent={"space-between"}
      rounded={5}
    >
      <Box rounded={5}>
        <Link to="/" onClick={() => handleLinkClick("home")}>
          <Image src={logo} />
        </Link>
      </Box>

      <VStack spacing="10px" alignItems="flex-start">
        <HStack>
          <Link to="/user" onClick={() => handleLinkClick("user")}>
            <HStack>
              <Image src={"/src/assets/user_icon.png"} />
              <Text
                fontWeight="bold"
                fontSize="20px"
                fontFamily="DM Sans"
                color={activeLink === "user" ? "blue" : "black"} // Apply color based on active link
              >
                User
              </Text>
            </HStack>
          </Link>
        </HStack>
        <HStack>
          <Link to="/" onClick={() => handleLinkClick("home")}>
            <HStack>
              <Image src={"/src/assets/home_icon.png"} />
              <Text
                fontWeight="bold"
                fontSize="20px"
                fontFamily="DM Sans"
                color={activeLink === "home" ? "blue" : "black"} // Apply color based on active link
              >
                Home
              </Text>
            </HStack>
          </Link>
        </HStack>
        <HStack>
          <Link to="/following" onClick={() => handleLinkClick("following")}>
            <HStack>
              <Image src={"/src/assets/following_icon.png"} />
              <Text
                fontWeight="bold"
                fontSize="20px"
                fontFamily="DM Sans"
                color={activeLink === "following" ? "blue" : "black"} // Apply color based on active link
              >
                Following
              </Text>
            </HStack>
          </Link>
        </HStack>
        <HStack>
          <Link
            to="/discover"
            onClick={() => {
              handleLinkClick("discover");
            }}
          >
            <HStack>
              <Image src={"/src/assets/discover_icon.png"} />
              <Text
                fontWeight="bold"
                fontSize="20px"
                fontFamily="DM Sans"
                color={activeLink === "discover" ? "blue" : "black"} // Apply color based on active link
              >
                Discover
              </Text>
            </HStack>
          </Link>
        </HStack>
      </VStack>

      <Box />
    </Flex>
  );
};

export default NavBar;
