import { useState } from "react";
import { fetchSearchUser } from "../services/fetchSearchUser";
import { ItemUser } from "../types/SearchUser";

export const useFetchSearchUser = () => {
  const [users, setUsers] = useState<ItemUser[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSearchUsers = async (username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchSearchUser(username);
      setUsers(data.items);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { users, isLoading, error, fetchSearchUsers };
};
