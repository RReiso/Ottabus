import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import "./App.css";
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
      <div className="App">
        <Header />
        <StopInput />
      </div>
    </ThemeProvider>
  );
}

export default App;
