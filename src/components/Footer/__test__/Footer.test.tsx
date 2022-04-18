import React from "react";
import { screen, render } from "@testing-library/react";
import Footer from "../Footer";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
jest.unmock("axios");

interface Provider {
  main: { temp: Number };
  weather: [{ icon: string; description: string }];
}

const mockResponse: Provider = {
  main: {
    temp: 6.8,
  },
  weather: [{ icon: "04d", description: "broken clouds" }],
};

describe("Footer", () => {
  test("should show city name and weather description", async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(
        `https://api.openweathermap.org/data/2.5/weather?q=Ottawa,ca&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      )
      .reply(200, mockResponse);

    render(<Footer />);
    const title = await screen.findByText(/ottawa/i);
    expect(title).toBeInTheDocument();
    const weather = await screen.findByText(
      mockResponse.weather[0].description
    );
    expect(weather).toBeInTheDocument();
  });

  test("should show weather icon", async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(
        `https://api.openweathermap.org/data/2.5/weather?q=Ottawa,ca&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      )
      .reply(200, mockResponse);

    render(<Footer />);
    const weatherIcon = await screen.findByRole("img");
    expect(weatherIcon).toBeInTheDocument();
  });

  test("should show error message when cannot get data", async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(
        `https://api.openweathermap.org/data/2.5/weather?q=Ottawa,ca&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      )
      .networkErrorOnce();

    render(<Footer />);
    const errorMessage = await screen.findByText(
      /weather data currently not available/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
