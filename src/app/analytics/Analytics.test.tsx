// import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import Analytics from "../pages/dashboard/analytics/page"; // Adjust the import path as necessary

describe("Analytics Page", () => {
  it("renders the Analytics heading", () => {
    render(<Analytics />);
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
  });

  it("renders key analytics sections or charts", () => {
    render(<Analytics />);
    // Check for common analytics terms or chart headings
    expect(
      screen.getByText(/overview|chart|statistics|report/i)
    ).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Analytics />);
    expect(asFragment()).toMatchSnapshot();
  });
});
