import { useContext } from "react";
import { FavouriteContext } from "../context/FavouriteContext";

export const useIsFavourite = (userId: number) => {
  const data = useContext(FavouriteContext);

  const isFavourite = data.favouriteUsers.includes(userId);

  return { isFavourite };
};
