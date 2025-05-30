import * as testIDSelectors from "@/app/config/testIDSelectors";
import { useRoute } from "@react-navigation/native";
import { render, userEvent, waitFor } from "@testing-library/react-native";
import React from "react";
import { Linking } from "react-native";
import { UserDetails } from "./UserDetails";

const user = {
  login: "testUser",
  id: 1,
  avatar_url: "https://example.com/avatar.jpg",
};

jest.mock("@/app/hooks/useFetchUserRepoData", () => ({
  useFetchUserRepoData: () => ({
    users: {
      name: "testUser",
      id: 1,
      avatar_url: "https://example.com/avatar.jpg",
      public_repos: 5,
      followers: 10,
      html_url: "https://example.github.com/testUser",
    },
    isLoading: false,
  }),
}));

describe("UserDetails", () => {
  it("should render the UserDetails screen with user data", () => {
    (useRoute as jest.Mock).mockImplementationOnce(() => ({
      params: {
        user,
      },
    }));
    const screen = render(<UserDetails />);

    expect(screen.getByText("testUser")).toBeTruthy();
    expect(screen.getByText("Public Repos: 5")).toBeTruthy();
    expect(screen.getByText("Number of followers: 10")).toBeTruthy();
  });

  it("should navigate to the external github page if the user clicks the github button", async () => {
    (useRoute as jest.Mock).mockImplementationOnce(() => ({
      params: {
        user,
      },
    }));
    const screen = render(<UserDetails />);

    expect(screen.getByText("testUser")).toBeTruthy();
    expect(screen.getByText("Public Repos: 5")).toBeTruthy();
    expect(screen.getByText("Number of followers: 10")).toBeTruthy();

    const githubButton = screen.getByTestId(
      testIDSelectors.UserDetails.GITHUB_BUTTON
    );

    userEvent.press(githubButton);

    await waitFor(() => {
      expect(Linking.openURL).toHaveBeenCalledWith(
        "https://example.github.com/testUser"
      );
    });
  });
});
