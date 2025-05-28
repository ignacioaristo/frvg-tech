import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Home } from "./screens/Home/Home";
import { UserDetails } from "./screens/UserDetails/UserDetails";
import { MainNavigatorStackList } from "./types/Navigations";

const Stack = createNativeStackNavigator<MainNavigatorStackList>();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
    </Stack.Navigator>
  );
}

export default function App() {
  return <RootStack />;
}
