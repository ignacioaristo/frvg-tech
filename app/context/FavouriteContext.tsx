import { createContext } from "react";

type FavouriteContextType = {
  favouriteUsers: number[];
  setFavouriteUsers: React.Dispatch<React.SetStateAction<number[]>>;
};

export const FavouriteContext = createContext<FavouriteContextType>({
  favouriteUsers: [],
  setFavouriteUsers: () => {},
});
