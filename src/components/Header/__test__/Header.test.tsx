import { screen, render } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  test("should render app name", () => {
    render(<Header />);
    const title = screen.getByRole("heading");
    expect(
      screen.getByRole("heading", { name: /ottabus/i })
    ).toBeInTheDocument();
  });
});
