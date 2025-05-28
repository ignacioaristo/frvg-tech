import { FavouriteContext } from "@/app/index";
import { useContext } from "react";

export const useIsFavourite = (userId: number) => {
  const data = useContext(FavouriteContext);

  const isFavourite = data.favouriteUsers.includes(userId);

  return { isFavourite };
};
