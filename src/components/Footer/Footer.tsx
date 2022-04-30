import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import OttawaImg from "../../images/background.png";
import axios from "axios";

const Footer = (): JSX.Element => {
  interface Provider {
    [key: string]: any;
  }
  const [weather, setWeather] = useState<Provider>();
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Ottawa,ca&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        );
        setWeather(res.data);
        setError("");
      } catch (error) {
        setError("Weather data currently not available");
      }
    }
    fetchData();
  }, []);

  return (
    <footer>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        sx={{
          height: 45,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundImage: `url(${OttawaImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          boxShadow: "0px -2px 9px 0px rgba(80, 76, 74, 0.25)",
        }}
      >
        {error || !weather ? (
          <Typography variant="body1" color="white" textAlign="center" mt={2}>
            {error}
          </Typography>
        ) : (
          <>
            <Typography
              variant="h5"
              color="white"
              sx={{ fontWeight: "bold", display: { xs: "none", sm: "block" } }}
            >
              Ottawa, ON
            </Typography>
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="current weather icon"
            />
            <Typography variant="h5" color="white" sx={{ fontWeight: "bold" }}>
              {weather.main.temp.toFixed(0)}&deg;C
            </Typography>
            <Typography
              color="white"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem" },
                fontWeight: "bold",
                width: { xs: "5rem", sm: "9rem" },
                lineHeight: "1.2",
              }}
            >
              {weather.weather[0].description}
            </Typography>
          </>
        )}
      </Stack>
    </footer>
  );
};

export default Footer;
