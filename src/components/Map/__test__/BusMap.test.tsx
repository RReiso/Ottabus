import BusMap from "../BusMap";
import React from "react";
import { screen, render } from "@testing-library/react";
import { TripsContext } from "../../context/TripsContext";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/dom";

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

  test("should show map", async () => {
    // render(
    //   <TripsContext.Provider value={mockContext}>
    //     <BusMap />
    //   </TripsContext.Provider>
    // );
    // await waitFor(() => Promise.resolve());
    // await waitForElementToBeRemoved(await screen.findByText("Loading map..."));
    // const map = await screen.findByTestId("custom-element");
    // expect(map).toBeInTheDocument();
  });
});
