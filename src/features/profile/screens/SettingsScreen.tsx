import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ProfileStackScreenProps } from "../navigation/ProfileStack";

type SettingsScreenProps = ProfileStackScreenProps<"Settings">;

export const SettingsScreen: FC<SettingsScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
