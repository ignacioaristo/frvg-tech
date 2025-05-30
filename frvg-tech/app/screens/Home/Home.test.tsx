import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import { Home } from "./Home";

jest.mock("@/app/hooks/useFetchUsers", () => ({
  useFetchUsers: jest.fn(() => ({
    users: [
      { id: 1, login: "user1", avatar_url: "https://example.com/1.png" },
      { id: 2, login: "user2", avatar_url: "https://example.com/2.png" },
    ],
    isLoading: false,
    error: null,
  })),
}));

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
    addListener: jest.fn(),
  }),
}));

describe("Home", () => {
  it("should render the user list", async () => {
    const screen = render(<Home />);

    const userButton = screen.getByText("user1");

    fireEvent.press(userButton);

    expect(mockNavigate).toHaveBeenCalledWith("UserDetails", {
      user: { id: 1, login: "user1", avatar_url: "https://example.com/1.png" },
    });
  });
});
