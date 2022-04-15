import { screen, render } from "@testing-library/react";
import Header from "../../Header/Header";

describe("Header", () => {
  test("should render app name", () => {
    render(<Header />);
    expect(
      screen.getByRole("heading", { name: /ottabus/i })
    ).toBeInTheDocument();
  });
});
