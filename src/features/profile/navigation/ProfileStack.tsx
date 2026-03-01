import React, { FC } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  CompositeNavigationProp,
  CompositeScreenProps,
} from "@react-navigation/native";
import {
  MainTabNavigationProp,
  MainTabStackProps,
} from "@/navigation/MainTabStack";
import { ProfileHome } from "../screens/ProfileHome";
import { FavouritesScreen } from "../screens/FavouritesScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

export type ProfileStackParamList = {
  ProfileHome: undefined;
  Favourites: undefined;
  Settings: undefined;
};

export type ProfileStackScreenProps<
  Screen extends keyof ProfileStackParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, Screen>,
  MainTabStackProps<"ProfileStack">
>;

export type ProfileStackScreenNavigationProp<
  Screen extends keyof ProfileStackParamList,
> = CompositeNavigationProp<
  NativeStackNavigationProp<ProfileStackParamList, Screen>,
  MainTabNavigationProp<"ProfileStack">
>;

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

type ProfileStackNavigatorProps = MainTabStackProps<"ProfileStack">;

export const ProfileStackNavigator: FC<ProfileStackNavigatorProps> = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProfileHome"
    >
      <ProfileStack.Screen name="ProfileHome" component={ProfileHome} />
      <ProfileStack.Screen name="Favourites" component={FavouritesScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
};
