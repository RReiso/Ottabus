import React from "react";
import { createTheme, Stack, ThemeProvider } from "@mui/material";
import "./App.css";
import { TripsProvider } from "./components/context/TripsContext";
import Header from "./components/Header/Header";
import StopInput from "./components/StopInput/StopInput";
import Trips from "./components/Trips/Trips";
import Footer from "./components/Footer/Footer";
import BusMap from "./components/Map/BusMap";
import "./index.css";
import SocialLinks from "./components/SocialLinks/SocialLinks";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 42,
      letterSpacing: 2,
      fontWeight: "bold",
      color: "#1976d2",
    },
    caption: {
      fontSize: 12,
      lineHeight: 1,
      color: "#6b6575",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TripsProvider>
        <Stack mb={10}>
          <Header />
          <StopInput />
          <Trips />
          <BusMap />
          <SocialLinks />
        </Stack>
        <Footer />
      </TripsProvider>
    </ThemeProvider>
  );
}

export default App;
