import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useState } from "react";
import { FavouriteContext } from "./context/FavouriteContext";
import { Home } from "./screens/Home/Home";
import { UserDetails } from "./screens/UserDetails/UserDetails";
import { MainNavigatorStackList } from "./types/Navigations";

const Stack = createNativeStackNavigator<MainNavigatorStackList>();

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
