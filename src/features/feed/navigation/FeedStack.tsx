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
import { FeedHome } from "../screens/FeedHome";

export type FeedStackParamList = {
  FeedHome: undefined;
};

export type FeedStackScreenProps<Screen extends keyof FeedStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<FeedStackParamList, Screen>,
    MainTabStackProps<"FeedStack">
  >;

export type FeedStackScreenNavigationProp<
  Screen extends keyof FeedStackParamList,
> = CompositeNavigationProp<
  NativeStackNavigationProp<FeedStackParamList, Screen>,
  MainTabNavigationProp<"FeedStack">
>;

const FeedStack = createNativeStackNavigator<FeedStackParamList>();

type FeedStackNavigatorProps = MainTabStackProps<"FeedStack">;

export const FeedStackNavigator: FC<FeedStackNavigatorProps> = () => {
  return (
    <FeedStack.Navigator
      initialRouteName={"FeedHome"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <FeedStack.Screen name={"FeedHome"} component={FeedHome} />
    </FeedStack.Navigator>
  );
};
