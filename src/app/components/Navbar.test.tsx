import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

// Mock useSidebar context
const toggleSidebarMock = jest.fn();
jest.mock("../../context/SidebarContext", () => ({
  useSidebar: () => ({
    toggleSidebar: toggleSidebarMock,
  }),
}));

describe("Navbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the app title", () => {
    render(<Navbar />);
    expect(screen.getByText(/next\.js app/i)).toBeInTheDocument();
  });

  it("renders the menu icon button with correct aria-label", () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText(/menu/i);
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-label", "menu");
  });

  it("calls toggleSidebar when menu button is clicked", () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText(/menu/i);
    fireEvent.click(menuButton);
    expect(toggleSidebarMock).toHaveBeenCalledTimes(1);
  });

  it("menu button is of type button and has correct size", () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText(/menu/i);
    expect(menuButton).toHaveAttribute("type", "button");
    expect(menuButton).toHaveClass("MuiIconButton-sizeLarge");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Navbar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
