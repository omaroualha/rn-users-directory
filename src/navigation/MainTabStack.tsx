import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  RootStackScreenNavigationProp,
  RootStackScreenProps,
} from "./RootNavigator";
import {
  FeedStackNavigator,
  FeedStackParamList,
} from "@/features/feed/navigation/FeedStack";
import {
  ProfileStackNavigator,
  ProfileStackParamList,
} from "@/features/profile/navigation/ProfileStack";

const Tab = createBottomTabNavigator<MainTabStackParamList>();

export type MainTabStackParamList = {
  FeedStack: NavigatorScreenParams<FeedStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

export type MainTabStackProps<Screen extends keyof MainTabStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MainTabStackParamList, Screen>,
    RootStackScreenProps<"MainTabStack">
  >;

export type MainTabNavigationProp<Screen extends keyof MainTabStackParamList> =
  CompositeNavigationProp<
    NativeStackNavigationProp<MainTabStackParamList, Screen>,
    RootStackScreenNavigationProp<"MainTabStack">
  >;

export default function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="FeedStack" component={FeedStackNavigator} />
      <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}
