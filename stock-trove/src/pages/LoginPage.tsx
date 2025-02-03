import {
  ChakraProvider,
  Box,
  VStack,
  Input,
  Button,
  Text,
  Flex,
  Link,
  FormControl,
  FormLabel,
  Image,
  extendTheme,
} from "@chakra-ui/react";

import logo from "../assets/logo.png";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../stores/useAuthUser";
import { authenticateUser } from "../servicies/DatabaseAPIClient";

// Extend the default theme with custom colors and styles
const theme = extendTheme({
  colors: {
    brand: {
      text: "#170F49", // Dark purple text color
      inputBg: "#EDF2F7", // Light grey for input background
      button: "#1543E2", // Blue color for the button
      placeholder: "#4A5568", // Darker grey for placeholder text
      inputBorder: "#CBD5E0", // Grey border for input
    },
    gradients: {
      whiteToLightViolet: "linear(to-br, #FFFFFF, #E9D8FD)", // More white to violet gradient
    },
  },

  components: {
    Input: {
      defaultProps: {
        focusBorderColor: "brand.button",
      },
      baseStyle: {
        field: {
          backgroundColor: "brand.inputBg",
          borderColor: "brand.inputBorder", // Set the border color
          borderWidth: 1, // Set border width
          borderRadius: "base", // Default Chakra UI border radius
          _placeholder: {
            color: "brand.placeholder",
          },
        },
      },
    },
    Button: {
      baseStyle: {
        borderRadius: "30px", // Making the button more elliptical
        _focus: { boxShadow: "none" },
      },
    },
  },
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignIn = (data: { email: string; password: string }) => {
    handleLogin(data.email, data.password);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authenticateUser({ email, password });

      localStorage.setItem("user", JSON.stringify({ email: email }));
      setUser(email);
      navigate("/");
    } catch (error: any) {
      alert(error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      {/* Top Bar with Logo */}
      <Flex
        position="absolute"
        top="0"
        left="0"
        right="0"
        align="center"
        p={7}
        bg="transparent"
      >
        <Image src={logo} alt="Stock Trove Logo" boxSize="100px" ml={7} />
      </Flex>

      <Flex
        minHeight="100vh"
        align="center"
        justify="center"
        bgGradient={theme.colors.gradients.whiteToLightViolet}
      >
        <Box position="absolute" top={10} width="full" textAlign="center">
          <Text fontSize="3xl" color="brand.text" fontWeight="bold">
            Welcome to STOCK TROVE
          </Text>
        </Box>

        <Box
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="xl"
          maxWidth="400px"
          width="full"
        >
          <form
            onSubmit={handleSubmit(handleSignIn as SubmitHandler<FieldValues>)}
          >
            <VStack spacing={6}>
              <FormControl textAlign="left">
                <FormLabel color="brand.text" fontSize="lg" fontWeight="bold">
                  Welcome back!
                </FormLabel>
                <FormLabel fontSize="sm" color="brand.text" mt={4}>
                  E-mail or phone number
                </FormLabel>
                <Input
                  {...register("email")}
                  placeholder="Type your e-mail or phone number"
                />
                {errors.email?.type === "required" && (
                  <span>Email is required</span>
                )}
                <FormLabel fontSize="sm" color="brand.text" mt={4}>
                  Password
                </FormLabel>
                <Input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Type your password"
                />
                {errors.password?.type === "required" && (
                  <span>Password is required</span>
                )}
              </FormControl>

              <Link
                href="#"
                color="brand.button"
                fontSize="sm"
                alignSelf="flex-end"
              >
                Forgot Password?
              </Link>

              <Button
                width="full"
                bg="brand.button"
                color="white"
                _hover={{ bg: "blue.800" }}
                borderRadius="30px"
                type="submit"
              >
                Sign In
              </Button>

              <Text fontSize="sm" color="brand.text">
                Don't have an account?{" "}
                <Link
                  color="brand.button"
                  fontWeight="semibold"
                  href="/register"
                >
                  Sign Up
                </Link>
              </Text>
            </VStack>
          </form>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default LoginPage;
function setUser(email: string) {
  throw new Error("Function not implemented.");
}
