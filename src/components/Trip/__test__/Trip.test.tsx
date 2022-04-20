import React from "react";
import { screen, render } from "@testing-library/react";
import { within } from "@testing-library/dom";
import Trip from "../Trip";
import { TripsContext } from "../../context/TripsContext";
import userEvent from "@testing-library/user-event";

describe("Trip", () => {
  type TripsContextType = {
    trips: undefined;
    location: undefined;
    error: string;
    handleTrips: (value: object) => void;
    handleLocation: (value: object) => void;
    handleError: (value: string) => void;
  };

  const mockContext: TripsContextType = {
    trips: undefined,
    location: undefined,
    error: "",
    handleTrips: jest.fn(),
    handleLocation: jest.fn(),
    handleError: jest.fn(),
  };

  const mockData = {
    RouteNo: "5",
    RouteHeading: "Rideau",
    DirectionID: 1,
    Trips: [
      {
        TripDestination: "Rideau",
        TripStartTime: "11:01",
        Longitude: "-75.67637802124024",
        Latitude: "45.406397399902346",
      },
      {
        TripDestination: "Rideau",
        TripStartTime: "12:01",
        Longitude: "-75.67637802124024",
        Latitude: "45.406397399902346",
      },
      {
        TripDestination: "Rideau",
        TripStartTime: "12:31",
        Longitude: "",
        Latitude: "",
      },
    ],
  };

  test("should show route number and route heading", () => {
    render(
      <TripsContext.Provider value={mockContext}>
        <Trip data={mockData} />
      </TripsContext.Provider>
    );
    expect(screen.getByText(mockData.RouteNo)).toBeInTheDocument();
    expect(screen.getByText(mockData.RouteHeading)).toBeInTheDocument();
  });

  test("should show a list of times in minutes for upcoming buses", () => {
    render(
      <TripsContext.Provider value={mockContext}>
        <Trip data={mockData} />
      </TripsContext.Provider>
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test("should show all list items", () => {
    render(
      <TripsContext.Provider value={mockContext}>
        <Trip data={mockData} />
      </TripsContext.Provider>
    );
    const list = screen.getByRole("list") as HTMLElement;
    expect(within(list).getAllByRole("listitem").length).toEqual(
      mockData.Trips.length
    );
  });

  test("should call handleLocation on click", () => {
    render(
      <TripsContext.Provider value={mockContext}>
        <Trip data={mockData} />
      </TripsContext.Provider>
    );
    const timeInMinutes = within(screen.getByRole("list")).getAllByRole(
      "listitem"
    )[0] as HTMLElement;
    userEvent.click(timeInMinutes);
    expect(mockContext.handleLocation).toHaveBeenCalledTimes(1);
    expect(mockContext.handleLocation).toHaveBeenCalledWith({
      Longitude: mockData.Trips[0].Longitude,
      Latitude: mockData.Trips[0].Latitude,
    });
  });
});
