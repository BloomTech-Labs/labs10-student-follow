import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import { RefreshrList } from "../components";

afterEach(cleanup);

const wrapper = {
  wrapper: {
    border: "1px solid black",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem",
    width: "30%",
    height: "30%"
  }
};

describe("default test", () => {
  it("renders correctly", () => {
    const { container } = render(<RefreshrList className={wrapper} />);
    expect(container).toMatchSnapshot();
  });
});
