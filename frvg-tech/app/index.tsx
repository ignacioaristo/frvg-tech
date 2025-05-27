import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Home } from "./screens/Home/Home";

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default function App() {
  return <RootStack />;
}
