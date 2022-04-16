import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import { TripsProvider } from "./components/context/TripsContext";
import Header from "./components/Header/Header";
import StopInput from "./components/StopInput/StopInput";

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
        <div className="App">
          <Header />
          <StopInput />
        </div>
      </TripsProvider>
    </ThemeProvider>
  );
}

export default App;
