import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import IntroScreen01 from "../screens/public/intro-screen-01";
import IntroScreen02 from "../screens/public/intro-screen-02";
import IntroScreen03 from "../screens/public/intro-screen-03";
import LoginScreen from "../screens/public/login-screen";
import SignUpScreen from "../screens/public/signup-screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type PublicStackParamList = {
  IntroScreen01: undefined;
  IntroScreen02: undefined;
  IntroScreen03: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
};
const Stack = createStackNavigator<PublicStackParamList>();

export type PublicStackScreenProps<T extends keyof PublicStackParamList> =
  NativeStackScreenProps<PublicStackParamList, T>;
export default function PublicStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: "#0e1529",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="IntroScreen01" component={IntroScreen01} />
      <Stack.Screen name="IntroScreen02" component={IntroScreen02} />
      <Stack.Screen name="IntroScreen03" component={IntroScreen03} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignUpScreen} />
      {/* <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignOutScreen} /> */}
    </Stack.Navigator>
  );
}
