import { User } from "../types/User";

export const fetchUsers = async () => {
  try {
    const response = await fetch("https://api.github.com/users");
    const data: User[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users, please try again later.");
  }
};
