/* import { Button } from "@chakra-ui/react";
import useAuthUser from "../stores/useAuthUser";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const { logoutUser } = useAuthUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    localStorage.clear();
    navigate("/login");
  };

  return <Button onClick={handleLogout}>logout</Button>;
};

export default UserPage;
 */

import useAuthUser from "../stores/useAuthUser";
import { useNavigate } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Flex,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  extendTheme,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { DeleteActButton } from "../components/DeleteActButton";
import useFollowingCompanyQueryStore from "../stores/useFollowingCompanyQueryStore";
import useNotificationStore from "../stores/useNotificationStore";
import { useState } from "react";
import {
  updateEmail,
  updateNotificationTypes,
  updateUserInformation,
} from "../servicies/DatabaseAPIClient";

const theme = extendTheme({
  // Custom theme settings would go here
});

const UserProfile = () => {
  const bg = useColorModeValue("white", "white");
  const color = useColorModeValue("black", "black");
  const { authUser, logoutUser, setUser } = useAuthUser();
  const navigate = useNavigate();
  const { clear } = useFollowingCompanyQueryStore();
  const { notification, toggleBreakingNews, toggleStockPriceChange } =
    useNotificationStore();

  const [email, setEmail] = useState(authUser.email); // State variable for email
  const [password, setPassword] = useState(""); // State variable for password

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogout = () => {
    logoutUser();
    clear();
    localStorage.clear();
    navigate("/login");
  };

  const handleUpdateDetails = async () => {
    try {
      if (password == "") {
        const response = await updateEmail({
          email: authUser.email,
          newemail: email,
        });
        alert("Email Changed Successfully");
      } else {
        const response = await updateUserInformation({
          email: authUser.email,
          newemail: email,
          password: password,
        });

        setPassword("");
        alert("Changed Details Successfully");
      }

      localStorage.setItem("user", JSON.stringify({ email: email }));
      setUser(email);
    } catch (error: any) {
      setEmail(authUser.email);
      setPassword("");
      alert("Email already in use");
      console.log(error);
    }
  };

  const handleToggleStock = async () => {
    try {
      const response = await updateNotificationTypes({
        email: authUser.email,
        type1: Number(!notification.stockPriceChange),
        type2: Number(notification.breakingNews),
      });
      toggleStockPriceChange();
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleToggleBreaking = async () => {
    try {
      const response = await updateNotificationTypes({
        email: authUser.email,
        type1: Number(notification.stockPriceChange),
        type2: Number(!notification.breakingNews),
      });
      toggleBreakingNews();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex height="100vh">
        {/* Main Content */}
        <Box width="100%" bg={bg} color={color} margin={5} rounded={5}>
          {/* Profile Section */}
          <Box p={5}>
            <Flex justifyContent={'space-between'}>
            <Heading mb={6}>Account Setting</Heading>
            <Button
                bg="transparent"
                color="red"
                variant="solid"
                onClick={handleLogout}
                width="75px"
              >
                Log Out
              </Button>
            </Flex>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={handleEmailChange}
                  sx={{
                    "::placeholder": {
                      color: "black", // Set the placeholder text color to black
                      opacity: 1, // Make sure it's fully opaque
                    },
                  }}
                  borderColor={"black"}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Please enter your password..."
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  sx={{
                    "::placeholder": {
                      color: "black", // Set the placeholder text color to black
                      opacity: 1, // Make sure it's fully opaque
                    },
                  }}
                  borderColor={"black"}
                />
              </FormControl>
             
              <Flex mt={10}>
              
              <Button
                bg="#1444e2"
                color="white"
                mr={3}
                onClick={() => handleUpdateDetails()}
              >
                Update Details
              </Button>
              <Box bg="transparent" color="red">
                <DeleteActButton />
              </Box>
            </Flex>
            </VStack>

            {/* Notification Section */}
            <Box mt={10}>
              <Heading mb={6}>Notification preferences</Heading>
              <VStack spacing={4} align="stretch">
                {/* <FormControl display="flex" alignItems="center">
                  <FormLabel mb={0}>Notifications from us</FormLabel>
                  <Switch />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb={0}>System & services update</FormLabel>
                  <Switch />
                </FormControl> */}
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb={0}>Major stock price changes</FormLabel>
                  <Switch
                    defaultChecked={notification.stockPriceChange}
                    onChange={() => handleToggleStock()}
                  />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb={0}>Breaking news</FormLabel>
                  <Switch
                    defaultChecked={notification.breakingNews}
                    onChange={() => handleToggleBreaking()}
                  />
                </FormControl>
              </VStack>
            </Box>
            
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default UserProfile;
