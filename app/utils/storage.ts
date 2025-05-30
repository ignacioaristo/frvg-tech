import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKey, StorageValues } from "../types/Storage";

export const storeData = async (key: StorageKey, value: StorageValues) => {
  return await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getData = async (key: StorageKey) => {
  const data = await AsyncStorage.getItem(key);
  return data != null ? JSON.parse(data) : [];
};
