// import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("renders the sign in heading", () => {
    render(<LoginForm />);
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("renders email and password fields", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("allows typing in email and password fields", () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("shows error message on failed login", async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() =>
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
    );
  });

  it("toggles password visibility", () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton =
      screen.getByRole("button", { name: /toggle password visibility/i }) ||
      screen.getByLabelText(/show password/i) ||
      screen.getByLabelText(/hide password/i);
    // Try to find the icon button for toggling password
    if (toggleButton) {
      expect(passwordInput).toHaveAttribute("type", "password");
      fireEvent.click(toggleButton);
      // After toggle, type should be text
      expect(passwordInput).toHaveAttribute("type", "text");
    }
  });

  it("shows loading spinner when submitting", () => {
    render(<LoginForm />);
    const button = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(button);
    expect(button).toBeDisabled();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<LoginForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
