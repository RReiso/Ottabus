import React from "react";
import { createTheme, Stack, ThemeProvider } from "@mui/material";
import "./App.css";
import { TripsProvider } from "./components/context/TripsContext";
import Header from "./components/Header/Header";
import StopInput from "./components/StopInput/StopInput";
import Trips from "./components/Trips/Trips";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 24,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TripsProvider>
        <Stack>
          <Header />
          <StopInput />
          <Trips />
        </Stack>
      </TripsProvider>
    </ThemeProvider>
  );
}

export default App;
