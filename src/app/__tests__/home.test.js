import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("Home", () => {
  it("renders the logo in the header", () => {
    render(<Home />);

    const logoImage = screen.getByAltText("Logo");

    expect(logoImage).toBeInTheDocument();
  });

  it("renders the login link when user is not logged in", () => {
    render(<Home />);

    const loginLink = screen.getByText("Iniciar sesión");

    expect(loginLink).toBeInTheDocument();
  });
});
