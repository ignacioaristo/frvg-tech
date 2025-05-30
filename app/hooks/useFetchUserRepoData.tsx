import { useEffect, useState } from "react";
import { fetchUserRepoData } from "../services/fetchUserRepoData";
import { RepoUserData } from "../types/RepoUserData";

export const useFetchUserRepoData = (username: string) => {
  const [users, setUsers] = useState<RepoUserData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsersRepoData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchUserRepoData(username);
      setUsers(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersRepoData();
  }, []);

  return { users, isLoading, error };
};
