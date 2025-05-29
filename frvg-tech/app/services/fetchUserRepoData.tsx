import { RepoUserData } from "../types/RepoUserData";

export const fetchUserRepoData = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data: RepoUserData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user repositories:", error);
    throw new Error("Failed to fetch users, please try again later.");
  }
};
