import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ProfileStackScreenProps } from "../navigation/ProfileStack";

type FavouritesScreenProps = ProfileStackScreenProps<"Favourites">;

export const FavouritesScreen: FC<FavouritesScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Favourites</Text>
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
