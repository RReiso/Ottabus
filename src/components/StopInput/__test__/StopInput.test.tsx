import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StopInput from "../StopInput";

describe("StopInput", () => {
  test("should show form and button", () => {
    render(<StopInput />);
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /find trips/i })
    ).toBeInTheDocument();
  });

  test("should be able to input a number", () => {
    render(<StopInput />);
    const inputField: HTMLInputElement = screen.getByRole("spinbutton");
    userEvent.type(inputField, "1234");
    expect(inputField.value).toBe("1234");
  });

  test("should not be able to input a non-digit", () => {
    render(<StopInput />);
    const inputField: HTMLInputElement = screen.getByRole("spinbutton");
    userEvent.type(inputField, "hello");
    expect(inputField.value).not.toBe("hello");
  });
});
