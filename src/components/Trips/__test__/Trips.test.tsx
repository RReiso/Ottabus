import React from "react";
import { screen, render } from "@testing-library/react";
import { TripsProvider } from "../../context/TripsContext";
import Trips from "../Trips";

describe("Trips", () => {
  type TripsContextType = {
    trips: string;
    handleTrips: (value: string) => void;
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

  const mock: TripsContextType = {
    trips: JSON.stringify(data),
    handleTrips: jest.fn(),
  };
  test("should display heading", () => {
    render(
      <TripsProvider value={mock}>
        <Trips />
      </TripsProvider>
    );
    expect(
      screen.getByRole("heading", { name: /upcoming trips/i })
    ).toBeInTheDocument();
  });

  test("should display 3 list items", () => {
    render(
      <TripsProvider value={mock}>
        <Trips />
      </TripsProvider>
    );
    expect(screen.getAllByRole("list").length).toEqual(3);
  });
});
