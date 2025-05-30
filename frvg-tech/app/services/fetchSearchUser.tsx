import { API_GITHUB } from "@/config";
import { SearchUser } from "../types/SearchUser";

export const fetchSearchUser = async (text: string) => {
  try {
    const response = await fetch(`${API_GITHUB}/search/users?q=${text.trim()}`);
    const user: SearchUser = await response.json();

    return user;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users, please try again later.");
  }
};
