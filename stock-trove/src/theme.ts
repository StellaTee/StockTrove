import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    transparent: "transparent",
    black: "#000",
    white: {
      50: "#ffffff",
      100: "#f5f5f5",
      200: "#e0e0e0",
      300: "#bdbdbd",
      400: "#9e9e9e",
      500: "#757575",
      600: "#616161",
      700: "#424242",
      800: "#212121",
      900: "#1a1a1a",
    },

    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "#111",
    },
  },
});

export default theme;
