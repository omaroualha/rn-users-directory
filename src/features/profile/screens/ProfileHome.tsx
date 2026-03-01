import React, { FC } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ProfileStackScreenProps } from "../navigation/ProfileStack";

type ProfileHomeProps = ProfileStackScreenProps<"ProfileHome">;

export const ProfileHome: FC<ProfileHomeProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Favourites")}>
        <Text>Favourites</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});
