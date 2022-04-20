import React from "react";
import { screen, render } from "@testing-library/react";
import { TripsContext } from "../../context/TripsContext";
import Trips from "../Trips";

describe("Trips", () => {
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
            DirectionID: 1,
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

  const mockFull: TripsContextType = {
    trips: data,
    error: "",
    location: {},
    handleTrips: jest.fn(),
    handleLocation: jest.fn(),
    handleError: jest.fn(),
  };

  const mockEmpty: TripsContextType = {
    trips: undefined,
    location: {},
    error: "",
    handleTrips: jest.fn(),
    handleLocation: jest.fn(),
    handleError: jest.fn(),
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

  test("should display 3 list items", () => {
    render(
      <TripsContext.Provider value={mockFull}>
        <Trips />
      </TripsContext.Provider>
    );
    expect(screen.getAllByRole("listitem").length).toEqual(
      data.GetRouteSummaryForStopResult.Routes.Route.length
    );
  });

  test("should not display trips if error is present", () => {
    render(
      <TripsContext.Provider
        value={{ ...mockFull, error: "Invalid stop number!" }}
      >
        <Trips />
      </TripsContext.Provider>
    );
    expect(screen.getByText(/no data to display/i)).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
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
