import React from "react";
import { screen, render } from "@testing-library/react";
import { TripsContext, TripsProvider } from "../../context/TripsContext";
import Trips from "../Trips";

describe("Trips", () => {
  interface Provider {
    [key: string]: any;
  }

  type TripsContextType = {
    trips: Provider | undefined;
    handleTrips: (value: object) => void;
  };

  const data = {
    GetRouteSummaryForStopResult: {
      StopNo: "7633",
      Error: "",
      StopDescription: "HAWTHORNE / COLONEL BY",
      Routes: {
        Route: [
          {
            RouteNo: "5",
            RouteHeading: "Rideau",
          },
          {
            RouteNo: "55",
            RouteHeading: "Bayshore",
          },
          {
            RouteNo: "56",
            RouteHeading: "Tunney's Pasture",
          },
        ],
      },
    },
  };

  const mockFull: TripsContextType = {
    trips: data,
    handleTrips: jest.fn(),
  };

  const mockEmpty: TripsContextType = {
    trips: undefined,
    handleTrips: jest.fn(),
  };

  test("should display 'upcoming trips' text", () => {
    render(
      <TripsContext.Provider value={mockFull}>
        <Trips />
      </TripsContext.Provider>
    );
    expect(screen.getByText(/upcoming trips/i)).toBeInTheDocument();
  });

  test("should display list given data", () => {
    render(
      <TripsContext.Provider value={mockFull}>
        <Trips />
      </TripsContext.Provider>
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test("should display no list if no data given", () => {
    render(
      <TripsContext.Provider value={mockEmpty}>
        <Trips />
      </TripsContext.Provider>
    );
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
