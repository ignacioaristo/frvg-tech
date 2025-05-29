import { StorageKey } from "@/app/types/Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData, storeData } from "./storage";

describe("storage", () => {
  const testKey = "testKey" as StorageKey.favouriteUsers;
  const testValue = [1, 2, 3, 4];

  it("should store data as JSON string", async () => {
    await storeData(testKey, testValue);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      testKey,
      JSON.stringify(testValue)
    );
  });

  it("should get a value from local storage and parse it", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(testValue)
    );
    const actual = await getData(testKey);
    expect(actual).toEqual(testValue);
  });
});
