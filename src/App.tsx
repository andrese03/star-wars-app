import React from "react";
import { Provider } from "react-redux";
import { CssBaseline, Box, ThemeProvider, createTheme } from "@mui/material";

import AppNavBar from "./components/layout/AppNavBar";
import AppRoutes from "./AppRoutes";

import "@fontsource/roboto";
import "./App.scss";
import AppContainer from "./components/layout/AppContainer";
import { store } from "./store";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffe720",
    },
    secondary: {
      main: "#ff0f00",
    },
    background: {
      default: "#000000",
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <AppNavBar />
          <AppContainer>
            <AppRoutes />
          </AppContainer>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
