// import dependencies
import React from "react";

// import react-testing methods
import { render, cleanup } from "react-testing-library";

// add custom jest matchers from jest-dom
import "jest-dom/extend-expect";

// the component to test
import { Navbar } from "../components";

// === React Router Tests === //
// auto unmount and cleanup DOM after the test finishes
afterEach(cleanup);

// style object for passing into component
const wrapper = {
  wrapper: {
    border: "2px solid black",
    borderRadius: "3px",
    height: "90vh",
    margin: "0 1rem",
    padding: "0 1rem"
  }
};

// test if the render matches snapshot
describe("default test", () => {
  it("renders correctly", () => {
    const { container } = render(<Navbar className={wrapper} />);
    expect(container).toMatchSnapshot();
  });
});

// tests the menu names if they are correct
// alternative `container.firstChild` can also check against snapshot
describe("menu items", () => {
  it("checks first menu item is Refreshrs", () => {
    const { getByTestId, container } = render(<Navbar className={wrapper} />);
    expect(getByTestId("firstMenuItem")).toHaveTextContent("Refreshrs");
    // expect(container.firstChild).toMatchSnapshot();
  });

  it("checks second menu item is Classes", () => {
    const { getByTestId } = render(<Navbar className={wrapper} />);
    expect(getByTestId("secondMenuItem")).toHaveTextContent("Classes");
  });

  it("checks third menu item is Billing", () => {
    const { getByTestId } = render(<Navbar className={wrapper} />);
    expect(getByTestId("thirdMenuItem")).toHaveTextContent("Billing");
  });

  it("checks fourth menu item is Billing", () => {
    const { getByTestId } = render(<Navbar className={wrapper} />);
    expect(getByTestId("fourthMenuItem")).toHaveTextContent("Settings");
  });
});
