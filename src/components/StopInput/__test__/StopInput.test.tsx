import { screen, render, act } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
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

  const APIurl = `https://serene-stream-71987.herokuapp.com/https://api.octranspo1.com/v2.0/GetNextTripsForStopAllRoutes?appID=${process.env.REACT_APP_OCTRANSPO_APP_ID}&apiKey=${process.env.REACT_APP_OCTRANSPO_API_KEY}&stopNo=`;

  const mockContext: TripsContextType = {
    trips: undefined,
    location: {},
    error: "",
    handleTrips: jest.fn(),
    handleLocation: jest.fn(),
    handleError: jest.fn(),
  };

  const mockResponseSuccess = {
    GetRouteSummaryForStopResult: {
      StopNo: "7633",
      Error: "",
      StopDescription: "HAWTHORNE / COLONEL BY",
      Routes: {},
    },
  };

  const mockResponseWrongStopNr = " <div ...";

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

  test("should call handleError if cannot get data", async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(APIurl + mockResponseSuccess.GetRouteSummaryForStopResult.StopNo)
      .networkErrorOnce();

    render(
      <TripsContext.Provider value={mockContext}>
        <StopInput />
      </TripsContext.Provider>
    );

    const inputField: HTMLInputElement = screen.getByRole("spinbutton");
    userEvent.type(inputField, "1234");
    userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(mockContext.handleError).toHaveBeenCalled());
    expect(mockContext.handleError).toHaveBeenCalledWith(
      "Data currently not available"
    );
  });

  test("should call handleError if user inputs wrong stop number", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(APIurl + "5555").reply(200, mockResponseWrongStopNr);

    render(
      <TripsContext.Provider value={mockContext}>
        <StopInput />
      </TripsContext.Provider>
    );

    const inputField: HTMLInputElement = screen.getByRole("spinbutton");
    userEvent.type(inputField, "5555");
    userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(mockContext.handleError).toHaveBeenCalled());
    expect(mockContext.handleError).toHaveBeenCalledWith(
      "Invalid stop number!"
    );
  });

  test("should call handleTrips if data is received", async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(APIurl + mockResponseSuccess.GetRouteSummaryForStopResult.StopNo)
      .reply(200, mockResponseSuccess);

    render(
      <TripsContext.Provider value={mockContext}>
        <StopInput />
      </TripsContext.Provider>
    );

    const inputField: HTMLInputElement = screen.getByRole("spinbutton");
    userEvent.type(
      inputField,
      mockResponseSuccess.GetRouteSummaryForStopResult.StopNo
    );
    userEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(mockContext.handleTrips).toHaveBeenCalledTimes(1)
    );
    expect(mockContext.handleTrips).toHaveBeenCalledWith(mockResponseSuccess);
  });
});
