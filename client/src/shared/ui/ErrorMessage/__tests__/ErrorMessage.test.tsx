import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "../ErrorMessage";

describe("ErrorMessage", () => {
  it("renders with default stacked variant", () => {
    const error = { message: "Test error message" };
    render(<ErrorMessage error={error} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("There was an error:")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("renders with inline variant", () => {
    const error = { message: "Test error message" };
    render(<ErrorMessage error={error} variant="inline" />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.queryByText("There was an error:")).not.toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("renders default message when no error message is provided", () => {
    const error = {};
    render(<ErrorMessage error={error} />);

    expect(screen.getByText("Something bad happened!")).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const error = { message: "Test error message" };
    render(<ErrorMessage error={error} className="custom-class" />);

    const alertElement = screen.getByRole("alert");
    expect(alertElement).toHaveClass("custom-class");
  });
});
