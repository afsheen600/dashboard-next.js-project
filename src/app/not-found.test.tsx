import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "./not-found";

describe("NotFound Page", () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it("renders the 404 heading", () => {
    // The Typography with variant="h2" renders as <h2>, not <h1>
    expect(
      screen.getByRole("heading", { name: "404", level: 2 })
    ).toBeInTheDocument();
  });

  it("renders the error message and emoji", () => {
    expect(
      screen.getByText(/sorry! something went wrong/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/we could not find the page you were looking for/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /sad/i })).toBeInTheDocument();
  });

  it("renders the Go back to Home button with correct link", () => {
    const homeLink = screen.getByRole("link", { name: /go back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<NotFound />);
    expect(asFragment()).toMatchSnapshot();
  });
});
