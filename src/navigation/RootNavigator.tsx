import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import MainTabNavigator, { MainTabStackParamList } from "./MainTabStack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { UserDetailScreen } from "@/features/feed/screens/UserDetailScreen";

export type RootStackParamList = {
  MainTabStack: NavigatorScreenParams<MainTabStackParamList>;
  UserDetail: { userId: number };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootStackScreenNavigationProp<
  Screen extends keyof RootStackParamList,
> = NativeStackNavigationProp<RootStackParamList, Screen>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabStack" component={MainTabNavigator} />
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={{ presentation: "fullScreenModal" }}
      />
    </Stack.Navigator>
  );
}
