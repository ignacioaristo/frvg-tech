import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("should execute the callback function", () => {
    const mockHandleSearch = jest.fn();
    const screen = render(<SearchBar handleSearch={mockHandleSearch} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.changeText(input, "Any text");
    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
  });
});
