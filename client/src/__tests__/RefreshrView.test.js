import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import { RefreshrView } from "../components";

afterEach(cleanup);

const wrapper = {
  wrapper: {
    textAlign: "left"
  }
};

describe("default test", () => {
  it("renders correctly", () => {
    const { container } = render(<RefreshrView className={wrapper} />);
    expect(container).toMatchSnapshot();
  });
});
