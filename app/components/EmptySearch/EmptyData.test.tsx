import { render } from "@testing-library/react-native";
import React from "react";
import { EmptyData } from "./EmptyData";

describe("EmptyData", () => {
  it("renders correctly with given text", () => {
    const screen = render(<EmptyData text="No users were found" />);
    expect(screen.getByText("No users were found")).toBeTruthy();
  });
});
