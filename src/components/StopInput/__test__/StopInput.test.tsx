import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TripsContext } from "../../context/TripsContext";
import StopInput from "../StopInput";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
jest.unmock("axios");

describe("StopInput", () => {
  interface Provider {
    [key: string]: any;
  }

  type TripsContextType = {
    trips: Provider | undefined;
    location: Provider | undefined;
    error: string;
    handleTrips: (value: object) => void;
    handleLocation: (value: object) => void;
    handleError: (value: string) => void;
  };

  const mockContext: TripsContextType = {
    trips: undefined,
    location: {},
    error: "",
    handleTrips: jest.fn(),
    handleLocation: jest.fn(),
    handleError: jest.fn(),
  };

  const mockResponse = {
    GetRouteSummaryForStopResult: {
      StopNo: "7633",
      Error: "",
      StopDescription: "HAWTHORNE / COLONEL BY",
      Routes: {
        Route: [
          {
            RouteNo: "5",
            RouteHeading: "Rideau",
            DirectionID: 1,
            Direction: "",
            Trips: [
              {
                Longitude: "-75.67637802124024",
                Latitude: "45.406397399902346",
                GPSSpeed: "",
                TripDestination: "Rideau",
                TripStartTime: "11:01",
                AdjustedScheduleTime: "1",
                AdjustmentAge: "0",
                LastTripOfSchedule: false,
                BusType: "",
              },
              {
                Longitude: "-75.67637802124024",
                Latitude: "45.406397399902346",
                GPSSpeed: "",
                TripDestination: "Rideau",
                TripStartTime: "12:01",
                AdjustedScheduleTime: "53",
                AdjustmentAge: "1",
                LastTripOfSchedule: false,
                BusType: "",
              },
              {
                Longitude: "",
                Latitude: "",
                GPSSpeed: "",
                TripDestination: "Rideau",
                TripStartTime: "12:31",
                AdjustedScheduleTime: "83",
                AdjustmentAge: "-1",
                LastTripOfSchedule: false,
                BusType: "",
              },
            ],
          },
          {
            RouteNo: "55",
            RouteHeading: "Bayshore",
            DirectionID: 2,
          },
          {
            RouteNo: "56",
            RouteHeading: "Tunney's Pasture",
            DirectionID: 3,
          },
        ],
      },
    },
  };

  test("should show form and button", () => {
    render(
      <TripsContext.Provider value={mockContext}>
        <StopInput />
      </TripsContext.Provider>
    );
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /find trips/i })
    ).toBeInTheDocument();
  });

  test("should be able to input a number", () => {
    render(
      <TripsContext.Provider value={mockContext}>
        <StopInput />
      </TripsContext.Provider>
    );
    const inputField: HTMLInputElement = screen.getByRole("spinbutton");
    userEvent.type(inputField, "1234");
    expect(inputField.value).toBe("1234");
  });

  test("should not be able to input a non-digit", () => {
    render(
      <TripsContext.Provider value={mockContext}>
        <StopInput />
      </TripsContext.Provider>
    );
    const inputField: HTMLInputElement = screen.getByRole("spinbutton");
    userEvent.type(inputField, "hello");
    expect(inputField.value).not.toBe("hello");
  });

  test("should not call handleTrips if input is invalid", () => {
    render(
      <TripsContext.Provider value={mockContext}>
        <StopInput />
      </TripsContext.Provider>
    );
    const inputField: HTMLInputElement = screen.getByRole("spinbutton");
    userEvent.type(inputField, "hello");
    userEvent.click(screen.getByRole("button"));
    expect(mockContext.handleTrips).toHaveBeenCalledTimes(0);
  });

  test("should not call handleTrips and should display error message if cannot get data", async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(
        `https://serene-stream-71987.herokuapp.com/https://api.octranspo1.com/v2.0/GetNextTripsForStopAllRoutes?appID=${process.env.REACT_APP_OCTRANSPO_APP_ID}&apiKey=${process.env.REACT_APP_OCTRANSPO_API_KEY}&stopNo=1234`
      )
      .networkErrorOnce();
    render(
      <TripsContext.Provider value={mockContext}>
        <StopInput />
      </TripsContext.Provider>
    );
    const inputField: HTMLInputElement = screen.getByRole("spinbutton");
    userEvent.type(inputField, "1234");
    userEvent.click(screen.getByRole("button"));
    expect(mockContext.handleError).toHaveBeenCalledTimes(1);
    const errorMessage = await screen.findByText(
      /Data currently not available/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("should call handleTrips if data is received", async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(
        `https://serene-stream-71987.herokuapp.com/https://api.octranspo1.com/v2.0/GetNextTripsForStopAllRoutes?appID=${process.env.REACT_APP_OCTRANSPO_APP_ID}&apiKey=${process.env.REACT_APP_OCTRANSPO_API_KEY}&stopNo=${mockResponse.GetRouteSummaryForStopResult.StopNo}`
      )
      .reply(200, mockResponse);

    render(
      <TripsContext.Provider value={mockContext}>
        <StopInput />
      </TripsContext.Provider>
    );
    const inputField: HTMLInputElement = screen.getByRole("spinbutton");
    userEvent.type(
      inputField,
      mockResponse.GetRouteSummaryForStopResult.StopNo
    );
    userEvent.click(screen.getByRole("button"));
    expect(mockContext.handleTrips).toHaveBeenCalledTimes(1);
    expect(mockContext.handleTrips).toHaveBeenCalledWith(mockResponse);
  });
});
