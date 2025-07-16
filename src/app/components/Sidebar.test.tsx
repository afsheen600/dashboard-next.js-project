import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "./Sidebar";
import { signOut } from "firebase/auth";

// Mock useSidebar context
const toggleSidebarMock = jest.fn();
jest.mock("../../context/SidebarContext", () => ({
  useSidebar: () => ({
    isOpen: true,
    toggleSidebar: toggleSidebarMock,
  }),
}));

// Mock next/navigation
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: () => "/",
}));

// Mock firebase/auth
jest.mock("firebase/auth", () => {
  const signOutMock = jest.fn(() => Promise.resolve());
  return {
    getAuth: jest.fn(() => ({
      currentUser: { uid: "test-user" },
      signOut: signOutMock,
    })),
    signOut: signOutMock,
  };
});

describe("Sidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all menu items", () => {
    render(<Sidebar />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/products/i)).toBeInTheDocument();
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
  });

  it("renders the logout button", () => {
    render(<Sidebar />);
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it("calls signOut and redirects on logout click", async () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByText(/logout/i));
    expect(signOut).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith("/login");
    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});

it("calls toggleSidebar when menu item is clicked", () => {
  render(<Sidebar />);
  fireEvent.click(screen.getByText(/dashboard/i));
  expect(toggleSidebarMock).toHaveBeenCalled();
});

it("matches snapshot", () => {
  const { asFragment } = render(<Sidebar />);
  expect(asFragment()).toMatchSnapshot();
});
