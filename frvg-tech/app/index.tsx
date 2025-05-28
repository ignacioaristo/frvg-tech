import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { createContext, useState } from "react";
import { Home } from "./screens/Home/Home";
import { UserDetails } from "./screens/UserDetails/UserDetails";
import { MainNavigatorStackList } from "./types/Navigations";

const Stack = createNativeStackNavigator<MainNavigatorStackList>();
type FavouriteContextType = {
  favouriteUsers: number[];
  setFavouriteUsers: React.Dispatch<React.SetStateAction<number[]>>;
};

export const FavouriteContext = createContext<FavouriteContextType>({
  favouriteUsers: [],
  setFavouriteUsers: () => {},
});

function RootStack() {
  const [favouriteUsers, setFavouriteUsers] = useState<number[]>([]);

  return (
    <FavouriteContext.Provider value={{ favouriteUsers, setFavouriteUsers }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
      </Stack.Navigator>
    </FavouriteContext.Provider>
  );
}

export default function App() {
  return <RootStack />;
}
