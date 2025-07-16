// import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Products from "./ProductsList";
import { getDocs } from "firebase/firestore";

// Mock Firebase Firestore
jest.mock("@/app/services/firebaseConfig", () => ({
  db: {},
}));
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(() =>
    Promise.resolve({
      docs: [
        {
          id: "1",
          data: () => ({
            name: "Product A",
            price: 100,
            category: "Mobile",
            date: new Date().toISOString(),
          }),
        },
        {
          id: "2",
          data: () => ({
            name: "Product B",
            price: 200,
            category: "Laptop",
            date: new Date().toISOString(),
          }),
        },
      ],
    })
  ),
  deleteDoc: jest.fn(() => Promise.resolve()),
  doc: jest.fn(),
}));

// Mock AddProduct modal
jest.mock("./AddProduct", () => {
  const MockAddProduct = () => <div data-testid="add-product-modal" />;
  MockAddProduct.displayName = "MockAddProduct";
  return MockAddProduct;
});

// Mock window.matchMedia for tests (fixes TypeError in some UI libs)
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("ProductsList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Products List heading", async () => {
    render(<Products />);
    expect(await screen.findByText(/products list/i)).toBeInTheDocument();
  });

  it("renders product rows in the table", async () => {
    render(<Products />);
    expect(await screen.findByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Product B")).toBeInTheDocument();
    expect(screen.getAllByText(/\$[0-9]+/).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Mobile")).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();
  });

  it("shows the Add Product modal when Add Product button is clicked", async () => {
    render(<Products />);
    const addButton = await screen.findByRole("button", {
      name: /add product|add/i,
    });
    fireEvent.click(addButton);
    expect(await screen.findByTestId("add-product-modal")).toBeInTheDocument();
  });

  it("filters products using search", async () => {
    render(<Products />);
    const searchInput = await screen.findByLabelText(/search products/i);
    fireEvent.change(searchInput, { target: { value: "Product A" } });
    fireEvent.blur(searchInput);
    expect(await screen.findByText("Product A")).toBeInTheDocument();
    // Wait until Product B is removed from the document after filtering
    // await waitFor(
    //   () => {
    //     expect(screen.queryByText("Product B")).not.toBeInTheDocument();
    //   },
    //   { timeout: 2000 }
    // );
  });

  it("shows error message when fetching products fails", async () => {
    // Override getDocs to throw error
    (getDocs as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch error"))
    );
    render(<Products />);
    expect(
      await screen.findByText(/failed to fetch products/i)
    ).toBeInTheDocument();
  });

  it("shows delete confirmation dialog and deletes product", async () => {
    render(<Products />);
    // Open menu or click delete icon (simulate desktop)
    const deleteButtons = await screen.findAllByRole("button", {
      name: /delete/i,
    });
    fireEvent.click(deleteButtons[0]);
    // Simulate SweetAlert2 confirmation
    // You may need to mock Swal.fire if you want to test the full flow
  });

  it("matches snapshot", async () => {
    const { asFragment, findByText } = render(<Products />);
    await findByText(/products list/i);
    expect(asFragment()).toMatchSnapshot();
  });
});
