import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders its children", () => {
    render(<Chip>TypeScript</Chip>);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
  it("merges custom class names", () => {
    render(<Chip className="custom-x">React</Chip>);
    expect(screen.getByText("React")).toHaveClass("custom-x");
  });
});
