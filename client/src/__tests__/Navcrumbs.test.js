import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import { Navcrumbs } from "../components";

afterEach(cleanup);

const wrapper = {
  wrapper: {
    display: "flex",
    justifyContent: "flex start",
    textAlign: "left",
    margin: "0 1rem"
  }
};

describe("default test", () => {
  it("renders correctly", () => {
    const { container } = render(<Navcrumbs className={wrapper} />);
    expect(container).toMatchSnapshot();
  });
});
