import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

test("renders learn react link", () => {
  render(<Card>Hello World</Card>);
  const linkElement = screen.getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});
