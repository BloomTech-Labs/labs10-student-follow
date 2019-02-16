import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import { RefreshrList } from "../components";

afterEach(cleanup);

const wrapper = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    margin: "0 1rem"
  }
};

describe("default test", () => {
  it("renders correctly", () => {
    const { container } = render(<RefreshrList className={wrapper} />);
    expect(container).toMatchSnapshot();
  });
});
