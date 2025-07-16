// 1. MOCK FIREBASE AT THE TOP (REPLACE ALL FIREBASE MOCKS WITH THIS)
jest.mock("firebase/auth", () => ({
  // Mock all auth functions you use
  getAuth: jest.fn(() => ({
    currentUser: { uid: "test-user" },
    onAuthStateChanged: jest.fn(),
  })),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback({ uid: "test-user" });
    return jest.fn(); // Return unsubscribe function
  }),
  // Add other auth methods you need
  signOut: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({})),
}));

// 2. MOCK OTHER DEPENDENCIES (KEEP THESE)
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock("../../charts/BarChart", () => {
  const MockBarChart = () => <div>ChartBar</div>;
  MockBarChart.displayName = "MockBarChart";
  return MockBarChart;
});

jest.mock("react-countup", () => ({
  __esModule: true,
  default: ({ end }: { end: number }) => <span>{end}</span>,
}));

// 4. ACTUAL IMPORTS (AFTER MOCKS)
// import { render, screen, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import Dashboard from "./page";
// import * as firebaseAuth from "firebase/auth";

// describe("Dashboard Page", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renders the Dashboard Overview heading", async () => {
//     render(<Dashboard />);
//     expect(await screen.findByText(/dashboard overview/i)).toBeInTheDocument();
//   });

//   it("renders all metric cards with correct values", async () => {
//     render(<Dashboard />);
//     expect(
//       await screen.findByText((content, node) => {
//         const hasText = (node: Element | null) =>
//           node?.textContent?.replace(/\s/g, "") === "$12500";
//         const nodeHasText = hasText(node as Element);
//         const childrenDontHaveText = Array.from(
//           (node as Element)?.children || []
//         ).every((child) => !hasText(child));
//         return nodeHasText && childrenDontHaveText;
//       })
//     ).toBeInTheDocument();
//     expect(screen.getByText("568")).toBeInTheDocument();
//     expect(screen.getByText("1243")).toBeInTheDocument();
//     expect(screen.getByText("12.5")).toBeInTheDocument();
//   });

//   it("renders secondary cards and their progress bars", async () => {
//     render(<Dashboard />);
//     expect(await screen.findByText(/average order value/i)).toBeInTheDocument();
//     expect(
//       screen.getAllByText((content, node) => {
//         // Flatten text content and remove whitespace for matching "$85"
//         const text = node?.textContent?.replace(/\s/g, "");
//         return text ? text.includes("$85") : false;
//       }).length
//     ).toBeGreaterThan(0);
//     expect(screen.getAllByRole("progressbar").length).toBeGreaterThan(0);
//   });

//   it("renders the Sales Overview chart", async () => {
//     render(<Dashboard />);
//     expect(await screen.findByText(/sales overview/i)).toBeInTheDocument();
//     expect(screen.getByText(/chartbar/i)).toBeInTheDocument();
//   });

//   it("renders all sections", async () => {
//     render(<Dashboard />);
//     expect(await screen.findByText(/top products/i)).toBeInTheDocument();
//     expect(screen.getByText(/recent activity/i)).toBeInTheDocument();
//     expect(screen.getByText(/inventory status/i)).toBeInTheDocument();
//   });

//   it("redirects to login when no user is authenticated", async () => {
//     // Override auth mock for this test
//     (firebaseAuth.onAuthStateChanged as jest.Mock).mockImplementationOnce(
//       (auth, callback) => {
//         callback(null);
//         return jest.fn();
//       }
//     );

//     render(<Dashboard />);
//     await waitFor(() => {
//       expect(pushMock).toHaveBeenCalledWith("/login");
//     });
//   });

//   it("matches snapshot", async () => {
//     const { asFragment, findByText } = render(<Dashboard />);
//     await findByText(/dashboard overview/i);
//     expect(asFragment()).toMatchSnapshot();
//   });
// });
