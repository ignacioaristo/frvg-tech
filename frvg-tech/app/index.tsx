import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useEffect, useState } from "react";
import { FavouriteContext } from "./context/FavouriteContext";
import { Home } from "./screens/Home/Home";
import { UserDetails } from "./screens/UserDetails/UserDetails";
import { MainNavigatorStackList } from "./types/Navigations";
import { StorageKey } from "./types/Storage";
import { getData } from "./utils/storage";

const Stack = createNativeStackNavigator<MainNavigatorStackList>();

function RootStack() {
  const [favouriteUsers, setFavouriteUsers] = useState<number[]>([]);

  const getFavouritesFromStorage = async () => {
    const data = await getData(StorageKey.favouriteUsers);
    setFavouriteUsers(data);
  };

  useEffect(() => {
    getFavouritesFromStorage();
  }, []);

  return (
    <FavouriteContext.Provider value={{ favouriteUsers, setFavouriteUsers }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
      </Stack.Navigator>
    </FavouriteContext.Provider>
  );
}

export default function App() {
  return <RootStack />;
}
