import React from "react";

import * as testIDSelectors from "@/app/config/testIDSelectors";
import { fireEvent, render } from "@testing-library/react-native";
import { Home } from "./Home";

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

const mockUseFetchUsers = jest.fn();
jest.mock("@/app/hooks/useFetchUsers", () => ({
  useFetchUsers: () => mockUseFetchUsers(),
}));

const mockFetchSearchUsers = jest.fn();
jest.mock("@/app/hooks/useFetchSearchUser", () => ({
  useFetchSearchUser: () => ({
    fetchSearchUsers: mockFetchSearchUsers,
  }),
}));

describe("Home", () => {
  it("should render the user list", async () => {
    mockUseFetchUsers.mockImplementation(() => ({
      users: [
        { id: 1, login: "user1", avatar_url: "https://example.com/1.png" },
        { id: 2, login: "user2", avatar_url: "https://example.com/2.png" },
      ],
      isLoading: false,
      error: null,
    }));

    const screen = render(<Home />);

    const userButton = screen.getByText("user1");

    fireEvent.press(userButton);

    expect(mockNavigate).toHaveBeenCalledWith("UserDetails", {
      user: { id: 1, login: "user1", avatar_url: "https://example.com/1.png" },
    });
  });

  it("should display loading indicator when users are loading", () => {
    mockUseFetchUsers.mockImplementation(() => ({
      users: [],
      isLoading: true,
      error: null,
    }));

    const screen = render(<Home />);

    expect(
      screen.getByTestId(testIDSelectors.Home.LOADING_INDICATOR)
    ).toBeTruthy();
  });

  it("should call fetchSearchUsers when search text is entered", async () => {
    mockFetchSearchUsers.mockImplementation(() => ({
      fetchSearchUsers: mockFetchSearchUsers,
      users: [],
    }));
    const screen = render(<Home />);

    const searchBar = screen.getByPlaceholderText("Search...");
    fireEvent.changeText(searchBar, "test");

    await new Promise((r) => setTimeout(r, 1000));

    expect(mockFetchSearchUsers).toHaveBeenCalled();
  });
});
