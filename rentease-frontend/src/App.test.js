import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the RentEase home page", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: "RentEase" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /browse products/i })).toBeInTheDocument();
});
