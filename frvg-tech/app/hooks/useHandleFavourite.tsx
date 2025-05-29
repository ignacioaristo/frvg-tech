import { useContext } from "react";
import { FavouriteContext } from "../context/FavouriteContext";
import { StorageKey } from "../types/Storage";
import { storeData } from "../utils/storage";

//TODO: Possible upgrade optimistic UI.
export const useHandleFavourite = () => {
  const data = useContext(FavouriteContext);

  const addFavouriteUser = async (userId: number) => {
    const newData = [...data.favouriteUsers, userId];
    try {
      await storeData(StorageKey.favouriteUsers, newData);
      data.setFavouriteUsers(newData);
    } catch (error) {
      console.error("Error adding favourite user:", error);
    }
  };

  const removeFavouriteUser = async (userId: number) => {
    const filterData = data.favouriteUsers.filter((id) => id !== userId);
    try {
      await storeData(StorageKey.favouriteUsers, filterData);
      data.setFavouriteUsers(filterData);
    } catch (error) {
      console.error("Error removing favourite user:", error);
    }
  };

  return { addFavouriteUser, removeFavouriteUser };
};
