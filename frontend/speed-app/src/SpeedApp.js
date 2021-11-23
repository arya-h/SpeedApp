import React from "react";
import { Provider } from "react-redux";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store/store";
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import Box from "@chakra-ui/gatsby-plugin"

// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a165d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

export const SpeedApp = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme} resetCSS={false}>
      
        <AppRouter />
       
      </ChakraProvider>
    </Provider>
  );
};
