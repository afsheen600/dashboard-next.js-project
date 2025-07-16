// import React from "react";
import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
import LoadingScreen from "./LoadingScreen";

describe("LoadingScreen", () => {
  it("renders a CircularProgress indicator", () => {
    render(<LoadingScreen />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("centers the loader on the screen with correct styles", () => {
    render(<LoadingScreen />);
    const box = screen.getByRole("progressbar").parentElement;
    expect(box).toHaveStyle({ display: "flex" });
    expect(box).toHaveStyle({ justifyContent: "center" });
    expect(box).toHaveStyle({ alignItems: "center" });
    expect(box).toHaveStyle({ minHeight: "100vh" });
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<LoadingScreen />);
    expect(asFragment()).toMatchSnapshot();
  });
});
