import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Page from "../src/app/page"
 
describe("Home", () => {

  it("renders a heading", () => {

    render(<Page />);
 
    const heading = screen.getByRole("heading");
 
    expect(heading).toBeInTheDocument();

  });

});