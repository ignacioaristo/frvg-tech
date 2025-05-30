import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import React from "react";
import { RootStack } from "./index";

jest.mock("@/app/hooks/useFetchUsers", () => ({
  useFetchUsers: () => {
    return {
      isLoading: false,
      users: [
        {
          login: "testUser",
          id: 1,
          avatar_url: "https://example.com/avatar.jpg",
        },
      ],
    };
  },
}));

describe("index", () => {
  it("should render the home screen since is the InitialRoute and navigate to the UserDetail screen", () => {
    const screen = render(
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    );
    expect(screen.getByPlaceholderText("Search...")).toBeTruthy();
  });
});
