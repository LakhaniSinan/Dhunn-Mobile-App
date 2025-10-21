import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants";
import Login from "../screens/Auth/Login";

const Stack = createNativeStackNavigator();

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      animation: "fade",
      headerStyle: {
        backgroundColor: "#9AC4F8",
      },
      headerTintColor: "white",
      headerBackTitle: "Back",
    }}>
      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

