import BusMap from "../BusMap";
import React from "react";
import { screen, render } from "@testing-library/react";
import { TripsContext } from "../../context/TripsContext";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/dom";

jest.mock("@react-google-maps/api", () => ({
  useLoadScript: () => ({
    isLoaded: true,
    loadError: null,
  }),
  GoogleMap: () => <div></div>,
}));

describe("Trip", () => {
  type TripsContextType = {
    trips: undefined;
    location: object;
    error: string;
    handleTrips: (value: object) => void;
    handleLocation: (value: object) => void;
    handleError: (value: string) => void;
  };

  const mockContext: TripsContextType = {
    trips: undefined,
    location: { lat: 0, lng: 0 },
    error: "",
    handleTrips: jest.fn(),
    handleLocation: jest.fn(),
    handleError: jest.fn(),
  };

  test("should show message", async () => {
    render(
      <TripsContext.Provider value={mockContext}>
        <BusMap />
      </TripsContext.Provider>
    );

    expect(
      screen.getByText(/the selected bus has not yet departed!/i)
    ).toBeInTheDocument();
  });
});